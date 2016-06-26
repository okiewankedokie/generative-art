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
    this.alpha = .5;
    this.accel = 1.02;
    this.alive = true;

    this.age = 0;
    this.growth = 0;
    this.max = 0;

    this.dcircle = {speed:2, angle:0, size:0, growth:0};
}

Brush.prototype.init = function ()
{
    this.age = 0;

    this.x = Math.floor((Math.random() * canvas.width - canvas.width / 2) / 400) * 400; 
    this.y = Math.floor((Math.random() * canvas.height - canvas.height / 2) / 400) * 400;
    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = Math.floor((Math.random() - .5) / .2) * .2;
    this.dy = Math.floor((Math.random() - .5) / .2) * .2;
    this.size = 0;
    // this.color = '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    // this.color = Math.random() > .9 ? '#000' : '#'+Math.floor(Math.random()*16777215).toString(16);
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16);

    this.dcircle.angle = Math.floor((Math.random() * Math.PI * 2) / (Math.PI / 2)) * (Math.PI / 2);
    this.dcircle.size = Math.floor((Math.random() * .1) / .02) * .02;
    // this.dcircle.growth = Math.random() * .01 + .01;
    this.dcircle.growth = -.001;
    
    this.growth = (Math.random() * 50 + 20);

    // this.max = Math.random() * 20 + 5;
    this.max = Math.random() * 10;
}

Brush.prototype.update = function ()
{
    if (this.alive) {
        this.age++;

        this.x += this.dx;
        this.y += this.dy;

        /*
        if ( (this.dcircle.size == 0) && (Math.random() < .01) ) {

            this.dcircle.size = Math.random() * .1 + .1;
            this.dcircle.growth = Math.random() * .01 - .005;
        }

        else if ( (this.dcircle.size != 0) && (Math.random() < .1 * Math.abs(this.dcircle.size)) ) {
            this.dcircle.size = 0;
            this.dcircle.growth = 0;
        }
        */

        this.dx = Math.sin(this.dcircle.angle) * this.dcircle.speed;
        this.dy = Math.cos(this.dcircle.angle) * this.dcircle.speed;
        
        this.dcircle.angle += this.dcircle.size;
        this.dcircle.size += this.dcircle.growth;

        /*
        if (this.dx > 2) { this.dx = 2; }
        if (this.dx < -2) { this.dx = -2; }

        if (this.dy > 2) { this.dy = 2; }
        if (this.dy < -2) { this.dy = -2; }
        */

        this.size = Math.sin(this.age / this.growth) * this.max;// Math.random() - .52;

        if (this.size < 0) {
            this.init();
        }

        /*
        else if (this.size > 100) {
            this.init();
        }
        */

        if ( Math.abs(this.x) > canvas.width / 2 || Math.abs(this.y) > canvas.height / 2 )
        {
            this.init();
        }
    }
};

Brush.prototype.draw = function ()
{
    if (this.alive) {
        size = this.size;

        /* outlines */
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.arc(this.x, this.y, size + 1, 0, 2*Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, -this.y, size + 1, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(-this.x, this.y, size + 1, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(-this.x, -this.y, size + 1, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        /* color */
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(-this.x, -this.y, size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, -this.y, size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(-this.x, this.y, size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

Brush.prototype.kill = function ()
{
    this.alive = false;
}

function drawLine(star1, star2)
{
    var length = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));

    var alpha = Math.min((1 - length / 500) * (Math.min(star1.size, star2.size) / 5), 1);

    ctx.globalAlpha = Math.max(0, alpha);
    ctx.beginPath();
    ctx.moveTo(star1.x, star1.y);
    ctx.lineTo(star2.x, star2.y);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.closePath();
}

function update()
{
    time++;

    /*
    if (Math.random() < .001) {
        mirror_y = !mirror_y;
    }

    if (Math.random() < .001) {
        mirror_x = !mirror_x;
    }
    */

    /*ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    */
    ctx.globalAlpha = .01; //Math.sin(time / 200) * .01 + .01;

    // ctx.globalCompositeOperation = "lighten";
    ctx.fillStyle = '#fff';
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    // ctx.globalCompositeOperation = "source-over";
    
    var i;
    var j;
    for (i = 0; i < num; i++)
    {
        brushes[i].update();
        brushes[i].draw();

        /*
        for (j = 0; j < num - i && j < line_density; j++)
        {
            drawLine(brushes[i], brushes[i + j]);
        }
        */
    }

    ctx.globalAlpha = .02;
    //zoomfactor = Math.sin(time / 100) * .1;
    // zoomfactor = .3;
    zoomfactor = 0;
    shiftx = Math.random() * 20 - 10;
    shifty = Math.random() * 20 - 10;
    // shiftx = shifty = 0;
    ctx.drawImage(canvas, -(canvas.width * (zoomfactor + 1)) / 2 + shiftx, -(canvas.height * (zoomfactor + 1)) / 2 + shifty, canvas.width * (zoomfactor + 1), canvas.height * (zoomfactor + 1));
    /*
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

ctx.fillStyle = '#fff';
ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

var line_density = 0;

var time = 0;

var num = 100;
var brushes = [];
for (i = 0; i < num; i++)
{
    brushes[i] = new Brush();
    brushes[i].init();
}

setInterval(update, 20);
