
function status(response)
{
    
    if(response.status===201)
    {
      console.log("sunt aici la 201");
        return Promise.resolve(response);
        
    }
    // else if(response.status===204)
    //     {
    //         console.log(response);
    //         return Promise.reject(new Error ("Already answered this"));
    //     }
    else
     if(response.status===404)
        {
            console.log(response);
            return Promise.reject(new Error("Ooops."));
        }
    else
        if(response.status === 500){
            console.log(response);
            return Promise.reject(new Error ("ERROR.."))
        }
        else
        return Promise.reject(new Error("Unexpected error"));
}

function goToPage() {
  //console.log("i am here");
  //const {whereTo} = require('../presenting_page/presenting_page.js');
  var whereTo=3;//by default goes to map now, will redirect diferently in backend
  switch (whereTo) {
      case 1: {
          location.href = "../Learn&Practice-pages/learn.html";
          break;
      }
      case 2: {
          location.href = "../Learn&Practice-pages/practice.html";
          break;
      }
      case 3: {
          location.href = "../Level-Map/map.html";
          break;
      }
      case 4: {
          location.href = "../leaderboard/leaderboard.html";
          break;
      }
      default: {
          location.href = "../Level-Map/map.html";
          break;
      }

  }
}

async function register() {
    //e.preventDefault();
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
 
    // console.log( username );
    // console.log( email );
    // console.log(password );
    // console.log( confirmPassword );
   await fetch('http://localhost:5000/register', {
      "method" : 'POST',
      "body" : JSON.stringify({
        "email": email,
        "username": username,
        "password": password,
        "confirmPassword" : confirmPassword
      }),
    })
    .then(status)
    //.then((res) => {res.json();
    // })
    //.then((response) => {
       // localStorage.setItem("user_data",response.)
       // console.log(localStorage.getItem("user_coins"))
    //})

    .then((response) => {
      console.log(response.json());
     })

    //.catch((err) => alert(err))


    // if (!result.error) {
    //   console.log(result.message);
    //  // navigate('/');
    // } else {
    //   console.log(result.error);
    // }
  }

  // window.register = function () {
  //  // parent.innerHTML = html;
  //   const form = document.getElementById('signup_btn');
  //   form.addEventListener('submit', register);
  // };