# base image
FROM node:14

# set working directory
WORKDIR /app

# for ng
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

# move all the sources to the app
COPY . /app

# start serving
# NOTE: For prod, we wouldn't use the Cli, but something like NGINX to do this.
#       In which case we'd convert this to a multi-stage docker
CMD ng serve --host 0.0.0.0 --poll 1