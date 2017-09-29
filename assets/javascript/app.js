// 
// Trivia Game
//

$(document).ready(function() {

  // First THREE values can be changed to control game behavior...  
  var seconds = 5; // max time for each question to be answered
  var shortGame = 5; // shortens game play by not using all 25 questions
  var answerTime = 5; // number of seconds #answer-wrapper displays
  var gameLength;
  var currentQuestion;
  var currentOptions;
  var currentAnswer;
  var currentImage;
  var intervalId;
  var outOfTime = false;
  var questionCount = 0;
  var answeredCorrectly = 0;
  var answeredIncorrectly = 0;
  var unAnswered = 0;

  // Audio variables
  var audioElem = $('.audio');
  var audio = new Audio('assets/audio/StevieWonder_BlackMan.mp3');
  audio.volume = 0.4;
  audio.loop = true;
  audio.mute = true; 

  var triviaGame = {
    questions: {
      q1: {
        question: 'Who was the first man to die for the American flag? Crispus Attucks', 
        options: ['Paul Revere', 'Crispus Attucks', 'Benjamin Franklin', 'Amerigo Vespucci'], 
        answer: 'Crispus Attucks', 
        answerImg: 'assets/images/crispus_attucks.jpg'
      }, 
      q2: {
        question: 'Who were the first people on the ground in America? Native Americans', 
        options: ['Vikings', 'Spanish', 'Native Americans', 'English'], 
        answer: 'Native Americans', 
        answerImg: 'assets/images/native_americans.jpg'
      }, 
      q3: {
        question: 'Who was the guide on the first Columbus trip? Pedro Alonso Niño', 
        options: ['Cristobal Colon', 'Juan de la Cosa', 'Diego de Arana', 'Pedro Alonso Niño'], 
        answer: 'Pedro Alonso Niño', 
        answerImg: 'assets/images/pedro_alonso_nino.jpg'
      }, 
      q4: {
        question: 'Who laid the first railroad tracks connecting the United States? Chinese workers', 
        options: ['Italian workers', 'French workers', 'Canadian workers', 'Chinese workers'], 
        answer: 'Chinese workers', 
        answerImg: 'assets/images/chinese_workers.png'
      }, 
      q5: {
        question: 'Who was the first heart surgeon? Dr. Daniel Hale Williams', 
        options: ['Dr. Daniel Hale Williams', 'Dr. Strangelove', 'Dr. Peter Leavitt', 'Dr. Benjamin Spock'], 
        answer: 'Dr. Daniel Hale Williams', 
        answerImg: 'assets/images/daniel_hale_williams.jpg'
      }, 
      q6: {
        question: 'Who showed the pilgrims at Plymouth the secrets of survival in the New World? Squanto', 
        options: ['John Horse', 'Squanto', 'Anakin', 'Sitting Bull'], 
        answer: 'Squanto', 
        answerImg: 'assets/images/squanto.png'
      }, 
      q7: {
        question: 'Who was a California leader fighting for farm workers\' dignity, respect, and labor rights? Cesar Chavez', 
        options: ['Octaviano Larrazolo', 'Junipero Serra', 'Cesar Chavez', 'José Martí'], 
        answer: 'Cesar Chavez', 
        answerImg: 'assets/images/cesar_chavez.jpg'
      }, 
      q8: {
        question: 'Who was the inventor of incandescent light bulb? Thomas Edison', 
        options: ['Eli Whitney', 'Thomas Edison', 'Ralph Waldo Emerson', 'Charles Goodyear'], 
        answer: 'Thomas Edison', 
        answerImg: 'assets/images/thomas_edison.jpg'
      }, 
      q9: {
        question: 'Who helped design the nation\'s capitol, created the first clock in America, and wrote almanacs? Benjamin Banneker', 
        options: ['Benjamin Banneker', 'Nicolas Norton', 'Jared James', 'Raymond Reed'], 
        answer: 'Benjamin Banneker', 
        answerImg: 'assets/images/benjamin_banneker.png'
      }, 
      q10: {
        question: 'Who was the heroine that helped scout the Lewis and Clark expedition? Sacagawea', 
        options: ['Black Hawk', 'Crazy Horse', 'Sacagawea', 'Cochise',], 
        answer: 'Sacagawea', 
        answerImg: 'assets/images/sacagawea.jpg'
      }, 
      q11: {
        question: 'Who was a primary pioneer of martial arts in America? Bruce Lee', 
        options: ['Joe Lewis', 'Jet Li', 'Chuck Norris', 'Bruce Lee'], 
        answer: 'Bruce Lee', 
        answerImg: 'assets/images/bruce_lee.jpg'
      }, 
      q12: {
        question: 'Who signed the Emancipation Proclamation, freeing more than 3 million U.S. slaves? Abraham Lincoln', 
        options: ['James Garfield', 'Abraham Lincoln', 'William McKinley', 'Andrew Jackson'], 
        answer: 'Abraham Lincoln', 
        answerImg: 'assets/images/abraham_lincoln.jpg'
      }, 
      q13: {
        question: 'Who was once widely recognized as first man to set foot on the North Pole? Matthew Henson', 
        options: ['William Edward Parry', 'Hjalmar Johansen', 'Matthew Henson', 'Richard Byrd'], 
        answer: 'Matthew Henson', 
        answerImg: 'assets/images/matthew_henson.jpg'
      }, 
      q14: {
        question: 'Who was a soldier of Company G and won high honors in World War I? Sing Lee', 
        options: ['Sing Lee', 'Raoul Wallenberg', 'Oskar Schindler', 'Douglas Bader'], 
        answer: 'Sing Lee', 
        answerImg: 'assets/images/sing_lee_company_g.jpg'
      }, 
      q15: {
        question: 'Who created processes for storage of blood plasma and was the director of the Red Cross blood bank? Dr. Charles Drew', 
        options: ['Dr. Ian Frazer', 'Dr. Carl Jung', 'Dr. René Laennec', 'Dr. Charles Drew'], 
        answer: 'Dr. Charles Drew', 
        answerImg: 'assets/images/charles_drew.jpg'
      }, 
      q16: {
        question: 'Who was a famous educator and semanticist who made contributions to education in America? Hayakawa', 
        options: ['Daniel Inouye', 'Mako Iwamatsu', 'Saburo Muraoka', 'Hayakawa'], 
        answer: 'Hayakawa', 
        answerImg: 'assets/images/hayakawa.jpg'
      }, 
      q17: {
        question: 'Who invented the world\'s first stop light and gas mask? Garrett Morgan', 
        options: ['Fritz Haber', 'Garrett Morgan', 'Robert Oppenheimer', 'Jacques Cousteau'], 
        answer: 'Garrett Morgan', 
        answerImg: 'assets/images/garrett_morgan.gif'
      }, 
      q18: {
        question: 'Who was a surgeon that pioneered neurosurgery? Harvey William Cushing', 
        options: ['Harvey William Cushing', 'Joseph Lister', 'Thomas Starzl', 'Christiaan Barnard'], 
        answer: 'Harvey William Cushing', 
        answerImg: 'assets/images/harvey_williams_cushing.jpg'
      }, 
      q19: {
        question: 'Who was the hero that helped establish the league of Iroquois? Hiawatha', 
        options: ['Hiawatha', 'Chief Joseph', 'Black Elk', 'Chief Seattle'], 
        answer: 'Hiawatha', 
        answerImg: 'assets/images/hiawatha.jpg'
      }, 
      q20: {
        question: 'Who was the leader of the first macrobiotic center in America? Michio Kushi', 
        options: ['Vera Richter', 'Frances Moore Lappé', 'Michio Kushi', 'Robert Atkins'], 
        answer: 'Michio Kushi', 
        answerImg: 'assets/images/michio-kushi.jpg'
      }, 
      q21: {
        question: 'Who founded of the city of Chicago in 1772? Jean Baptiste', 
        options: ['Viceroy Bucareli', 'Sam Houston', 'Jean Baptiste', 'William Sherman'], 
        answer: 'Jean Baptiste', 
        answerImg: 'assets/images/jean_baptiste_point_du_sable.jpg'
      }, 
      q22: {
        question: 'Who was one of the organizers of the American Indian Movement? Dennis Banks', 
        options: ['Dennis Banks', 'Huey P. Newton', 'Felix Longoria', 'Angela Davis'], 
        answer: 'Dennis Banks', 
        answerImg: 'assets/images/dennis_banks.jpg'
      }, 
      q23: {
        question: 'Who was the Jewish financier who raised funds to sponsor Christopher Columbus\' voyage to America? Luis de Santángel', 
        options: ['Leif Eriksson', 'Luis de Santángel', 'Ferdinand Magellan', 'Ibn Battuta'], 
        answer: 'Luis de Santángel', 
        answerImg: 'assets/images/luis_de_santangel.jpg'
      }, 
      q24: {
        question: 'Who lead slaves to freedom on the Underground Railroad? Harriet Tubman', 
        options: ['Solomon Northup', 'Thomas Jefferson', 'Harriet Tubman', 'Sojourner Truth'], 
        answer: 'Harriet Tubman', 
        answerImg: 'assets/images/harriet_ross_tubman.png'
      }, 
      q25: {
        question: 'Who is known as the inventor of the fire extinguisher but actually invented the firefighting standpipe? T.J. Marshall', 
        options: ['T.J. Marshall', 'Tom Westman', 'Dan White', 'Jan Van der Heyden'], 
        answer: 'T.J. Marshall', 
        answerImg: 'assets/images/tjmarshall_standpipe.jpg'
      }
    },
    // initialize: function() {
    //   console.log(triviaGame);
    // },
    startGame: function(){
      $('#time-remaining').text(seconds);
      $('#game-start').hide();
      $('#game-over').hide();
      $('.sidebar').show();
      $('#game').show();
      triviaGame.setQuestion();
    },
    setQuestion: function(){
      questionCount++;
      outOfTime = false;
        //console.log(questionCount);
      $('#options-wrapper').empty();
        // console.log(questionCount);
      currentQuestion = triviaGame.questions['q' + questionCount].question;
        // console.log(currentQuestion);
      currentOptions = triviaGame.questions['q' + questionCount].options;
        // console.log(currentOptions);
      currentAnswer = triviaGame.questions['q' + questionCount].answer;
        // console.log('currentAnswer: ' + currentAnswer);
      currentImage = triviaGame.questions['q' + questionCount].answerImg;
        // console.log('currentImage: ' + currentImage);
      $('#question').text(currentQuestion);
      for (i = 0; i < currentOptions.length; i++) {
        var currentOption = triviaGame.questions['q' + questionCount].options[i];
          // console.log(currentOption);
        var buttonId = '#button' + (i + 1);
          // console.log(buttonId);
        var newButton = $('<button>').attr({
          id: buttonId,
          class: 'option-button',
          'data-option': currentOption
        }).text(currentOption);
        $('#options-wrapper').append(newButton);
      }
      run();
    },
    checkAnswer: function(chosenAnswer){
        // console.log('chosenAnswer: ' + chosenAnswer);
      if (chosenAnswer === currentAnswer) {
        triviaGame.rightAnswer();
      } else {
        triviaGame.wrongAnswer();
      }
    },
    rightAnswer: function(){
      $('#options-wrapper, #answer-text').empty();
        // console.log('you guessed right: ' + currentAnswer);
      var newResponse = $('<h4>').html('<span class="bold">Correct!</span>  The answer is <span id="answer-name" class="bold nowrap">' + currentAnswer + '</span>.');
      $('#answer-text').append(newResponse);
      var newImage = $('<img>').attr('src', currentImage);
      $('#answer-image').append(newImage);
      // $('#question-wrapper').hide();
      $('#answer-wrapper').show();
      triviaGame.nextStep();
    },
    wrongAnswer: function(){
      $('#options-wrapper, #answer-text').empty();
        // console.log('you guessed wrong: ' + currentAnswer);
      var newResponse = $('<h4>').html('<span class="bold">Sorry.</span>  The answer is <span id="answer-name" class="bold nowrap">' + currentAnswer + '</span>.');
      $('#answer-text').append(newResponse);
      var newImage = $('<img>').attr('src', currentImage);
      $('#answer-image').append(newImage);
      // $('#question-wrapper').hide();
      if (outOfTime) {
        var timeUpResponse = $('<h3>').html('<span class="bold">Out of Time!</span>');
      $('#answer-text').prepend(timeUpResponse);
      }
      $('#answer-wrapper').show();
      triviaGame.nextStep();
    },
    nextStep: function(){
        console.log('nextStep --> gameLength: ' + gameLength + ' / questionCount: ' + questionCount);
      $('#time-remaining').text(seconds);
    },
    endGame: function(){
      $('.sidebar').hide();
      $('#game').hide();
      $('#game-over').show();
    },
  };
  // triviaGame.startGame();

  // Timer functions
  function run() {
    intervalId = setInterval(decrement, 1000);
  }
  function decrement() {
    seconds--;
    $('#time-remaining').text(seconds);
    if (seconds === 0) {
      // console.log('Time Up!');
      stop();
      outOfTime = true;
      triviaGame.wrongAnswer(outOfTime);
    }
  }
  function stop() {
    clearInterval(intervalId);
  }

  // Click behaviors 
  $('.start').on('click', function() {
    // var gameLength = $(this).attr('class');
    //   console.log(gameLength);
    if ($(this).hasClass('short-game')) {
        // console.log('short game');
      gameLength = shortGame;
    } else {
        // console.log('full game');
      // gameLength = triviaGame.questions.length;
      gameLength = Object.keys(triviaGame.questions).length;
        // console.log('gameLength: ' + gameLength);
    }
    triviaGame.startGame();
  });
  $(document).on('click', '.option-button', function() {
      // console.log('option-button');
    var clickOption = $(this).attr('data-option');
      console.log(clickOption);
    stop();
    triviaGame.checkAnswer(clickOption);
  });

  // Controls background audio after and during new games
  function audioControl() {
    if (audio.mute === true) {
      audio.play();
      $('#audio-toggle').show();
      $('.audio').html('Pause Song &#9836;');
      audio.mute = false;
    } else  {
      audio.pause();
      $('.audio').html('Play Song &#9836;');
      audio.mute = true;
    }
  }
  $('.audio').on('click', function(){
    audioControl();
  });

});