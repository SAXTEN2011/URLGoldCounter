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
    var limited = $('#addLimited').val();
    if(limited !== "" && limited !== undefined && limited !== null){
        current.limiteds.push(new Limited(limited));
        let limiteds = $('#limiteds');
        limiteds.toggle(true);
        limiteds.append(`<li id="limited${limited}" class="collection-item"><div>${limited}<a id="delete${limited}" class="secondary-content"><i class="material-icons">delete</i></a></div></li>`)
        $(`#delete${limited}`).click(function () {
            deleteLimited(current, limited);
        });
        $("#addLimited").val('');
        updateChars();
    }
}