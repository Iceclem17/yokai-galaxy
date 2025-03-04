document.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('mouseover', function() {
        const name = this.getAttribute('data-name');
        this.title = name;
    });

    pin.addEventListener('click', function() {
        const info = this.getAttribute('data-info');
        document.getElementById('pin-info').innerText = info;
    });
});

document.querySelectorAll('.pin, .book-image').forEach(element => {
    element.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
});

document.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('mouseover', function() {
        const name = this.getAttribute('data-name');
        this.title = name;
    });

    pin.addEventListener('click', function() {
        const info = this.getAttribute('data-info');
        document.getElementById('pin-info').innerText = info;
    });
});