// const BLOCK_SIZE = 30;
// const COLUMNS = 20;
// const ROW = 10;

// let can = document.getElementById("canvas");
// let ctx = can.getContext("2d");

// //length is 7 'n' size is 4x4
// let tetoros = [
//     [
//         [0,1,0,0],
//         [0,1,0,0],
//         [0,1,0,0],
//         [0,1,0,0]
//     ],
//     [
//         [0,0,0,0],
//         [1,1,1,0],
//         [0,0,1,0],
//         [0,0,0,0]
//     ],
//     [
//         [0,0,0,0],
//         [1,1,1,0],
//         [0,1,0,0],
//         [0,0,0,0]
//     ],
//     [
//         [0,0,1,0],
//         [0,1,1,0],
//         [0,1,0,0],
//         [0,0,0,0]
//     ],
//     [
//         [0,0,0,0],
//         [0,1,1,0],
//         [0,1,1,0],
//         [0,0,0,0]
//     ],
//     [
//         [0,0,0,0],
//         [0,1,0,0],
//         [0,1,0,0],
//         [0,1,1,0]
//     ],
//     [
//         [0,0,0,0],
//         [0,1,1,0],
//         [1,1,0,0],
//         [0,0,0,0]
//     ]
// ];


// let field = [
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
//     [1,1,1,1,1,1,1,1,1,1,1,1,1,1]
// ];


// can.height = BLOCK_SIZE*field.length;
// can.width = BLOCK_SIZE*field[0].length;

// //#this is a test;i'll draw the first tetoro
// function draw(){
//     let num = 5;

//     for(let i = 0;i< tetoros[num].length ; i++){
//         for(let j = 0;j < tetoros[num][0].length;j++){
//             if(tetoros[num][i][j] == 1){
//                 ctx.fillStyle = "red";
//                 ctx.fillRect(j*BLOCK_SIZE,i*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);  
//                 ctx.strokeStyle ="";
//                 ctx.strokeRect(j*BLOCK_SIZE,i*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
//             }
//         }
//     }
// }

// function drawField(){
//     for(let i=0;i<field.length;i++){
//         for(let j=0;j<field[0].length;j++){
//             if(field[i][j]){
//                 console.log(i,j);
//                 ctx.fillStyle = "red";
//                 ctx.fillRect(j*BLOCK_SIZE,i*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);  
//                 ctx.strokeStyle ="";
//                 ctx.strokeRect(j*BLOCK_SIZE,i*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
//             }
//         }
//     }
// }




// // ctx.fillStyle = "red";
// // ctx.fillRect(0,0,50,50);
// drawField();

document.onkeydown = (e) =>{
    switch(e.keyCode){
        case 37:
            console.log("left");
            break;
        case 38:
            console.log("up");
            break;
        case 39:
            console.log("right");ZZ
            break;
        case 40:
            console.log("down");
            break;
        case 32:
            console.log("space");
            break;
    }
}


class Game{

}

class Field{

}

class TetoroPiece{

}