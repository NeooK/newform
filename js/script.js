function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch('https://api.cleanmesolutions.com/?type=search-user', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(userInfo => {
            if (userInfo.transaction_status === undefined) {
                // Значення userInfo.transaction_status є undefined
                alert("Error: No Transaction reports found!")
                console.log('Значення transaction_status є undefined');
            } else {
                // Значення userInfo.transaction_status не є undefined
                const transactionStatus = userInfo.transaction_status;

                // Відповідно до значення transactionStatus відкриваємо відповідну сторінку
                if (transactionStatus === 'failed') {
                    window.location.href = 'page-failed.html';
                } else if (transactionStatus === 'pending') {
                    window.location.href = 'page-pending.html';
                } else if (transactionStatus === 'success') {
                    window.location.href = 'page-success.html';
                } else {
                    alert("Error: No Transaction reports found!")
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



function Reload() {
    var button = document.querySelector('.btn-refresh');
    button.classList.add('clicked');

    setTimeout(function () {
        location.reload();
    }, 3000);
}

window.onload = function () {
    var button = document.querySelector('.btn-refresh');
    button.classList.remove('clicked');
}


function updateTextValue() {
    // Отримуємо значення поля введення
    var transactionId = document.getElementById("transaction_id-field").value;

    // Отримуємо посилання на елемент span
    var transOption = document.querySelector(".trans-option");

    // Оновлюємо текстовий вміст елемента span зі значенням поля введення
    transOption.innerText = "Application received. Your transaction with ID " + transactionId + " goes through several stages of processing.";
}

document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо значення з локального сховища
    var transactionId = localStorage.getItem("transactionId");

    // Отримуємо посилання на елемент span
    var transOption = document.querySelector(".trans-option");

    // Оновлюємо текстовий вміст елемента span зі значенням з локального сховища
    transOption.innerText = "Application received. Your transaction with ID " + transactionId + " goes through several stages of processing.";

    // Очищаємо значення в локальному сховищі після використання
    localStorage.removeItem("transactionId");
});