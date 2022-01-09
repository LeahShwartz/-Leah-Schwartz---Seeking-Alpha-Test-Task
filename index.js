const dom = {
    grid: document.querySelector('#grid'),
}
let listSquare = [];

//function to create grid
const createGrid = (width, height) => {
    let grid=[];
    for (let i = 0; i < width; i++) {
        let row = [];
        for (let j = 0; j < height; j++) {
            const div = document.createElement('div');
            div.className = "deadSquare";//class to basic design
            div.id = "" + i + j;
            dom.grid.appendChild(div);//add to dom
            row.push(div);//add to row for list grid
        }
        grid.push(row);//add to list grid
        const br = document.createElement('br');//line break
        dom.grid.appendChild(br);
    }
    return grid;
}



//function to get random num
const randomNum = (max) => {
   return Math.random() * max;
}

//function to Basic coloring of the grid
const BasicColoringOfTheGrid = (amount) => {
    let amountToColoring = randomNum(amount);//amount of squares for live
    let squareColoring = [];//array squares for live
    let width = listSquare.length;
    let height = listSquare[0].length;
    //random square to live
    for (let i = 0; i < amountToColoring; i++) {
        let num = randomNum(amount - 1);
        squareColoring.push(num);
    }

    //coloring square to live
    squareColoring.forEach(index => {
        index = Math.floor(index);
        let x = Math.floor(index / width);//Calculating the indexe x-row
        let y = Math.floor(index - (width * x));//Calculating the indexe y-column
        listSquare[x][y].className = "liveSquare";//add class of live's square
    });

}


//function to playing: change grid
const playChangeGrid = () => {
    let listToLive = [];
    let listToRemove = [];
    for (let i = 0; i < listSquare.length; i++) {
        for (let j = 0; j < listSquare[i].length; j++) {
            let neighbors = [];
            neighbors.push({ "x": i + 1, "y": j });
            neighbors.push({ "x": i - 1, "y": j });
            neighbors.push({ "x": i, "y": j + 1 });
            neighbors.push({ "x": i - 1, "y": j + 1 });
            neighbors.push({ "x": i + 1, "y": j + 1 });
            neighbors.push({ "x": i, "y": j - 1 });
            neighbors.push({ "x": i + 1, "y": j - 1 });
            neighbors.push({ "x": i - 1, "y": j - 1 });

            let countLiveNeighbors = 0;

            //Finding the living neighbors
            neighbors.forEach(n => {
                //Check if the indexes exist in the grid
                if (n.x > 0 && n.x < listSquare.length && n.y > 0 && n.y < listSquare[i].length) {
                    if (listSquare[n.x][n.y].className === "liveSquare")//Counting the number of living neighbors
                    {
                        countLiveNeighbors++;
                    }
                }
            });

            //Finding squares for death
            if (listSquare[i][j].className === "liveSquare") {
                if (countLiveNeighbors < 2 || countLiveNeighbors > 3) {
                    listToRemove.push({"i":i,"j":j});
                }
            }

            //Finding exactly 3 neighbors for a dead square
            else if (countLiveNeighbors === 3) {
                listToLive.push({"i":i,"j":j});
            }
           

        }
    }

    //Killing squares
    listToRemove.forEach(item => {
        listSquare[item.i][item.j].classList.remove("liveSquare");
        listSquare[item.i][item.j].className="deadSquare";
    });
    //Living squares
    listToLive.forEach(item => {
        listSquare[item.i][item.j].classList.remove("deadSquare");
        listSquare[item.i][item.j].className="liveSquare";
    });
}



listSquare=createGrid(50, 50);
BasicColoringOfTheGrid(50 * 50);
setInterval(playChangeGrid, 1000);//Activation the play, every second

//examples

//ex 1
// listSquare[1][1].className = "liveSquare";
// listSquare[1][2].className = "liveSquare";
// listSquare[2][1].className = "liveSquare";
// listSquare[2][2].className = "liveSquare";

//ex2
// listSquare[1][1].className = "liveSquare";
// listSquare[1][2].className = "liveSquare";
// listSquare[2][2].className = "liveSquare";

//ex3
// listSquare[1][1].className = "liveSquare";
// listSquare[1][3].className = "liveSquare";
// listSquare[2][2].className = "liveSquare";
// listSquare[2][3].className = "liveSquare";
// listSquare[3][2].className = "liveSquare";

//ex4
// listSquare[2][2].className = "liveSquare";
// listSquare[2][3].className = "liveSquare";
// listSquare[2][4].className = "liveSquare";
// listSquare[3][1].className = "liveSquare";
// listSquare[3][2].className = "liveSquare";
// listSquare[3][3].className = "liveSquare";

//ex5
// listSquare[2][4].className = "liveSquare";
// listSquare[2][5].className = "liveSquare";
// listSquare[2][6].className = "liveSquare";
// listSquare[2][10].className = "liveSquare";
// listSquare[2][11].className = "liveSquare";
// listSquare[2][12].className = "liveSquare";

// listSquare[4][2].className = "liveSquare";
// listSquare[4][7].className = "liveSquare";
// listSquare[4][9].className = "liveSquare";
// listSquare[4][14].className = "liveSquare";
// listSquare[5][2].className = "liveSquare";
// listSquare[5][7].className = "liveSquare";
// listSquare[5][9].className = "liveSquare";
// listSquare[5][14].className = "liveSquare";
// listSquare[6][2].className = "liveSquare";
// listSquare[6][7].className = "liveSquare";
// listSquare[6][9].className = "liveSquare";
// listSquare[6][14].className = "liveSquare";

// listSquare[7][4].className = "liveSquare";
// listSquare[7][5].className = "liveSquare";
// listSquare[7][6].className = "liveSquare";
// listSquare[7][10].className = "liveSquare";
// listSquare[7][11].className = "liveSquare";
// listSquare[7][12].className = "liveSquare";

// listSquare[9][4].className = "liveSquare";
// listSquare[9][5].className = "liveSquare";
// listSquare[9][6].className = "liveSquare";
// listSquare[9][10].className = "liveSquare";
// listSquare[9][11].className = "liveSquare";
// listSquare[9][12].className = "liveSquare";

// listSquare[10][2].className = "liveSquare";
// listSquare[10][7].className = "liveSquare";
// listSquare[10][9].className = "liveSquare";
// listSquare[10][14].className = "liveSquare";
// listSquare[11][2].className = "liveSquare";
// listSquare[11][7].className = "liveSquare";
// listSquare[11][9].className = "liveSquare";
// listSquare[11][14].className = "liveSquare";
// listSquare[12][2].className = "liveSquare";
// listSquare[12][7].className = "liveSquare";
// listSquare[12][9].className = "liveSquare";
// listSquare[12][14].className = "liveSquare";

// listSquare[14][4].className = "liveSquare";
// listSquare[14][5].className = "liveSquare";
// listSquare[14][6].className = "liveSquare";
// listSquare[14][10].className = "liveSquare";
// listSquare[14][11].className = "liveSquare";
// listSquare[14][12].className = "liveSquare";

