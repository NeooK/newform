document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".js-send-form");
    const depositRadio = document.getElementById("radioTwo");

    form.addEventListener("submit", function (event) {
        if (depositRadio.checked) {
            event.preventDefault();
            window.location.href = 'failed-page.html';
        }
    });
});

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch('https://api.inderio.com/?type=search-user', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(userInfo => {
            if (userInfo.transaction_status === undefined) {
                // Значення userInfo.transaction_status є undefined
                console.log('Значення transaction_status є undefined');
            } else {
                // Значення userInfo.transaction_status не є undefined
                const transactionStatus = userInfo.transaction_status;

                // Відповідно до значення transactionStatus відкриваємо відповідну сторінку
                if (transactionStatus === 'failed') {
                    window.location.href = 'failed-page.html';
                } else if (transactionStatus === 'pending') {
                    window.location.href = 'pending-page.html';
                } else if (transactionStatus === 'success') {
                    window.location.href = 'success-page.html';
                } else {
                    console.log('Невідомий статус транзакції');
                }
            }

        })
        .catch(error => {
            console.log('Помилка:', error);
        });
}


const form = document.querySelector('.js-send-form');
form.addEventListener('submit', handleSubmit);
