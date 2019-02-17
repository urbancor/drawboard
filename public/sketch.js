var socket;

var colors = [];

var drawingColor = {
    r: 255,
    g: 255,
    b: 255
}

let backCanvas;

function setup() {

    createCanvas(1800, 940);
    backCanvas = createGraphics(1800, 940);
    backCanvas.clear();
    background(0);
    //socket = io.connect('http://83.212.127.146:80');
    socket = io.connect('http://localhost:80');

    socket.on('mouse', newDrawing);
    
    colors.push(new Color(255,0,0,45));
    colors.push(new Color(0,255,0,125));
    colors.push(new Color(0,0,255,205));
    colors.push(new Color(255,255,0,285));
    colors.push(new Color(255,128,0,365));
    colors.push(new Color(127,0,255,445));
    colors.push(new Color(255,255,255,525));
    colors.push(new Color(0,0,0,605));


}
function draw() {
    background(0);
    fill(drawingColor.r, drawingColor.g, drawingColor.b);
    ellipse(mouseX, mouseY, 15, 15);
    for(var i = 0; i < colors.length; i++){
        colors[i].show();
    } 
    image(backCanvas, 0, 0);
}
function newDrawing(data) {
    backCanvas.noStroke();
    backCanvas.fill(data.r, data.g, data.b);
    backCanvas.ellipse(data.x, data.y, 15, 15);
}

function mousePressed() {
    if(mouseX > 1760) {
        for(var i = 0; i < colors.length; i++){
            if( sqrt(((mouseX-colors[i].w)*(mouseX-colors[i].w)) + ((mouseY - colors[i].h)*(mouseY - colors[i].h))) <= colors[i].radius) {
                drawingColor.r = colors[i].r;
                drawingColor.g = colors[i].g;
                drawingColor.b = colors[i].b;
            }

        }
    }
}

function mouseDragged() {
    
    var data = {
        x: mouseX,
        y: mouseY,
        r: drawingColor.r,
        g: drawingColor.g,
        b: drawingColor.b
    }

    socket.emit('mouse', data);

    backCanvas.noStroke();
    backCanvas.fill(drawingColor.r, drawingColor.g, drawingColor.b);
    backCanvas.ellipse(mouseX, mouseY, 15, 15);
}