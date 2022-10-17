class Field{
    constructor(col,row,size,game){
        this.col = col;
        this.row = row;
        this.size = size;
        this.field = [];
        this.num = [];
        this.status = 0;
        this.game = game;
        this.lettersField = [];

        this.makeField();
    }

    makeField(){
        for(let i=0;i<this.row;i++){
            this.field[i] = [0];
            for(let j=0;j<this.col;j++){
                this.field[i][j] = 0;
            }
        }
    }


    setNum(mino,i,j){
        this.num.push([mino.color,mino.letters[i][j],mino.padding]);
    }

    addMino(mino){
        for(let i=0;i<mino.tiles.length;i++){
            for(let j=0;j<mino.tiles[i].length;j++){
                if(mino.tiles[i][j]){
                    this.field[mino.y+i][mino.x+j] = this.num.length+1;
                    this.setNum(mino,i,j);
                }
            }
        }
    }

    draw(){ 
        for(let i=0;i<this.field.length;i++){
            for(let j=0;j<this.field[i].length;j++){
                for(let k=1;k<=this.num.length;k++){ 
                    if(this.field[i][j] == k){
                        let info = this.num[k-1];
                        let img = getImg(info[0]);
                        ctx.drawImage(img,this.size*j,this.size*i,this.size,this.size)
                        
                        
                        let limg = getImg(info[1]);
                        ctx.drawImage(limg,this.size*j+info[2],this.size*i+info[2],this.size-2*info[2],this.size-2*info[2]);
                        
                    } 
                }
            }
        }
    }

    checkLine(){
        try{
            for(let i=0;i<this.field.length;i++){
                for(let j=0;j<this.field[i].length;j++){
                    if(this.field[i][j]){
                        if(this.field[i].length == j+1){
                            return true;
                        }
                    }else{
                        i++;
                        j=-1;
                    }
                }
            }
            return false;
        }catch(err){
            return false;
        }
        
    }

 
    getDelLine(){
        let lines = [];
        try{
            for(let i=0;i<this.field.length;i++){
                for(let j=0;j<this.field[i].length;j++){
                    if(this.field[i][j]){
                        if(this.field[i].length == j+1){
                            lines.push(i);
                        }
                    }else{
                        i++;
                        j=-1;
                    }
                }
            }
            return lines;
        }catch(err){
            return lines;
        }
    }


    delLine(){
        let lines = this.getDelLine();
        let times = 0;
        while(lines.length){
            let line = lines[0];
            
            let part = [];
            part[0] = []
            for(let i=0;i<this.field[0].length;i++){
                part[0][i] = 0;
            }

            for(let i=0;i<this.field.length;i++){
                if(line > i){
                    part.push(this.field[i]);
                }
            }
            
            let nField = this.field;
            for(let i=0;i<=line;i++){
                nField[i] = part[i];
            }

            this.game.score += 300 + times*200;
            lines = this.getDelLine();
            times++;
        }

    }

    makeLettersField(){
        for(let i=0;i<this.row;i++){
            this.lettersField[i] = [0];
            for(let j=0;j<this.col;j++){
                this.lettersField[i][j] = 0;
            }
        }
        for(let i=0;i<this.field.length;i++){
            for(let j=0;j<this.field[i].length;j++){
                for(let k=1;k<=this.num.length;k++){ 
                    if(this.field[i][j] == k){
                        let info = this.num[k-1];
                        this.lettersField[i][j] = info[1];
                    }
                }
            }
        }
    }

    update(){
        this.makeLettersField();
        if(this.checkLine()){
            this.status++;
        }
        if(this.status==2){
            lineAudio.play();
            this.delLine();
            this.status = 0;
        }
    }
}
