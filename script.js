const gameScreen = document.getElementById("game");
// create a screen
const createScreen = () => {
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 10; x++) {
      var iDiv = document.createElement("div");
      iDiv.setAttribute("id", [x, y]);
      iDiv.innerText = x + "," + y;
      iDiv.setAttribute("class", "emptyBlock");
      gameScreen.appendChild(iDiv);
    }
  }
};
// matrix rotation
const matrixRot = (source) => {
  // get the dimensions of the source matrix
  const M = source.length;
  const N = source[0].length;

  // create a new NxM destination array
  let destination = new Array(N);
  for (let i = 0; i < N; i++) {
    destination[i] = new Array(M);
  }

  // start copying from source into destination
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      destination[i][j] = source[M - j - 1][i];
    }
  }

  // return the destination matrix
  return destination;
};

const createFigure = (coor, type, moving) => {
  let color = "";
  switch (type) {
    case 0: // 0 : 4 lines aligned
      matrix = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, true, true, true, true],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ];
      color = "rgb(0,255,255)";
      break;
    case 1: // 1 L inverted
      matrix = [
        [true, null, null],
        [true, true, true],
        [null, null, null],
      ];
      color = "rgb(0, 0, 255)";
      break;
    case 2: // 2 L
      matrix = [
        [null, null, true],
        [true, true, true],
        [null, null, null],
      ];
      color = "rgb(255, 165, 0)";
      break;
    case 3: // 3 square
      matrix = [
        [null, true, true],
        [null, true, true],
        [null, null, null],
      ];
      color = "rgb(255, 255, 0)";
      break;
    case 4: // S
      matrix = [
        [null, true, true],
        [true, true, null],
        [null, null, null],
      ];
      color = "rgb(0, 128, 0)";
      break;

    case 5: // weird shape
      matrix = [
        [null, true, null],
        [true, true, true],
        [null, null, null],
      ];
      color = "rgb(128, 0, 128)";
      break;
    case 6: // Z
      matrix = [
        [true, true, null],
        [null, true, true],
        [null, null, null],
      ];
      color = "rgb(255, 0,0)";
      break;
  }
  let colorBorder = (R, G, B, change) => {
    return `rgb(${Number(R) + change},${Number(G) + change},${
      Number(B) + change
    }) `;
  };
  //matrix = matrixRot(matrix);
  dif = Math.trunc(matrix[0].length / 2);
  matrix.forEach((i, indexy) => {
    cy = indexy - dif + coor[1];
    i.forEach((j, indexx) => {
      if (i && j) {
        cx = coor[0] - dif + indexx;
        // get element
        const x = document.getElementById([cx, cy]);
        // change color
        x.style.backgroundColor = color;
        let R = color.split(",")[0].split("(")[1];
        let G = color.split(",")[1];
        let B = color.split(",")[2].split(")")[0];
        let change = 50;

        let b =
          colorBorder(R, G, B, change) +
          colorBorder(R, G, B, -change) +
          colorBorder(R, G, B, -change) +
          colorBorder(R, G, B, change);

        // cool background
        x.style.borderColor = b;
        x.setAttribute("id", [cx, cy]);
      }
    });
  });
};

/* element.removeAttribute(attrName) */

// the actual game

function actualGame() {
  let pos = [4, 1];
  createScreen();
  createFigure(pos, 1, false);

  var t = setInterval(() => {
    pos = [pos[0], pos[1] + 1];
    createFigure(pos, 1, false);
    console.log("should move");
    if (pos[1] === 18) {
      console.log("stop");
      clearInterval(t);
    }
  }, 500);

  loop();
}

actualGame();
/*
 */
