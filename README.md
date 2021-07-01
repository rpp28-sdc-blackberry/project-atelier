# Project Atelier

Project Atelier is a front-end application built with **React** that simulates an e-commerce shopping experience. It was built for a group project as part of Hack Reactor's part-time Software Engineering Immersive program.

---

## Usage

If you're interested in trying out what we've built, feel free to download or clone our source code! Then go to the directory where you copied the code using your Terminal (assuming you're using a Mac) and:

1. Type ```npm install``` to download all the necessary dependencies (see below for more info on these)
2. Type ```npm start``` to start the server (it's running on port :8080)
3. Go to http://localhost:8080/ in your browser and check it out!

**Note:** make sure you create a ```.env``` file at the project's root directory with your Github and Cloudinary tokens (see below for more info).

You can also use ```npm run server-dev``` to run the server using **nodemon**, and ```npm run react-dev``` to run **webpack** (it's already configured to watch for file changes).

---

## Environment Variables

We used a ```.env``` file to save sensitive variables that are used by our application to make API calls. To use our source code without making modifications, your ```.env``` file should look like this:

```
GITHUB_TOKEN={your Github token goes here}
CLOUD_NAME={the cloud name you created in Cloudinary}
API_KEY={your Cloudinary API key}
API_SECRET={your Cloudinary API secret}
```

You can name these variables whatever you want, just make sure to find and replace them in our source code (you should only need to make changes in the ```/server``` directory.

### Github Token

Get a personal access token with your Github account. Go to **Settings > Developer settings > Personal Access tokens** and generate a new token that has the following scopes:

- read:org (under admin:org)
- user
 - read:user
 - user:email
 - user:follow

### Cloudinary API Keys

Steps to get Cloudinary API keys go here...

---

## Dependencies

Project Atelier relies primarily on:
 - React
 - Express
 - Axios
 - JQuery
 - Webpack
 - Babel
 - Cloudinary
 - Dotenv

Plus some testing libraries: RTL, Frisby, Puppeteer, and Supertest.

---

### Created By

Alizeh Rehman, Jorge Brake, Matt Wrobel and Tatt Chitrakorn.
