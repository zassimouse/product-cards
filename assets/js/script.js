const numberOfCards = document.querySelectorAll('.product-item').length;
let arrHide = Array(numberOfCards).fill(false);
let arrFavourite= Array(numberOfCards).fill(false);
let arrCompare = Array(numberOfCards).fill(false);

const cbShowHidden = document.querySelector(".input_show-hidden");
const btnAll = document.querySelector(".button_all");
const btnFavourites = document.querySelector(".button_favourites");
const btnComparison = document.querySelector(".button_comparison");

document.addEventListener('DOMContentLoaded', getTilesStateFromLS);
window.addEventListener('beforeunload', saveTilesStateToLS);

btnAll.addEventListener('click', showAll);
btnFavourites.addEventListener('click', showFavourites);
btnComparison.addEventListener('click', showCompare);


function getTilesStateFromLS() {
    if (localStorage.getItem('hiddenProducts') && localStorage.getItem('favouriteProducts') && localStorage.getItem('comparisonProducts')) {
        arrHide = JSON.parse(localStorage.getItem('hiddenProducts'));
        arrFavourite = JSON.parse(localStorage.getItem('favouriteProducts'));
        arrCompare = JSON.parse(localStorage.getItem('comparisonProducts'));
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

function saveTilesStateToLS() {
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



