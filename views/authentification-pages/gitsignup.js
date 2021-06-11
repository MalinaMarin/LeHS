function status(response)
{
    
    if(response.status===201)
    {
      console.log("status 201");
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
        //else
        //return Promise.reject(new Error("Unexpected error"));
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

async function gitsignup(e) {
    e.preventDefault();

    //var username = document.getElementById("username").value;
    //var password = document.getElementById("password").value;
    //console.log(username);
    //console.log(password);
    
   await fetch('http://localhost:5000/login/github',  {
     'mode': 'no-cors',
     // "method" : 'POST'
    })
    .then(status)
    .then((res) => res.json())
    .then((response) => {console.log(response);
        localStorage.setItem("user_id", response.user_data.id);
        localStorage.setItem("username", response.user_data.username);
        localStorage.setItem("user_xp", response.user_data.xp);
        localStorage.setItem("user_coins", response.user_data.coins);
        localStorage.setItem("user_level", response.user_data.current_level);
        localStorage.setItem("user_practice", response.user_data.practice_questions_solved);
        localStorage.setItem("access_token", response.access_token);

        goToPage();
    })
    .catch((err) => alert(err))

    }