class newBase 
{
    constructor(x, y, w, h)
    {
        let options ={
            isStatic: true
        };

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.color = color;
        World.add(world, this.body);
    }

    display()
    {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        stroke("#964B00");
        fill("#964B00");
        rect(0, 0, this.w, this.h);
        pop();

    }
}