import card from "./card.js";
import { cardList, areaList } from "./common.js";

function main() {
    let allCards = [];

    const scoreArea = document.getElementById(areaList.score);
    scoreArea.innerHTML = '0';
    scoreArea.onclick = () => {
        generateGame();
    }

    function generateGame() {
        const elementAreas = [].concat(areaList.swap, areaList.stack, areaList.special);
        elementAreas.forEach(element => {
            const children = document.getElementsByClassName(element)[0].children;
            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = cardList.symbol0.symbol;
                children[i].className = cardList.symbol0.className;
                children[i].onclick = clicked;
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
        for (let i = 1; i < 9; i++) {
            const element = document.getElementById(`play-area-stack-${i}`);
            let innerHTML = '';
            for (let x = 0; x < 5; x++) {
                const drawnCard = allCards.pop();
                innerHTML += `<li><p class="${drawnCard.className}">${drawnCard.symbol}</p></li>`;
            }
            element.innerHTML = innerHTML;
            const children = element.children;
            for (let x = 0; x < children.length; x++) {
                children[x].firstChild.onclick = clicked;
            }
        }
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

    function clicked(event) {
        const element = document.getElementById(event.target.id);
        console.log(event);
    }

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min; // inc min, exc max

    generateGame();
}

window.addEventListener('load', main);