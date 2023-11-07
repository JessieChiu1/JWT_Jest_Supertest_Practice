# Notes for JWT refresher with Discord Mentor

## Setting up .env file
Your `.env` file should look something like this:
```
DB_URI=<MongoDB URI String>
JWT_SECRET=<Some secret key use to hash your password>
```

- You will get `DB_URI` from setting up your MongoDB Atlas
- `JWT_SECRET` is just a random string, you can put anything here 

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


## File strucures and file you will need to create
- models (folder with all of your schema)
    - `User.js` - This is the object `User` schema
- config (folder of your MongoDB Cloud database connection)
    - `db.js` - This is the code for connection to the cloud database
- server (folder with all of the routes for CRUD functions)
    - *Note that when you require a file `require("../config/db");`, we are actually running the file, so the database will be connecting when you just run the `node app.js`*
    - `app.js` - (entry point)
    - `auth.js` - auth routes
    - `user.js` - user routes
- `.env` - stores all of your **sensitive** information, remember to add this to `.gitignore` so you don't accidentally push this to GitHub
- `.gitignore` - should have both `node_modules` and `.env``

## libraries and what they are
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

## Running the file:
1. `node server/app.js`
    - You should see something like this:
        ```
        listening
        connected to MongoDB @ac-nr0bkff-shard-00-01.awn8gnn.mongodb.net
        ```
2. user postman to test the route. home route is `localhost:3001/` as specificized in the app.js file