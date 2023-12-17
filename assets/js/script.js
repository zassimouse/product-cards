const LS_HIDDEN = 'hiddenProducts';
const LS_FAVOURITE = 'favouriteProducts';
const LS_COMPARISON = 'comparisonProducts';
const LS_SHOW_HIDDEN = 'isShowHidden';

const numberOfCards = document.querySelectorAll('.product-item').length;
let arrHide = Array(numberOfCards).fill(false);
let arrFavourite= Array(numberOfCards).fill(false);
let arrCompare = Array(numberOfCards).fill(false);

const cbShowHidden = document.querySelector('.input_show-hidden');
const filterButtons = document.querySelectorAll('.products-filter__button');
const btnAll = document.querySelector('.button_all');
const btnFavourites = document.querySelector('.button_favourites');
const btnComparison = document.querySelector('.button_comparison');
const listOfIconContainers = document.querySelectorAll('.product-item .icons-container');

document.addEventListener('DOMContentLoaded', getTilesStateFromLS);
window.addEventListener('beforeunload', saveTilesStateToLS);

cbShowHidden.addEventListener('click', toggleHidden);
btnAll.addEventListener('click', function() { showItems(btnAll,1); });
btnFavourites.addEventListener('click', function() { showItems(btnFavourites, 2); });
btnComparison.addEventListener('click', function() { showItems(btnComparison, 3); });

listOfIconContainers.forEach(function (item, i) {
    item.addEventListener('click', function(e) {
        let _target = e.target;
        let tile = getTileByNumber(i);
        if (_target.classList.contains('fa-eye')) {
            arrHide[i] = !arrHide[i];
            saveTilesStateToLS(1);
            getTileByNumber(i).classList.toggle('product-item_hide');
        } else if (_target.classList.contains('fa-heart')) {
            arrFavourite[i] = !arrFavourite[i];
            tile.classList.toggle('product-item_favourite');
            if (!tile.classList.contains('product-item_favourite') && getCurrentFilter() === 2) {
                tile.classList.add('product-item_hidden');
            }
            saveTilesStateToLS(2);
        } else if (_target.classList.contains('fa-scale-balanced')) {
            arrCompare[i] = !arrCompare[i];
            getTileByNumber(i).classList.toggle('product-item_compare');
            if (!tile.classList.contains('product-item_compare') && getCurrentFilter() === 3) {
                tile.classList.add('product-item_hidden');
            }
            saveTilesStateToLS(3);
        }
    });
});

function getTilesStateFromLS() {
    arrHide = JSON.parse(localStorage.getItem(LS_HIDDEN));
    arrFavourite = JSON.parse(localStorage.getItem(LS_FAVOURITE));
    arrCompare = JSON.parse(localStorage.getItem(LS_COMPARISON));
    cbShowHidden.checked = JSON.parse(localStorage.getItem(LS_SHOW_HIDDEN));
    if (!cbShowHidden.checked) toggleHidden();
    updateTilesState();
}

function updateTilesState() {
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        if (arrHide[i]) item.classList.add('product-item_hide');
        if (arrFavourite[i]) item.classList.add('product-item_favourite')
        if (arrCompare[i]) item.classList.add('product-item_compare');
    });
}

function saveTilesStateToLS(type) {
    switch (type) {
        case 1:
            localStorage.setItem(LS_HIDDEN, JSON.stringify(arrHide));
            break;
        case 2:
            localStorage.setItem(LS_FAVOURITE, JSON.stringify(arrFavourite));
            break;
        case 3:
            localStorage.setItem(LS_COMPARISON, JSON.stringify(arrCompare));
            break;
        case 4:
            localStorage.setItem(LS_SHOW_HIDDEN, JSON.stringify(cbShowHidden.checked));
            break
        default:
            localStorage.setItem(LS_HIDDEN, JSON.stringify(arrHide));
            localStorage.setItem(LS_FAVOURITE, JSON.stringify(arrFavourite));
            localStorage.setItem(LS_COMPARISON, JSON.stringify(arrCompare));
            localStorage.setItem(LS_SHOW_HIDDEN, JSON.stringify(cbShowHidden.checked));
            break;
    }
}

function unsetOtherFilterButtons(_target) {
    filterButtons.forEach(function (button) {
        if (button.dataset.filter === _target.dataset.filter) {
            button.classList.add('products-filter__button_selected');
        } else {
            button.classList.remove('products-filter__button_selected');
        }
    });
}

function getCurrentFilter() {
    let currentFilter = document.querySelector('.products-filter__button_selected');
    switch (currentFilter.dataset.filter) {
        case 'all': return 1;
        case 'favourites': return 2;
        case 'comparison': return 3;
    }
}

function getTileByNumber(n) {
    return document.querySelector(`.product-item:nth-child(${n+1})`);
}

function toggleHidden() {
    document.querySelector('.products-container').classList.toggle('products-container_hide-hidden-items');
    saveTilesStateToLS(4);
}

function showItems(obj, type) {
    unsetOtherFilterButtons(obj);
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        switch (type) {
            case 1:
                item.classList.remove('product-item_hidden');
                break;
            case 2:
                if (arrFavourite[i]) {
                    item.classList.remove('product-item_hidden');
                } else {
                    item.classList.add('product-item_hidden');
                }
                break;
            case 3:
                if (arrCompare[i]) {
                    item.classList.remove('product-item_hidden');
                } else {
                    item.classList.add('product-item_hidden');
                }
                break;
        }
    });
}