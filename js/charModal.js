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
    updateChars();
    $("#charModal").modal('close');
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
    updateChars();

    $("#charModal").modal('close');
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
    if(!isNaN(parseInt($("#setAnytimes").val())))
        current.maxAnytimes = parseInt($("#setAnytimes").val());
    updateChars();

    $("#charModal").modal('close');
}

function modalAddLimited(playername) {
    let current;
    for(let p = 0; p < chars.length; p++){
        if(playername === chars[p].name){
            current = chars[p];
        }
    }
    if($('#addLimited').val() !== "" && $('#addLimited').val() !== undefined && $('#addLimited').val() !== null){
        current.limiteds.push(new Limited($('#addLimited').val()));
    }


    updateChars();
    $("#charModal").modal('close');
}