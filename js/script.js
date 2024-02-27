const moreButton = document.querySelectorAll(".trips__item__top__text__bottom__btn");
const moreText = document.querySelectorAll(".trips__item__description");
const messageButtton = document.querySelector(".communication__message");
const phoneButton = document.querySelector(".communication__phone");
const phoneBlock = document.querySelector(".communication__call");
const token = "6871475456:AAHH6MTC393KAiNbWu8bASLbmCQInxNfLVU";
const chatId = "-1002032362184";
const URIAPI = `https://api.telegram.org/bot${token}/sendMessage`;
const form = document.querySelector(".questions__main__form");
const callForm = document.querySelector(".communication__call");
let trips = [];
let isMessageOpen = false;
let isPhoneOpen = false;

for(let i = 0; i < moreButton.length; i++){
    trips[i] = false;
}

const fadeIn = (el, timeout, display) =>{
    el.style.opacity = 0;
    el.style.display = display || 'flex';
    el.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) =>{
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = 'none';
    },timeout);
};

moreButton.forEach( (button, i) => {
    button.addEventListener("click", function(){
        if(trips[i]){
                moreText[i].classList.remove("open");
                button.textContent = "Подробнее";
                trips[i] = false;
        }else{
                moreText[i].classList.add("open");
                button.textContent = "Скрыть";
                trips[i] = true;
        }
    })
});

messageButtton.addEventListener("click", function(){
    if(isMessageOpen){
        document.getElementById("telegram").style.bottom = `10vh`;
        document.getElementById("whatsapp").style.bottom = `10vh`;
        document.getElementById("phonecomm").style.bottom = `10vh`;
        document.getElementById("messageImg").src = `./img/message.svg`;
        messageButtton.classList.remove("open");
        isMessageOpen = false;
    }else{
        document.getElementById("telegram").style.bottom = `calc(10vh + 160px)`;
        document.getElementById("whatsapp").style.bottom = `calc(10vh + 90px)`;
        document.getElementById("phonecomm").style.bottom = `calc(10vh + 230px)`;
        document.getElementById("messageImg").src = `./img/close.svg`;
        messageButtton.classList.add("open");
        isMessageOpen = true;
    }
});

phoneButton.addEventListener("click", function(){
    if(isPhoneOpen){
        phoneBlock.classList.remove("open");
        document.getElementById("phoneImg").src = `./img/phone.svg`;
        phoneButton.classList.remove("open");
        isPhoneOpen = false;
    }else{
        phoneBlock.classList.add("open");
        document.getElementById("phoneImg").src = `./img/close.svg`;
        phoneButton.classList.add("open");
        isPhoneOpen = true;
    }
});

document.querySelector(".options__item__bottom__btn").addEventListener("click", function(){
    window.location.href = "https://www.innopolistravel.com";
});

form.addEventListener("submit", function(e){
    e.preventDefault();
    let isError = false;
    let message = `<b>Заявка с сайта</b>\n`;
    message += `<b>Имя: </b>${document.getElementById("name").value}\n`;
    message += `<b>Телефон: </b>${document.getElementById("tel").value}\n`;
    message += `<b>Почта: </b>${document.getElementById("mail").value}\n`;

    axios.post(URIAPI, {
        chat_id: chatId,
        parse_mode: 'html',
        text: message
    })
    .catch(function (error) {
        console.log(error);
        isError = true;
    })
    if(!isError){
        fadeIn(document.querySelector(".send-message"), 1000);
        fadeOut(document.querySelector(".send-message"), 1000);
        document.getElementById("name").value = '';
        document.getElementById("tel").value = '';
        document.getElementById("mail").value = '';
    }else{
        fadeIn(document.querySelector(".send-message"), 1000);
        document.querySelector(".send-message").textContent = "Ошибка при отправке";
        fadeOut(document.querySelector(".send-message"), 1000);
    }
});

callForm.addEventListener("submit", function(e){
    e.preventDefault();
    let isError = false;
    let message = `<b>Заказ звонка с сайта</b>\n`;
    message += `<b>Телефон: </b>${document.getElementById("call").value}\n`;
    axios.post(URIAPI, {
        chat_id: chatId,
        parse_mode: 'html',
        text: message
    })
    .catch(function (error) {
        console.log(error);
        isError = true;
    })
    if(!isError){
        fadeIn(document.querySelector(".send-message"), 1000);
        fadeOut(document.querySelector(".send-message"), 1000);
        document.getElementById("call").value = '';
    }else{
        fadeIn(document.querySelector(".send-message"), 1000);
        document.querySelector(".send-message").textContent = "Ошибка при отправке";
        fadeOut(document.querySelector(".send-message"), 1000);
    }

});

let inputs = document.getElementById("call");
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

let inputsTwo = document.getElementById("tel");
im.mask(inputsTwo);