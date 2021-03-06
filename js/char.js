/**
 * Created by Aaron on 4/30/2017.
 */

String.prototype.replaceAllChar = function(toReplace, replaceWith){
    let input = this.toString().split("");
    for(let i = 0; i < input.length; i++){
        if(input[i] === toReplace){
            input[i] = replaceWith
        }
    }
    return input.join("");
};


class player{
    constructor(name){
        this.gold = 0;
        this.name = name.replace(" ", "_");
        this.displayname = name.replaceAllChar("_", " ");
        this.limiteds = [];
        this.anytimesLeft = 3;
        this.maxAnytimes = 3;
        this.baseActions = ["Move","Regular"];
        this.numActions = 2;
        this.stamina = 0;
        this.maxstamina = 0;
        this.add = (amt) => {
            this.gold += amt;
        }
    }

    static convertObjectToPlayer(obj){
        let gen = new player(obj.name);
        gen.gold = obj.gold;
        gen.limiteds = obj.limiteds;
        gen.anytimesLeft = obj.anytimesLeft;
        gen.maxAnytimes = obj.maxAnytimes;
        gen.baseActions = obj.baseActions;
        gen.numActions = obj.numActions;
        gen.stamina = obj.stamina;
        gen.maxstamina = obj.maxstamina;
        return gen;
    }
}


class Limited{
    constructor(hoverText){
        this.hover = hoverText;
        this.used = false;
        this.UUID = "chicken" + Math.round(Math.random()*1000000);
    }
}