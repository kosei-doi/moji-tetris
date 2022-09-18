const TETORO_SIZE = 30;
const LETTERS_PADDING = 2;

let can = document.getElementById("canvas");
can.height = 500;
can.width = 500;
let ctx = can.getContext("2d");

let tetoroInfo = [
[[
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
],"images/i.png"]
];


let img = new Image();

let tetoromino = new Image();

tetoromino.src = tetoroInfo[0][1];
img.src = "images/あ.png";

function draw(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(tetoroInfo[0][0][j][i]){
            ctx.drawImage(tetoromino,i*TETORO_SIZE,j*TETORO_SIZE,TETORO_SIZE,TETORO_SIZE);     
            }
        }
    }
}

tetoromino.onload = () => {
   draw()
}

img.onload = () =>{
    ctx.drawImage(img,0+LETTERS_PADDING,0+LETTERS_PADDING,TETORO_SIZE-LETTERS_PADDING*2,TETORO_SIZE-LETTERS_PADDING*2);   
}


