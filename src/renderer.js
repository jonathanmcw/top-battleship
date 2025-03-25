import { Ship, Player, Gameboard } from "./components";

export function renderPlayer(playerName, HTMLplayerID) {
    const player = new Player("human");

    const DOMplayer = document.querySelector(HTMLplayerID);

    const titleElement = document.createElement('h2');
    titleElement.textContent = playerName;
    DOMplayer.appendChild(titleElement);

    const DOMgameboard = document.createElement('div');
    DOMgameboard.className = 'gameboard';

    DOMplayer.appendChild(DOMgameboard);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.dataset.x = j;
            cellElement.dataset.y = i;
            DOMgameboard.appendChild(cellElement);
        }
    }

    return { player, DOMplayer, DOMgameboard };
}

export function renderRotateShip(DOMship, shipLength) {
    if (DOMship.dataset.orientation === 'v') {
        DOMship.dataset.orientation = 'h';            
        DOMship.style.height = '40px';
        DOMship.style.width = `${shipLength * 40}px`;
    } else {
        DOMship.dataset.orientation = 'v';
        DOMship.style.height = `${shipLength * 40}px`;
        DOMship.style.width = '40px';
    }
}

export function renderPlaceShip( player, ship, x, y,  orientation, shipLength) {

    const cells = [];

    player.gameboard.placeShip( ship, x, y, orientation );
    
    if (orientation === 'h') {
        
        for (let i = 0; i < shipLength; i++) {
            cells.push(document.querySelector(`[data-x="${x + i}"][data-y="${y}"]`));

        }

    } else if (orientation === 'v') {
        for (let i = 0; i < shipLength; i++) {
            cells.push(document.querySelector(`[data-x="${x}"][data-y="${y + i}"]`));
        }
    }

    if (cells.length == shipLength ) {
        // OK
    }

    cells.forEach(cell => {
        if (cell) {
            cell.style.backgroundColor = 'blue';
        }
    });
}

