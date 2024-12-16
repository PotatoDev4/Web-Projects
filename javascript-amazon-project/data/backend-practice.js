const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();



//it clicks button by itself :)
/*
const button = document.querySelector('.button1');

button.addEventListener('click', () => {
    console.log('loaded');
});


button.click();
*/