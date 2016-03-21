/***********************************************
 * Copyright 2016 Nathaniel Simone
 ***********************************************/

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Star () 
{
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.size = 1;
    this.color = '#FFFFFF';
    this.accel = 1.02;
}

Star.prototype.init = function ()
{
    this.x = Math.random() * canvas.width - canvas.width / 2; 
    this.y = Math.random() * canvas.height - canvas.height / 2;
    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = this.x / dist; // Math.random() - .5;
    this.dy = this.y / dist; // Math.random() - .5;
    this.size = .5;
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16); // beautiul random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
}

Star.prototype.update = function ()
{
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= this.accel;
    this.dy *= this.accel;
    this.size *= this.accel;

    if ( Math.abs(this.x) > canvas.width / 2 || Math.abs(this.y) > canvas.height / 2 )
    {
        this.init();
    }
};

Star.prototype.draw = function ()
{
    ctx.beginPath();
    ctx.globalAlpha = 1;
    if (this.size < 2)
    {
        ctx.globalAlpha = this.size / 2;
    }
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(star1, star2)
{
    var length = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));

    var alpha = Math.min((1 - length / 500) * (Math.min(star1.size, star2.size) / 5), 1);

    ctx.globalAlpha = Math.max(0, alpha);
    ctx.beginPath();
    ctx.moveTo(star1.x, star1.y);
    ctx.lineTo(star2.x, star2.y);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.closePath();
}

function update()
{
    
    /*ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    */
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(0, 0, 0, .5)";
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    var i;
    var j;
    for (i = 0; i < num; i++)
    {
        stars[i].update();
        stars[i].draw();

        for (j = 0; j < num - i && j < line_density; j++)
        {
            drawLine(stars[i], stars[i + j]);
        }
    }
}


ctx.canvas.style.width='100%';
ctx.canvas.style.height='100%';
ctx.canvas.width  = ctx.canvas.offsetWidth;
ctx.canvas.height = ctx.canvas.offsetHeight;

ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

var line_density = 7;

var num = 200;
var stars = [];
for (i = 0; i < num; i++)
{
    stars[i] = new Star();
    stars[i].init();
}

setInterval(update, 20);
