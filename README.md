## Docker demo

This is a simple demo project how I have used Docker to deploy my Node.js apps. It doesn't have to Node.js but could be any other platform. The process is the same.

It's a very simple way of doing it. No fancy scripts or custom logic. But it's a place to start.


### Step 0: Setup

The Docker image is build locally and all dependencies are copied onto the image. By dependencies I mean the entire `./src` and `./node_modules` directories are copied and Node is downloaded and installed.

This means, to create the build, we need to have:

1. Docker installed.
2. The code downloaded locally (eg. using git).
3. The app specific Node modules installed.


Beside installing Docker, these are thing we do with any other project anyways:

```
git clone https://github.com/bmdako/docker_demo.git
cd docker_demo
npm install
```

Now we're ready to build an image.


### Step 1: Build an image

The build command uses the `Dockerfile` in the project root.
See [Dockerfile Reference](https://docs.docker.com/reference/builder/) and [Docker Command Line Reference](https://docs.docker.com/reference/commandline/cli/) for info on the commands used.

To build a Docker image, use the following command:

```
sudo docker build -t bmdako/docker_demo .
```

Argument `-t` means we apply _bmdako/docker_demo_ as the image repository name. This will be useful when making new images later.
(Optionally, we can add a custom tag instead of the default _latest_.)

To see all images on your system use `sudo docker images`:

```
REPOSITORY           TAG                 IMAGE ID            CREATED              VIRTUAL SIZE
bmdako/docker_demo   latest              40bcbe642c78        About a minute ago   250.9 MB
```

Now we're ready to run the container locally on our machine.


#### Updating the code

Copying the code and Node modules onto the image has the important benefit that we know exactly what code get's deployed.
But it also means we need to build a new image for every release. This is the reason why we apply a repository to the image: When subsequently building images with the same repository name, only the most recent image will be tagged as _latest_.

If we apply some changes to the code, we need to build a new image by executing the exact same command as before.
Now the list of images looks like this:

```
REPOSITORY           TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
bmdako/docker_demo   latest              8e7d0730113d        2 seconds ago       250.9 MB
<none>               <none>              40bcbe642c78        3 minutes ago       250.9 MB
```

*Note* the repository and tag has been removed from the first image.


### Step 2: Push an image

To be able to run an image on a different machine, we need to push the image to a registry. I have used [Docker Hub](https://hub.docker.com/). We can also use a self-hosted registry.

The command below pushes the latest image from repository _bmdako/docker_demo_ locally to Docker Hub.

```
sudo docker push bmdako/docker_demo
```

Now we're ready to deploy our app by running a container on a server.


### Step 3: Run a container

Running a container is the cool part: We only need to install Docker. (Our code and Node are already contained on the image.)
Docker downloads the image if it's not available locally. (Just make sure HCL has allowed outgoing HTTPS traffic from the server. Otherwise we can't download our image.)

Log into the server and run the following command:

```
sudo docker run --publish=80:8000 -d bmdako/docker_demo
```

Now we have created and started a new container based on our image. 
Visit (http:<server>/) to see if the app is running.

Command `run` is shorthand for `create` and `start` a new container.
Argument `--publish` means we map the container port to the host. See EXPOSE in the `Dockerfile`.
Argument `-d` means the container will run detached in the background.

To see a list of running containers, use `sudo docker ps`:

```
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                  NAMES
26bf1a66f318        bmdako/docker_demo:latest   node src/app.js     13 seconds ago      Up 13 seconds       0.0.0.0:80->8000/tcp   prickly_carson
```

We're done. No more steps. But there's more to learn.


### Pulling new images

**Important**: When a new image has been build and pushed to the registry, this is not automatically downloaded to our server.
We need to pull the latest image by executing following command:

```
sudo docker pull bmdako/docker_demo
```

After pulling a new image, we need to start a new container based on the new image.
But because of port conflicts, we need to stop the previous container before we can run a new one. (Alternatively we can have multiple containers running on different ports.)


### Stopping containers

To stop the container, use:

```
sudo docker stop 26bf1a66f318
```

To see all containers, running and stopped, use `sudo docker ps -a`:

```
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS                            PORTS               NAMES
26bf1a66f318        bmdako/docker_demo:latest   node src/app.js     4 minutes ago       Exited (143) About a minute ago                       prickly_carson  
```


### Environment variables

In the run command in step 3, we have omitted setting an environment variable.
Since our little Node app uses the env _USERNAME_ if available, we might want to see how this works.

Environment variables can only be set when executing a run command. So before running a new container, stop the old one.
Now, run a new container using the following command with environment variable _USERNAME=test_:

```
sudo docker run \
--env=USERNAME=test \
--publish=80:8000 \
-d bmdako/docker_demo
```

The list of containers now looks like this:

```
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS                       PORTS                  NAMES
5ffb1fbd9c3d        bmdako/docker_demo:latest   node src/app.js     12 seconds ago      Up 11 seconds                0.0.0.0:80->8000/tcp   jovial_hopper       
26bf1a66f318        bmdako/docker_demo:latest   node src/app.js     5 minutes ago       Exited (143) 2 minutes ago                          prickly_carson  
```


### Adding tags to images

When build images, we can add a custom tag. Below I build two images but with different tags:

```
sudo docker build -t bmdako/docker_demo:v1 .
sudo docker build -t bmdako/docker_demo:v2 .
```

Before, when building new images without a custom tag, only the most recent images was tagged _latest_ and the repository name was removed from older version.
But now, when listing images (`sudo docker images`), both images have the repository name and can be pushed/pulled separately.

```
REPOSITORY           TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
bmdako/docker_demo   v2                  4d9e6c8cd26c        4 seconds ago       250.9 MB
bmdako/docker_demo   v1                  49b55c28a924        34 seconds ago      250.9 MB
```


### Remove old containers and images

Old containers and images are not deleted when we build, pull or run.

E.g. on the server, we have an old container. To delete this, use:

```
sudo docker rm 26bf1a66f318
```

E.g. on our build machine, we have an old image. To delete this, use:

```
sudo docker rmi 40bcbe642c78
```
