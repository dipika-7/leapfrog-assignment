// events listener for key down press
window.onkeydown = (e) => {
    switch (e.code) {
        case 'Space':
            keys.Space = true;
            break;
        case 'Enter':
            keys.Enter = true;
            break;
    }
};

// events listener for key up
window.onkeyup = (e) => {
    switch (e.code) {
        case 'Space':
            keys.Space = false;
            break;
        case 'Enter':
            keys.Enter = false;
            break;
    }
};