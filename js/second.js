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
