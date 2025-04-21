import "./styles.css";
import {Ship, Gameboard, Player} from './components.js';
import {renderPlayer, renderShipRotation, renderShipPlacement, renderBoardSetup} from './renderer.js';

function createShips() {
    return [
        new Ship('Carrier', 5),
        new Ship('Battleship', 4),
        new Ship('Cruiser', 3),
        new Ship('Submarine', 3),
        new Ship('Destroyer', 2)
    ];
}

function setupPlayers() {
    const shipsPlayer1 = createShips();
    const shipsPlayer2 = createShips();

    // Game start
    const { player: player1, DOMplayer: DOMplayer1, DOMgameboard: DOMgameboard1 } = renderPlayer("Player 1", "human", "#player-1");
    const { player: player2, DOMplayer: DOMplayer2, DOMgameboard: DOMgameboard2 } = renderPlayer("Player 2", "ai", "#player-2");

    return { shipsPlayer1, shipsPlayer2, player1, DOMplayer1, DOMgameboard1, player2, DOMplayer2, DOMgameboard2 };
}

async function setupBoards({shipsPlayer1, shipsPlayer2, player1, DOMgameboard1, player2, DOMgameboard2}) {

    return new Promise((resolve) => {

        const setupPlayer1 = () => {
            DOMgameboard1.classList.toggle("active");

            renderBoardSetup(player1, shipsPlayer1, () => {
                DOMgameboard1.classList.toggle("active");
                DOMgameboard2.classList.toggle("active");
                setupPlayer2();
            });
        };

        const setupPlayer2 = () => {
            renderBoardSetup(player2, shipsPlayer2, () => {
                alert("Both boards are set up. Game ready to start!");
                resolve();
            });
        };
    
        setupPlayer1();
    });
}

function gameLoop({ships, player1, DOMgameboard1, player2, DOMgameboard2}) {

    const startGame = (currentPlayer) => {
        // if areShipsAllSunk of either side, then we found a winner 
        // let currentPlayer = 1;

        const targetPlayer = currentPlayer === 1 
            ? player2 
            : player1;

        if (targetPlayer.gameboard.areShipsAllSunk()) {
            alert(`end game, player ${currentPlayer} wins`);
        }

        const DOMinstructions = document.querySelector("#instructions");

        DOMinstructions.textContent = 'Select a cell to send missile';

        const switchPlayer = () => {
            DOMgameboard1.classList.toggle("active");
            DOMgameboard2.classList.toggle("active");
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            console.log(currentPlayer);
            return currentPlayer;
        }

        const handleAttack = (event) => {
            if (event.target.classList.contains('cell') && !event.target.classList.contains('attacked')) {
                
                const x = parseInt(event.target.dataset.x);
                const y = parseInt(event.target.dataset.y);

                const hit = targetPlayer.gameboard.receiveAttack(x,y);
                console.log(`Player ${currentPlayer}: ${x},${y} | hit: ${hit}`);

                document.removeEventListener('click', handleAttack);

                if (hit) {
                    event.target.classList.add('hit');
                }
                event.target.classList.add('attacked');

                const nextPlayer = switchPlayer();                
                startGame(nextPlayer);
            }
        }

        // BUG - AI PLAYER SEEMS TO BE ABLE TO SUNK PLAYER SHIP A LOT FASTER -- NEED TO DOUBLE CHECK ARE BOTH SHIPS SEPARATED
        // CHECK WINNING CONDITIONS, ARE BOTH SHIPS LINKED TO SAME ARRAY?
        const aiAttack = () => {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const targetCell = DOMgameboard1.querySelector(`[data-x="${x}"][data-y="${y}"]`);

            if (targetCell.classList.contains('attacked')) {
                aiAttack();
                return;
            }

            const hit = targetPlayer.gameboard.receiveAttack(x,y);
            console.log(`Player ${currentPlayer}: ${x},${y} | hit: ${hit}`);

            if (hit) {
                targetCell.classList.add('hit');
            }
            targetCell.classList.add('attacked');

            const nextPlayer = switchPlayer();                
            startGame(nextPlayer);
        }

        if (targetPlayer.type === 'ai') {
            document.addEventListener("click", handleAttack);
        } else {
            aiAttack();
            // alert('AI turn');
            // document.addEventListener("click", handleAttack);
        }
    }

    let currentPlayer = 1;

    startGame(currentPlayer);

}

async function main() {
    
    const players = setupPlayers();
    await setupBoards(players);
    gameLoop(players);
    
    //GameLoop 
        // Player 1 - click on Player 2 - tiles to attack
    /* 
    Next couple steps:
    1- Player 1 - place ships on grid
    2- Player 2 ( Bot ) - automatically place ships
    3- Once ready - User clicks on "Play to start the game"
    4- Player 1 - expected to click on the grid
        5- Marks whether a ship is hit 
        6- Condition checks
    5- Till winner is found    
    */ 

    // Ensure both boards are visible
    // board1.style.display = "block";
    // board2.style.display = "block";
    // const board1 = player1.querySelector(".gameboard");
    // const board2 = player2.querySelector(".gameboard");

    // Set up gameboard ( render )
    // Player 1 vs 2 selection 
    // LOOP Player 1, waiting for click 
    // Check and declare winner
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});