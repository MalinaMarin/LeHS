// function getNextSequenceValue(sequenceName){
//    var sequenceDocument = db.counters.findAndModify({
//       query:{_id: sequenceName },
//       update: {$inc:{sequence_value:1}},
//       new:true
//    });
//    return sequenceDocument.sequence_value;
// }

// DO NOT RUN THIS SCRIPT
// used to insert practice questions and levels

const {PracticeQuestion} = require("./models/practice_questions.js");
const {Level} = require("./models/levels.js");

require('./helpers/init_mongodb')

let level1 = new Level({
   id: 1,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/1.json",
   xp: 10,
   hint_cost: 30,
   solved_counter: 0
});

level1.save();

let level2 = new Level({
   id: 2,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/2.json",
   xp: 20,
   hint_cost: 30,
   solved_counter: 0
});

level2.save();

let level3 = new Level({
   id: 3,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/3.json",
   xp: 30,
   hint_cost: 40,
   solved_counter: 0
});

level3.save();

let level4 = new Level({
   id: 4,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/4.json",
   xp: 40,
   hint_cost: 50,
   solved_counter: 0
});

level4.save();

let level5 = new Level({
   id: 5,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/5.json",
   xp: 50,
   hint_cost: 50,
   solved_counter: 0
});

level5.save();

let level6 = new Level({
   id: 6,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/6.json",
   xp: 60,
   hint_cost: 50,
   solved_counter: 0
});

level6.save();

let level7 = new Level({
   id: 7,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/7.json",
   xp: 70,
   hint_cost: 50,
   solved_counter: 0
});

level7.save();

let level8 = new Level({
   id: 8,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/8.json",
   xp: 80,
   hint_cost: 50,
   solved_counter: 0
});

level8.save();

let level9 = new Level({
   id: 9,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/9.json",
   xp: 90,
   hint_cost: 60,
   solved_counter: 0
});

level9.save();

let level10 = new Level({
   id: 10,
   level_source: "/Users/Raluca/Desktop/LeHS/source/play/10.json",
   xp: 100,
   hint_cost: 70,
   solved_counter: 0
});

level10.save();

// let question1 = new PracticeQuestion({
//    id: 1,
//    question_source: "../source/practice/1.json",
//    coins: 10,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question2 = new PracticeQuestion({
//    id: 2,
//    question_source: "../source/practice/2.json",
//    coins: 15,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question3 = new PracticeQuestion({
//    id: 3,
//    question_source: "../source/practice/3.json",
//    coins: 10,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question4 = new PracticeQuestion({
//    id: 4,
//    question_source: "../source/practice/4.json",
//    coins: 10,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question5 = new PracticeQuestion({
//    id: 5,
//    question_source: "../source/practice/5.json",
//    coins: 15,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question6 = new PracticeQuestion({
//    id: 6,
//    question_source: "../source/practice/6.json",
//    coins: 15,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question7 = new PracticeQuestion({
//    id: 7,
//    question_source: "../source/practice/7.json",
//    coins: 15,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question8 = new PracticeQuestion({
//    id: 8,
//    question_source: "../source/practice/8.json",
//    coins: 15,
//    difficulty: "BEGINNER",
//    solved_counter: 0
// });
// let question9 = new PracticeQuestion({
//    id: 9,
//    question_source: "../source/practice/9.json",
//    coins: 20,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question10 = new PracticeQuestion({
//    id: 10,
//    question_source: "../source/practice/10.json",
//    coins: 20,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question11 = new PracticeQuestion({
//    id: 11,
//    question_source: "../source/practice/11.json",
//    coins: 20,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question12 = new PracticeQuestion({
//    id: 12,
//    question_source: "../source/practice/12.json",
//    coins: 24,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question13 = new PracticeQuestion({
//    id: 13,
//    question_source: "../source/practice/13.json",
//    coins: 24,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question14 = new PracticeQuestion({
//    id: 14,
//    question_source: "../source/practice/14.json",
//    coins: 30,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question15 = new PracticeQuestion({
//    id: 15,
//    question_source: "../source/practice/15.json",
//    coins: 20,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question16 = new PracticeQuestion({
//    id: 16,
//    question_source: "../source/practice/16.json",
//    coins: 30,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question17 = new PracticeQuestion({
//    id: 17,
//    question_source: "../source/practice/17.json",
//    coins: 24,
//    difficulty: "INTERMEDIATE",
//    solved_counter: 0
// });
// let question18 = new PracticeQuestion({
//    id: 18,
//    question_source: "../source/practice/18.json",
//    coins: 35,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });
// let question19 = new PracticeQuestion({
//    id: 19,
//    question_source: "../source/practice/19.json",
//    coins: 30,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });
// let question20 = new PracticeQuestion({
//    id: 20,
//    question_source: "../source/practice/20.json",
//    coins: 40,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });
// let question21 = new PracticeQuestion({
//    id: 21,
//    question_source: "../source/practice/21.json",
//    coins: 45,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });
// let question22 = new PracticeQuestion({
//    id: 22,
//    question_source: "../source/practice/22.json",
//    coins: 35,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });
// let question23 = new PracticeQuestion({
//    id: 23,
//    question_source: "../source/practice/23.json",
//    coins: 35,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });
// let question24 = new PracticeQuestion({
//    id: 24,
//    question_source: "../source/practice/24.json",
//    coins: 45,
//    difficulty: "EXPERT",
//    solved_counter: 0
// });

// question1.save();
// question2.save();
// question3.save();
// question4.save();
// question5.save();
// question6.save();
// question7.save();
// question8.save();
// question9.save();
// question10.save();
// question11.save();
// question12.save();
// question13.save();
// question14.save();
// question15.save();
// question16.save();
// question17.save();
// question18.save();
// question19.save();
// question20.save();
// question21.save();
// question22.save();
// question23.save();
// question24.save();