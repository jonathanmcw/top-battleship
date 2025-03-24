import {Ship, Gameboard, Player} from '../src/components';

describe('[SHIP] Return info, receive a hit, sunk status', () => {

    let ships;

    beforeEach(() => {
        ships = [
            new Ship('Carrier', 5),
            new Ship('Battleship', 4),
            new Ship('Cruiser', 3),
            new Ship('Submarine', 3),
            new Ship('Destroyer', 2)
        ];
    });

    test('Carrier should register a hit', () => {
        ships[0].hit();
        expect(ships[0].hitCount).toBe(1);
    });

    test('Carrier should sink after 5 hits', () => {
        ships[0].hit();
        ships[0].hit();
        ships[0].hit();
        ships[0].hit();
        ships[0].hit();
        expect(ships[0].isSunk()).toBe(true);
    });

});

describe('[GAMEBOARD] board creation and ship placement, keeping track of attack and hits, report all ships are sunk', () => {
    
    let board;
    let ships;

    beforeEach(() => {
        board = new Gameboard('player 1');
        ships = [
            new Ship('Carrier', 5),
            new Ship('Battleship', 4)
            //,
            // new Ship('Cruiser', 3),
            // new Ship('Submarine', 3),
            // new Ship('Destroyer', 2)
        ];
    });

    // test('Gameboard created successfully', () => {
    //     expect(board.player).toBe('player 1');
    // });
    // how should ship be placed on the board? 

    test('Gameboard is able to receive attack', () => {
        board.receiveAttack(0,1);
        expect(board.cor[0][1].attacked).toBe(true);
    });

    test('Gameboard is able to keep track of missed attacks', () => {
        // launching an attack that does not hit any ship
        // show hit co-ordinate to be false
        expect(board.receiveAttack(0,3)).toBe(false);
    });

    test('Gameboard is able to keep track of successful attacks', () => {
        board.placeShip(ships[0], 0, 0, "h");
        // console.log(board.cor[1,0]);
        expect(board.receiveAttack(3,0)).toBe(true);
    });

    test('Gameboard is able to report whether or not all ships are sunk', () => {        
        // ship of length 5 placed at 0, 0 vertically
        board.placeShip(ships[0], 0, 0, "v");
        board.placeShip(ships[1], 1, 0, "h");
        console.log(`Ship placed, hitCount:${ships[0].hitCount}`);
        
        // Attack on carrier
        board.receiveAttack(0,0);
        board.receiveAttack(0,1);
        board.receiveAttack(0,2);
        board.receiveAttack(0,3);
        board.receiveAttack(0,4);

        // Attack on battleship
        board.receiveAttack(1,0);
        board.receiveAttack(2,0);
        board.receiveAttack(3,0);
        board.receiveAttack(4,0);
        
        console.log([...Array(10).keys()].map(i => `y pos ${i}: ${board.cor[0][i]?.ship}  hit: ${board.cor[0][i]?.attacked}`));
        console.log([...Array(10).keys()].map(i => `x pos ${i}: ${board.cor[i][0]?.ship}  hit: ${board.cor[i][0]?.attacked}`));
        console.log(ships[0].hitCount);

        // all ships sunk because only one ship was placed
        expect(board.areShipsAllSunk()).toBe(true);
    });

});

describe('[PLAYER] As human or computer player', () => {

    let player1;
    let player2;

    beforeEach(() => {
        player1 = new Player('human');
        player2 = new Player('ai');
    });

    test('"Human" player can be created', () => {
        expect(player1.type).toBe('human');
    });

    test('"AI" player can be created', () => {
        expect(player2.type).toBe('ai');
    });

    // test('2 boards are created', () => {
    //     console.log(player1.gameboard);
        // expect(Gameboard.numberOfBoards).toBe(2);
    // });
    // test('Each player has their own gameboard', () => {
    // });
});