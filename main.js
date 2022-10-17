let form = document.getElementById("form");

form.addEventListener('formdata', (e) => {
    var fd = e.formData;
    
    // データをセット
    fd.set('score', game.score);
});


const TETORO_SIZE = 28;
const LETTERS_PADDING = 5;
const FIELD_COL = 10;
const FIELD_ROW = 20;
const GAME_SPEEED = 450;
const TETORO_LENGTH = 7;

let firstFlag = true;

let can = document.getElementById("canvas");
can.width = FIELD_COL * TETORO_SIZE;
can.height = FIELD_ROW * TETORO_SIZE;
let ctx = can.getContext("2d");

button = document.getElementById("start-game");

let game = new Game(GAME_SPEEED);
button.onclick = () =>{
    if(firstFlag){
        game.start();
        firstFlag = false;
    }else{
        game.flag = true;
        game.endBgm();
        game = new Game(GAME_SPEEED);
        game.start();
    }

}