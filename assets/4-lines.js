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
    this.alive = true;
}

Brush.prototype.init = function ()
{
    this.x = Math.random() * canvas.width - canvas.width / 2; 
    this.y = Math.random() * canvas.height - canvas.height / 2;
//    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = (Math.random() - .5);
    this.dy = (Math.random() - .5);
    this.size = Math.random() * 3 + 2;
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16); // elegant random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
}

Brush.prototype.update = function ()
{
    if (this.alive) {
        this.x += this.dx;
        this.y += this.dy;

        this.dx += (Math.random() - .5) * 2;
        this.dy += (Math.random() - .5) * 2;

        if (this.dx > 5) { this.dx = 5; }
        if (this.dx < -5) { this.dx = -5; }

        if (this.dy > 5) { this.dy = 5; }
        if (this.dy < -5) { this.dy = -5; }

        this.size += Math.random() - .475;

        if (this.size < 0) {
            // this.size = 0.1;
            this.init();
        }

        else if (this.size > 10) {
            this.kill()
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
        ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
        ctx.fillStyle = '#000';
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
    if (star1.alive && star2.alive)
    {
        var length = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));

        // var alpha = Math.min((1 - length / 250) * (Math.min(star1.size, star2.size) / 1), 1);
        // var alpha = Math.min((1 - length / 500), 1);
        var alpha = length < 500 ? .5 : .05;

        /*
        ctx.globalAlpha = 1
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.strokeStyle = Math.random() < .5 ? star1.color : star2.color;
        ctx.stroke();
        ctx.closePath();
        */

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.strokeStyle = Math.random() < .5 ? star1.color : star2.color;
        ctx.stroke();
        ctx.closePath();

        /* mirrored line */
        ctx.beginPath();
        ctx.moveTo(-star1.x, -star1.y);
        ctx.lineTo(-star2.x, -star2.y);
        ctx.strokeStyle = Math.random() < .5 ? star1.color : star2.color;
        ctx.stroke();
        ctx.closePath();
    }
}

function update()
{
    
    /*ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    */
    ctx.globalAlpha = 1;
    
    var i;
    var j;
    for (i = 0; i < num; i++)
    {
        brushes[i].update();
        // brushes[i].draw();

        for (j = 0; j < num - i; j++)
        {
            drawLine(brushes[i], brushes[i + j]);
        }
    }
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

var num = 7;
var brushes = [];
for (i = 0; i < num; i++)
{
    brushes[i] = new Brush();
    brushes[i].init();
}

setInterval(update, 20);
