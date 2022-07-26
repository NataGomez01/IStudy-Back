FROM node:12

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN yarn

# If you are building your code for production

# RUN npm ci --only=production

# Bundle app source

COPY . .

EXPOSE 8080

CMD [ "nodemon", "src/index.ts" ]