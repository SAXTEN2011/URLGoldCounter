/**
 * Created by Aaron on 4/30/2017.
 */

let chars = [];

let anytimesString;
let updateChars = () => {
    "use strict";
    $(".main").html("");
    for(let i = 0; i < chars.length; i++){
        let color;
        let stamColor;
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

        if(current.stamina <= 0){
            stamColor = "red"
        }else if(current.stamina > 0 && current.stamina < 10){
            stamColor = "yellow"
        }else if(current.stamina > current.maxstamina) {
            stamColor = "purple";
            $.notify(`Stamina of player ${current.name} is above their max stamina, which is ${current.maxstamina}. Press S to set maximum stamina`, "info");
        }
            else{
            stamColor = "green"
        }



        let uid = "a" + Math.round(Math.random()* 10000000000);
        let uidAnytime = "a" + Math.round(Math.random()* 10000000000);
        let actionsString = ``;
        for(let j = 0; j < current.actionsLeft.length; j++){
            console.log(current.actionsLeft[j]);
            actionsString = actionsString +  `<img class="gem ${uid}" id="${current.actionsLeft[j]}" src="./fonts/${current.actionsLeft[j]}.png" title="${current.actionsLeft[j]}">`;
        }
        let anytimesString = ``;
            for(let pizza = 0; pizza < current.anytimesLeft; pizza++){
                anytimesString += `<img class="anytime ${uidAnytime}" src="./fonts/anytime.png" >`;
            }




        $(".main").append(`<div class="${current.name} player">
            <h1><span class="playerName">${current.name}:</span><br> ${actionsString} <br>
            
            ${anytimesString}<br>
            
            <span class="${current.name}Gold ${color}-text">${current.gold}g</span><br>
             
             <span class="${current.name}Stamina ${stamColor}-text">${current.stamina} Stamina</span><br>
             </h1>
            </div>`);

        $(`.${uid}`).mousedown(function (e) {
            // alert("Clicked?");
            if(e.which === 1){
                current.actionsLeft.splice(current.actionsLeft.indexOf(this.id), 1);
            }else if(e.which === 2){

            }else{
                current.actionsLeft.push(this.id);
            }
            updateChars();
        });
        $(`.${uidAnytime}`).mousedown(function (e) {
            if(e.which === 1){
                current.anytimesLeft--;
            }
            updateChars();
        });

        $(".gem").css("height", $(".playerName").height()*1.5);
        $(".gem").css("width", $(".playerName").height()*1.5);
        $(".anytime").css("height", $(".playerName").height()*1.5);
        $(".anytime").css("width", $(".playerName").height()*1.5);
        // $(".gem").css("margin-top", $(".playerName").height() + "px");

        $(`.${current.name}Gold`).mousedown(function (e) {
            if(e.which === 2){
                // this.remove();
                // chars.splice(chars.indexOf(this), 1);
            } else if(e.which === 3){


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

        $(`.${current.name}Stamina`).mousedown(function (e) {
            if(e.which === 2){
                current.stamina = current.maxstamina;
            } else if(e.which === 1){


                if(holding.indexOf(16) !== -1){
                    current.stamina -= 10;
                }else if(holding.indexOf(17) !== -1) {
                    console.log("ctrlclik");
                    current.stamina -= 5;
                }else{
                    current.stamina -= 1;
                }
            }else{


                if(holding.indexOf(16) !== -1){
                    current.stamina += 10;
                }else if(holding.indexOf(17) !== -1) {
                    console.log("ctrlclik");
                    current.stamina += 5;
                }else{
                    current.stamina += 1;
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
        let name = prompt("Enter a name for new player");
        if(name !== undefined && name !== "" && name !== null){
            chars.push(new player(name));

            updateChars();
        }

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
            alert("GOLD CONTROLS: Press g to set gold values. Left click gold count to subtract gold, right click to add. Shift modifies balance by 50, a normal click by 10, and a control click by 5");
            alert("STAMINA CONTROLS: Press s to set max stamina values, middle click stamina to full heal, click to remove 1 stamina, shift click to remove 10 stamina, control click to remove 5 stamina, right click to add 1 stamina, shift+right click to add 10 stamina, ctrl+right click to add 5 stamina");
            alert("GEM CONTROLS: Left click to remove gem, right click to temporarily add. Press R to reset gems for the round, press L or reset gems for the combat encounter")
        }


        if(e.keyCode === 83){
            for(let i = 0; i < chars.length; i++) {
                let current = chars[i];

                current.maxstamina = parseInt(prompt(`Set MAXIMUM stamina for ${current.name}, currently ${current.maxstamina}`));
            }
            updateChars();
        }
        if(e.keyCode === 82){
            for(let i = 0; i < chars.length; i++) {
                let current = chars[i];
                // alert(current.defaults);
                let someArray = current.baseActions;
                console.log(someArray);
                if(current.actionsLeft.indexOf("once") !== -1){
                    current.actionsLeft = ["move","normal","once"];
                }else{
                    current.actionsLeft = ["move","normal"];
                }

            }
            updateChars();
        }
        if(e.keyCode === 76){
            for(let i = 0; i < chars.length; i++) {
                let current = chars[i];
                if(current.actionsLeft.indexOf("once") === -1){
                    current.actionsLeft.push("once");
                }
                current.anytimesLeft = 3;
            }
            updateChars();
        }
    })
});