var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth - 5;
ctx.canvas.height = window.innerHeight - 5;

var image = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);

function setPixel(image, x, y, r, g, b, a) {
    var index = (x + y * image.width) * 4;
    image.data[index + 0] = r;
    image.data[index + 1] = g;
    image.data[index + 2] = b;
    image.data[index + 3] = a;
}

var r = 0;
var g = 0;
var b = 0;
var a = 255;

for (x = 0; x < image.width; x++)
{
    for (y = 0; y < image.height; y++)
    {
        r = (Math.tan((x) / 100) + 1) * 128;
        r %= 256;
        g = (Math.tan((y) / 100) + 1) * 128;
        g %= 256;
        // g = (Math.cos(y / 100) + 1) * 128;
        // b = (Math.sin(x / 100) + 1) * 128;
        setPixel(image, x, y, r, g, b, a);
    }
}

ctx.putImageData(image, 0, 0);

