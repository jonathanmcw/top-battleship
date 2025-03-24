export class Ship {

    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
    }

    hit() {
        ++this.hitCount;
    }

    isSunk() {
        if (this.hitCount >= this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }
}

export class Gameboard {

    static numberOfBoards = 0;

    constructor() {
        ++Gameboard.numberOfBoards;
        this.ships = [];
        this.cor = Array.from({ length: 10}, () => 
            Array.from({ length: 10 }, () => ({ ship:null, attacked:false}))
        );
        this.shipCount = 0;
    }

    placeShip(ship, x, y, orientation) {
        if (!(ship instanceof Ship)) {
            throw new Error("First parameter must be an instance of Ship");
        }

        // if h then range(x, x+length); 'v' then range(y, y+length)
        // note that x+length shouldn't be larger than 9 if h, ditto for v
        // x and y should be 0 to 9
    
        for ( let i = 0; i < ship.length; i++ ) {
            if ( orientation == "h") {
                // if ship is already assigned to grid, through error
                // make sure ship stays within grid 
                this.cor[x+i][y].ship = ship;
            } else if ( orientation == "v") {
                this.cor[x][y+i].ship = ship;
            } else {
                throw new Error('Ship orientation should be either "h(horizontal)" or "v(vertical)"');
            }
        }

        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        this.cor[x][y].attacked = true;
        if ( this.cor[x][y].ship) {
            this.cor[x][y].ship.hit();
            return true;
        }
        return false;
    }

    areShipsAllSunk() {
        return this.ships.every((ship) => ship.isSunk());
    }
}

export class Player {

    constructor(type) {
        if (type !== 'human' && type !== 'ai') {
            throw new Error("Type must be either 'human' or 'ai'");
        }

        this.type = type;
        this.gameboard = new Gameboard;
    }
    // 'real' player and 'computer' player
    // Each player object should contain its own gameboard
}
// then import all classes / factory
// module.exports = {sum, Ship, Gameboard, Player};