class TMino{
    constructor(num,x,y,size,padding,game){
        [this.tiles,this.color,this.letters] = tNum(num);
        this.x = x;
        this.y = y;
        this.size = size;
        this.padding = padding; 
        this.flag = false;
        this.status = 0;
        this.checkGameEnd(game);
    }

    draw(){
        let img = getImg(this.color);
        for(let i=0;i<this.tiles.length;i++){
            for(let j=0;j<this.tiles.length;j++){
                if(this.tiles[i][j]){
                    ctx.drawImage(img,this.size*this.x+j*this.size,this.size*this.y+i*this.size,this.size,this.size);
                }
            }
        } 
        
        for(let i=0;i<this.letters.length;i++){
            for(let j=0;j<this.letters.length;j++){
                if(this.letters[i][j] != ""){
                    let letterimg = getImg(this.letters[i][j]);
                    ctx.drawImage(letterimg,this.size*this.x+j*this.size+this.padding,this.size*this.y+i*this.size+this.padding,this.size-this.padding*2,this.size-this.padding*2);    
                }
            }
        }
    }

    update(field){
        this.y++;
        if(this.collision(field)){
            this.y--;
        }
        this.checkDeath(field);
    }

    rotate(){
        let nTile = [];
        for(let i=0;i<this.tiles.length;i++){
            nTile[i] = [];
            for(let j=0;j<this.tiles.length;j++){
                nTile[i][j] = this.tiles[this.tiles.length-j-1][i];
            }
        }
        this.tiles = nTile;
        
        nTile = [];
        for(let i=0;i<this.letters.length;i++){
            nTile[i] = [];
            for(let j=0;j<this.letters.length;j++){
                nTile[i][j] = this.letters[this.letters.length-j-1][i];
            }
        }
        this.letters = nTile;
    }

    collision(field){
        for(let i=0;i<this.tiles.length;i++){
            for(let j=0;j<this.tiles[i].length;j++){
                if(this.tiles[i][j]){
                    if(0 > this.x+j || this.x+j >= field.field[i].length ){
                        return true;
                    }
                }
                try{
                    if(this.tiles[i][j] && field.field[this.y+i][this.x+j]){
                        return true;
                    }
                }catch(err){
                    return true;
                }
                
            }
        }
        return false;
    }

    checkDeath(field){
        for(let i=0;i<this.tiles.length;i++){
            for(let j=0;j<this.tiles[0].length;j++){
                if(this.tiles[i][j]){
                    if(this.y+i >= field.field.length-1){
                        if(this.status == 2){
                            this.death(field);
                        }    
                        this.status++;
                        return;
                    }
                }
                
                try{
                    if(this.tiles[i][j] && field.field[this.y+i+1][this.x+j] != 0){
                        if(this.status == 2){
                            this.death(field);
                        }
                        this.status++;
                        return;
                    }
                }catch(err){
                    
                }
                
                
            }
        }
    }

    death(field){
        field.addMino(this);
        
        this.flag = true;
    }

    checkGameEnd(game){
        try{
            for(let i=0;i<this.tiles.length;i++){
                for(let j=0;j<this.tiles[i].length;j++){
                    if(this.tiles[i][j] && game.field.field[this.y+i][this.x+j]){
                        game.gameEnd();
                    }
                }
            }
        }catch{
        }
    }
}


let tetoros = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,0,0,0],
        [1,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [1,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0]
    ]
];

let letters = [
    ["あ","か","さ","た","な","は","ま","や","ら","わ"],
    ["い","き","し","ち","に","ひ","み","del","り","del"],
    ["う","く","す","つ","ぬ","ふ","む","ゆ","る","を"],
    ["え","け","せ","て","ね","へ","め","del","れ","del"],
    ["お","こ","そ","と","の","ほ","も","よ","ろ","ん"]
];

let tColors = [
   "blue",
   "green",
   "light_blue",
   "orange",
   "purple",
   "red",
   "yellow"
]

function decideLetters(tiles){
    letterTile = [];
    for(let i=0;i<tiles.length;i++){
        for(let j=0;j<tiles[i].length;j++){
            if(tiles[i][j]){  
                let decidedLetter = "";
                while(decidedLetter == "del" || decidedLetter == ""){
                    let random = Math.floor(Math.random() * 50);
                    //when random value will be 49,the seed have to be [4][9].
                    decidedLetter = letters[Math.floor(random/10)][random%10];
                }
                letterTile.push(decidedLetter);    
            }else{
                letterTile.push("");
            }
        }
    }

    adjustTile = [[,,,],[,,,],[,,,],[,,,]];
    for(let i=0;i<tiles.length;i++){
        for(let j=0;j<tiles[0].length;j++){
            adjustTile[i][j] = letterTile[i*4+j];
        }
    }
    return adjustTile;
}

function getTInfo(seed,type){
    if(type == "tile"){
        return tetoros[seed];
    }
    else if(type == "color"){
        return tColors[seed];
    }
}


function tNum(num){
    num = Math.floor(Math.random * 10);
    if(num > 6){
        num = 6
    }
    
    return [getTInfo(num,"tile"),getTInfo(num,"color"),decideLetters(getTInfo(num,"tile"))];
}
