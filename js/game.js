const game = document.querySelector('#root');
let panel = undefined;
let scoreBoard = undefined;
let studio = undefined;
const moves = {
    'Rock': 0, 
    'Paper': 1, 
    'Scissors': 2,
    0: 'rock',
    1: 'paper',
    2: 'scissors'
};

const states = {
    free: true,
    playingMoveAnim: false,
    showingResult: false
}

scores = [0, 0];

const createGame = function() {
    if (game === null)
        return;

    scoreBoard = createScoreBoard();
    studio = createStudio();
    panel = createGamePanel();
}

const createScoreBoard = function() {
    const scoreBoard = document.createElement('div');
    const player = document.createElement('div');
    const computer = document.createElement('div');

    scoreBoard.append(player, computer);

    scoreBoard.classList.add('scoreboard');
    player.classList.add('playerscore');
    computer.classList.add('computerscore');

    player.innerHTML = '0';
    computer.innerHTML = '0';

    game.append(scoreBoard);

    return {player, computer};
}

const createStudio = function() {
    const studio = document.createElement('div');
    studio.classList.add('studio');

    const player = document.createElement('div');
    const computer = document.createElement('div');

    player.classList.add('player_avatar');
    computer.classList.add('computer_avatar');

    player.style.backgroundImage = 'url(img/game/rock.png)';
    computer.style.backgroundImage = 'url(img/game/rock.png)';

    studio.append(player, computer);
    game.append(studio);

    return {player, computer};
}

const startPreAnimation = function() {
    studio.player.style.backgroundImage = 'url(img/game/rock.png)';
    studio.computer.style.backgroundImage = 'url(img/game/rock.png)';

    studio.player.style.animation = 'shake .3s linear 0s 3 normal';
    studio.computer.style.animation = 'shake1 .3s linear 0s 3 normal';
}

const startPostAnimation = function(move, movec) {
    studio.player.style.backgroundImage = `url(img/game/${moves[move]}.png)`;
    studio.computer.style.backgroundImage = `url(img/game/${moves[movec]}.png)`;

    studio.player.style.animationName = 'finish';
    studio.computer.style.animationName = 'finish';
}

const showResults = function() {
    states.free = true;
}

const createGamePanel = function() {
    const panel    = document.createElement('div');
    const rock     = document.createElement('div');
    const paper    = document.createElement('div');
    const scissors = document.createElement('div');

    panel.classList.add('panel')
    rock.textContent = 'Rock';
    paper.textContent = 'Paper';
    scissors.textContent = 'Scissors';

    panel.append(rock, paper, scissors);
    game.append(panel);

    rock.addEventListener('click', makeMove);
    paper.addEventListener('click', makeMove);
    scissors.addEventListener('click', makeMove);

    return panel;
}

const makeMove = function(event) {
    const move = moves[event.target.textContent];
    if (states.free) {
        let sound = new Audio('js/click.wav');
        sound.play();
        states.free = false;

        const movec =  Math.round(Math.random() * 2);

        startAnim(move, movec);
    }
}

const startAnim = function(move, movec) {
    states.playingMoveAnim = true;
    startPreAnimation();
    setTimeout(() => {
        startPostAnimation(move, movec);
        states.playingMoveAnim = false;

        if (move != movec) {
            if ((move == 0 && movec == 2) || (move == 1 && movec == 0) || (move == 2 && movec == 1)  )
                scoreBoard.player.innerHTML++;
            else
                scoreBoard.computer.innerHTML++;
        }

        showResults();
    }, 900);
}



document.addEventListener('DOMContentLoaded', createGame);