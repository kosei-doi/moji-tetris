from PIL import Image

filePath = "images/source.png"

img = Image.open(filePath)

img = img.crop((0,0,img.width-5,img.height-20))

perWidth = img.width/5
perHeight = img.height/10

print(f"{perWidth},{perHeight}")

letters = [
    ["あ","か","さ","た","な","は","ま","や","ら","わ"],
    ["い","き","し","ち","に","ひ","み","del","り","del"],
    ["う","く","す","つ","ぬ","ふ","む","ゆ","る","を"],
    ["え","け","せ","て","ね","へ","め","del","れ","del"],
    ["お","こ","そ","と","の","ほ","も","よ","ろ","ん"]
]

for i in range(5):
    for j in range(10):
        cropedImg = img.crop((i*perWidth,j*perHeight,(i+1)*perWidth,(j+1)*perHeight))
        if(letters[i][j] == "del"):
            pass
        else:
            cropedImg.save(f"images/{letters[i][j]}.png");