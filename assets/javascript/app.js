// 
// Trivia Game
//

$(document).ready(function() {

  // Audio variables
  var audioElem = $('.audio');
    console.log(audioElem);
  var audio = new Audio('assets/audio/StevieWonder_BlackMan.mp3');
  audio.volume = 0.4;
  audio.loop = true;
  audio.mute = true; 

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

  // shortens game by not using all 25 questions
  var questionsLimit = 10; 

  var answeredCorrectly;
  var answeredIncorrectly;
  var unAnswered;


  var triviaGame = {
    questions: { 
      question1: {
        question: 'Who was the first man to die for the American flag? Crispus Attucks', 
        options: ['Paul Revere', 'Crispus Attucks', 'Benjamin Franklin', 'Amerigo Vespucci'], 
        answer: 'Crispus Attucks', 
        answerImg: '../images/crispus_attucks.jpg'
      }, 
      question2: {
        question: 'Who were the first people on the ground in America? Native Americans', 
        options: ['Vikings', 'Spanish', 'Native Americans', 'English'], 
        answer: 'Native Americans', 
        answerImg: '../images/native_americans.jpg'
      }, 
      question3: {
        question: 'Who was the guide on the first Columbus trip? Pedro Alonso Niño', 
        options: ['Cristobal Colon', 'Juan de la Cosa', 'Diego de Arana', 'Pedro Alonso Niño'], 
        answer: 'Pedro Alonso Niño', 
        answerImg: '../images/pedro_alonso_nino.jpg'
      }, 
      question4: {
        question: 'Who laid the first railroad tracks connecting the United States? Chinese workers', 
        options: ['Italian workers', 'French workers', 'Canadian workers', 'Chinese workers'], 
        answer: 'Chinese workers', 
        answerImg: '../images/chinese_workers.png'
      }, 
      question5: {
        question: 'Who was the first heart surgeon? Dr. Daniel Hale Williams', 
        options: ['Dr. Daniel Hale Williams', 'Dr. Strangelove', 'Dr. Peter Leavitt', 'Dr. Benjamin Spock'], 
        answer: 'Dr. Daniel Hale Williams', 
        answerImg: '../images/daniel_hale_williams.jpg'
      }, 
      question6: {
        question: 'Who showed the pilgrims at Plymouth the secrets of survival in the New World? Squanto', 
        options: ['John Horse', 'Squanto', 'Anakin', 'Sitting Bull'], 
        answer: 'Squanto', 
        answerImg: '../images/squanto.png'
      }, 
      question7: {
        question: 'Who was a California leader fighting for farm workers\' dignity, respect, and rights? Cesar Chavez', 
        options: ['Octaviano Larrazolo', 'Junipero Serra', 'Cesar Chavez', 'José Martí'], 
        answer: 'Cesar Chavez', 
        answerImg: '../images/cesar_chavez.jpg'
      }, 
      question8: {
        question: 'Who was the inventor of incandescent light bulb? Thomas Edison', 
        options: ['Eli Whitney', 'Thomas Edison', 'Ralph Waldo Emerson', 'Charles Goodyear'], 
        answer: 'Thomas Edison', 
        answerImg: '../images/thomas_edison.jpg'
      }, 
      question8: {
        question: 'Who helped design the nation\'s capitol, created the first clock in America, and wrote almanacs? Benjamin Banneker', 
        options: ['Benjamin Banneker', 'Nicolas Norton', 'Jared James', 'Raymond Reed'], 
        answer: 'Benjamin Banneker', 
        answerImg: '../images/benjamin_banneker.png'
      }, 
      question10: {
        question: 'Who was the heroine that helped scout the Lewis and Clark expedition? Sacagawea', 
        options: ['Black Hawk', 'Crazy Horse', 'Sacagawea', 'Cochise',], 
        answer: 'Sacagawea', 
        answerImg: '../images/sacagawea.jpg'
      }, 
      question11: {
        question: 'Who was a pioneer of martial arts in America? Bruce Lee', 
        options: ['Joe Lewis', 'Jet Li', 'Chuck Norris', 'Bruce Lee'], 
        answer: 'Bruce Lee', 
        answerImg: '../images/bruce_lee.jpg'
      }, 
      question12: {
        question: 'Who signed the Emancipation Proclamation, freeing more than 3 million U.S. slaves? Abraham Lincoln', 
        options: ['James Garfield', 'Abraham Lincoln', 'William McKinley', 'Andrew Jackson'], 
        answer: 'Abraham Lincoln', 
        answerImg: '../images/abraham_lincoln.jpg'
      }, 
      question13: {
        question: 'Who was once widely recognized as first man to set foot on the North Pole? Matthew Henson', 
        options: ['William Edward Parry', 'Hjalmar Johansen', 'Matthew Henson', 'Richard Byrd'], 
        answer: 'Matthew Henson', 
        answerImg: '../images/matthew_henson.jpg'
      }, 
      question14: {
        question: 'Who was a soldier of Company G who won high honors in World War I? Sing Lee', 
        options: ['Sing Lee', 'Raoul Wallenberg', 'Oskar Schindler', 'Douglas Bader'], 
        answer: 'Sing Lee', 
        answerImg: '../images/sing_lee_company_g.jpg'
      }, 
      question15: {
        question: 'Who created processes for storage of blood plasma and was the director of the Red Cross blood bank? Dr. Charles Drew', 
        options: ['Dr. Ian Frazer', 'Dr. Carl Jung', 'Dr. René Laennec', 'Dr. Charles Drew'], 
        answer: 'Dr. Charles Drew', 
        answerImg: '../images/charles_drew.jpg'
      }, 
      question16: {
        question: 'Who was a famous educator and semanticist who made contributions to education in America? Hayakawa', 
        options: ['Daniel Inouye', 'Mako Iwamatsu', 'Saburo Muraoka', 'Hayakawa'], 
        answer: 'Hayakawa', 
        answerImg: '../images/hayakawa.jpg'
      }, 
      question17: {
        question: 'Who invented the world\'s first stop light and gas mask? Garrett Morgan', 
        options: ['Fritz Haber', 'Garrett Morgan', 'Robert Oppenheimer', 'Jacques Cousteau'], 
        answer: 'Garrett Morgan', 
        answerImg: '../images/garrett_morgan.gif'
      }, 
      question18: {
        question: 'Who was a surgeon that pioneered neurosurgery? Harvey William Cushing', 
        options: ['Harvey William Cushing', 'Joseph Lister', 'Thomas Starzl', 'Christiaan Barnard'], 
        answer: 'Harvey William Cushing', 
        answerImg: '../images/harvey_williams_cushing.jpg'
      }, 
      question19: {
        question: 'Who was the hero that helped establish the league of Iroquois? Hiawatha', 
        options: ['Hiawatha', 'Chief Joseph', 'Black Elk', 'Chief Seattle'], 
        answer: 'Hiawatha', 
        answerImg: '../images/hiawatha.jpg'
      }, 
      question20: {
        question: 'Who was the leader of the first macrobiotic center in America? Michio Kushi', 
        options: ['Vera Richter', 'Frances Moore Lappé', 'Michio Kushi', 'Robert Atkins'], 
        answer: 'Michio Kushi', 
        answerImg: '../images/michio-kushi.jpg'
      }, 
      question21: {
        question: 'Who founded of the city of Chicago in 1772? Jean Baptiste', 
        options: ['Viceroy Bucareli', 'Sam Houston', 'Jean Baptiste', 'William Sherman'], 
        answer: 'Jean Baptiste', 
        answerImg: '../images/jean_baptiste_point_du_sable.jpg'
      }, 
      question22: {
        question: 'Who was one of the organizers of the American Indian Movement? Dennis Banks', 
        options: ['Dennis Banks', 'Huey P. Newton', 'Felix Longoria', 'Angela Davis'], 
        answer: 'Dennis Banks', 
        answerImg: '../images/dennis_banks.jpg'
      }, 
      question23: {
        question: 'Who was the Jewish financier who raised funds to sponsor Christopher Columbus\' voyage to America? Luis de Santángel', 
        options: ['Leif Eriksson', 'Luis de Santángel', 'Ferdinand Magellan', 'Ibn Battuta'], 
        answer: 'Luis de Santángel', 
        answerImg: '../images/luis_de_santangel.jpg'
      }, 
      question24: {
        question: 'Who lead slaves to freedom on the Underground Railroad? Harriet Tubman', 
        options: ['Solomon Northup', 'Thomas Jefferson', 'Harriet Tubman', 'Sojourner Truth'], 
        answer: 'Harriet Tubman', 
        answerImg: '../images/harriet_ross_tubman.png'
      }, 
      question25: {
        question: 'Who is known as the inventor of the fire extinguisher but actually invented the firefighting standpipe? T.J. Marshall', 
        options: ['T.J. Marshall', 'Tom Westman', 'Dan White', 'Jan Van der Heyden'], 
        answer: 'T.J. Marshall', 
        answerImg: '../images/tjmarshall_standpipe.jpg'
      } 
    },
    initialize: function() {
      console.log(triviaGame);
    }
  };

  // triviaGame.initialize();

});