FROM node:12

#create app dir
WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install 

#Bundle Source Code 
COPY . .



CMD [ "npm", "run",  "docker:start"]