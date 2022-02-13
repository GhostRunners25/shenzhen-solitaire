import card from "./card.js";
import { cardList } from "./card-list.js";

function main() {

    const elementAreas = ['swap-area', 'special-area', 'stack-area'];

    function generateGame() {
        elementAreas.forEach(element => {
            const children = document.getElementsByClassName(element)[0].children;
            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = cardList.symbol0.symbol;
                children[i].className = cardList.symbol0.className;
            }
        });
    }

    generateGame();
}

window.addEventListener('load', main);