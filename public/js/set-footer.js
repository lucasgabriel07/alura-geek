const footerContent = `
    <div class="footer__container">
    <a href='./'><img src="assets/logo.png" alt="Logo da Alura Geek" class="footer__img"></a>

    <ul class="footer__links">
    <li><a href="#" class="footer__link">Quem somos nós</a></li>
    <li><a href="#" class="footer__link">Política de privacidade</a></li>
    <li><a href="#" class="footer__link">Programa de fidelidade</a></li>
    <li><a href="#" class="footer__link">Nossas lojas</a></li>
    <li><a href="#" class="footer__link">Quero ser franqueado</a></li>
    <li><a href="#" class="footer__link">Anuncie aqui</a></li>
    </ul>

    <form class="footer__form">
    <h3 class="form__title">Fale conosco</h3>
    
    <div class="form__fields">
        <div class="form__field">
        <input type="text" name="Nome" id="name" class="form__input" placeholder="Nome" required
        maxlength="40">
        <label for="name" class="form__label">Nome</label>
        </div>
        
        <div class="form__field">
        <textarea name="Mensagem" id="message" cols="30" rows="3" class="form__input" 
        placeholder="Escreva sua mensagem" required maxlength="120"></textarea>
        <label for="message" class="form__label">Escreva sua mensagem</label>
        </div>
    </div>
    
    <button type="submit" class="form__submit button">Enviar mensagem</button>
    </form>
    </div>

    <div class="footer__dev">
    <p>Desenvolvido por Lucas Gabriel</p>
    <p>2022</p>
    </div>
`

const footer = document.querySelector('footer');

footer.innerHTML = footerContent;