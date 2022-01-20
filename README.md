# swapi-movies

# Documentation
## This is a project that demonstrates RESTful API with Nodejs. This project contains a small set of rest API endpoints using Nodejs that lists the names of star wars movies along with their opening crawls and comment counts, adding and listing anonymous comments for a movie, and getting the character list for a movie.
# You can find the hosted documentation on https://documenter.getpostman.com/view/12205886/UVXnFZ34

# Set Up
# Environment Variables
# The environment variables required to run the app are  DB_NAME, DB_HOST, DB_PASSWORD, NODE_ENV, DB_USERNAME, and URL. All of these must be set for the project to work properly.

# Running the App locally
# Create a mysql db and run migrations with the command: npx sequelize db:migrate
# - Run npm install
# - Run npm run dev (to start the app using nodemon) OR npm start.

# Running the App using Docker
# Pre-requisites:
# - Docker for Desktop
# Run docker-compose up in the root of the project. This will start the Docker app and run the DB migrations.
# It will bring up Mysql and the Nodejs application server in development mode.

# It binds the application server to localhost:6000
# You can connect to mysql by changing the values for the DB_HOST to db and the DB_PASSWORD to example.