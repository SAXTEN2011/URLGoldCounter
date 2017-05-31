/**
 * Created by Aaron on 5/11/2017.
 */
let setCMState;

$(document).ready(function () {
    "use strict";
    let charModal = $("#charModal");


    setCMState = function (state) {
        if(state === "default"){

        }else if(state === "setMaxStamina"){

        }
    };
});

function modalSetMaxStam(playername){
    "use strict";
    // alert("submitted?");
    let current;
    for(let p = 0; p < chars.length; p++){
        if(playername === chars[p].name){
            current = chars[p];
            break;
        }
    }
    if(!isNaN(parseInt($("#setMaxStamina").val())))
        current.maxstamina = parseInt($("#setMaxStamina").val());
    updateStamina(playername);

    $("#setMaxStamina").attr('placeholder', `Current: ${current.maxstamina}`);
    $("#setMaxStamina").val('');
}

function modalSetGold(playername){
    "use strict";
    // alert("submitted?");
    let current;
    for(let p = 0; p < chars.length; p++){
        if(playername === chars[p].name){
            current = chars[p];
            break;
        }
    }
    if(!isNaN(parseInt($("#setGold").val())))
        current.gold = parseInt($("#setGold").val());
    updateGold(playername);

    $("#setGold").attr('placeholder', `Current: ${current.gold}`);
    $("#setGold").val('');
}

function modalSetAnytimes(playername){
    "use strict";
    let current;
    for(let p = 0; p < chars.length; p++){
        if(playername === chars[p].name){
            current = chars[p];
            break;
        }
    }
    if(!isNaN(parseInt($("#setAnytimes").val()))) {
        let oldMax = current.maxAnytimes;
        let newMax = parseInt($("#setAnytimes").val());
        // if reducing number, delete some anytimes
        for (let i = 0; i < oldMax - newMax; i++) {
            removeAnytime(current);
        }
        // if increasing number, add some anytimes
        for (let i = 0; i < newMax - oldMax; i++) {
            addAnytime(current);
        }
    }

    $("#setAnytimes").attr('placeholder', `Current: ${current.maxAnytimes}`);
    $("#setAnytimes").val('');
}

function modalAddLimited(playername) {
    let current;
    for(let p = 0; p < chars.length; p++){
        if(playername === chars[p].name){
            current = chars[p];
        }
    }
    var limitedText = $('#addLimited').val();
    if(limitedText !== "" && limitedText !== undefined && limitedText !== null){
        let limited = new Limited(limitedText);
        console.log(limited);
        current.limiteds.push(limited);
        let limiteds = $('#limiteds');
        limiteds.toggle(true);
        limiteds.append(`<li id="limited${limited.hover}" class="collection-item"><div>${limited.hover}<a id="delete${limited.hover}" class="secondary-content"><i class="material-icons">delete</i></a></div></li>`)
        $(`#delete${limited.hover}`).click(function () {
            deleteLimited(current, limited.hover);
        });
        $("#addLimited").val('');
        addLimited(current, limited);
    }
}