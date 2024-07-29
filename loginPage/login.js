import { app, auth, signInWithEmailAndPassword, database, ref, set, get, child } from "../firebaseConfig.js";
import { validation } from "../register/signUp.js";

let emailRegex = new RegExp(/^[a-zA-Z0-9]{2,}@[a-z]{2,}(.)(com|net|org|edu)$/);
let passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}/);



$(document).ready(function(){ 

  console.log("here")

  validation();

    $("#logInForm").on("submit",function(e){
      e.preventDefault();
    
      signInWithEmailAndPassword(auth, $("#email").val(), $("#userPass").val())
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
    
        // Get User From real Time DB and Make session storage
        get(child(ref(database), `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            if(!sessionStorage.getItem("user-info")){
              sessionStorage.setItem("user-info",JSON.stringify({
                userName: snapshot.val().username,
                email: snapshot.val().email,
                id:user.uid
              }));
            }

            window.location.href = "../index.html";
    
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
        console.log(user)
        console.log("logged in")
      })
      .catch((error) => {
        $('#logInAlert').removeClass('d-none').addClass('show').hide().fadeIn('slow');
        $("#email").focus();
      });
    })

})






