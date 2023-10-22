var suspect = 0
var weapon = 0
var rooms = ["office","kitchen","garage","ballroom","library","main hall"]
var current = 5
var room = Math.floor(Math.random() * 5)+1;
var select = 0
var func = 0

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
    if (current == input - 1){
        document.getElementById("text_box").innerHTML +="<br>"+ ("You stay put")
    }
    else{
        document.getElementById("text_box").innerHTML +="<br>"+ ("You move to " + rooms[input-1])
        current = input-1
    }
    func = 0
    document.getElementById("moves").textContent = "1) Move 2) Question 3) Accuse"
}

function question(){

}

function search(){

}

function accuse(){

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
            document.getElementById("text_box").innerHTML +="<br>"+ ("You are in " + rooms[current] + ". Where do you want to go?")
            document.getElementById("moves").textContent = "1) office 2) kitchen 3) garage 4) ballroom 5) library 6) main hall"
            func = 1
        }
        else if (action == 2){
            if (current == 6)
                question()
            else {
                search()
            }
        }
        else if (action == 3){
            accuse()
        }
        else{
            document.getElementById("text_box").innerHTML +="<br>"+ ("You entered: " + action + " not a valid input");
        }
    }

function set_var(ID) {
    document.getElementById(ID).innerHTML +="<br>"+("oh no there is a dead guy");
    if (select === 1) {
        suspect = "Cambel"
        weapon = "knife"
        document.getElementById(ID).innerHTML +="<br>"+(select);
    } else if (select === 2) {
        suspect = "Johnny"
        weapon = "wrench"
        document.getElementById(ID).innerHTML +="<br>"+(select);
    } else if (select === 3) {
        suspect = "Sara"
        weapon = "candel stick"
        document.getElementById(ID).innerHTML +="<br>"+(select);
    } else if (select === 4) {
        suspect = "Kim"
        weapon = "piano wire"
        document.getElementById(ID).innerHTML +="<br>"+(select);
    } 
}