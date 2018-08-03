# OpenSourcePlatform

An open source platform with open source projects created by DNB employees - but still available for external developer. The platform doesn't host any code itself, instead it links to projects on github. The goal is to give an overlook of projects being developed on DNB in an attractive manner.

# Running the project

This project uses react, node packet manager (npm) and firebase. You need to install [Node.js](https://nodejs.org/en/) and npm on your computer (installning Node also installs npm) and create a firebase project in order to run this project.

[You can create a firebase project here](https://console.firebase.google.com/u/0/), and [View the firebase documentation here](https://firebase.google.com/docs/guides/)

### Quick guide once everything is installed and you've pulled the latest version of the project:

1.  Open the terminal and navigate to the project
2.  cd app
3.  Run npm install (you have to install npm in order for this to work)
4.  Create a file in /app/src/backend called firebaseKeys.json. Copy and paste the following into the file:

```json
{
  "apiKey": "<API_KEY>",
  "authDomain": "<PROJECT_ID>.firebaseapp.com",
  "databaseURL": "https://<DATABASE_NAME>.firebaseio.com",
  "projectId": "<PROJECT_ID>",
  "storageBucket": "<BUCKET>.appspot.com",
  "messagingSenderId": "<SENDER_ID>"
}
```
Keep in mind that you have to replace all values with values from your firebase project. These values are found in the project overview page in the Firebase console. Once there, click "Add Firebase to your web app". If you do not recieve a "storageBucket" path, go to your project in firebase, select database from the menu and "create database". Make sure you select "Cloud Firestore" and then "test database" when creating the database.

5.  Open the terminal and run npm start
6.  A window will open in your default browser. If nothing happens, go to "localhost:3000" in your browser.
7.  Happy coding!


# Frameworks
React - we use react to build the frontend and we’ve thus coded everything in javascript. Link: https://reactjs.org/ 
Node & npm - react uses node and npm as packet managers, which is why we use it as well. Link: https://nodejs.org/en/ 
Firebase - firebase and react is a great combo. Firebase comes with tons of built in functionality, and we have therefore currently no need for a separate server. All code we’ve written is directly written in the app. Link: https://firebase.google.com/ 

# Libraries
Npm has allowed us to use tons of open source libraries that are free to use. Following is a list of all libraries used with links to each library.
[Bootstrap](https://getbootstrap.com/) 
[Firebase (the node package)](https://www.npmjs.com/package/firebase) 
[Raw-loader](https://www.npmjs.com/package/raw-loader) 
[React-dom](https://www.npmjs.com/package/react-dom) 
[React-markdown](https://github.com/rexxars/react-markdown) 
[React-router-dom](https://www.npmjs.com/package/react-router-dom) 
[React-scripts](https://www.npmjs.com/package/react-scripts)
[React-spinners](https://www.npmjs.com/package/react-spinners)
[React-tooltip](https://www.npmjs.com/package/react-tooltip)  

# Generate mock data

There are a few scripts available to both create mock data from your database and fill your database with mock data. This section explains how to create data for your project.

### Generate auth

You don't have to generate auth users in order for the firestore mock data to work, but if you want to generate them, here's how:

1.  You have to install the [Firebase CLI](https://firebase.google.com/docs/hosting/quickstart#install-the-firebase-cli). You can do this in the terminal by typing "npm install -g firebase-tools"
2.  Run the command "firebase login" and connect your machine to firebase
3.  Edit the file ".firebaserc" in app/ and replace the "default"-key with the name of your firebase repository (with lower case letter)
4.  Run the command "npm run copy-users"
5.  The users should be copied to your database. Check the "authentication" tab in firebase to see all users.

### Generate firestore data

Before you do this please make sure that the project is running and you've followed the guide under "Running the project."

1.  Go to your terminal and navigate to app/
2.  Run the command "npm run generate-mock-data"
3.  Once the script is done, hit "ctrl c" to exit
4.  Refresh the firebase website, go to database and you should have two collections: "Projects" and "Users"
5.  Run the command "npm start"
6.  Check that the data loads into your application on "localhost:3000".
7.  Success!

# Migrate to another database
This is a bit complicated but can be done. Firstly you have to rewrite the “backend” inside the application. This can be found in “app/src/backend/”. You have to rewrite the following files to match the new database:
* auth.js
* projects.js
* storage.js
* users.js 
The files “firebase.js” and “firebaseKeys.json” can be deleted if you migrate to another database. 

It will also be necessary to change all the files in “app/src/containers/pages” since they check whether or not the user is logged in and handles each outcome appropriately in a function called “setupAuthStateChange”. This function must either be replaced with something else to check users authentication, or be rewritten.

## User object
The following data describes a user as a JSON and if the structure is not kept the app might break:

```json
{
  description: String,
  email: String,
  firstname: String, 
  id: String,
  lastname: String,
  profileImageURL: String
}
```

## Project object
The following data describes a project as a JSON and if the structure is not kept the app might break:
```json
{
  description: String,
  contactMail: String,
  creator: String,
  developers: [String],
  gitURL: String,
  headerImageURL: String,
  id: String,
  lookingFor: [String],
  name: String,
  production: Boolean,
  readmeURL: String
  owners: [{
    role: String,
    userID: String
  }],
  thumbnails: [{
    createdAt: Date,
    description: String,
    name: String,
    //image url
    url: String
  }]
}
```
{
