const priceInput = document.getElementById('product-price');

const args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: 'R$ ',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'move'
};

const mask = SimpleMaskMoney.setMask(priceInput, args)

priceInput.oninput = () => {
    input.value = SimpleMaskMoney.format(input.value);
}

priceInput.onkeyup = (event) => {
    if (event.key !== "Enter") return;
    SimpleMaskMoney.formatToNumber(input.value);
}