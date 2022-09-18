from operator import contains

with open("words.csv") as f:
    txt = f.read();

words = txt.split("\n");

_all = "let words = ["
for word in words:
    word = word.split(",");
    if ("（" in word[3]) == False:
        if(len(word[3]) <= 3):
            pass
        else:
            _all += "\n" + word[3] + ",";

_all += "\n];"
print(_all)

with open("info.txt","w",encoding="utf-8") as f:
    f.write(_all)
