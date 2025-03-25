import "./styles.css";
import {Ship, Gameboard, Player} from './components.js';
import {renderPlayer, renderRotateShip, renderPlaceShip} from './renderer.js';

export function main() {
    
    // Game start
    const { player: player1, DOMplayer: DOMplayer1, DOMgameboard: DOMgameboard1 } = renderPlayer("Player 1", "#player-1");
    const { player: player2, DOMplayer: DOMplayer2, DOMgameboard: DOMgameboard2 } = renderPlayer("Player 2", "#player-2");

    const ships = [
        new Ship('Carrier', 5),
        new Ship('Battleship', 4),
        new Ship('Cruiser', 3),
        new Ship('Submarine', 3),
        new Ship('Destroyer', 2)
    ];

    const DOMinstructions = document.querySelector("#instructions");

    DOMinstructions.textContent = 'Place ship - Carrier ( 5 )';

    const shipLength = 5;

    const DOMship = document.createElement('div');
    DOMship.id = 'player1-ship0';
    DOMship.dataset.length = shipLength;
    DOMship.dataset.orientation = 'h';
    DOMship.className = 'ship';
    // DOMship.classList.add = 'length-5';
    // DOMship.style.position = 'absolute';

    const DOMpointer = document.createElement('div');
    DOMpointer.id = 'pointer';
    DOMpointer.style.position = 'absolute';
    DOMpointer.style.pointerEvents = 'none';
    DOMpointer.appendChild(DOMship);
    document.body.appendChild(DOMpointer);

    document.addEventListener('mousemove', (event) => {
        DOMpointer.style.left = `${event.pageX - 20}px`;
        DOMpointer.style.top = `${event.pageY - 20}px`;
    });

    document.addEventListener('wheel', (event) => {
        renderRotateShip(DOMship, DOMship.dataset.length);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            renderRotateShip(DOMship, DOMship.dataset.length);
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            const x = parseInt(event.target.dataset.x);
            const y = parseInt(event.target.dataset.y);
            renderPlaceShip(player1, ships[0], x ,y ,DOMship.dataset.orientation ,shipLength);
        }
    }, { once: false });

    

    // Ensure both boards are visible
    // board1.style.display = "block";
    // board2.style.display = "block";
    // const board1 = player1.querySelector(".gameboard");
    // const board2 = player2.querySelector(".gameboard");

    DOMgameboard2.classList.add("disabled");

    // Set up gameboard ( render )

    // Player 1 vs 2 selection 

    // LOOP Player 1, waiting for click
    
    // Check and declare winner 

}

document.addEventListener("DOMContentLoaded", () => {
    main();
});