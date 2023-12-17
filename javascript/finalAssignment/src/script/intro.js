// const wrapper = document.getElementById("introPage");
const playButton = document.getElementById("startGame");
const soundButton = document.getElementById("sound");

playButton.addEventListener('click', (e) => {
    const introPage = document.getElementById('introPage');
    introPage.style.display = "none";

    const canvasPage = document.getElementById('canvasPage');
    canvasPage.style.display = "block";

    animate();
})

// menuButton.addEventListener('click', () => {
//     const divElement = document.createElement('div');
//     divElement.class = 'menu-card';

//     const title = document.createElement("p");
//     title.innerHTML = "You have to press space button to jump";

//     divElement.appendChild(title)
//     wrapper.appendChild(divElement)
// })


soundButton.addEventListener('click', (e) => {
    const soundoffPage = document.getElementById('sound-off');
    const soundonPage = document.getElementById('sound-on');
    if (soundoffPage.style.display == "block") {
        soundoffPage.style.display = "none";
        soundonPage.style.display = "block";
    } else {
        soundonPage.style.display = "none";
        soundoffPage.style.display = "block"
    }
})