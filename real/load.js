let letterImg = [];
let colorImg = [];


function load(){
    for(let i=0;i<letters.length;i++){
        for(let j=0;j<letters[i].length;j++){
            let img = new Image();
            img.src = "./images/" + letters[i][j] + ".png";
            letterImg.push(img);
            
        }
         
    }
    for(let i=0;i<tColors.length;i++){
        let im = new Image();
        im.src = "./images/" + tColors[i] + ".png";
        colorImg.push(im);
    }

}

function getImg(name){
    for(let i=0;i<letters.length;i++){
        if(letters[i].includes(name)){   
            return letterImg[i*10+letters[i].indexOf(name)];
        }
    }
    if(tColors.includes(name)){
        return colorImg[tColors.indexOf(name)];
    }
}

