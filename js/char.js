/**
 * Created by Aaron on 4/30/2017.
 */
class player{
    constructor(name){
        this.gold = 0;
        this.name = name;
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
}


class Limited{
    constructor(hoverText){
        this.hover = hoverText;
        this.used = false;
        this.UUID = "chicken" + Math.round(Math.random()*1000000);
    }
}