/**
 * Created by Aaron on 6/15/2017.
 */

//Make sure the item exists, if not, make an empty array to add characters to later.
let loadedChars = [];
let charsArray = localStorage.getItem("chars");
let toSave = [];
if(charsArray === "" || charsArray === undefined || charsArray === null){
    localStorage.setItem("chars", []);
    toSave = localStorage.getItem("chars").split(",");
}else{
    loadedChars.push(JSON.parse(charsArray));
    toSave = null;
    toSave = loadedChars[0];
}

let saveChar = function(char){
    "use strict";
    if(typeof char === "object"){
        for(let p = 0; p < toSave.length; p++){
            if(toSave[p].name === char.name){
                toSave[p] = char;
                localStorage.setItem("chars", JSON.stringify(toSave));
                console.log("Found matching name, overwriting");
                return;
            }
        }
        console.log("exectuing");
        if(toSave[0] === "") toSave.splice(0,1);
        toSave.push(char);
        localStorage.setItem("chars", JSON.stringify(toSave));
    }
    else if(typeof char === "string"){
        for(let i = 0; i < chars.length; i++){
            if(chars[i].name === char){
                saveChar(chars[i]);
            }
        }
    }
    else{
        throw "Attempted to pass non char object to saveChar";
    }
};


let setSaveAllChars = function () {
    localStorage.setItem("chars", JSON.stringify(toSave));
};