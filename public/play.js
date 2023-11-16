
var suspect = 0
var weapon = 0
var rooms = ["office","kitchen","garage","foyer","library","main hall"]
var current = 5
var room = Math.floor(Math.random() * 5)+1;
var select = 0
var func = 0
var count = 0
var clear_rooms = ["The office is a dimly lit room with leather-bound books, antique furniture, and a faint scent of old paper","The kitchen is The heart of the mansion, bathed in warm light, where the clinking of silverware and simmering pots mingles with the lingering aroma of a freshly cooked meal.","The garage is dusty and cluttered space, filled with tools and forgotten memories","The foyer has an elegant entrance and is adorned with a grand chandelier, intricate rugs, and an antique piano","The library a sanctuary of knowledge, beckons with dark, polished woodwork and the subtle scent of ancient books. Candlelight flickers on the leather-bound spines","The main hall is a grand, with towering ceilings and faded portraits"]

var players_best = 100
var best_score = 25

function select_suspect(){
    select = Math.floor(Math.random() * 4) + 1;
}

function read_input(){
    input = document.getElementById("action").value;
    document.getElementById("action").value = ""
    return input
}

function move(){ // func 1
    input = read_input()
    if (input < 1 || input > 6){
        document.getElementById("text_box").innerHTML +="<br>"+ ("not a room")
    }
    else if (current == input - 1){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You stay put")
        count-- 
    }
    else{
        document.getElementById("text_box").innerHTML +="<br>"+ ("You move to " + rooms[input-1])
        current = input-1
    }
    func = 0
    if (current == 5){
        document.getElementById("moves").textContent = "1) Move 2) Question 3) Accuse"
    }
    else {
        document.getElementById("moves").textContent = "1) Move 2) Search 3) Accuse"
    }
}

function question(){
    input = read_input()
    if (input < 1 || input > 4){
        document.getElementById("text_box").innerHTML +="<br>"+ ("not a person please enter 1-4")
    }
    else if (input == 1){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You talk to Cambell the chef, he tells you he came from the kitchen")
    }
    else if (input == 2){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You talk to Johnny the mechanic,he tells you he came from the garage")
    }
    else if (input == 3){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You talk to Sara the pianist, she tells you he came from the ballroom")
    }
    else if (input == 4){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You talk to Kim the author, she tells you he came from the library")
    }
    func = 0
    if (current == 5){
        document.getElementById("moves").textContent = "1) Move 2) Question 3) Accuse"
    }
    else {
        document.getElementById("moves").textContent = "1) Move 2) Search 3) Accuse"
    }
}

function search(){
    if (current == room){
        document.getElementById("text_box").innerHTML +="<br>"+ (clear_rooms[current]);
        document.getElementById("text_box").innerHTML +="<br>"+ ("but you find an out of place "+ weapon);
    }
    else {
        document.getElementById("text_box").innerHTML +="<br>"+ (clear_rooms[current]);
    }
    func = 0;
}

async function high_score(){
    if (count < best_score){
        best_score = count
        alert('you have the top score!')
    }
    else if (count == best_score){
        alert('you tied for the best score')
    }
    else if (count == players_best){
        players_best = count
        alert("you set a new personal best!")
    }

    await post_score(count)

}

async function post_score(score) {
    await fetch('/api/score', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({score:score}),
        }).catch(err=>{console.log(err, score);});
    // Store what the service gave us as the high scores
}

async function accuse(){
    input = read_input()
    func = 5
    if (input < 1 || input > 4){
        document.getElementById("text_box").innerHTML +="<br>"+ ("not a person please enter 1-4")
        func = 3
        document.getElementById("text_box").innerHTML +="<br>"+ (`who do you want to accuse?`);
    }
    else if (input == select){
        document.getElementById("moves").textContent = "YOU WIN! with " + count + " moves"
        await high_score();
        
    }
    else {
        document.getElementById("moves").textContent = "YOU LOSE"
    }
}

function searchText(elm) {
    console.log(event);
    if(event.key === 'Enter') {
        which_function();
    }
}

function which_function(){
    if (func == 0){
        get_action()
    }
    else if (func == 1){
        move()
    }
    else if (func == 2){
        question()
    }
    else if (func == 3){
        accuse()
    }
    else if (func == 4){
        search()
    }
}

function get_action() {//func0
    action = read_input()
    if (action == 1){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You are in " + rooms[current] + ". Where do you want to go?") + "<br>"
        document.getElementById("moves").textContent = "1) office 2) kitchen 3) garage 4) foyer 5) library 6) main hall"
        func = 1
        count++
    }
    else if (action == 2){
        if (current == 5){
        document.getElementById("text_box").innerHTML +="<br>"+ ("who do you want to question?")
        document.getElementById("moves").textContent = "1) Cambell 2) Johnny 3) Sara 4) Kim"
        func = 2
        count++
        }
        else {
            count++
            search()
        }
    }
    else if (action == 3){
        document.getElementById("text_box").innerHTML +="<br>"+ ("who do you want to accuse?")
        document.getElementById("moves").textContent = "1) Cambell 2) Johnny 3) Sara 4) Kim"
        func = 3
        count++
    }
    else{
        document.getElementById("text_box").innerHTML +="<br>"+ ("You entered: " + action + " not a valid input");
    }
}

function set_var(ID) {
    document.getElementById(ID).innerHTML +="<br>"+ localStorage.getItem('user') + (", Step into the shoes of a seasoned detective as you investigate a chilling murder case involving a wealthy philanthropist. The prime suspects? The enigmatic and estranged children of the victim.  Can you unravel the web of deceit and uncover the truth in this high-stakes family feud?");
    if (select === 1) {
        suspect = "Cambell"
        weapon = "knife"
    } else if (select === 2) {
        suspect = "Johnny"
        weapon = "wrench"
    } else if (select === 3) {
        suspect = "Sara"
        weapon = "piano wire"
    } else if (select === 4) {
        suspect = "Kim"
        weapon = "candel stick"
    } 
}
