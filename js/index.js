/**
 * Created by Aaron on 4/30/2017.
 */

let chars = [];


let updateChars = () => {
    "use strict";
    $(".main").html("");
    for(let i = 0; i < chars.length; i++){
        let color;
        let current = chars[i];

        if(current.gold <= 0){
            color = "red"
        }else if(current.gold > 0 && current.gold < 500){
            color = "green"
        }else if(current.gold >= 500 && current.gold <= 1000){
            color = "purple"
        }else if(current.gold > 1000){
            color = "orange"
        }
        $(".main").append(`<div class="${current.name} player">
            <h1>${current.name}: <span class="${current.name}Gold ${color}-text">${current.gold}g</span> </h1>
            </div>`);

        $(`.${current.name}`).mousedown(function (e) {
            if(e.which === 2){
                this.remove();
                chars.splice(chars.indexOf(this), 1);
            } else if(e.which === 1){


                if(holding.indexOf(16) !== -1){
                    current.gold += 50;
                }else if(holding.indexOf(17) !== -1) {
                    console.log("ctrlclik");
                    current.gold += 5;
                }else{
                    current.gold += 10;
                }
            }else{


                if(holding.indexOf(16) !== -1){
                    current.gold -= 50;
                }else if(holding.indexOf(17) !== -1) {
                    current.gold -= 5;
                }else{
                    current.gold -= 10;
                }
            }

            updateChars();
        });

        if(current.gold > 0){
            console.log(`${current.name}Gold`);
            $(`.${current.name}Gold`).addClass("text-green");
            console.log("wut")
        }

    }
};


$(document).ready(function () {
    $(".addCharBtn").click(function () {
        chars.push(new player(prompt("Enter a name for new player")));

        updateChars();
    });






    $(document).keydown(function (e) {
        if(e.keyCode === 71){
            for(let i = 0; i < chars.length; i++) {
                let current = chars[i];

                current.gold = parseInt(prompt(`Set gold for ${current.name}, currently ${current.gold}g`));
            }
            updateChars();
        }

        if(e.keyCode === 67){
            alert("Press g to set gold values. Left click to add gold, right click to subtract. Shift modifies balance by 50, a normal click by 10, and a control click by 5");
        }
    })
});