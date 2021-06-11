# LeHS
LeHS Api Documentation

1. POST http://localhost:5000/register - creates a new user account and the response is an user including his details(userid, user's experience, user's coins, user's current level and the number of solved practice questions);
-example for request body: {"email": "maria@gmail.com","username": "maria123","password": "a72b5","confirmPassword" : "a72b5"}.

2. POST 'http://localhost:4000/login/github' - creates a new user account using the GitHub account and the response is the user's account details including userid, user's experience, user's coins, user's current level and the number of solved practice questions and an access toke.

3. POST http://localhost:5000/loginn - connects the user to the server and the response is the user's account details including userid, user's experience, user's coins, user's current level and the number of solved practice questions and an access toke.
-example for requested body: {"username" : "maria123","password": "a72b5"}

4. GET http://localhost:5000/get/level?id= - gets data for the level
@RequestParameter : level

5. POST http://localhost:5000/play/submit - updates the user's experience and the user's level 
-example for request body : {"user_id":34, "level_id":1}

6. PUT http://localhost:5000/play/hint - verifies and updates the coins after using them for buying hints
-example for request body : {"user_id":34,"coins":70}

7. POST http://localhost:5000/practice/submit - checks if the answer is correct and updates the user's coins
-example for body request : {"user_id":23,"question_id":14,"answer_value":"C"}

8. GET http://localhost:5000/export/practice - exports in json format the questions and the levels with the correct answers from practice page

9. GET http://localhost:5000/export/play - exports json format the questions and the levels with the correct answers from practice page from play page