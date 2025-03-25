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

        // Test to make sure slot is available
        const shipCor = Array.from({ length: ship.length }, (_, i) => {
            const newX = orientation === "h" ? x + i : x;
            const newY = orientation === "v" ? y + i : y;

            if (newX > 9 || newY > 9 || this.cor[newX][newY].ship !== null) {
            throw new Error('Invalid placement: Ship goes out of bounds or overlaps another ship');
            }
            return [newX, newY];
        });

        if ( shipCor.length == ship.length ) {
            shipCor.forEach(([x, y]) => {
                this.cor[x][y].ship = ship;
            });
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

        return this;
    }
    // 'real' player and 'computer' player
    // Each player object should contain its own gameboard
}
// then import all classes / factory
// module.exports = {sum, Ship, Gameboard, Player};