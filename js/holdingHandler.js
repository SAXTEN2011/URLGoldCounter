/**
 * Created by Aaron on 4/30/2017.
 */
let holding = [];
$(document).ready(function () {
    $(document).keydown(function (e) {
        if(holding.indexOf(e.keyCode) < 0){
            holding.push(e.keyCode);
        }

    });

    $(document).keyup(function (e) {
        for(let i = 0; i < holding.length; i++){
            if(holding[i] === e.keyCode){
                holding.splice(i, 1);
            }
        }
    });
});
