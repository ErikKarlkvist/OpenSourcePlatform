# OpenSourcePlatform

An open source platform with open source projects created by DNB employees - but still available for external developer. The platform doesn't host any code itself, instead it links to projects on github. The goal is to give an overlook of projects being developed on DNB in an attractive manner.  

# Running the project
This project uses react, node packet manager (npm) and firebase. You need to install npm on your computer and create a firebase project in order to run this project. We currently do not provide any mock data to firebase, so there won't be any users och projects created when you run the app the first time.

[You can create a firebase project here] (https://console.firebase.google.com/u/0/), and [View the firebase documentation here](https://firebase.google.com/docs/guides/)

##Quick guide once everything is installed and you've pulled the latest version of the project:
1. Open the terminal and navigate to the project
2. cd app
3. Run npm install (you have to install npm in order for this to work)
4. Create a file in /app/src/backend called firebase.js. Copy and paste the following into the file:
```javascript
import firebase from "firebase";

firebase.initializeApp({
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
});

export default firebase;
```

...Keep in mind that you have to replace all values with values from your firebase project. These values are found in the project overview page in the Firebase console. Once there, click Add Firebase to your web app.

5. Open the terminal and run npm start
6. A window will open in your default browser. If nothing happens, go to "localhost:3000" in your browser.
7. Happy coding!



