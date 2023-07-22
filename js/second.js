function Reload() {
    var button = document.querySelector('.reload-button');
    button.classList.add('clicked');

    document.querySelector('#rAn').classList.remove('hide');
    setTimeout(function () {
        location.reload();
    }, 3000);
}

window.onload = function () {
    var button = document.querySelector('.reload-button');
    button.classList.remove('clicked');
}