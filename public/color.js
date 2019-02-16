function Color(red,green,blue, he) {

    this.r = red;
    this.g = green;
    this.b = blue;
    this.h = he;
    this.w = 1760;
    this.radius = 70;

    this.show = function() {
        stroke(255);
        fill(this.r, this.g, this.b);
        ellipse(this.w, this.h, this.radius, this.radius);
    }

}