import { main } from '../src/index';

describe("gameloop test", () => {
    
    beforeEach(() => {
        // Set up the DOM
        document.body.innerHTML = `
            <header>
                <h1>Battleship</h1>
                <p id="instructions">Select a tile</p>
            </header>
            <main>
                <div id="player-1" class="player"></div>
                <div id="player-2" class="player"></div>
            </main>
        `;
    });

    test("dummy", () => {
        expect(1 + 1).toBe(2);
    });

    test("main function runs without errors", () => {
        expect(() => main()).not.toThrow();
    });

    test('jsdom environment is working', () => {
        expect(typeof document).toBe('object');
        expect(typeof window).toBe('object');
    });
});
