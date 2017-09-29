# Trivia Game

Week Three Homework Part 1: [Javascript Assignment 2](http://ucb.bootcampcontent.com/UCB-Coding-Bootcamp/09-11-2017-UCB-Class-Repository-FSF-FT/blob/master/03-week/homework/part-1/homework-instructions.md).

### No Prerequisites, Installation, or Testing Instructions required

## Misc Notes

* Among game enhancements beyond [demo game](http://ucb.bootcampcontent.com/UCB-Coding-Bootcamp/09-11-2017-UCB-Class-Repository-FSF-FT/raw/master/03-week/homework/part-1/advanced-trivia-demo.mov):
  * **Second "Short Game"** start button offers option with fewer questions and quicker game play (since full game play includes 25 trivia questions, which is a lot for testing and/or reviewing game).
  * **Randomized non-repeating question sequence**, so that questions do not appear in the same order as they are structured in the triviaGame object every time a new game is started.  Since there are so many questions to choose from, this variance keeps replays more fresh. (Short games select from full list of 25 questions.)
  * **Game over audio** reward for user (Stevie Wonder song that inspired this trivia game).  Play/pause toggle remains during further game play after user initiates audio. 
* First three variables in `assets/javascript/app.js` can be modified to control game behavior:
  * Max time for each question to be answered
  * "Short Game" option to set number of questions. 
  * Answer screen display time.
* Ghost in the machine:
  * Error thrown at different points in full game version.  Happens after differing numbers of questions and differing questions themselves.  Does not appear to be related to typo in data object or script because it runs so many times successfully.  Appears to be related to setTimeout and setInterval running asynchronously so many times. Unable to resolve issue.

      ```
      app.js:204 Uncaught TypeError: Cannot read property 'question' of undefined
        at Object.setQuestion (app.js:204)
        at nextStep (app.js:262)
      ```
* Nice to have but not developed:
  * Randomize order of four answer options for each question. Currently, they always appear in the same order every time game is played. 
* As always, feedback appreciated. 

## Author

* **David Morse** ([dbmarshall.github.io](https://dbmarshall.github.io))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

