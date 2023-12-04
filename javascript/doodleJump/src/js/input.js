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


function handleOrientation(event) {
    const tiltX = event.gamma;
    let tiltSpeed = tiltX / 20 >= 1 ? 1 : tiltX / 20;
    if (tiltX > 3) {
        character.velocity.x = SPEED * tiltSpeed;
        keys.ArrowRight = true;
        keys.ArrowLeft = false;
    } else if (tiltX < -3) {
        character.velocity.x = -SPEED * tiltSpeed;
        keys.ArrowRight = false;
        keys.ArrowLeft = true;
    } else {
        keys.ArrowRight = false;
        keys.ArrowLeft = false;
    }
}

window.addEventListener("deviceorientation", handleOrientation);