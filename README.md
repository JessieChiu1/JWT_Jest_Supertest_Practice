# Notes for JWT refresher with Discord Mentor

## Setting up .env file
Your `.env` file in the server folder should look something like this:
```
DB_URI=<MongoDB URI String with "/dev">
JWT_SECRET=<Some secret key use to hash your password>
```

- You will get `DB_URI` from setting up your MongoDB Atlas
- `JWT_SECRET` is just a random string, you can put anything here 

Your `.env` in the client folder should look something like this:
```
REACT_APP_API_URL=http://localhost:3001
```

You will change the url when you deploy it.

## Setting up MongoDB Atlas

[Tutorial](https://www.youtube.com/watch?v=084rmLU1UgA)

1. Signup/Login to [MongoDB](https://www.mongodb.com/).
2. Click `Build a Database` and choose the free option and just stick with the default
3. Create a **Username** and **Password** and write down the Password somewhere
4. At the bottom of the same page, you need to add an IP Address (Your IP Address from your computer)
5. Onces the Database is set up, under **Deployment - Databases**
    - click **Connect**
    - click **Connect your application**
    - copy your connection string, you will need to replace the **<username>** and **<password>** with the username and passworf from step 3
    - add this string to your `.env` file


## File structures and file you will need to create
**Note that most real world project actual separate the client/server into two repos**
- `client` (front-end)
    - `public` - all static file/images/etc
    - `src`
        - `components` - smaller react components that can generally be reuse
        - `routes` - react components of the whole page layout
        - `services` - similar to controller folder in the backend, it is the functions that handle the responses from backend
    - `.env` - include the `REACT_APP_API_URL` that can be handle the react api url, need to switch into something else if deployed
    - `.gitignore` - include the `.env`
- `server` (back-end)
    - `__test__` (jest/supertest testing folder)
        - `app.test.js`
        - `controllers`
            - `auth.test.js`
            - `user.test.js`
    - `coverage` (not very verse with this folder but it is created by jest/superjest as a report on the testing)
    - `models` (folder with all of your schema)
        - `User.js` - This is the object `User` schema
    - `config` (folder of your MongoDB Cloud database connection)
        - `db.js` - This is the code for connection to the cloud database
    - `routes` (folder with all of the routes for CRUD functions)
        - `auth.js` - auth routes
        - `user.js` - user routes
    - `app.js` - handle express and middleware
    - `.env` - stores all of your **sensitive** information, remember to add this to `.gitignore` so you don't accidentally push this to GitHub
    - `.gitignore` - should have both `node_modules` and `.env`
    - `server.js` - (entry-point) will activate the DB and connect to PORT 3001
        - *Note that when you require a file `require("../config/db");`, we are actually running the file, so the database will be connecting when you just run the `node app.js`*

## libraries and what they are
**Frontend**
- `react`
- `react-dom`
- `react-dom-router`

**Backend**
- `express` - framework for the Node.js backend. (Middleware, Routing, loading static files, error handling)
- `dotenv` - access your sensitive information from the `.env` file, things such as API key, secret key, password, and other sensitive informations you don't want other to use
- `bcrypt` - used for securely hashing passwords, that's what the `SECRET_KEY` is for, a code to hash and un-hash the password for verification
- `jsonwebtoken`
    - authentication and authorization tool
    - consist of 3 part `<header>.<payload>.<signature>`
        - header consist of information about the type of token it is (JWT) and the signing algorithm used
        - payload is the actual information on the user but hashed
        - signature helps determined if the JWT is valid or not
    - [What is JWT and Why you Should Use a JWT - video](https://www.youtube.com/watch?v=7Q17ubqLfaM)
- `supertest` - will help test end-point 
- `jest` - test overall functionality

**In the server folder**
```
npm install express
npm install dotenv
npm install bcrypt
npm install jsonwebtoken
npm install supertest --save-dev
npm install --save-dev jest
```

## Setting up Front-end
**Note that before you move on to the front end, you should test your route via Postman**
1. At the root of your project, run this command to setup basic react app:
```
npx create-react-app client
```

## Running the files:
1. `node server/app.js` - this will activate the DB and the backend port 3001
You should see something like this:
    ```
    listening
    connected to MongoDB @ac-nr0bkff-shard-00-01.awn8gnn.mongodb.net
    ```
2. cd into the client folder and run this command `npm start`
    - You should be directly route to `http://localhost:3000/` in browser

## End to end testing with Jest/SuperJest:
- **End to end testing vs unit testing**
    - end to end testing are like postman, we are testing the API endpoint.
    - unit testing are individual test for functions
- I did not test out everything but this is a sample of what you can expect:
    - testing all signup/login/homepage/user profile page.

