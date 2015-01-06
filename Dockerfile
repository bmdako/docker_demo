FROM ubuntu:14.04

MAINTAINER Daniel Kokott <dako@berlingskemedia.dk>

# It's good practice to start with an update of the package lists from the repositories.
RUN apt-get update

# Installing wget, which we need to download Node.
RUN apt-get install -y wget

# Downloading and installing Node.
RUN wget -O - http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz \
    | tar xzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE" \
    --exclude="ChangeLog" -C "/usr/local"

# Set the working directory on the image.
WORKDIR /docker_demo

# Copying the code and node_modules into image working directory.
# Be aware no config  files are included.
COPY ./src /docker_demo/src
COPY ./node_modules /docker_demo/node_modules

# Telling Docker which TCP/IP port to expose.
# This must be the same port that Node/Hapi exposes. See src/app.js.
EXPOSE  8000

# When starting a container with our image, this command will be run.
CMD ["node", "src/app.js"]