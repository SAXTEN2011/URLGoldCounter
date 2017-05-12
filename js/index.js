/**
 * Created by Aaron on 4/30/2017.
 */

let chars = [];

let anytimesString;

let openCharModal = function(playerName){
    let current;
    for(let p = 0; p < chars.length; p++){
        if(playerName === chars[p].name){
            current = chars[p];
            break;
        }
    }
    $(".modalPlayerName").html(`${current.name}`);
    $("#setMaxStamina").attr('placeholder', `Current: ${current.maxstamina}`);
    $("#setGold").attr('placeholder', `Current: ${current.gold}`);
    $("#setAnytimes").attr('placeholder', `Current: ${current.maxAnytimes}`);
    Materialize.updateTextFields();

    $("#charModal").modal("open");
};


let resetCombat = function () {
    for(let i = 0; i < chars.length; i++) {
        let current = chars[i];
        current.anytimesLeft = current.maxAnytimes;
        for(let p = 0; p < current.limiteds.length; p++){
            current.limiteds[p].used = false;
        }
    }
    updateChars();
};


let resetRound = function () {
    for(let i = 0; i < chars.length; i++) {
        let current = chars[i];
        // alert(current.defaults);
        let someArray = current.baseActions;
        console.log(someArray);
        if(current.actionsLeft.indexOf("once") !== -1){
            current.actionsLeft = ["move","normal"];
        }else{
            current.actionsLeft = ["move","normal"];
        }

    }
    updateChars();
};

let restoreAnytime = function (pName) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === pName){
            if(chars[i].maxAnytimes > chars[i].anytimesLeft)
            chars[i].anytimesLeft++;
        }
    }
    updateChars();
};


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


        let limitedsString = ``;
        let UIDS = [];
        for(let o = 0; o < current.limiteds.length; o++){
            let cur = current.limiteds[o];
            if(!cur.used){
                limitedsString += `<img class="gem ${cur.UUID}" src="./fonts/once.png" title="${cur.hover}">`;
                UIDS.push(cur.UUID);
            }
        }

        let staminaPercentage = current.stamina / current.maxstamina * 100;



        $(".main").append(`<div class="${current.name} player">
            <h4 onclick="openCharModal('${current.name}')"><span class="playerName">${current.name}</span></h4>
            <span style="width: 200px;display:inline-block">
                <h5><span class="${current.name}Gold ${color}-text">${current.gold}g</span></h5><br>
                                                <h6 style="display: inline-block">${current.stamina} Stamina</h6>
                <span class="${current.name}Stamina grey lighten-1" style="width: 200px; height: 20px; display: inline-block; overflow: hidden">
                    <div class="${stamColor}" style="width: ${staminaPercentage}%; height:100%"></div>
                </span>
            </span>
            <span style="display:inline-block">
                ${actionsString}
                ${limitedsString}
                ${anytimesString}
            </span>
        </div>

`);


        for(let Ui = 0 ; Ui < UIDS.length; Ui++){
            $(`.${UIDS[Ui]}`).mousedown(function (e) {
                if(e.which === 1){
                    for(let jesus = 0; jesus < current.limiteds.length; jesus++){
                        if(current.limiteds[jesus].UUID === `${UIDS[Ui]}`){
                            current.limiteds[jesus].used = true;
                        }
                    }
                }

                updateChars();
            });
        }



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
            }else if(e.which === 2){
                current.maxAnytimes++;
                current.anytimesLeft++;
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
    $("#addChar").submit(function () {
        let name = $('#player_name').val();
        if(name !== undefined && name !== "" && name !== null){
            chars.push(new player(name));

            updateChars();
            $('#add_player_modal').modal('close');
            $('#player_name').val('');
            $('#open_add_player_modal').removeClass('pulse');
        }
        return false;
    });






    // Prepare Modals
    $('#help_modal').modal();
    $('#charModal').modal();
    $('#add_player_modal').modal({
        ready: function() {
            $('#player_name').focus();
        }
    });


    $(document).keydown(function (e) {
        if(e.keyCode === 187 || e.keyCode === 107){
            if($('#add_player_modal').hasClass('open')){
                $('#add_player_modal').modal('close');
            }else{
                $('#add_player_modal').modal('open');
            }
            e.preventDefault();
            return;
        }

        // Don't handle shortcuts if in a modal
        if ($('.modal.open').not('#help_modal').length !== 0)
            return;

        if(e.keyCode === 67){
            if ($('#help_modal').hasClass('open'))
                $('#help_modal').modal('close');
            else
                $('#help_modal').modal('open');
        }

        if(e.keyCode === 71){
            for(let i = 0; i < chars.length; i++) {
                let current = chars[i];

                current.gold = parseInt(prompt(`Set gold for ${current.name}, currently ${current.gold}g`));
            }
            updateChars();
        }

        if(e.keyCode === 83){
            for(let i = 0; i < chars.length; i++) {
                let current = chars[i];

                current.maxstamina = parseInt(prompt(`Set MAXIMUM stamina for ${current.name}, currently ${current.maxstamina}`));
            }
            updateChars();
        }
        if(e.keyCode === 82){
            resetRound();
        }
        if(e.keyCode === 76){
            resetCombat();
        }
    })
});
