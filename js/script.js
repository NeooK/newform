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

                // Запускаємо анімацію
                new SegmentedProgress(".sp", ".status", userInfo);

            }

        })
        .catch(error => {
            console.log('Помилка:', error);
        });
}
const form = document.querySelector('.js-send-form');
form.addEventListener('submit', handleSubmit);
