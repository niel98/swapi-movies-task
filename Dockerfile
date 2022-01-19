FROM node:16-alpine

WORKDIR /app

# Copy and download dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source files into the image
COPY . .

EXPOSE 6000

CMD ["node", "server.js"]