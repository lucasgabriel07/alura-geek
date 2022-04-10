const dropZone = document.querySelector('.form__drop');
const input = document.getElementById('file');

function preview(file) {
    const validTypes = ['image/jpg', 'image/png', 'image/jpeg'];

    if (validTypes.includes(file.type)) {
        const fileReader = new FileReader();
        
        fileReader.onload = () => {
            const fileURL = fileReader.result;
            dropZone.innerHTML = '';
            dropZone.style.backgroundImage = `url('${fileURL}')`;
        }
        
        fileReader.readAsDataURL(file);
    }
}

dropZone.ondrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    preview(file);
}

dropZone.ondragover = (event) => {
    event.preventDefault();
}

input.addEventListener('change', () => {
    const file = input.files[0];
    preview(file);
});