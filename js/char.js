/**
 * Created by Aaron on 4/30/2017.
 */
class player{
    constructor(name){
        this.gold = 0;
        this.name = name;
        this.actionsLeft = ["move","normal","once"];
        this.anytimesLeft = 3;
        this.baseActions = ["move","normal"];
        this.stamina = 0;
        this.maxstamina = 0;
        this.add = (amt) => {
            this.gold += amt;
        }
    }
}