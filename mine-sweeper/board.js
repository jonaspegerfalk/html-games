class Board {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.height = height;
        this.width = width ;
        this.context = canvas.getContext("2d");
        this.boardSize = 10;
        this.cells = [];
        this.cellWidth = this.width/this.boardSize;
        this.cellHeight = this.height/this.boardSize;
        this.numberOfMines = 10;
        for (var i = 0; i<this.boardSize; i++) {
            this.cells[i] = [];
            for (var j = 0; j<this.boardSize; j++) {
                this.cells[i][j] = new Cell(this.context, i,j, this.cellWidth, this.cellHeight);
            }
        }

        // Put mines on random cells.
        var mines = 0;
        do {
            var x = Math.floor(Math.random()*this.boardSize);
            var y = Math.floor(Math.random()*this.boardSize);
            if (!this.cells[x][y].isMine) {
                this.cells[x][y].isMine = true;
                mines++;
            }
        }
        while (mines<this.numberOfMines);
        
        this.calculateNeighbours();
        this.canvas.addEventListener("mousedown", (e) => this.onClick(e), false);
        this.update();
    }

    onClick(e) {
        var x = event.x;
        var y = event.y;
        x -= this.canvas.offsetLeft;
        y -= this.canvas.offsetTop;
        
        this.openCell(Math.floor(x/this.cellWidth),Math.floor(y/this.cellHeight));
        this.update();
    }

    openCell(x,y) {
        this.cells[x][y].open();

        // If clicking a mine, open all cells
        if (this.cells[x][y].isMine) {
            for (var i = 0; i<this.boardSize; i++) {
                for (var j = 0; j<this.boardSize; j++) {
                    this.cells[i][j].open()
                }
            }
        }
        // If clicking a cell with no neighbours with mines, open all neighbours as well.
        else if (this.cells[x][y].numberOfNeighbours == 0) {
            for (var i = -1; i<=1; i++) {
                for (var j = -1; j<=1; j++) {
                    if (x+i<0 || y+j < 0 || x+i>=this.boardSize || y+j>=this.boardSize) continue;
                     if (this.cells[x+i][y+j].isHidden) this.openCell(x+i,y+j);
                }
            }
        }
    }

    calculateNeighbours() {
        for (var i = 0; i<this.boardSize; i++) {
            for (var j = 0; j<this.boardSize; j++) {
                this.calculateNeighboursForCell(i, j);
            }
        }
    }

    calculateNeighboursForCell(x, y) {
        var numOfNeighbours = 0;
        if (!this.cells[x][y].isMine) 
        for (var i = -1; i<=1; i++) {
            for (var j = -1; j<=1; j++) {
                if (x+i<0 || y+j < 0 || x+i>=this.boardSize || y+j>=this.boardSize) continue;
                 if (this.cells[x+i][y+j].isMine) numOfNeighbours++;
            }
        }
        this.cells[x][y].numberOfNeighbours = numOfNeighbours;
    }

    update() {
        for (var i = 0; i<this.boardSize; i++)
            for (var j = 0; j<this.boardSize; j++) {
                this.cells[i][j].update();
            }
    }
}