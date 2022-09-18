const musicsPath = "./musics/"

let mainBgm = new Audio(musicsPath + "mainbgm.mp3");
let transAudio = new Audio(musicsPath + "trans.mp3");
let lineAudio = new Audio(musicsPath + "brakeLine.mp3");
let putAudio = new Audio(musicsPath + "putMino.mp3");
let endBGM = new Audio(musicsPath + "end.mp3");
let pointBGM = new Audio(musicsPath + "point.mp3");

let startX,startY,nowX,nowY;
let dotSize = 5;

function stopAudio(){
    try{
    mainBgm.pause();
    transAudio.pause();
    lineAudio.pause();
    putAudio.pause();
    }
    catch{}
}

class Game{
    constructor(gameSpeed){
        this.score = 0;
        this.delLine = 0;
        this.init();
        this.gameSpeed = gameSpeed;
        this.flag = false;
    }

    init(){
        load();
        startX = startY = nowX = nowY = 0;
        

        this.word = new Word();
        this.field = new Field(FIELD_COL,FIELD_ROW,TETORO_SIZE,this);        
        this.mino = new TMino(Math.floor( Math.random() * TETORO_LENGTH ),Math.round(FIELD_COL/2)-1,0,TETORO_SIZE,LETTERS_PADDING); 
    
    }

    Gameloop(){
        document.onkeydown = (e) => {
            if(this.flag){
                return;
            }
            let keyCode = e.code;
            if(keyCode == "ArrowUp"){
                this.mino.rotate();
                if(this.mino.collision(this.field)){
                    this.mino.rotate();
                    this.mino.rotate();
                    this.mino.rotate();
                }
            }else if(keyCode == "Space"){
                this.mino.rotate();
                if(this.mino.collision(this.field)){
                    this.mino.rotate();
                    this.mino.rotate();
                    this.mino.rotate();
                }
            }
            if(keyCode == "ArrowLeft"){
                    this.mino.x--;
                    if(this.mino.collision(this.field)){
                        this.mino.x++;
                    }
            }
            if(keyCode == "ArrowDown"){
                    this.mino.y++;
                    if(this.mino.collision(this.field)){
                        this.mino.y--;
                    } 
            }
            if(keyCode == "ArrowRight"){
                    this.mino.x++;
                    if(this.mino.collision(this.field)){
                        this.mino.x--;
                    }
            }
            transAudio = new Audio(musicsPath +"trans.mp3");
            transAudio.play();
            can.height = FIELD_ROW * TETORO_SIZE;
            this.drawAll();
        }

        var el_hitarea = document.getElementById('hitarea');

        // 表示をアップデートする関数群


        // イベント設定

        el_hitarea.addEventListener('touchstart', (event) => {
            if(this.flag){
                return;
            }
            startX = event.changedTouches[0].pageX;
            startY = event.changedTouches[0].pageY;
        }, false);

        el_hitarea.addEventListener('touchend', (event) => {
            if(this.flag){
                return;
            }
            if(Math.abs(startX - event.changedTouches[0].pageX) <= dotSize && Math.abs(startY - event.changedTouches[0].pageY) <= dotSize){
                this.mino.rotate();
                if(this.mino.collision(this.field)){
                    this.mino.rotate();
                    this.mino.rotate();
                    this.mino.rotate();
                }
                can.height = FIELD_ROW * TETORO_SIZE;
                this.drawAll();
            }
            
        }, false);

        el_hitarea.addEventListener('touchmove', (event) => {
            if(this.flag){
                return;
            }
            event.preventDefault(); // タッチによる画面スクロールを止める
            nowX = event.changedTouches[0].pageX - startX;
            nowY = event.changedTouches[0].pageY - startY;

            if(nowX >= TETORO_SIZE){
                this.mino.x++;
                if(this.mino.collision(this.field)){
                    this.mino.x--;
                }
                startX = event.changedTouches[0].pageX;
                can.height = FIELD_ROW * TETORO_SIZE;
                this.drawAll();
            }
            else if(-nowX >= TETORO_SIZE){
                this.mino.x--;
                if(this.mino.collision(this.field)){
                    this.mino.x++;
                }
                startX = event.changedTouches[0].pageX;
                can.height = FIELD_ROW * TETORO_SIZE;
                this.drawAll();
            }
            if(nowY >= TETORO_SIZE){
                this.mino.y++;
                if(this.mino.collision(this.field)){
                    this.mino.y--;
                }

                startY = event.changedTouches[0].pageY;
                can.height = FIELD_ROW * TETORO_SIZE;
                this.drawAll();
            }
            
        }, false);



        mainBgm.loop = true;
        mainBgm.play();

        
        let note = document.getElementById("game-flag");
        note.innerText = "";

        
        setInterval(()=>{
            if(this.flag){
                return;
            }
            this.updateAll();
            this.mino.checkDeath(this.field);
            can.height = FIELD_ROW * TETORO_SIZE;
            this.drawAll();
            if(this.mino.flag){
                this.gameSpeed -= 1;

                putAudio.play();
                this.mino = new TMino(Math.floor( Math.random() * TETORO_LENGTH),Math.round(FIELD_COL/2)-1,0,TETORO_SIZE,LETTERS_PADDING,this);
                this.score += 100;
                
                this.drawAll();
            }
            if(this.flag){
                this.gameEnd();
            }
        },this.gameSpeed);
    }

    drawAll(){
        this.mino.draw();
        this.field.draw();
        this.word.draw();
    }

    updateAll(){
        this.mino.update(this.field);
        this.field.update();
        this.word.update(this.field,this);
        this.scoreUpdate();
    }

    start(){
        this.Gameloop();
    }

    scoreUpdate(){
        let scoreFrame = document.getElementById("scores");
        scoreFrame.innerText = "Your Score:" + this.score;
    }

    gameEnd(){
        stopAudio();
        if(this.flag == false){
            endBGM.loop = true;
            endBGM.play();
        }
        this.flag = true;

        ctx.font = "40px serif";
        ctx.fillText("GAME OVER...",0,TETORO_SIZE*FIELD_ROW/2);

        let note = document.getElementById("game-flag");
        note.innerText = "右:右矢印、左:左矢印、下:下矢印、回転：上矢印";
    }

    endBgm(){
        try{
            endBGM.pause();
        }catch{}
    }
}