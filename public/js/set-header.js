const headerContent = `
    <a href="./"><img src="assets/logo.png" alt="Logo da AluraGeek" class="header__logo"></a>
    <form class="header__search">
    <input class="header__search-input" type="text" name="search" id="search" 
    placeholder="O que deseja encontrar?" >
    <input class="header__search-button" type="submit" value="">
    </form>
    <a href="login" class="header__login-button button">Login</a>
    <button class="header__search-button--mobile"></button>
    <button class="header__search-button--close header__search-button--hidden"></button>
`

const header = document.querySelector('header');

header.innerHTML = headerContent;