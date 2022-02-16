import card from "./card.js";
import { cardList, areaList } from "./common.js";

function main() {
    let allCards = [];
    let selectedCards;

    const selectedClassName = ' selected';

    const scoreArea = document.getElementById(areaList.score);
    scoreArea.innerHTML = '0';
    scoreArea.onclick = () => {
        generateGame();
    }

    function generateGame() {
        selectedCards = [];
        generateTopArea();
        generateCards();
        shuffleCards(1000);
        drawCards();
    }

    const generateTopArea = () => {
        const topElementAreas = [].concat(areaList.swap, areaList.stack, areaList.special);
        topElementAreas.forEach(element => {
            const children = document.getElementsByClassName(element)[0].children;
            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = cardList.symbol0.symbol;
                children[i].className = cardList.symbol0.className;
                children[i].onclick = () => { }; // change
            }
        });
    }

    const generateCards = () => {
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
    }

    const shuffleCards = (amount) => {
        for (let i = 0; i < amount; i++) {
            const x = getRandomInt(0, allCards.length);
            const y = getRandomInt(0, allCards.length);
            const z = [allCards[x], allCards[y]];
            allCards[x] = z[1];
            allCards[y] = z[0];
        }
    }

    const drawCards = () => {
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

    const selectCard = (element) => {
        if (element.className.includes(selectedClassName)) {
            element.className = element.className.replace(selectedClassName, '');
            selectedCards.pop(element);
        } else {
            element.className += selectedClassName;
            selectedCards.push(element);
        }
    }

    const playAreaClicked = (event) => {
        const element = event.target;
        const parentElement = element.parentElement.parentElement;
        let elements = [];
        let data = {
            digit: NaN,
            className: '',
            valid: false,
        }
        if (element !== selectedCards[0]) {
            selectedCards.map(oldCard => {
                oldCard.className = oldCard.className.replace(selectedClassName, '');
            });
            selectedCards = [];
        }
        for (let i = 0; i < parentElement.children.length; i++) {
            const sibling = parentElement.children[i].firstChild;
            if (sibling === element) {
                if (i === parentElement.children.length - 1) {
                    selectCard(element);
                }
                else {
                    data.digit = parseInt(element.innerHTML);
                    data.className = element.className;
                    data.valid = data.digit !== NaN;
                    if (data.valid) elements.push(element);
                }
            } else if (data.valid) {
                data.digit--;
                data.valid = parseInt(sibling.innerHTML) === data.digit && sibling.className !== data.className;
                data.className = sibling.className;
                if (data.valid) elements.push(sibling);
            }
        }
        if (data.valid) elements.map(validElement => selectCard(validElement));
        selectedCards.map(selectedCard => {
            selectedCard.className = selectedCard.className.replace(selectedClassName, '');
        });
        setTimeout(syncSelectedAnimations, 100);
    }

    const syncSelectedAnimations = () => {
        selectedCards.map(selectedCard => {
            selectedCard.className += selectedClassName;
        })
    }

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min; // inc min, exc max

    generateGame();
}

window.addEventListener('load', main);