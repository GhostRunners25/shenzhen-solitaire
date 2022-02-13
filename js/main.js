import card from "./card.js";
import { cardList } from "./card-list.js";

function main() {

    const elementAreas = ['swap-area', 'special-area', 'stack-area'];
    let allCards = [];

    function generateGame() {
        elementAreas.forEach(element => {
            const children = document.getElementsByClassName(element)[0].children;
            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = cardList.symbol0.symbol;
                children[i].className = cardList.symbol0.className;
            }
        });
        allCards.push(new card(cardList.symbolS.symbol, cardList.symbolS.className));
        for (let i = 0; i < 4; i++) {
            allCards.push(new card(cardList.symbol1.symbol, cardList.symbol1.className));
            allCards.push(new card(cardList.symbol2.symbol, cardList.symbol2.className));
            allCards.push(new card(cardList.symbol3.symbol, cardList.symbol3.className));
        }
        for (let i = 1; i < 10; i++) {
            allCards.push(new card(i.toString(), cardList.symbol1.className));
            allCards.push(new card(i.toString(), cardList.symbol2.className));
            allCards.push(new card(i.toString(), cardList.symbol3.className));
        }
        shuffle();
    }

    function shuffle() {
        for (let i = 0; i < 1000; i++) {
            const x = getRandomInt(0, allCards.length);
            const y = getRandomInt(0, allCards.length);
            const z = [allCards[x], allCards[y]];
            allCards[x] = z[1];
            allCards[y] = z[0];
        }
    }

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min; // inc min, exc max

    generateGame();
}

window.addEventListener('load', main);