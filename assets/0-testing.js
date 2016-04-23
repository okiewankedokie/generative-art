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
    this.alpha = 1;
    this.accel = 1.02;
    // this.tension = .01;
    this.age = 0;
    this.alive = true;
    this.offset = 0;
}

Brush.prototype.init = function ()
{
    this.age++;
    /* if (this.age > 1) { this.kill(); } */

    // this.alpha = .1;
    
    /* this.x = Math.random() * canvas.width - canvas.width / 2; */
    this.x = Math.floor((Math.random() * canvas.width - canvas.width / 2) / 100) * 100;
    /* this.x = canvas.width / 2 - Math.random()*Math.random()*Math.random()*canvas.width*2; */
    /* this.y = Math.random() * canvas.height - canvas.height / 2; */
    /* this.y = canvas.height / 2 - Math.random()*Math.random()*Math.random()*canvas.height*2; */
    this.y = Math.floor((Math.random() * canvas.height - canvas.height / 2) / 100) * 100;
//    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = (Math.random() - .5);
    this.dy = (Math.random() - .5);

    this.size = 20;
    /* this.size = (canvas.height / 2 - this.y) * .2 + 20; */

    // this.altcolor = '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    this.color = ['#4c4', '#44c', '#c44'][Math.floor(Math.random() * 3)];
    /* this.color = ['#ccc', '#444', this.altcolor][Math.floor(Math.random() * 3)]; */
    /* this.color = ['#ccc', '#444', '#'+Math.floor(Math.random()*16777215).toString(16)][Math.floor(Math.random() * 3)]; */

    this.offset = -(this.x) / 50;
}

Brush.prototype.update = function (t, grav_x, grav_y)
{
    if (this.alive) {
        this.x += this.dx;
        this.y += this.dy;

        this.dx = ( Math.cos(t / 25) > 0 ) * Math.sin(t / 25 + this.offset);
        this.dx = 0;
        this.dy = ( Math.sin((t + this.offset) / 50) > 0 ) * Math.cos((t + this.offset) / 25 + Math.PI);

        /* gravity */
        /*
        this.dx += (this.x - grav_x) * this.tension;
        this.dy += (this.y - grav_y) * this.tension;
        */

        /*
        if (this.dx > 5) { this.dx = 5; }
        if (this.dx < -5) { this.dx = -5; }

        if (this.dy > 5) { this.dy = 5; }
        if (this.dy < -5) { this.dy = -5; }
        */

        /* this.size = Math.sin(t / 25) * 15 + 25; */

        /*
        if (this.size < 10) {
            this.size = 10;
        }

        if (this.size > 40) {
            this.size = 40;
        }
        */

        if (Math.random() < .1) {
            // this.color = ['#ccc', '#444', '#c44'][Math.floor(Math.random() * 3)];
            /* this.color = ['#ccc', '#444', '#'+Math.floor(Math.random()*16777215).toString(16)][Math.floor(Math.random() * 3)]; */
            /* this.color = ['#ccc', '#444', this.altcolor][Math.floor(Math.random() * 3)]; */
        }

        /*
        else if (this.size > 1) {
            this.init()
        }
        */

        /*
        if ( Math.abs(this.x) > canvas.width / 2 || Math.abs(this.y) > canvas.height / 2 )
        {
            this.init();
        }
        */
    }
};

Brush.prototype.draw = function ()
{
    if (this.alive) {
        dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        /*
        ctx.beginPath();
        ctx.arc(-this.x, -this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        */
    }
}

Brush.prototype.kill = function ()
{
    this.alive = false;
}

function update()
{

    time += 1;
    
    /*ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    */

    ctx.globalAlpha = .1;
    ctx.fillStyle = '#000';
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    for (i = 0; i < num; i++)
    {
        brushes[i].update(time/* + i / 10*/, 0, 0);
        brushes[i].draw();
    }

    // zoomfactor *= Math.random() < .01 ? -1 : 1;

    ctx.globalAlpha = .1;
    zoomfactor = .005;
    /*
    shiftx = Math.random() * 2 - 1;
    shifty = Math.random() * 2 - 1;
    */
    shiftx = shifty = 0;
    /* ctx.drawImage(canvas, -(canvas.width * (zoomfactor + 1)) / 2 + shiftx, -(canvas.height * (zoomfactor + 1)) / 2 + shifty, canvas.width * (zoomfactor + 1), canvas.height * (zoomfactor + 1)); */
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

ctx.fillStyle = '#444';
ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

var time = 0;

var zoomfactor = .01;

var num = 500;

var brushes = [];
for (i = 0; i < num; i++)
{
    brushes[i] = new Brush();
    brushes[i].init();
}

setInterval(update, 20);

