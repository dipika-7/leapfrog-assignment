const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    Space: false,
};

// events listener for key down press
window.onkeydown = (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keys.ArrowRight = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft = true;
            break;
        case 'Space':
            keys.Space = true;
            break;
    }
};

// events listener for key up
window.onkeyup = (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keys.ArrowRight = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft = false;
            break;
        case 'Space':
            keys.Space = false;
            break;
    }
};