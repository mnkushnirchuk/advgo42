
/*------FORM-----*/
document.addEventListener('DOMContentLoaded', function () {
    function submitForm(event) {
        event.preventDefault();

        var form = document.querySelector('.form_information');
        var changeForm = document.querySelector('.change_form');
        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "https://formsubmit.co/ajax/mnkushnirchukwork@gmail.com", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    console.log(response);

                    form.style.display = 'none';
                    changeForm.style.display = 'block';
                } else {
                    console.error('Error:', xhr.statusText);
                }
            }
        };

        xhr.send(formData);
    }

    document.getElementById('myForm').addEventListener('submit', submitForm);
});


/*------MENU-------*/
const iconMenu = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.nav');
const body = document.body;

function menuToggle() {
    body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');

    if (menuBody && iconMenu) {
        if (menuBody.classList.contains('_active')) {
            menuBody.addEventListener('click', menuClose);
            body.addEventListener('click', outsideClickHandler);
        } else {
            menuBody.removeEventListener('click', menuClose);
            body.removeEventListener('click', outsideClickHandler);
        }
    }
}
function menuClose(e) {
    if (e.target.tagName === 'A') {
        menuToggle();
        body.classList.remove('_lock');
    }
}

function outsideClickHandler(e) {
    if (menuBody && iconMenu && !menuBody.contains(e.target) && !iconMenu.contains(e.target)) {
        menuToggle();
        body.classList.remove('_lock');          
    }
}

if (iconMenu) {
    iconMenu.addEventListener('click', menuToggle);
}

/*------PAGINATION--------*/
document.addEventListener('DOMContentLoaded', function () {
    var cardItems = document.querySelectorAll('.card_item_wbutton');
    var paginationContainer = document.querySelector('.pagination');
    var currentPage = 0;

    function showPage(page) {
        cardItems.forEach(function (item, index) {
            if (index === page) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        updatePaginationDots();
    }

    function updatePaginationDots() {
        var paginationDots = '';
        for (var i = 0; i < cardItems.length; i++) {
            paginationDots += '<div class="pagination-dot ' + (i === currentPage ? 'active' : '') + '"></div>';
        }
        paginationContainer.innerHTML = paginationDots;

        var dots = document.querySelectorAll('.pagination-dot');
        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                currentPage = index;
                showPage(currentPage);
            });
        });
    }

    function setupPagination() {
        if (window.innerWidth <= 768) {
            paginationContainer.style.display = 'flex';
            showPage(currentPage);
        } else {
            paginationContainer.style.display = 'none';
            
            // При возвращении величины, покажем все карточки
            cardItems.forEach(function (item) {
                item.style.display = 'flex';
            });
        }
    }

    window.addEventListener('resize', function () {
        setupPagination();
    });

    setupPagination();
});
