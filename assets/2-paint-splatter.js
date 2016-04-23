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
}

Brush.prototype.init = function ()
{
    this.x = Math.random() * canvas.width - canvas.width / 2; 
    this.y = Math.random() * canvas.height - canvas.height / 2;
//    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = Math.random() - .5;
    this.dy = Math.random() - .5;
    this.size = Math.random() * 3 + 2;
    // this.color = '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    // this.color = tinycolor.fromRatio({ h:Math.random(), s:1, l:.5 });
    this.color = tinycolor.fromRatio({ h:this.x / canvas.width + .5, s:1, l:.5 });
}

Brush.prototype.update = function ()
{
    if (this.alive) {
        this.x += this.dx;
        this.y += this.dy;

        this.dx += (Math.random() - .5) * 2;
        this.dy += Math.random() - .47;

        if (this.dx > 2) { this.dx = 2; }
        if (this.dx < -2) { this.dx = -2; }

        if (this.dy > 2) { this.dy = 2; }
        if (this.dy < -2) { this.dy = -2; }

        this.size += Math.random() - .5;

        if (this.size < 0) {
            this.kill();
        }

        else if (this.size > 10) {
            this.size = 10;
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
        ctx.fillStyle = this.color.toHexString();
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

    ctx.globalAlpha = .01; //Math.max(0, alpha);
    ctx.beginPath();
    ctx.moveTo(star1.x, star1.y);
    ctx.lineTo(star2.x, star2.y);
    ctx.strokeStyle = '#000000';
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
//    ctx.fillStyle = "rgba(0, 0, 0, .5)";
//    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    var i;
    var j;
    for (i = 0; i < num; i++)
    {
        brushes[i].update();
        brushes[i].draw();

        for (j = 0; j < num - i && j < line_density; j++)
        {
            drawLine(brushes[i], brushes[i + j]);
        }
    }

    /*
    ctx.globalAlpha = .01; // this determines how much it "smears"
    zoomfactor = 0;
    shiftfactorx = 1;
    ctx.drawImage(canvas, -(canvas.width * (zoomfactor + 1)) / 2 + shiftfactorx, -(canvas.height * (zoomfactor + 1)) / 2, canvas.width * (zoomfactor + 1), canvas.height * (zoomfactor + 1));
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

var line_density = 0;

var num = 200;
var brushes = [];
for (i = 0; i < num; i++)
{
    brushes[i] = new Brush();
    brushes[i].init();
}

setInterval(update, 20);
