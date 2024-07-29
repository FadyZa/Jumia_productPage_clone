import { auth, createUserWithEmailAndPassword, database, ref, set } from "../firebaseConfig.js"


let nameRegex = new RegExp(/^[a-zA-Z]{3,}$/)
let emailRegex = new RegExp(/^[a-zA-Z0-9]{2,}@[a-z]{2,}(.)(com|net|org|edu)$/);
let passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}/);


// $("#signUpForm").on("submit",function(e){
//     e.preventDefault();
// })

$(document).ready(function(){ 

    validation();


$("#signUpForm").on("submit",function(e){
    e.preventDefault();

    console.log($("#email").val())
    console.log($("#userPass").val())

    createUserWithEmailAndPassword(auth, $("#email").val(), $("#userPass").val())
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const db = database;
         set(ref(db, 'users/' + user.uid), {
          username: $("#userName").val(),
          email: $("#email").val(),
        }).then(()=>{
            window.location.href = "../loginPage/login.html";
        });

        if(!sessionStorage.getItem("user-info")){
            sessionStorage.setItem("user-info",JSON.stringify({
            userName:$("#userName").val(),
            email: $("#email").val(),
            id:user.uid
            }));
        }

    }).catch((error) => {
        console.log("here")
        console.log(error)
        $('#alert').removeClass('d-none').addClass('show').hide().fadeIn('slow');
        
    })
})



})

// Validation
export function validation(){
    $("#userName").on("keyup",function(){
        if(!nameRegex.test($("#userName").val())){
            $("#userName").addClass("is-invalid");
            $("#userName").removeClass("is-valid");
            $("#submit").attr("disabled",true)
        }else{
            $("#userName").removeClass("is-invalid");
            $("#userName").addClass("is-valid");
            $("#submit").attr("disabled",false)
        }
    })

    $("#email").on("keyup",function(){
        if(!emailRegex.test($("#email").val())){
            $("#email").addClass("is-invalid");
            $("#email").removeClass("is-valid");
            $("#submit").attr("disabled",true)
        }else{
            $("#email").removeClass("is-invalid");
            $("#email").addClass("is-valid");
            $("#submit").attr("disabled",false)
        }
    }) 
    
    $("#userPass").on("keyup",function(){
        if(!passRegex.test($("#userPass").val())){
            $("#userPass").addClass("is-invalid");
            $("#userPass").removeClass("is-valid");
            $("#submit").attr("disabled",true)
        }else{
            $("#userPass").removeClass("is-invalid");
            $("#userPass").addClass("is-valid");
            $("#submit").attr("disabled",false)
        }
    }) 
}



// ///////////////////////////////////////////////////////////////////
