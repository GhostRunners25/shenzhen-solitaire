import card from "./card.js";
import { cardList, areaList } from "./common.js";

function main() {
    let allCards = [];
    let selectedCards = [];

    const scoreArea = document.getElementById(areaList.score);
    scoreArea.innerHTML = '0';
    scoreArea.onclick = () => {
        generateGame();
    }

    const selectedClass = ' selected';

    function generateGame() {
        const elementAreas = [].concat(areaList.swap, areaList.stack, areaList.special);
        elementAreas.forEach(element => {
            const children = document.getElementsByClassName(element)[0].children;
            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = cardList.symbol0.symbol;
                children[i].className = cardList.symbol0.className;
                children[i].onclick = () => { }; // change
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
            element.innerHTML = '';
            for (let x = 0; x < 5; x++) {
                const drawnCard = allCards.pop();
                element.innerHTML += `<li><p class="${drawnCard.className}">${drawnCard.symbol}</p></li>`;
            }
            const children = element.children;
            for (let x = 0; x < children.length; x++) {
                children[x].firstChild.onclick = playAreaClicked;
            }
        }
    }

    const shuffle = () => {
        for (let i = 0; i < 1000; i++) {
            const x = getRandomInt(0, allCards.length);
            const y = getRandomInt(0, allCards.length);
            const z = [allCards[x], allCards[y]];
            allCards[x] = z[1];
            allCards[y] = z[0];
        }
    }

    const selected = (element) => {
        if (element.className.includes(selectedClass)) {
            element.className = element.className.replace(selectedClass, '');
            selectedCards.pop(element);
        } else {
            element.className += selectedClass;
            selectedCards.push(element);
        }
    }

    const playAreaClicked = (event) => {
        const element = event.target;
        const parentElement = element.parentElement.parentElement;
        let elements = [];
        let valid = false;
        let digit;
        for (let i = 0; i < parentElement.children.length; i++) {
            const sibling = parentElement.children[i].firstChild;
            if (sibling === element) {
                if (i === parentElement.children.length - 1) {
                    selected(element);
                }
                else {
                    digit = parseInt(element.innerHTML);
                    valid = digit !== NaN;
                    if (valid) elements.push(element);
                }
            } else if (valid) {
                digit--;
                valid = parseInt(sibling.innerHTML) === digit;
                if (valid) elements.push(sibling);
            }
        }
        if (valid) elements.map(validElement => selected(validElement));
    }

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min; // inc min, exc max

    generateGame();
}

window.addEventListener('load', main);