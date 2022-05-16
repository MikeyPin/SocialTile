const firebaseConfig = {
  apiKey: "AIzaSyBPCeOqINQFbdA0ZwIeUbPMIYh_aOKjbqw",
  authDomain: "socialtile-d41a4.firebaseapp.com",
  projectId: "socialtile-d41a4",
  databaseURL: "https://socialtile-d41a4-default-rtdb.firebaseio.com/",
  storageBucket: "socialtile-d41a4.appspot.com",
  messagingSenderId: "334308149065",
  appId: "1:334308149065:web:bc63fe8a81309dceb93c98"
};



const app = firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();

const detailsRef = dbRef.child('userdetails');
detailsRef.on('child_added', function (snapshot, prevChildKey) {
  var newPost = snapshot.val();
});

function send() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  detailsRef.push().set({
    email: email,
    password: password,
  });


}

// User authentication
// Creates a new user using Firebase's auth SDK, specifically their createUserWithEmailAndPassword function
// by passing an email and password, Firebase will create a new user 
// If user creation is valid, the user is created and moves user to the main home page
// If invalid, prints an error to the console
function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Created user successfully: ", userCredential);
      window.location.href = "./HomePageSocialTiles.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`Error creating user`);
      console.log("Error code: ", errorCode);
      console.log("Error message: ", errorCode);
    });
}

// Logs in an existing user using the provided email and password combination
// If the combo is valid, moves the user to the main home page
// If invalid, prints an error to the console
function loginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("User signed in successfully! Navigating to home feed");
      window.location.href = "./HomePageSocialTiles.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error logging in user");
      console.log("Error code: ", errorCode);
      console.log("Error message: ", errorCode);
    });
}
