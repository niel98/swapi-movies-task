FROM node:16-alpine

WORKDIR /app

# Copy and download dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source files into the image
COPY . .

EXPOSE 6000

COPY ./docker-entry-point.sh /docker-entry-point.sh

RUN chmod +x /docker-entry-point.sh

ENTRYPOINT [ "/docker-entry-point.sh" ]
# CMD ["node", "server.js"]