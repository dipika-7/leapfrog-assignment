const mainSection = document.getElementById('main');

const setStyles = ((ele, styles = {}) => {
    Object.keys(styles).forEach((styleVal) => {
        const style = styles[styleVal];
        ele.style[styleVal] = style;
    })
})

const toPx = (val) => {
    return val + "px";
}

function Ball(width, height, x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height

    this.element = document.createElement("div")
    setStyles(this.element, {
        position: "absolute",
        width: toPx(this.width),
        height: toPx(this.height),
        background: "red",
        left: toPx(this.x),
        top: toPx(this.y),
        borderRadius: "50%"
    })
    mainSection.appendChild(this.element)

}

const generateRandomXAndY = (minValue, maxValue) => {
    return Math.round(minValue + Math.random() * (maxValue - minValue))
}

const data = [
    // { w: 20, h: 20, x: 10, y: 30 },
    // { w: 20, h: 20, x: 20, y: 50 },
    // { w: 20, h: 20, x: 30, y: 120 },
    // { w: 20, h: 20, x: 40, y: 180 },
    // { w: 20, h: 20, x: 50, y: 90 },
]

for (let i = 0; i < 10; i++) {
    let x = generateRandomXAndY(0, 200 - 10);
    let y = generateRandomXAndY(0, 200 - 10);
    data.push({ x, y })
}

data.map((item) => {
    const ball = new Ball(10, 10, item.x, item.y)
})