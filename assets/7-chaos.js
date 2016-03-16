/***********************************************
 * Copyright 2016 Nathaniel Simone
 ***********************************************/

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Brush () 
{
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.size = 1;
    this.color = '#FFFFFF';
    this.alpha = .05;
    this.accel = 1.02;
    this.tension = .001;
    this.alive = true;
}

Brush.prototype.init = function ()
{
    // this.alpha = .1;
    
    /*
    this.x = Math.random() * canvas.width - canvas.width / 2; 
    this.y = Math.random() * canvas.height - canvas.height / 2;
    */
    this.x = 0;
    this.y = 0;
//    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = (Math.random() - .5);
    this.dy = (Math.random() - .5);
    this.size = Math.random() * 100;
    // this.color = '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    this.color = Math.random() > .7 ? '#fff' : '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
}

Brush.prototype.update = function (x, y)
{
    if (this.alive) {
        this.x += this.dx;
        this.y += this.dy;

        this.dx += (Math.random() - .5) * 2;
        this.dy += (Math.random() - .5) * 2;

        /* gravity */
        this.dx -= (this.x - x) * this.tension;
        this.dy -= (this.y - y) * this.tension;

        if (this.dx > 5) { this.dx = 5; }
        if (this.dx < -5) { this.dx = -5; }

        if (this.dy > 5) { this.dy = 5; }
        if (this.dy < -5) { this.dy = -5; }

        this.size += Math.random() - .4;

        if (this.size < 0) {
            this.init();
        }

        else if (this.size > 100) {
            this.init()
        }

        if ( Math.abs(this.x) > canvas.width / 2 || Math.abs(this.y) > canvas.height / 2 )
        {
            this.init();
        }
    }
};

Brush.prototype.draw = function ()
{
    if (this.alive) {
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

Brush.prototype.kill = function ()
{
    this.alive = false;
}

function update()
{
    
    /*ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    */

    ctx.globalAlpha = .05;
    ctx.fillStyle = '#000';
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    for (i = 0; i < num; i++)
    {
        brushes[i].update(0, 0);
        brushes[i].draw();
    }

    // zoomfactor *= Math.random() < .01 ? -1 : 1;

    ctx.globalAlpha = .2;
    zoomfactor = .1;
    shiftx = 0; // Math.random() * 10;
    shifty = 0; // Math.random() * 10;
    ctx.drawImage(canvas, -(canvas.width * (zoomfactor + 1)) / 2 + shiftx, -(canvas.height * (zoomfactor + 1)) / 2 + shifty, canvas.width * (zoomfactor + 1), canvas.height * (zoomfactor + 1));
}

ctx.canvas.style.width='100%';
ctx.canvas.style.height='100%';
ctx.canvas.width  = ctx.canvas.offsetWidth;
ctx.canvas.height = ctx.canvas.offsetHeight;

/*
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
*/
ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        var w=window.open('about:blank','image from canvas');
        w.document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='from canvas'/>");
    }
}, false);

ctx.fillStyle = '#000';
ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

var zoomfactor = .01;

var num = 500;

var brushes = [];
for (i = 0; i < num; i++)
{
    brushes[i] = new Brush();
    brushes[i].init();
}

setInterval(update, 20);

