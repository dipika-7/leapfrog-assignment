const playButton = document.getElementById("startGame");
const soundButton = document.getElementById("sound");

/**
 * add event listener for playButton
 */
playButton.addEventListener('click', (e) => {
    const introPage = document.getElementById('introPage');
    introPage.style.display = "none";

    const canvasPage = document.getElementById('canvasPage');
    canvasPage.style.display = "block";

    animate();
})

/**     
 * add event listener for soundButton
 */
soundButton.addEventListener('click', (e) => {
    const soundoffPage = document.getElementById('sound-off');
    const soundonPage = document.getElementById('sound-on');
    if (soundoffPage.style.display == "block") {
        soundoffPage.style.display = "none";
        soundonPage.style.display = "block";
        isSoundOn = true;
    } else {
        soundonPage.style.display = "none";
        soundoffPage.style.display = "block";
        isSoundOn = false;
    }
})