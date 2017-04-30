/**
 * Created by Aaron on 4/30/2017.
 */
class player{
    constructor(name){
        this.gold = 0;
        this.name = name;
        this.add = (amt) => {
            this.gold += amt;
        }
    }
}