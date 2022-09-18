class Word{
    constructor(){
        this.times = 0;
        this.status = 0;
        this.delPart = [];
    }
    update(fie,game){
        let field = fie.lettersField;
        let xfield = fie.field;
        let list = [];

        for(let i=0;i<field.length;i++){
            let word = "";
            for(let t=0;t<field[i].length;t++){
                word += field[i][t];
            }
            for(let j=0;j<field[i].length;j++){
                for(let k=1;k<field[i].length+1;k++){
                    if(j < k){
                        let wo = word.substring(j,k);
                        if(words.includes(wo)){
                            list.push(["row",i,j,k-1]);
                        }
                    }
                }
            } 
        }

        for(let i=0;i<field[0].length;i++){
            let word = "";
            for(let t=0;t<field.length;t++){
                word += field[t][i];
            }
            for(let j=0;j<field.length;j++){
                for(let k=1;k<field.length+1;k++){
                    if(j < k){
                        let wo = word.substring(j,k);
                        if(words.includes(wo)){
                            list.push(["line",i,j,k-1]);
                        }
                    }
                }
            }
        }
        
        list = Array.from(new Set(list));
        this.delPart = list;
        if(list.length){
            this.status++;
        }
        if(this.status == 5){
            this.del(xfield);
            game.score += 50;
            this.status = 0;
        }
    }

    draw(){
        if(this.status == 1 || this.status == 3){
            for(let i=0;i<this.delPart.length;i++){
                if(this.delPart[i][0] == "row"){
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "rgba(48,201,125,0.7)";
                    ctx.strokeRect(TETORO_SIZE*this.delPart[i][2],TETORO_SIZE*this.delPart[i][1],TETORO_SIZE*(this.delPart[i][3] - this.delPart[i][2] + 1),TETORO_SIZE);
                }
                else{
                    ctx.strokeStyle = "rgba(48,201,125,0.7)";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(TETORO_SIZE*this.delPart[i][1],TETORO_SIZE*this.delPart[i][2],TETORO_SIZE,TETORO_SIZE*(this.delPart[i][3] - this.delPart[i][2] + 1));
                }
            }
            pointBGM.play();
        }
    }

    del(field){
        let list = this.getPart(field);
        //hey today will do from here;list contains delparts ex:[15,6]
        this.delPa(list,field);
        lineAudio.play();
    }
    
    getPart(field){
        let list = [];
        for(let i=0;i<this.delPart.length;i++){ 
            if(this.delPart[i][0] == "row"){
                let row = field[this.delPart[i][1]];
                let ro = row.slice(this.delPart[i][2],this.delPart[i][3] + 1);

                for(let j=0;j<ro.length;j++){
                    list.push(ro[j]);
                }
            }
            else{
                let line = [];
                for(let j=0;j<field.length;j++){
                    line.push(field[j][this.delPart[i][1]]);
                }
                let lin = line.slice(this.delPart[i][2],this.delPart[i][3] + 1);

                for(let k=0;k<lin.length;k++){
                    list.push(lin[k]);
                }
            }
        }

        let nlist = [];
        for(let i=0;i<field.length;i++){
            for(let j=0;j<field[i].length;j++){
                for(let k=0;k<list.length;k++){
                    if(field[i][j] == list[k]){
                        nlist.push([i,j]);
                    }
                }
            }
        }
        
        return nlist;
    }

    delPa(list,field){
        for(let p=0;p<list.length;p++){
            let part = [0];
            for(let i=0;i<field.length;i++){
                if(i < list[p][0]){
                    part.push(field[i][list[p][1]]);
                }
            }

                        
            for(let i=0;i<field.length;i++){
                if(i <= list[p][0]){
                    field[i][list[p][1]] = part[i];
                }
            }
        }
    }
}