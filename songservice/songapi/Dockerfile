FROM node:14

# Create an app directory
WORKDIR /app

# Copy our important files across and get the packages
COPY package*.json /app
RUN npm install

COPY . .

CMD [ "npm", "start" ]