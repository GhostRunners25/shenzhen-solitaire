function main() {

    const symbol0 = '▯';
    const symbol1 = '#';
    const symbol2 = '&';
    const symbol3 = '$';
    const symbolS = '%';

    const elementAreas = ['swap-area', 'special-area', 'stack-area'];

    function generateGame() {
        elementAreas.forEach(element => {
            const children = document.getElementsByClassName(element)[0].children;
            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = symbol0;
                children[i].className = 'blank';
            }
        });
    }

    generateGame();
}

window.addEventListener('load', main);