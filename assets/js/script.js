var doHide = [];
var favourite=[];
var compare = [];
var filter = document.querySelector('.filters-wrap');
var cb = document.querySelector('.cb');

filter.addEventListener('click', function (e) {

    var _target = e.target;

    if (_target.classList.contains('products-filter__button') && !_target.classList.contains('products-filter__button_selected') || (_target.classList.contains('cb'))) {

        if (_target.classList.contains('cb')) {
            _target = document.querySelector('.products-filter__button_selected');
        }
        else {
            document.querySelectorAll('.products-filter__button').forEach(function (button) {
                if (button.dataset.filter === _target.dataset.filter) {
                    button.classList.add('products-filter__button_selected');
                } else {
                    button.classList.remove('products-filter__button_selected');
                }
            });
        }

        document.querySelectorAll('.product-item').forEach(function (item, i) {

            switch (_target.dataset.filter) {
                case 'favourites':
                    if (cb.checked) {
                        if (favourite[i]) {
                            item.classList.remove('product-item_hidden');
                        } else {
                            item.classList.add('product-item_hidden');
                        }
                    }
                    // Не показыввать скрытые
                    else {
                        if (doHide[i]) {
                            item.classList.add('product-item_hidden');
                        }
                    }
                    break;
                case 'comparison':
                    // Показать скрытые
                    if (cb.checked) {
                        if (compare[i]) {
                            item.classList.remove('product-item_hidden');
                        } else {
                            item.classList.add('product-item_hidden');
                        }
                    }
                    // Не показыввать скрытые
                    else {
                        if (doHide[i]) {
                                item.classList.add('product-item_hidden');
                        }
                    }
                    break;
                case 'all':
                    // Показать скрытые
                    if (cb.checked) {
                        item.classList.remove('product-item_hidden');
                    }
                    // Не показывать скрытые
                    else {
                        if (doHide[i]){
                            item.classList.add('product-item_hidden');
                        } else {
                            item.classList.remove('product-item_hidden');
                        }
                    }
                    break;
            }
        });
    }

});

const iconsList = document.querySelectorAll(".product-item .icons-container");
for (let i = 0; i < iconsList.length; i++) {
    iconsList[i].addEventListener("click", function(e) {

        var _target = e.target;

        if (_target.classList.contains("fa-eye")) {
            _target.classList.toggle("icon_active_blue");
            doHide[i] = !doHide[i];
            getItemByNumber(i)
        } else if (_target.classList.contains("fa-heart")) {
            _target.classList.toggle("icon_active_red");
            favourite[i] = !favourite[i];
        } else if (_target.classList.contains("fa-scale-balanced")) {
            _target.classList.toggle("icon_active_blue")
            compare[i] = !compare[i];
        }
    });
}

function getItemByNumber(n) {
    document.querySelectorAll('.product-item').forEach(function (item, i) {
        if (i === n) {
            item.classList.toggle('product-item_semitransparent');
            if (cb.checked === false) {
                item.classList.add('product-item_hidden');
            }
        }
    });
}
