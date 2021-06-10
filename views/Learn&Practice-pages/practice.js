const urll = "http://localhost:5000/all/practice"
let data;
async function getData() {
    await fetch(urll)
        .then((res) => res.json())
        .then((response) => { console.log(response); data = response; })
}
localStorage.setItem("user_id","131a593e-ada7-4f8e-94b9-39e48bd75ed0");
localStorage.setItem("user_coins",0);
// localStorage.setItem("practice_questions_answered")

async function populate() {
    "use strict";
    var load;
    await getData();
    load = function (url, question, answerA, answerB, answerC, answerD, coins) {

        var request;
        var q = document.getElementById(question);
        var aA = document.getElementById(answerA);
        var aB = document.getElementById(answerB);
        var aC = document.getElementById(answerC);
        var aD = document.getElementById(answerD);
        request = new XMLHttpRequest();


        request.addEventListener("readystatechange", function (event) {

            if (this.readyState == 4 && this.status == 200) {

                var json = JSON.parse(this.responseText);
                q.innerHTML = json.question + "<img class=\"coins-icon\" src=\"coins.svg\" alt=\"coins icon\"><span class=\"money\">" + coins + "</span>";
                aA.innerHTML = json.answers[0].A
                aB.innerHTML = json.answers[0].B
                aC.innerHTML = json.answers[0].C
                aD.innerHTML = json.answers[0].D
            }

        });

        request.open("GET", url);
        request.send(null);

    };
    for (var i = 0; i < data.length; i++)
        load("../../source/practice/"+(i+1)+".json", "question" + (i + 1), (i + 1) + "A", (i + 1) + "B", (i + 1) + "C", (i + 1) + "D", data[i].coins);

    // load("../../source/practice/1.json", "question1", "1A", "1B", "1C", "1D", data[0].coins);
    // load("../../source/practice/2.json", "question2", "2A", "2B", "2C", "2D", 15);
    // load("../../source/practice/3.json", "question3", "3A", "3B", "3C", "3D", 10);
    // load("../../source/practice/4.json", "question4", "4A", "4B", "4C", "4D", 10);
    // load("../../source/practice/5.json", "question5", "5A", "5B", "5C", "5D", 15);
    // load("../../source/practice/6.json", "question6", "6A", "6B", "6C", "6D", 15);
    // load("../../source/practice/7.json", "question7", "7A", "7B", "7C", "7D", 15);
    // load("../../source/practice/8.json", "question8", "8A", "8B", "8C", "8D", 15);
    // load("../../source/practice/9.json", "question9", "9A", "9B", "9C", "9D", 20);
    // load("../../source/practice/10.json", "question10", "10A", "10B", "10C", "10D", 20);
    // load("../../source/practice/11.json", "question11", "11A", "11B", "11C", "11D", 20);
    // load("../../source/practice/12.json", "question12", "12A", "12B", "12C", "12D", 24);
    // load("../../source/practice/13.json", "question13", "13A", "13B", "13C", "13D", 24);
    // load("../../source/practice/14.json", "question14", "14A", "14B", "14C", "14D", 30);
    // load("../../source/practice/15.json", "question15", "15A", "15B", "15C", "15D", 20);
    // load("../../source/practice/16.json", "question16", "16A", "16B", "16C", "16D", 30);
    // load("../../source/practice/17.json", "question17", "17A", "17B", "17C", "17D", 24);
    // load("../../source/practice/18.json", "question18", "18A", "18B", "18C", "18D", 35);
    // load("../../source/practice/19.json", "question19", "19A", "19B", "19C", "19D", 30);
    // load("../../source/practice/20.json", "question20", "20A", "20B", "20C", "20D", 40);
    // load("../../source/practice/21.json", "question21", "21A", "21B", "21C", "21D", 45);
    // load("../../source/practice/22.json", "question22", "22A", "22B", "22C", "22D", 35);
    // load("../../source/practice/23.json", "question23", "23A", "23B", "23C", "23D", 35);
    // load("../../source/practice/24.json", "question24", "24A", "24B", "24C", "24D", 45);
};

function getSelectedAnswer(name){
    let answers = document.getElementsByName(name);
    let selected_value;
    for(var i=0; i< answers.length; i++){
        if(answers[i].checked){
            selected_value=answers[i].value;
            return selected_value;
        }
    }
}


function status(response)
{
    if(response.status === 201){
        return Promise.resolve(response);
    }
    else if(response.status===200)
    {
        return Promise.reject(new Error ("Ooups..wrong answer! Try again"));
    }
    else if(response.status===204)
        {
            console.log(response);
            return Promise.reject(new Error ("Already answered this"));
        }
    else if(response.status===404)
        {
            console.log(response);
            return Promise.reject(new Error("Ooops... User not found!"));
        }
    else if (response.status===500)
        {
            console.log(response);
            return Promise.reject(new Error ("Error trying to parse the source"))
        }
}


async function submitAnswer( question_id, name){
let answer = getSelectedAnswer(name);
let user_id = localStorage.getItem("user_id");

await fetch("http://localhost:5000/practice/submit", {
    "method": "POST",
    "body" :JSON.stringify({
        "user_id":user_id,
        "question_id":question_id,
        "answer_value":answer
    })
})
.then(status)
.then((res) => res.json())
.then((response) => {
    localStorage.setItem("user_coins",response.coins)
    console.log(localStorage.getItem("user_coins"))
    alert("That's correct!")
})
.catch((err) => alert(err))

}
