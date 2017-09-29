// 
// Trivia Game
//

$(document).ready(function() {

  // First THREE values can be changed to control game behavior...  
  var seconds = 20; // max time for each question to be answered
  var shortGame = 5; // shortens game play by not using all 25 questions
  var answerTime = 4; // number of seconds #answer-wrapper displays
  var gameLength;
  var gameLengthFull;
  var randNumArr = [];
  var currentQuestion;
  var currentOptions;
  var currentAnswer;
  var currentImage;
  var intervalId;
  var timeoutId;
  var secondsCountdown;
  var outOfTime;
  var questionCount;
  var correctAnswerTotal;
  var incorrectAnswerTotal;
  var unAnswerTotal;

  // Audio variables
  var audioElem = $('.audio');
  var audio = new Audio('assets/audio/StevieWonder_BlackMan.mp3');
  audio.volume = 1;
  audio.loop = true;
  audio.mute = true; 

  var triviaGame = {
    questions: {
      q1: {
        question: 'Who was the first man to die for the American flag?', 
        options: ['Paul Revere', 'Crispus Attucks', 'Benjamin Franklin', 'Amerigo Vespucci'], 
        answer: 'Crispus Attucks', 
        answerImg: 'assets/images/crispus_attucks.jpg'
      }, 
      q2: {
        question: 'Who were the first people on the ground in America?', 
        options: ['Vikings', 'Spanish', 'Native Americans', 'English'], 
        answer: 'Native Americans', 
        answerImg: 'assets/images/native_americans.jpg'
      }, 
      q3: {
        question: 'Who was the guide on the first Columbus trip?', 
        options: ['Cristobal Colon', 'Juan de la Cosa', 'Diego de Arana', 'Pedro Alonso Niño'], 
        answer: 'Pedro Alonso Niño', 
        answerImg: 'assets/images/pedro_alonso_nino.jpg'
      }, 
      q4: {
        question: 'Who laid the first railroad tracks connecting the United States?', 
        options: ['Italian workers', 'French workers', 'Canadian workers', 'Chinese workers'], 
        answer: 'Chinese workers', 
        answerImg: 'assets/images/chinese_workers.png'
      }, 
      q5: {
        question: 'Who was the first heart surgeon?', 
        options: ['Dr. Daniel Hale Williams', 'Dr. Strangelove', 'Dr. Peter Leavitt', 'Dr. Benjamin Spock'], 
        answer: 'Dr. Daniel Hale Williams', 
        answerImg: 'assets/images/daniel_hale_williams.jpg'
      }, 
      q6: {
        question: 'Who showed the pilgrims at Plymouth the secrets of survival in the New World?', 
        options: ['John Horse', 'Squanto', 'Anakin', 'Sitting Bull'], 
        answer: 'Squanto', 
        answerImg: 'assets/images/squanto.png'
      }, 
      q7: {
        question: 'Who was a California leader fighting for farm workers\' dignity, respect, and labor rights?', 
        options: ['Octaviano Larrazolo', 'Junipero Serra', 'Cesar Chavez', 'José Martí'], 
        answer: 'Cesar Chavez', 
        answerImg: 'assets/images/cesar_chavez.jpg'
      }, 
      q8: {
        question: 'Who was the inventor of incandescent light bulb?', 
        options: ['Eli Whitney', 'Thomas Edison', 'Ralph Waldo Emerson', 'Charles Goodyear'], 
        answer: 'Thomas Edison', 
        answerImg: 'assets/images/thomas_edison.jpg'
      }, 
      q9: {
        question: 'Who helped design the nation\'s capitol, created the first clock in America, and wrote almanacs?', 
        options: ['Benjamin Banneker', 'Nicolas Norton', 'Jared James', 'Raymond Reed'], 
        answer: 'Benjamin Banneker', 
        answerImg: 'assets/images/benjamin_banneker.png'
      }, 
      q10: {
        question: 'Who was the heroine that helped scout the Lewis and Clark expedition?', 
        options: ['Black Hawk', 'Crazy Horse', 'Sacagawea', 'Cochise',], 
        answer: 'Sacagawea', 
        answerImg: 'assets/images/sacagawea.jpg'
      }, 
      q11: {
        question: 'Who was a primary pioneer of martial arts in America?', 
        options: ['Joe Lewis', 'Jet Li', 'Chuck Norris', 'Bruce Lee'], 
        answer: 'Bruce Lee', 
        answerImg: 'assets/images/bruce_lee.jpg'
      }, 
      q12: {
        question: 'Who signed the Emancipation Proclamation, freeing more than 3 million U.S. slaves?', 
        options: ['James Garfield', 'Abraham Lincoln', 'William McKinley', 'Andrew Jackson'], 
        answer: 'Abraham Lincoln', 
        answerImg: 'assets/images/abraham_lincoln.jpg'
      }, 
      q13: {
        question: 'Who was once widely recognized as first man to set foot on the North Pole?', 
        options: ['William Edward Parry', 'Hjalmar Johansen', 'Matthew Henson', 'Richard Byrd'], 
        answer: 'Matthew Henson', 
        answerImg: 'assets/images/matthew_henson.jpg'
      }, 
      q14: {
        question: 'Who was a soldier of Company G and won high honors in World War I?', 
        options: ['Sing Lee', 'Raoul Wallenberg', 'Oskar Schindler', 'Douglas Bader'], 
        answer: 'Sing Lee', 
        answerImg: 'assets/images/sing_lee_company_g.jpg'
      }, 
      q15: {
        question: 'Who created processes for storage of blood plasma and was the director of the Red Cross blood bank?', 
        options: ['Dr. Ian Frazer', 'Dr. Carl Jung', 'Dr. René Laennec', 'Dr. Charles Drew'], 
        answer: 'Dr. Charles Drew', 
        answerImg: 'assets/images/charles_drew.jpg'
      }, 
      q16: {
        question: 'Who was a famous educator and semanticist who made contributions to education in America?', 
        options: ['Daniel Inouye', 'Mako Iwamatsu', 'Saburo Muraoka', 'Hayakawa'], 
        answer: 'Hayakawa', 
        answerImg: 'assets/images/hayakawa.jpg'
      }, 
      q17: {
        question: 'Who invented the world\'s first stop light and gas mask?', 
        options: ['Fritz Haber', 'Garrett Morgan', 'Robert Oppenheimer', 'Jacques Cousteau'], 
        answer: 'Garrett Morgan', 
        answerImg: 'assets/images/garrett_morgan.gif'
      }, 
      q18: {
        question: 'Who was a surgeon that pioneered neurosurgery?', 
        options: ['Harvey William Cushing', 'Joseph Lister', 'Thomas Starzl', 'Christiaan Barnard'], 
        answer: 'Harvey William Cushing', 
        answerImg: 'assets/images/harvey_williams_cushing.jpg'
      }, 
      q19: {
        question: 'Who was the hero that helped establish the league of Iroquois?', 
        options: ['Hiawatha', 'Chief Joseph', 'Black Elk', 'Chief Seattle'], 
        answer: 'Hiawatha', 
        answerImg: 'assets/images/hiawatha.jpg'
      }, 
      q20: {
        question: 'Who was the leader of the first macrobiotic center in America?', 
        options: ['Vera Richter', 'Frances Moore Lappé', 'Michio Kushi', 'Robert Atkins'], 
        answer: 'Michio Kushi', 
        answerImg: 'assets/images/michio-kushi.jpg'
      }, 
      q21: {
        question: 'Who founded of the city of Chicago in 1772?', 
        options: ['Viceroy Bucareli', 'Sam Houston', 'Jean Baptiste', 'William Sherman'], 
        answer: 'Jean Baptiste', 
        answerImg: 'assets/images/jean_baptiste_point_du_sable.jpg'
      }, 
      q22: {
        question: 'Who was one of the organizers of the American Indian Movement?', 
        options: ['Dennis Banks', 'Huey P. Newton', 'Felix Longoria', 'Angela Davis'], 
        answer: 'Dennis Banks', 
        answerImg: 'assets/images/dennis_banks.jpg'
      }, 
      q23: {
        question: 'Who was the Jewish financier who raised funds to sponsor Christopher Columbus\' voyage to America?', 
        options: ['Leif Eriksson', 'Luis de Santángel', 'Ferdinand Magellan', 'Ibn Battuta'], 
        answer: 'Luis de Santángel', 
        answerImg: 'assets/images/luis_de_santangel.jpg'
      }, 
      q24: {
        question: 'Who lead slaves to freedom on the Underground Railroad?', 
        options: ['Solomon Northup', 'Thomas Jefferson', 'Harriet Tubman', 'Sojourner Truth'], 
        answer: 'Harriet Tubman', 
        answerImg: 'assets/images/harriet_ross_tubman.png'
      }, 
      q25: {
        question: 'Who is known as the inventor of the fire extinguisher but actually invented the firefighting standpipe?', 
        options: ['T.J. Marshall', 'Tom Westman', 'Dan White', 'Jan Van der Heyden'], 
        answer: 'T.J. Marshall', 
        answerImg: 'assets/images/tjmarshall_standpipe.jpg'
      }
    },
    startGame: function(){  
      randNumGenerator();
      outOfTime = false;
      questionCount = 0;
      correctAnswerTotal = 0;
      incorrectAnswerTotal = 0;
      unAnswerTotal = 0;
      $('.time-remaining').text(seconds);
      $('#game-start').hide();
      $('#game-over').hide();
      $('.sidebar').show();
      $('#game').show();
      triviaGame.setQuestion();
    },
    setQuestion: function(){
        console.log(questionCount);
      outOfTime = false;
      $('#options-wrapper').empty();
      currentQuestion = triviaGame.questions['q' + randNumArr[questionCount]].question;
      currentOptions = triviaGame.questions['q' + randNumArr[questionCount]].options;
      currentAnswer = triviaGame.questions['q' + randNumArr[questionCount]].answer;
      currentImage = triviaGame.questions['q' + randNumArr[questionCount]].answerImg;
      $('#question').text(currentQuestion);
      for (i = 0; i < currentOptions.length; i++) {
        var currentOption = triviaGame.questions['q' + randNumArr[questionCount]].options[i];
        var buttonId = '#button' + (i + 1);
        var newButton = $('<button>').attr({
          id: buttonId,
          class: 'option-button',
          'data-option': currentOption
        }).text(currentOption);
        $('#options-wrapper').append(newButton);
      }
      questionCount++;
      run();
    },
    checkAnswer: function(chosenAnswer){
      if (chosenAnswer === currentAnswer) {
        triviaGame.correctAnswer();
      } else {
        triviaGame.incorrectAnswer();
      }
    },
    correctAnswer: function(){
      correctAnswerTotal++;
      $('#options-wrapper, #answer-text, #answer-image').empty();
      var newResponse = $('<h4>').html('<span class="bold">Correct!</span>  The answer is <span id="answer-name" class="bold nowrap">' + currentAnswer + '</span>.');
      $('#answer-text').append(newResponse);
      var newImage = $('<img>').attr('src', currentImage);
      $('#answer-image').append(newImage);
      $('#answer-wrapper').show();
      timeoutId = setTimeout(triviaGame.nextStep, 1000 * answerTime);
    },
    incorrectAnswer: function(){
      $('#options-wrapper, #answer-text, #answer-image').empty();
      if (outOfTime) {
        var timeUpResponse = $('<h3>').html('<span class="bold">Out of Time!</span>');
        $('#answer-text').prepend(timeUpResponse);
        unAnswerTotal++;
      } else {
        incorrectAnswerTotal++;
      }
      var newResponse = $('<h4>').html('<span class="bold">Sorry.</span>  The answer is <span id="answer-name" class="bold nowrap">' + currentAnswer + '</span>.');
      $('#answer-text').append(newResponse);
      var newImage = $('<img>').attr('src', currentImage);
      $('#answer-image').append(newImage);
      $('#answer-wrapper').show();
      timeoutId = setTimeout(triviaGame.nextStep, 1000 * answerTime);
    },
    nextStep: function(){
      clearTimeout(timeoutId);
        // console.log('nextStep --> gameLength: ' + gameLength + ' / questionCount: ' + questionCount + ' / randNumArr[questionCount]: ' + randNumArr[questionCount] + ' / correctAnswerTotal: ' + correctAnswerTotal + ' incorrectAnswerTotal: ' + incorrectAnswerTotal + ' unAnswerTotal: ' + unAnswerTotal);
      $('#answer-wrapper').hide();
      if (questionCount === gameLength) {
        triviaGame.endGame();
      } else {
        triviaGame.setQuestion();
      }
      $('.time-remaining').text(seconds);
    },
    endGame: function(){
      $('.sidebar').hide();
      $('#game').hide();
      $('#correct-answers').text(correctAnswerTotal);
      $('#incorrect-answers').text(incorrectAnswerTotal);
      $('#unanswer-answers').text(unAnswerTotal);
      $('#game-over').show();
    },
  };

  // Generate Random Non-Repeating Number within Object Length Range
  function randNumGenerator() {
    // define number array
    for (var i = 1; i <= gameLengthFull; i++) {
      randNumArr[i] = i; 
    }
      randNumArr.shift();
    // randomize array
    randNumArr.sort(function () {
      return Math.random() - 0.5;
    });
  }

  // Timer functions
  function run() {
    secondsCountdown = seconds; 
    intervalId = setInterval(decrement, 1000);
  }
  function decrement() {
    secondsCountdown--;
    $('.time-remaining').text(secondsCountdown);
    if (secondsCountdown === 0) {
      stop();
      outOfTime = true;
      triviaGame.incorrectAnswer(outOfTime);
    }
  }
  function stop() {
    clearInterval(intervalId);
  }

  // Sets time remaining figure in intro text on page
  $('.time-remaining').text(seconds);

  // Click behaviors 
  $('.start').on('click', function() {
    gameLengthFull = Object.keys(triviaGame.questions).length;
    if ($(this).hasClass('short-game')) {
      gameLength = shortGame;
    } else {
      gameLength = gameLengthFull;
    }
    triviaGame.startGame();
  });
  $(document).on('click', '.option-button', function() {
    var clickOption = $(this).attr('data-option');
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