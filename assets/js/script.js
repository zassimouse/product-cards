const numberOfCards = document.querySelectorAll('.product-item').length;
let arrHide = Array(numberOfCards).fill(false);
let arrFavourite= Array(numberOfCards).fill(false);
let arrCompare = Array(numberOfCards).fill(false);

const cbShowHidden = document.querySelector(".input_show-hidden");
const btnAll = document.querySelector(".button_all");
const btnFavourites = document.querySelector(".button_favourites");
const btnComparison = document.querySelector(".button_comparison");

document.addEventListener('DOMContentLoaded', getTilesState);
window.addEventListener('beforeunload', saveTilesState);

btnAll.addEventListener('click', showAll);
btnFavourites.addEventListener('click', showFavourites);
btnComparison.addEventListener('click', showCompare);


function getTilesState() {
    let count = 0;
    if (localStorage.getItem('hiddenProducts')) {
        arrHide = JSON.parse(localStorage.getItem('hiddenProducts'));
        count++;
    }
    if (localStorage.getItem('favouriteProducts')) {
        arrFavourite = JSON.parse(localStorage.getItem('favouriteProducts'));
        count++;
    }
    if (localStorage.getItem('comparisonProducts')) {
        arrCompare = JSON.parse(localStorage.getItem('comparisonProducts'));
        count++;
    }
    if (count > 0) {
        updateTilesState();
    }
}

function updateTilesState() {
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        if (arrHide[i]) {
            item.classList.add('product-item_hide');
        }
        if (arrFavourite[i]) {
            item.classList.add('product-item_favourite');
        }
        if (arrCompare[i]) {
            item.classList.add('product-item_compare');
        }
    });
}

function saveTilesState() {
    localStorage.setItem('hiddenProducts', JSON.stringify(arrHide));
    localStorage.setItem('favouriteProducts', JSON.stringify(arrFavourite));
    localStorage.setItem('comparisonProducts', JSON.stringify(arrCompare));
}

function unsetOtherFilterButtons(_target) {
    document.querySelectorAll('.products-filter__button').forEach(function (button) {
        if (button.dataset.filter === _target.dataset.filter) {
            button.classList.add('products-filter__button_selected');
        } else {
            button.classList.remove('products-filter__button_selected');
        }
    });
}

cbShowHidden.addEventListener('click', function (e) {
    document.querySelector('.products-container').classList.toggle("products-container_hide-hidden-items");
});


function showAll() {
    unsetOtherFilterButtons(this);
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        item.classList.remove('product-item_hidden');
    });
}

function showFavourites() {
    unsetOtherFilterButtons(this);
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        if (arrFavourite[i]) {
            item.classList.remove('product-item_hidden');
        } else {
            item.classList.add('product-item_hidden');
        }
    });
}

function showCompare() {
    unsetOtherFilterButtons(this);
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        if (arrCompare[i]) {
            item.classList.remove('product-item_hidden');
        } else {
            item.classList.add('product-item_hidden');
        }
    });
}

function getTileByNumber(n) {
    return document.querySelector(`.product-item:nth-child(${n+1})`);
}

const listOfIconContainers = document.querySelectorAll(".product-item .icons-container");
listOfIconContainers.forEach(function (item, i) {
    item.addEventListener("click", function(e) {
        var _target = e.target;
        if (_target.classList.contains("fa-eye")) {
            arrHide[i] = !arrHide[i];
            getTileByNumber(i).classList.toggle('product-item_hide');
        } else if (_target.classList.contains("fa-heart")) {
            arrFavourite[i] = !arrFavourite[i];
            getTileByNumber(i).classList.toggle('product-item_favourite');
        } else if (_target.classList.contains("fa-scale-balanced")) {
            arrCompare[i] = !arrCompare[i];
            getTileByNumber(i).classList.toggle('product-item_compare');
        }
    });
});



