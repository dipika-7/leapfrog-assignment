const container = document.getElementById('container');
const wrapper = document.getElementById('wrapper');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const image = document.getElementsByClassName('img')

// let speed = 20;
let left = 0;
let activeImage = 1;
let numberOfImage = image.length;
let speed = 30;

const toPx = (num) => {
    return `${num}px`;
}

leftBtn.addEventListener("click", (e) => {
    activeImage -= 1;
    console.log("left", activeImage, numberOfImage, activeImage > numberOfImage)
    if (activeImage < 1) activeImage = numberOfImage;
    updateNewWrapper()
    setPosition();
    changePositionForNextImage();
})

rightBtn.addEventListener("click", (e) => {
    activeImage += 1;
    if (activeImage > numberOfImage) activeImage = 1;
    updateNewWrapper()
    setPosition()
    changePositionForNextImage()
})

const setPosition = () => {
    position = -(activeImage - 1) * container.clientWidth;
    console.log(position)
}

const changePositionForNextImage = () => {
    let animateImage = () => {
        const currentPosition = parseInt(window.getComputedStyle(wrapper).left);
        if (position < currentPosition) {
            wrapper.style.left = toPx((currentPosition - speed))
            if (parseFloat(wrapper.style.left) <= position) {
                clearInterval(interval)
            }
        } else {
            wrapper.style.left = toPx((currentPosition + speed))
            if (parseFloat(wrapper.style.left) >= position) {
                clearInterval(interval)
            }
        }
    }
    let interval = setInterval(animateImage, 1000 / 60);
}

const generateNewWrapper = () => {
    const newWrapper = document.createElement("div");
    newWrapper.setAttribute("id", "new-wrapper")
    container.appendChild(newWrapper)
    for (let i = 1; i <= numberOfImage; i++) {
        const circle = document.createElement("div");
        circle.setAttribute("id", `circle${i}`)
        circle.style.backgroundColor = (i == activeImage) ? circle.style.backgroundColor = "white" : "lightgray"

        circle.setAttribute("class", 'circle')
        newWrapper.appendChild(circle)
        circle.addEventListener("click", (e) => {
            activeImage = i;
            updateNewWrapper();
            setPosition();
            changePositionForNextImage()
        })
    }
}
generateNewWrapper()

const updateNewWrapper = () => {
    const newWrapper = document.querySelectorAll(".carousel-container > div > div");
    newWrapper.forEach((item, index) => {
        item.style.backgroundColor = (index + 1 == activeImage) ? item.style.backgroundColor = "white" : "lightgray"
    })
}