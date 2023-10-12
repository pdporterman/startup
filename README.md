# startup
elevator pitch:
So I want to make a choose your own adventure game for my project! The goal is to make it like clue where the objective is to solve a murder mystery (or some other who did it style case TBD). Ideally I have it so that the culprit can be one of 6 people to allow for replay ability. upon multiple play through the player can learn about the culprits and will be able to tell who did it.


key feat:
*notes page that can remain unchanged between games and logins.
*a count of actions taken to beat the game
*time limit that may be based on actions taken

tech: 
players will login and create an account 
the notes for each player and their lowest actions taken score will be saved in the data base 
and a leader board at the start menu with the lowest actions taken of all the players a notification will be sent to all players as soon as someone enters the leader board or if the player was on the leader board they will be notified that they have lost their place  

![image](https://github.com/pdporterman/startup/assets/144472299/75e72ba3-9ba2-4c05-878c-8aae4553a32b)


start up HTML: I created the three html pages, index is going to serve as the sign in page and will link you to the main page. the main page is going to have a table (with no values yet) that will have the high scores and a play button that links to the game page, the game page will have a text box to enter commands for your character and a text output and a exit button to go back to the main page (buttons are my links) added a place holder for text output on play and main

start up CSS: I created a style CSS file, I changed the buttons from the default HTML buttons using bootstrap which I think made some clean looking buttons, I have set the H1 tags to use times new roman to hopefully make the text stand out from the other text, I used bootstrap to create the score board which can sort by name and score, I have created an out put box tht after adding JavaSript too should be able to hold a running list of all the moves from the player and give them their next option 