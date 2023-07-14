function handleSubmit(event) {
    // event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch('https://transactions.report/?type=search-user', {
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
                // window.location.href = 'page-loading.html';


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




// export { handleSubmit }