function getRandomColor(name) {
    // get first alphabet in upper case
    const firstAlphabet = name.charAt(0).toLowerCase();
    // get the ASCII code of the character
    const asciiCode = firstAlphabet.charCodeAt(0);
    // number that contains 3 times ASCII value of character -- unique for every alphabet
    const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();
    const num = Math.round(0xffffff * parseInt(colorNum));
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ', 0.3)';
}

function generateProfile(name) {
    const width = 300;
    const height = 300;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    // draw background
    ctx.fillStyle = getRandomColor(name);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw text
    ctx.font = 200 + 'px Montserrat, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const text = name.charAt(0).toUpperCase();
    const dimension = ctx.measureText(text);
    const fix = dimension.actualBoundingBoxDescent / 4;
    ctx.fillStyle = "#FFF";
    ctx.fillText(text, width / 2, height / 2 + fix);
    return canvas.toDataURL();
}

export default generateProfile;
