const searchBar = document.querySelector('.header__search');
const input = document.querySelector('.header__search-input');

searchBar.addEventListener('submit', async(event) => {
    event.preventDefault();
    const search = input.value;
    if (search.trim() !== '') {
        window.location.href = `produtos?search=${search}`;
    }
});

const openButton = document.querySelector('.header__search-button--mobile');
const closeButton = document.querySelector('.header__search-button--close');

openButton.onclick = () => {
    searchBar.classList.add('header__search--shown');
    openButton.classList.add('header__search-button--hidden');
    closeButton.classList.remove('header__search-button--hidden');
}

closeButton.onclick = () => {
    searchBar.classList.remove('header__search--shown');
    closeButton.classList.add('header__search-button--hidden');
    openButton.classList.remove('header__search-button--hidden');
}