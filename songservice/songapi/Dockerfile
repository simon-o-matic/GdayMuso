FROM node:14

# Create an app directory
WORKDIR /app

# Copy package because volume not yet mounted
COPY package*.json /app
RUN npm install
RUN npm install -g nodemon
RUN npm install -g jest

CMD [ "npm", "start" ]