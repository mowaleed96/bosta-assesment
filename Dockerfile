FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Enable next line if in production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]