document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("What's your name ?");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = 'Gamer';

    } else {

        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector(".control-buttons").remove();

}

// Making shuffle on cards

let duration = 1000;

let blocksContainer = document.querySelector(".game-memroy-blocks");

let blocks = Array.from(blocksContainer.children); // To make it Array

let orderRange = [...Array(blocks.length).keys()]; // another way => let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add order Css property to Game Blocks

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {

        flipBlock(block);

    });

});

// Flip block function

function flipBlock(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}

// Shuffle Function

function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;

    }

    return array;

}

// Stop Clicking
function stopClicking() {

    blocksContainer.classList.add('no-clicking');


    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

// Check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout (() => {
            
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        }, duration);

    }

}
