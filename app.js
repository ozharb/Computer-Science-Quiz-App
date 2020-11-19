/**
 * Example store structure
 */
$(function() {
  const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'HTML is what type of language?',
        answers: [
          'Programming Language',
          'Scripting Language',
          'Markup Language',
          'Romance Language'
        ],
        correctAnswer: 'Markup Language'
      },
      {
        question: 'Which computer hardware device provides an interface for all other connected devices to communicate?',
        answers: [
          'Central Processing Unit',
          'Hard Disk Drive',
          'Random Access Memory',
          'Motherboard'
        ],
        correctAnswer: 'Motherboard'
      },
      {
        question: 'This mobile OS held the largest market share in 2012.',
        answers: [
          'Android',
          'iOS',
          'BlackBerry',
          'Symbian'
        ],
        correctAnswer: 'iOS'
      },
      {
        question: 'Which programming language shares its name with an island in Indonesia?',
        answers: [
          'Python',
          'Jakarta',
          'C',
          'Java'
        ],
        correctAnswer: 'Java'
      },
      {
        question: 'What language does Node.js use?',
        answers: [
          'JavaScript',
          'Java',
          'Java Source',
          'Joomla Source Code'
        ],
        correctAnswer: 'JavaScript'
      },
  
    ],
    quizStarted: false,
    questionNumber: 0,//increment this
    score: 0,
    incorrect: 0
  };
  
  function generateQuestion(){
    let question = store.questions[store.questionNumber];
    let array = []
  for (let i = 0; i< question.answers.length;i++){ 
  array.push(`<input type='radio' id='answer' name='answer' value='${question.answers[i]}'required><label for ='male'>${question.answers[i]}</label><br>`)
  }
  
  let html = `<form id='question'><h2>${question.question}</h2>${array.join(' ')}<button type='submit'>Submit</button></form>
  <div class=status>
  <hr>
  <h3>Stats:</h3>
  <p>Question: ${store.questionNumber+1} of 5</p><p>Current Score:</p><p>${store.score} correct</p><p>${store.incorrect} incorrect</p></div>`
  
   return html
  }
  
  /*
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
  function generateMainPage(){
   let html = `<form id='startQuiz'>
      <h2>Start Quiz</h2>
      <p>Here are five questions to test your CS knowledge.</p>
      <p>Don't Panic!</p>
      <button type="submit">Let's Go</button>
      </form>`
  
  return html
  
  }
  function correctTemplate(){
  
  
  let html = `<form id='scoreTemplate'>
      <h2>Correct!</h2>
      <p>Your score:</p>
      <p>${store.score}</p>
      <button type="submit">Continue</button>
      </form>`
     
  return html
  
  }
  
  function incorrectTemplate(){
    let question = store.questions[store.questionNumber]
  let html = `<form id='scoreTemplate'>
      <h2>Incorrect</h2>
      <p>Correct Answer:</p>
      <p>${question.correctAnswer}</p>
      <p>Your score:</p>
      <p>${store.score}</p>
      <button type="submit">Continue</button>
      </form>`
  return html
  }
  
  function finalResultsTemplate() {
    let html =''
    if (store.score > 2){
     html = `<form id='startAgain'>
      <h2>You know your stuff</h2>
      <p>Final score:</p>
      <p>${store.score} correct</p>
      <p>${store.incorrect} incorrect</p>
      <button type="submit">Start Again</button>
      </form>`
    } else {
      html = `<form id='startAgain'>
      <h2>Well, at least you finished.</h2>
      <p>Final score:</p>
      <p>${store.score} out of 5</p>
      <button type="submit">Start Again</button>
      </form>`
    }
      return html
  }
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  function render(){
  
  
    let html = ""
  
    if (store.questionNumber===5){
      html = finalResultsTemplate()
      
    } else if(store.quizStarted ===false){
  
      html = generateMainPage()
    } 
    else {
      html = generateQuestion()
    }
  
    $('main').html(html)
  
  }
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)
  
  
  function handleStartAgain(){
      $("main").on("submit", '#startAgain', function(){
        console.log("started again")
      })
       render()
  }
  
  function handleContinuesubmit(){
    
    $("main").on("submit", "#scoreTemplate", function(){
      
      store.questionNumber+=1  
      render()
    }) 
   
  }
  
  function checkAnswer(userAnswer){
  let question = store.questions[store.questionNumber]
    if (userAnswer == question.correctAnswer){
    return true;
    } else {
    return false;
    }
  }
  
  function handleAnswersubmit(){
    
    $("main").on("submit", "#question", function(){
  
    
    var radioValue = $("input[name='answer']:checked").val();
    
    if (checkAnswer(radioValue)==true){
     
      store.score +=1
      html = correctTemplate()
      } else {
      store.incorrect+=1
      html = incorrectTemplate()
    }
    $('main').html(html)
  
    })
    
  }
  
  function handleStartQuiz(){
  
    $("main").on("submit", "#startQuiz", function(){
      
     
      store.quizStarted=true;
      render()
    })
    
  }
  
  
    render();
    handleStartQuiz();
    handleAnswersubmit();
    handleContinuesubmit();
    handleStartAgain();
  })