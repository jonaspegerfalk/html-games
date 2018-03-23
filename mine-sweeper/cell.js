class Cell {
    constructor(ctx, x, y, w, h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.isMine = false;
        this.isHidden = true;
        this.numberOfNeighbours = 0;
    }

    open() {
        this.isHidden = false;
    }

    update() {
        this.ctx.strokeStyle = "Black"
        this.ctx.strokeRect(this.x*this.width, this.y*this.height, this.width, this.height);
        this.ctx.fillStyle = "#fff"
        this.ctx.fillRect(this.x*this.width, this.y*this.height, this.width, this.height);
    
        if (this.isHidden) {
            this.ctx.fillStyle = "#aaa"
            this.ctx.fillRect(this.x*this.width, this.y*this.height, this.width, this.height);
            return;
        }
        if (this.isMine) {
            this.ctx.strokeStyle= "Red"
            this.ctx.beginPath();
            this.ctx.arc(this.x*this.width+this.width/2, this.y*this.height+this.height/2, this.width/4, 0, 100, false)         
            this.ctx.stroke();
        }
        else if (this.numberOfNeighbours > 0) {
            this.ctx.font = '16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle'
            this.ctx.fillStyle = "Black"
            this.ctx.fillText(this.numberOfNeighbours, this.x*this.width+this.width/2, this.y*this.height+this.height/2)
        }
    }
}