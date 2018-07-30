# OpenSourcePlatform

An open source platform with open source projects created by DNB employees - but still available for external developer. The platform doesn't host any code itself, instead it links to projects on github. The goal is to give an overlook of projects being developed on DNB in an attractive manner.  

# Running the project
This project uses react, node packet manager (npm) and firebase. You need to install [Node.js](https://nodejs.org/en/) and npm on your computer (installning Node also installs npm) and create a firebase project in order to run this project. 

[You can create a firebase project here](https://console.firebase.google.com/u/0/), and [View the firebase documentation here](https://firebase.google.com/docs/guides/)

### Quick guide once everything is installed and you've pulled the latest version of the project:
1. Open the terminal and navigate to the project
2. cd app
3. Run npm install (you have to install npm in order for this to work)
4. Create a file in /app/src/backend called firebaseKeys.json. Copy and paste the following into the file:
```json
{
    "apiKey": "<API_KEY>",
    "authDomain": "<PROJECT_ID>.firebaseapp.com",
    "databaseURL": "https://<DATABASE_NAME>.firebaseio.com",
    "projectId": "<PROJECT_ID>",
    "storageBucket": "<BUCKET>.appspot.com",
    "messagingSenderId": "<SENDER_ID>",
}

```

  Keep in mind that you have to replace all values with values from your firebase project. These values are found in the project overview page in the Firebase console. Once there, click "Add Firebase to your web app".

5. Open the terminal and run npm start
6. A window will open in your default browser. If nothing happens, go to "localhost:3000" in your browser.
7. Happy coding!

# Generate mock data
There are a few scripts available to both create mock data from your database and fill your database with mock data. This section explains how to create data for your project.

### Generate auth
You don't have to generate auth users in order for the firestore mock data to work, but if you want to generate them, here's how: 

1. You have to install the [Firebase CLI](https://firebase.google.com/docs/hosting/quickstart#install-the-firebase-cli). You can do this in the terminal by typing "npm install -g firebase-tools"
2. Run the command "firebase login" and connect your machine to firebase
3. Edit the file ".firebaserc" in app/ and replace the "default"-key with the name of your firebase repository (with lower case letter)
4. Run the command "npm run copy-users"
5. The users should be copied to your database. Check the "authentication" tab in firebase to see all users.
