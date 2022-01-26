# Coding-Quiz

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```
## Implementation

In order to acheive an organized quiz application I modularized my code by making each 
criteria a function which contains a function call to the next. In addition to this 
I also did not want to load another page for each question as that would be too 
extensive so I created and removed elements in the DOM where I needed to. For the overall
styling I decided to use the Bootstrap library.