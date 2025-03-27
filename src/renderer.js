import { Ship, Player, Gameboard } from "./components";

export function renderPlayer(playerName, playerType, HTMLplayerID) {
    const player = new Player(playerType, HTMLplayerID);

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

export function renderShipRotation(DOMship, shipLength) {
    if (DOMship.dataset.orientation === 'v') {
        DOMship.dataset.orientation = 'h';
        DOMship.style.width = `${shipLength * 40}px`;            
        DOMship.style.height = '40px';
    } else {
        DOMship.dataset.orientation = 'v';
        DOMship.style.width = '40px';
        DOMship.style.height = `${shipLength * 40}px`;
    }
}

export function renderShipPlacement(player, ship, x, y, orientation) {
    const shipCors = player.gameboard.placeShip( ship, x, y, orientation );

    if (shipCors) {
        const gameboard = document.querySelector(`${player.HTMLplayerID} .gameboard`);
        shipCors.forEach(([x, y]) => {
            const cell = gameboard.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            cell.classList.add("ship-placed");
        });

        return true;
    }

    return false;

}

export function renderBoardSetup(player, ships, callback) {

    // if human, do so by clicks
    // if AI, do so automatically 

    const DOMinstructions = document.querySelector("#instructions");
    const MSGallShipsPlaced = 'All ships placed!';

    let currentShipIndex = 0;

    function placeNextShip() {
        if (currentShipIndex >= ships.length) {
            DOMinstructions.textContent = MSGallShipsPlaced;
            if (callback) {
                callback();
            }
            return true;
        }

        const ship = ships[currentShipIndex];
        DOMinstructions.textContent = `Place ship - ${ship.name} ( ${ship.length} )`;

        // const DOMpointer = document.createElement('div');
        // DOMpointer.id = 'pointer';
        // DOMpointer.style.position = 'absolute';
        // DOMpointer.style.pointerEvents = 'none';

        const DOMship = document.createElement('div');
        DOMship.style.position = 'absolute';
        DOMship.style.pointerEvents = 'none';
        DOMship.id = `player1-ship${currentShipIndex}`;
        DOMship.dataset.length = ship.length;
        DOMship.dataset.orientation = 'h';
        DOMship.style.width = `${ship.length * 40}px`;
        DOMship.style.height = '40px';
        DOMship.className = 'ship';

        // DOMpointer.appendChild(DOMship);
        // document.body.appendChild(DOMpointer);
        document.body.appendChild(DOMship);

        const mouseoverHandler = (event) => {
            if (event.target.classList.contains('cell')) {
                DOMship.style.opacity = '40%';
            }
        }

        const mouseMoveHandler = (event) => {
            DOMship.style.left = `${event.pageX - 20}px`;
            DOMship.style.top = `${event.pageY - 20}px`;
            // DOMpointer.style.left = `${event.pageX - 20}px`;
            // DOMpointer.style.top = `${event.pageY - 20}px`;
        };

        const wheelHandler = () => {
            renderShipRotation(DOMship, ship.length);
        };

        const keydownHandler = (event) => {
            if (event.key === 'r') {
                renderShipRotation(DOMship, ship.length);
            }
        };

        const clickHandler = (event) => {
            if (event.target.classList.contains('cell')) {
                const x = parseInt(event.target.dataset.x);
                const y = parseInt(event.target.dataset.y);
                const shipPlaced = renderShipPlacement(player, ship, x, y, DOMship.dataset.orientation);

                if (shipPlaced) {
                    document.removeEventListener('mouseover', mouseoverHandler);
                    document.removeEventListener('wheel', wheelHandler);
                    document.removeEventListener('keydown', keydownHandler);
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('click', clickHandler);

                    DOMship.remove();
                    currentShipIndex++;
                    placeNextShip();
                }
            }
        };

        document.addEventListener('mouseover', mouseoverHandler);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('wheel', wheelHandler);
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('click', clickHandler);
    }

    function generateShipPlacement() {
        if (currentShipIndex >= ships.length) {
            DOMinstructions.textContent = MSGallShipsPlaced;
            if (callback) {
                callback();
            }
            return true;
        }

        // alert("is AI player!");

        const ship = ships[currentShipIndex];
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const orientation = Math.random() < 0.5 ? 'h' : 'v';

        const shipPlaced = renderShipPlacement(player, ship, x, y, orientation);

        if (shipPlaced) {
            currentShipIndex++;
            generateShipPlacement();
        } else {
            generateShipPlacement();
        }

    }

    player.type === 'human' ? placeNextShip() : generateShipPlacement();
}
