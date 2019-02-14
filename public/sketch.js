var socket;

var colors = [];

var color = {
    r: 255,
    g: 255,
    b: 255
}

function setup() {

    createCanvas(1800, 940);
    background(0);
    socket = io.connect('http://localhost:3000');

    socket.on('mouse', newDrawing);
    
    colors.push(new Color(255,0,0,30));
    colors.push(new Color(0,255,0,80));
    colors.push(new Color(0,0,255,130));
    colors.push(new Color(255,255,0,180));
    colors.push(new Color(255,128,0,230));
    colors.push(new Color(127,0,255,280));

}
function draw() {
    for(var i = 0; i < colors.length; i++){
        colors[i].show();
    }
    //console.log("x: "+mouseX+", y: "+mouseY);
}
function newDrawing(data) {
    noStroke();
    fill(data.r, data.g, data.b);
    ellipse(data.x, data.y, 30, 30);
}

function mousePressed() {
    if(mouseX > 1760) {
        for(var i = 0; i < colors.length; i++){
            if( sqrt(((mouseX-colors[i].w)*(mouseX-colors[i].w)) + ((mouseY - colors[i].h)*(mouseY - colors[i].h))) <= colors[i].radius) {
                color.r = colors[i].r;
                color.g = colors[i].g;
                color.b = colors[i].b;
            }

        }
    }
}

function mouseDragged() {
    
    var data = {
        x: mouseX,
        y: mouseY,
        r: color.r,
        g: color.g,
        b: color.b
    }

    socket.emit('mouse', data);

    noStroke();
    fill(color.r, color.g, color.b);
    ellipse(mouseX, mouseY, 30, 30);
}