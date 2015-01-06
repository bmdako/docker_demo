## Docker demo

This is a simple demo project how I have used Docker to deploy my Node.js projects.

It's a very simple way of doing it. No fancy scripts or custom logic. But it's a place to start.

### Step 0: Setup

The Docker image is build locally and all dependencies are copied onto the image:

* The entire `./src` and `./node_modules` directories.
* Node is downloaded and installed, so we don't need to install it on the servers.

This means, to create the build, we need:

1. Docker installed.
2. The code locally on my machine (eg. using git).
3. The Node modules installed.


Beside installing Docker, these are thing we do with any other project anyways:

```
git clone https://github.com/bmdako/docker_demo.git
cd docker_demo
npm install
```

Now we're ready to build an image.

### Step 1: Build a Docker image

The build command uses the `Dockerfile` in the project root.
See [Dockerfile Reference](https://docs.docker.com/reference/builder/) and [Docker Command Line Reference](https://docs.docker.com/reference/commandline/cli/) for info on the commands used.

To build a Docker image, use the following command:

```
sudo docker build -t bmdako/docker_demo .
```

Argument `-t` means we apply _bmdako/docker_demo_ as the image repository name. Optionally, we can add a tag to this name.

The output will look something like this:

```
Sending build context to Docker daemon 8.568 MB
Sending build context to Docker daemon 
Step 0 : FROM ubuntu:14.04
 ---> 5506de2b643b
Step 1 : MAINTAINER Daniel Kokott <dako@berlingskemedia.dk>
 ---> Using cache
 ---> d89454e0db0c
Step 2 : RUN apt-get update
 ---> Using cache
 ---> c684b04174d5
Step 3 : RUN apt-get install -y wget
 ---> Using cache
 ---> 4029412b556c
Step 4 : RUN wget -O - http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz    | tar xzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE"    --exclude="ChangeLog" -C "/usr/local"
 ---> Running in 5bd9b92d3c22
--2015-01-06 09:30:44--  http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz
Resolving nodejs.org (nodejs.org)... 165.225.133.150
Connecting to nodejs.org (nodejs.org)|165.225.133.150|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 5645609 (5.4M) [application/octet-stream]
Saving to: 'STDOUT'

     0K .......... .......... .......... .......... ..........  0% 7.41M 1s
    50K .......... .......... .......... .......... ..........  1% 14.9M 1s
   100K .......... .......... .......... .......... ..........  2% 21.0M 0s
   150K .......... .......... .......... .......... ..........  3% 9.11M 0s
   200K .......... .......... .......... .......... ..........  4%  484M 0s
   250K .......... .......... .......... .......... ..........  5% 23.8M 0s
   300K .......... .......... .......... .......... ..........  6% 42.1M 0s
   350K .......... .......... .......... .......... ..........  7% 23.0M 0s
   400K .......... .......... .......... .......... ..........  8% 20.3M 0s
   450K .......... .......... .......... .......... ..........  9% 21.7M 0s
   500K .......... .......... .......... .......... ..........  9% 66.9M 0s
   550K .......... .......... .......... .......... .......... 10% 19.3M 0s
   600K .......... .......... .......... .......... .......... 11% 27.9M 0s
   650K .......... .......... .......... .......... .......... 12% 59.6M 0s
   700K .......... .......... .......... .......... .......... 13% 65.1M 0s
   750K .......... .......... .......... .......... .......... 14% 32.7M 0s
   800K .......... .......... .......... .......... .......... 15% 31.4M 0s
   850K .......... .......... .......... .......... .......... 16% 63.8M 0s
   900K .......... .......... .......... .......... .......... 17% 31.6M 0s
   950K .......... .......... .......... .......... .......... 18% 33.3M 0s
  1000K .......... .......... .......... .......... .......... 19% 13.3M 0s
  1050K .......... .......... .......... .......... .......... 19% 38.1M 0s
  1100K .......... .......... .......... .......... .......... 20% 51.1M 0s
  1150K .......... .......... .......... .......... .......... 21% 35.4M 0s
  1200K .......... .......... .......... .......... .......... 22% 60.9M 0s
  1250K .......... .......... .......... .......... .......... 23% 45.1M 0s
  1300K .......... .......... .......... .......... .......... 24% 32.5M 0s
  1350K .......... .......... .......... .......... .......... 25% 37.4M 0s
  1400K .......... .......... .......... .......... .......... 26% 33.7M 0s
  1450K .......... .......... .......... .......... .......... 27%  181M 0s
  1500K .......... .......... .......... .......... .......... 28% 27.4M 0s
  1550K .......... .......... .......... .......... .......... 29% 32.6M 0s
  1600K .......... .......... .......... .......... .......... 29% 29.9M 0s
  1650K .......... .......... .......... .......... .......... 30%  114M 0s
  1700K .......... .......... .......... .......... .......... 31% 18.1M 0s
  1750K .......... .......... .......... .......... .......... 32% 22.0M 0s
  1800K .......... .......... .......... .......... .......... 33% 77.9M 0s
  1850K .......... .......... .......... .......... .......... 34%  220M 0s
  1900K .......... .......... .......... .......... .......... 35% 37.3M 0s
  1950K .......... .......... .......... .......... .......... 36% 54.7M 0s
  2000K .......... .......... .......... .......... .......... 37% 36.6M 0s
  2050K .......... .......... .......... .......... .......... 38% 45.6M 0s
  2100K .......... .......... .......... .......... .......... 38% 25.2M 0s
  2150K .......... .......... .......... .......... .......... 39% 25.6M 0s
  2200K .......... .......... .......... .......... .......... 40% 25.7M 0s
  2250K .......... .......... .......... .......... .......... 41% 36.1M 0s
  2300K .......... .......... .......... .......... .......... 42% 18.2M 0s
  2350K .......... .......... .......... .......... .......... 43% 21.2M 0s
  2400K .......... .......... .......... .......... .......... 44% 46.5M 0s
  2450K .......... .......... .......... .......... .......... 45% 30.8M 0s
  2500K .......... .......... .......... .......... .......... 46% 19.9M 0s
  2550K .......... .......... .......... .......... .......... 47% 20.8M 0s
  2600K .......... .......... .......... .......... .......... 48% 39.0M 0s
  2650K .......... .......... .......... .......... .......... 48% 17.8M 0s
  2700K .......... .......... .......... .......... .......... 49% 68.3M 0s
  2750K .......... .......... .......... .......... .......... 50% 15.7M 0s
  2800K .......... .......... .......... .......... .......... 51%  691K 0s
  2850K .......... .......... .......... .......... .......... 52%  487K 0s
  2900K .......... .......... .......... .......... .......... 53%  581K 0s
  2950K .......... .......... .......... .......... .......... 54% 2.46M 0s
  3000K .......... .......... .......... .......... .......... 55%  488K 0s
  3050K .......... .......... .......... .......... .......... 56%  487K 0s
  3100K .......... .......... .......... .......... .......... 57%  482K 1s
  3150K .......... .......... .......... .......... .......... 58%  580K 1s
  3200K .......... .......... .......... .......... .......... 58%  587K 1s
  3250K .......... .......... .......... .......... .......... 59% 1.27M 1s
  3300K .......... .......... .......... .......... .......... 60%  485K 1s
  3350K .......... .......... .......... .......... .......... 61%  486K 1s
  3400K .......... .......... .......... .......... .......... 62%  596K 1s
  3450K .......... .......... .......... .......... .......... 63%  504K 1s
  3500K .......... .......... .......... .......... .......... 64% 1.98M 1s
  3550K .......... .......... .......... .......... .......... 65%  485K 1s
  3600K .......... .......... .......... .......... .......... 66%  484K 1s
  3650K .......... .......... .......... .......... .......... 67%  582K 1s
  3700K .......... .......... .......... .......... .......... 68%  516K 1s
  3750K .......... .......... .......... .......... .......... 68% 1.94M 1s
  3800K .......... .......... .......... .......... .......... 69%  489K 1s
  3850K .......... .......... .......... .......... .......... 70%  487K 1s
  3900K .......... .......... .......... .......... .......... 71%  578K 1s
  3950K .......... .......... .......... .......... .......... 72%  516K 1s
  4000K .......... .......... .......... .......... .......... 73% 1.93M 1s
  4050K .......... .......... .......... .......... .......... 74%  471K 1s
  4100K .......... .......... .......... .......... .......... 75%  479K 1s
  4150K .......... .......... .......... .......... .......... 76%  619K 1s
  4200K .......... .......... .......... .......... .......... 77%  512K 1s
  4250K .......... .......... .......... .......... .......... 77% 1.66M 1s
  4300K .......... .......... .......... .......... .......... 78%  485K 1s
  4350K .......... .......... .......... .......... .......... 79%  490K 1s
  4400K .......... .......... .......... .......... .......... 80%  613K 1s
  4450K .......... .......... .......... .......... .......... 81%  505K 1s
  4500K .......... .......... .......... .......... .......... 82% 1.73M 1s
  4550K .......... .......... .......... .......... .......... 83%  463K 1s
  4600K .......... .......... .......... .......... .......... 84%  518K 1s
  4650K .......... .......... .......... .......... .......... 85%  611K 1s
  4700K .......... .......... .......... .......... .......... 86%  506K 1s
  4750K .......... .......... .......... .......... .......... 87% 1.47M 1s
  4800K .......... .......... .......... .......... .......... 87%  484K 0s
  4850K .......... .......... .......... .......... .......... 88%  521K 0s
  4900K .......... .......... .......... .......... .......... 89%  610K 0s
  4950K .......... .......... .......... .......... .......... 90%  491K 0s
  5000K .......... .......... .......... .......... .......... 91% 1.53M 0s
  5050K .......... .......... .......... .......... .......... 92%  489K 0s
  5100K .......... .......... .......... .......... .......... 93%  520K 0s
  5150K .......... .......... .......... .......... .......... 94%  615K 0s
  5200K .......... .......... .......... .......... .......... 95%  491K 0s
  5250K .......... .......... .......... .......... .......... 96%  507K 0s
  5300K .......... .......... .......... .......... .......... 97% 1.38M 0s
  5350K .......... .......... .......... .......... .......... 97%  485K 0s
  5400K .......... .......... .......... .......... .......... 98%  520K 0s
  5450K .......... .......... .......... .......... .......... 99% 7.06K 0s
  5500K .......... ...                                        100% 3.80M=12s

2015-01-06 09:31:01 (475 KB/s) - written to stdout [5645609/5645609]

 ---> 22dce137dafb
Removing intermediate container 5bd9b92d3c22
Step 5 : WORKDIR /docker_demo
 ---> Running in 6e9f7dd8e27b
 ---> 276e433485cf
Removing intermediate container 6e9f7dd8e27b
Step 6 : COPY ./src /docker_demo/src
 ---> 80e05e31af8f
Removing intermediate container 192ca58a3ec1
Step 7 : COPY ./node_modules /docker_demo/node_modules
 ---> a6e8650f94a3
Removing intermediate container 5b11e7c9acf6
Step 8 : EXPOSE  8000
 ---> Running in e02e0f69e108
 ---> e5a8d57a2b8f
Removing intermediate container e02e0f69e108
Step 9 : CMD ["node", "src/app.js"]
 ---> Running in 7f5cb3082ffd
 ---> 40bcbe642c78
Removing intermediate container 7f5cb3082ffd
Successfully built 40bcbe642c78

```

Copying the code and Node modules onto the image has the important benefit that we know excatly what code get's deployed.

But it also means we need to build a new image for every release. This is the reason why we apply a repository to the image.
When subsequently building the images with the same repository name, the most recent image will be tagged as _latest_.
To see all images on your system use `sudo docker images`.

```
dako@dako-ThinkPad-X220:~/Code/docker_demo$ sudo docker images
REPOSITORY           TAG                 IMAGE ID            CREATED              VIRTUAL SIZE
bmdako/docker_demo   latest              40bcbe642c78        About a minute ago   250.9 MB
```

If we apply some changes to the code, we need to build a new image by executing the exact same command as before.
Now the list of images looks like this:

```
dako@dako-ThinkPad-X220:~/Code/docker_demo$ sudo docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
bmdako/docker_demo   latest              8e7d0730113d        2 seconds ago       250.9 MB
<none>               <none>              40bcbe642c78        3 minutes ago       250.9 MB
```

*Note* the repository and tag has been moved from the first image to the second.

### Step 2: Push a Docker image

To be able to run an image on a different machine, I need to push the image to a registry. I have used [Docker Hub](https://hub.docker.com/). We can also use a self-hosted registry.

Below is the command to push the latest image from repository _bmdako/docker_demo_.

```
sudo docker push bmdako/docker_demo
```

### Step 3: Run a container

Next up is actually deploying and running a container based on an image. This is the cool part: We don't need to install anything but Docker.
Docker downloads the image if it's not available locally. And because the image has Node installed and our code, there's nothing else we need to install.

Just make sure that HCL has opened for HTTPS traffic from the server to the Docker Hub registry.

Use SSH to log into the server and run the following command:

```
sudo docker run --publish=80:8000 -d bmdako/docker_demo
```

Command `run` is shorthand for `docker create` and `docker start`.
Argument `--publish` means we map the container port to the host. See EXPOSE in the `Dockerfile`.
Argument `-d` means the container will run detached in the background.

Now we have created and started a new container based on the image. To see a list of running containers, use `sudo docker ps`:

```
dako@dako-ThinkPad-X220:~/Code/docker_demo$ sudo docker ps
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                  NAMES
26bf1a66f318        bmdako/docker_demo:latest   node src/app.js     13 seconds ago      Up 13 seconds       0.0.0.0:80->8000/tcp   prickly_carson
```

In the run command above, I have omitted setting an environment variable.
Our little Node app, uses USERNAME env if available. So we might want to see how this works.
Environment variables can only be set when executing a run command. So we need to run a new container.
Because of port conflicts, we need to stop the previous container before we can start a new one.

To stop the container, use `sudo docker stop 26bf1a66f318`.
To see all containers, running and stopped, use `sudo docker ps -a`:

```
dako@dako-ThinkPad-X220:~/Code/docker_demo$ sudo docker ps -a
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS                            PORTS               NAMES
26bf1a66f318        bmdako/docker_demo:latest   node src/app.js     4 minutes ago       Exited (143) About a minute ago                       prickly_carson  
```

Now, run a new container using the following command:

```
sudo docker run \
--env=USERNAME=test \
--publish=80:8000 \
-d bmdako/docker_demo
```

The list of containers new looks like this:

```
dako@dako-ThinkPad-X220:~/Code/docker_demo$ sudo docker ps -a
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS                       PORTS                  NAMES
5ffb1fbd9c3d        bmdako/docker_demo:latest   node src/app.js     12 seconds ago      Up 11 seconds                0.0.0.0:80->8000/tcp   jovial_hopper       
26bf1a66f318        bmdako/docker_demo:latest   node src/app.js     5 minutes ago       Exited (143) 2 minutes ago                          prickly_carson  
```

*Important*: When a new image has been build and pushed to the registry, this is not automatically downloaded to our server.
We need to pull the latest image by executing following command:

```
sudo docker pull bmdako/docker_demo
```

### Optional step: Remove old containers and images

To delete an old container, use:

```
sudo docker rm 26bf1a66f318
```

To delete an old image, use:

```
sudo docker rmi 40bcbe642c78
```