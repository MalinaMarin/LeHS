
const {whereTo} = require('../presenting_page/presenting_page.js');
function goToPage(){
    switch(whereTo){
        case 1:{
            location.href = "../Learn&Practice-pages/learn.html";
            break;
        }
        case 2:{
            location.href = "../Learn&Practice-pages/practice.html";
            break;
        }
        case 3:{
            location.href = "../Level Map/map.html";
            break;
        }
        case 4:{
            location.href = "../leaderboard/leaderboard.html";
            break;
        }
        default:{
            location.href = "../Level Map/map.html";
            break;
        }

    }
}