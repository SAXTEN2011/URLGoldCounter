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

    let limiteds = $('#limiteds');
    limiteds.html('');
    limiteds.toggle(current.limiteds.length !== 0);
    for (let l = 0; l < current.limiteds.length; l++) {
        let hover = current.limiteds[l].hover;
        limiteds.append(`<li id="limited${hover}" class="collection-item"><div>${hover}<a id="delete${hover}" class="secondary-content"><i class="material-icons">delete</i></a></div></li>`)
        $(`#delete${hover}`).click(function () {
            deleteLimited(current, hover);
        });
    }

    $("#charModal").modal("open");
};


let resetCombat = function () {
    resetRound();
    for(let i = 0; i < chars.length; i++) {
        let current = chars[i];
        for (let p = 0; p < current.maxAnytimes; p++) {
            restoreAnytime(current.name, p);
        }
        for(let p = 0; p < current.limiteds.length; p++){
            restoreLimited(current, current.limiteds[p]);
        }
        current.anytimesLeft = current.maxAnytimes;
        current.stamina = current.maxstamina;
        updateStamina(current.name);
    }
};


let resetRound = function () {
    for(let i = 0; i < chars.length; i++) {
        let current = chars[i];
        while (current.numActions > current.baseActions.length)
            removeGem(current, current.numActions - 1);
        for (let j = 0; j < current.baseActions.length; j++) {
            restoreGem(current, j, current.baseActions[j]);
        }
    }
};

let restoreGem = function (current, gem, name) {
    $(`.${current.name}gem${gem}`).show();
    $(`.${current.name}gem${gem}`).animate({
        width: "100px",
        height: "100px",
        margin: 0
    }, 400);
}

let restoreAnytime = function (pName, anytime) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === pName){
            current = chars[i];
        }
    }
    $(`.${pName}anytime${anytime}`).show();
    $(`.${pName}anytime${anytime}`).animate({
        width: "100px",
        height: "100px",
        margin: 0
    }, 400);
};

let restoreLimited = function (current, limited) {
    $(`#${limited.UUID}`).show();
    $(`#${limited.UUID}`).animate({
        width: "100px",
        height: "100px",
        margin: 0
    }, 400);
}

let deletePlayer = function (pName) {
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === pName){
            chars.splice(i, 1);
            break;
        }
    }
    $(`.${pName}`).delay(200).animate({
        left: "150%"
    }, 800, function () {
        $(this).remove();
    });
    $(`.${pName}`).delay(200).fadeOut(800);
}

let addPlayer = function (pName) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === pName){
            current = chars[i];
        }
    }
    let actionsString = ``;
    for(let j = 0; j < current.baseActions.length; j++){
        actionsString = actionsString +  `<img class="gem ${pName}gem ${pName}gem${j} tooltipped" id="${current.baseActions[j]}" src="./fonts/${current.baseActions[j]}.png" data-position="top" data-delay="0" data-tooltip="${current.baseActions[j]}">`;
    }
    let anytimesString = ``;
    for(let pizza = 0; pizza < current.maxAnytimes; pizza++){
        anytimesString += `<img class="anytime ${pName}anytime ${pName}anytime${pizza} tooltipped" src="./fonts/anytime.png" data-position="top" data-delay="0" data-tooltip="Anytime">`;
    }

    let limitedsString = ``;
    for(let o = 0; o < current.limiteds.length; o++){
        let cur = current.limiteds[o];
        limitedsString += `<img class="gem ${cur.UUID} tooltipped" src="./fonts/once.png" data-position="top" data-delay="0" data-tooltip="${cur.hover}">`;
    }
    $(".main").append(`<div class="${pName} player">
        <h4 onclick="openCharModal('${pName}')"><span class="playerName">${pName}</span></h4>
        <span style="width: 200px;display:inline-block">
            <h5><span class="${pName}Gold gold">0g</span></h5><h6 class="${pName}StaminaLabel" style="display: inline-block">0 Stamina</h6>
            <span class="${pName}Stamina grey lighten-1" style="width: 200px; height: 20px; display: inline-block; overflow: hidden">
                <div style="width: 0%; height:100%"></div>
            </span>
        </span>
        <span class="${pName}gems">
            ${actionsString}
            ${limitedsString}
            ${anytimesString}
        </span>
    </div>`);
    $('.tooltipped').tooltip();
    updateStamina(pName);
    updateGold(pName);

    for (let i = 0; i < $(`.${pName}gem`).length; i++) {
        $(`.${pName}gem`)[i].pName = pName;
    }
    $(`.${pName}gem`).mousedown(clickGem);

    for (let i = 0; i < $(`.${pName}anytime`).length; i++) {
        $(`.${pName}anytime`)[i].pName = pName;
    }
    $(`.${pName}anytime`).mousedown(clickAnytime);

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

        updateGold(current.name);
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

        updateStamina(current.name);
    });
}

let deleteLimited = function (current, limited) {
    let index = current.limiteds.indexOf(limited);
    current.limiteds.splice(index, 1);
    $(`#limited${limited}`).remove();
    $('#limiteds').toggle(current.limiteds.length !== 0);
    //updateChars();
}

let updateStamina = function (pName) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === pName){
            current = chars[i];
        }
    }
    $(`.${current.name}Stamina`).children().stop().animate({
        width: current.stamina / current.maxstamina * 100 + '%'
    });
    let stamColor;
    if(current.stamina <= 0){
        stamColor = "red"
    }else if(current.stamina > current.maxstamina) {
        stamColor = "purple";
        $.notify(`Stamina of player ${current.name} is above their max stamina, which is ${current.maxstamina}. Press player name to set maximum stamina`, "info");
    }
    else if(current.stamina > 0 && current.stamina < 10){
        stamColor = "yellow"
    }else{
        stamColor = "green"
    }
    $(`.${current.name}Stamina`).children().attr('class', stamColor);
    $(`.${current.name}StaminaLabel`).html(`${current.stamina} Stamina`);
}

let updateGold = function (pName) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === pName){
            current = chars[i];
        }
    }
    let color;
    if(current.gold <= 0){
        color = "red"
    }else if(current.gold > 0 && current.gold < 500){
        color = "green"
    }else if(current.gold >= 500 && current.gold <= 1000){
        color = "purple"
    }else if(current.gold > 1000){
        color = "orange"
    }
    $(`.${current.name}Gold`).attr('class', `${current.name}Gold gold ${color}-text`);
    $(`.${current.name}Gold`).html(`${current.gold}g`);
}

let clickGem = function (e) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === e.target.pName){
            current = chars[i];
        }
    }
    if(e.which === 1){
        $(this).animate({
            width: 0,
            height: 0,
            margin: "50px 0"
        }, 200, "swing", function () {
            $(this).hide();
        });
    }else if(e.which === 3){
        addGem(current, $(this)[0].id);
    }
}

let clickAnytime = function (e) {
    let current;
    for(let i = 0; i < chars.length; i++) {
        if(chars[i].name === e.target.pName){
            current = chars[i];
        }
    }
    if(e.which === 1){
        current.anytimesLeft--;
        //$(this).animate({
          //  scale: "0"
        //});
        $(this).animate({
            width: 0,
            height: 0,
            margin: "50px 0"
        }, 200, "swing", function () {
            $(this).hide();
        });
    }else if(e.which === 2){
        addAnytime(current);
    }
}

let removeAnytime = function (player) {
    player.maxAnytimes--;
    $(`.${player.name}anytime${player.maxAnytimes}`).animate({
        width: 0,
        height: 0,
        margin: "50px 0"
    }, 200, function () {
        $(this).remove();    
    });
    player.anytimesLeft = Math.max(player.anytimesLeft, player.maxAnytimes);
}

let addGem = function (player, id) {
    let gem = $(`<img class="gem ${player.name}gem ${player.name}gem${player.numActions} tooltipped" id="${id}" style="width: 0; height: 0; margin: 50px 0" src="./fonts/${id}.png" data-position="top" data-delay="0" data-tooltip="${id}">`);
    gem[0].pName = player.name;
    gem.mousedown(clickGem);
    $(`.${player.name}gem${player.numActions - 1}`).after(gem);
    restoreGem(player, player.numActions, id);
    player.numActions++;
    $('.tooltipped').tooltip();
}

let addAnytime = function (player) {
    let anytime = $(`<img class="anytime ${player.name}anytime ${player.name}anytime${player.maxAnytimes} tooltipped" style="width: 0; height: 0; margin: 50px 0" src="./fonts/anytime.png" data-position="top" data-delay="0" data-tooltip="Anytime">`);
    anytime[0].pName = player.name;
    anytime.mousedown(clickAnytime);
    $(`.${player.name}gems`).append(anytime);
    restoreAnytime(player.name, player.maxAnytimes);
    player.maxAnytimes++;
    player.anytimesLeft++;
    $('.tooltipped').tooltip();
}

let addLimited = function (player, limited) {
    let gem = $(`<img class="gem ${player.name}gem tooltipped" id="${limited.UUID}" style="width: 0; height: 0; margin: 50px 0" src="./fonts/once.png" data-position="top" data-delay="0" data-tooltip="${limited.hover}">`);
    gem[0].pName = player.name;
    gem.mousedown(clickGem);
    $(`.${player.name}gem${player.numActions - 1}`).after(gem);
    restoreLimited(player, limited);
    $('.tooltipped').tooltip();
}

let removeGem = function (player, gem) {
    $(`.${player.name}gem${gem}`).animate({
        width: 0,
        height: 0,
        margin: "50px 0"
    }, 200, function () {
        $(this).remove();    
    });
    player.numActions--;
}

$(document).ready(function () {
    $("#addChar").submit(function () {
        let name = $('#player_name').val();
        if(name !== undefined && name !== "" && name !== null){
            chars.push(new player(name));

            addPlayer(name);
            $('#add_player_modal').modal('close');
            $('#player_name').val('');
            $('#open_add_player_modal').removeClass('pulse');
        }
        return false;
    });






    // Prepare Modals
    $('#help_modal').modal();
    $('#charModal').modal({
        complete: function() {
            $('.maxStaminaInput').val('');
            $('.maxGold').val('');
            $('.numAnytimes').val('');
            $('.addLimited').val('');
        }
    });
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

        if(e.keyCode === 82){
            resetRound();
        }
        if(e.keyCode === 76){
            resetCombat();
        }
    })
});
