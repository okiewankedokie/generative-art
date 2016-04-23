/***********************************************
 * Copyright 2016 Nathaniel Simone
 ***********************************************/

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Brush () 
{
    this.x = 0;
    this.y = 0;
    /*
    this.dx = 0;
    this.dy = 0;
    */
    this.size = 1;
    this.color = '#FFFFFF';
    this.alpha = 1;
    /* this.accel = 1.02; */
    this.alive = true;
    this.age = 0;
    this.max_age = 1;

    this.arc = {x:0, y:0, radius:0, angle:0, length:0};
}

Brush.prototype.init = function ()
{
    this.age = 0;
    // this.color = '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    this.color = ['#ccc', '#44c'][Math.floor(Math.random() * 2)];
    this.alpha = .01;
    this.size = 2;

    this.max_age = Math.pow(Math.random(), 3) * 100;

    this.arc.radius = Math.random() * canvas.width;
    this.arc.angle = Math.random() * Math.PI * 2;
    this.arc.length = Math.PI * .2;
}

Brush.prototype.update = function ()
{
    if (this.alive) {
        this.age++;
        console.log(this.age);

        if (this.age > this.max_age) { this.kill(); }

        this.x = this.arc.x + Math.sin(this.arc.angle) * this.arc.radius;
        this.y = this.arc.y + Math.cos(this.arc.angle) * this.arc.radius;
        
        /* this.arc.angle += this.arc.speed; */
    }
};

Brush.prototype.draw = function ()
{
    if (this.alive) {
        /*
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        */

        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.arc(this.arc.x, this.arc.y, this.arc.radius, this.arc.angle, this.arc.angle + this.arc.length);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.stroke();
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
    ctx.globalAlpha = 1;
    
    /* ctx.globalCompositeOperation = "screen"; */
    var i;
    for (i = 0; i < num; i++)
    {
        brushes[i].update();
        brushes[i].draw();
    }

    /*
    ctx.globalCompositeOperation = "source-over";

    ctx.globalAlpha = .03;
    zoomfactor = -.001;
    shiftx = Math.random() * 2 - 1;
    shifty = Math.random() * 2 - 1;
    shiftx = shifty = 0;
    ctx.drawImage(canvas, -(canvas.width * (zoomfactor + 1)) / 2 + shiftx, -(canvas.height * (zoomfactor + 1)) / 2 + shifty, canvas.width * (zoomfactor + 1), canvas.height * (zoomfactor + 1));
    */
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

ctx.globalCompositeOperation = "lighter";

var num = 10000;
var brushes = [];
for (i = 0; i < num; i++)
{
    brushes[i] = new Brush();
    brushes[i].init();
}

setInterval(update, 20);
