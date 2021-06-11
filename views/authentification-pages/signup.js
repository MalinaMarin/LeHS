function status(response)
{
    
    if(response.status===201)
    {
      console.log("sunt aici la 201");
        return Promise.resolve(response);
        
    }
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

async function register(e) {
    e.preventDefault();
   
    //e.preventDefault();
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
 
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
    .then((res) => res.json())
    .then((response) => {console.log(response);
        localStorage.setItem("user_id", response.id);
        localStorage.setItem("username", response.username);
        localStorage.setItem("user_xp", response.xp);
        localStorage.setItem("user_coins", response.coins);
        localStorage.setItem("user_level", response.current_level);
        localStorage.setItem("user_practice", response.practice_questions_solved);
        goToPage();
    })
    .catch((err) => alert(err))

    }
