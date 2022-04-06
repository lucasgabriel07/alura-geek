const searchBar = document.querySelector('.header__search');
const mobileSearchBar = document.querySelector('.header__search--mobile');
const input = document.querySelector('.header__search-input');

const search = async(event) => {
    event.preventDefault();
    const search = input.value;
    if (search.trim() !== '') {
        window.location.href = `produtos.html?search=${search}`;
    }
}

searchBar.addEventListener('submit', search)
mobileSearchBar.addEventListener('submit', search)

const button = document.querySelector('.header__search-button--mobile');

button.onclick = () => {
    console.log('ok');
    mobileSearchBar.classList.add('header__search--show');
    button.style.visibility = 'hidden';
}