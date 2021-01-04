document.addEventListener("DOMContentLoaded", () => {
  let moves = 0;

  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");

  const width = 4;

  //board

  let squares = [];
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generate();
    generate();
  }
  createBoard();

  function generate() {
    try {
      let randomNumber = Math.floor(Math.random() * squares.length);
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2;
      } else generate();
    } catch (err) {
      if (reallyGameOver()) {
        document.getElementById("moves-title").style.visibility = "hidden";
        document.getElementById("move").style.visibility = "hidden";
        document.getElementById("homepage").style.visibility = "hidden";

        document.body.style.backgroundColor = "black";

        document.getElementById("result").innerHTML = "Game Over";
      }
    }
  }

  function destroyTransition() {
    for (let i = 0; i < 16; i++) {}
  }

  let colorDict = {
    one: "rgb(255, 255, 255)",
    two: "rgb(213, 255, 130)",
    three: "rgb(127, 255, 165)",
    four: "rgb(93, 214, 255)",
    five: "rgb(238, 193, 255)",
    six: "rgb(255, 149, 169)",
    seven: "rgb(255, 92, 100)",
    eight: "rgb(91, 105, 255)",
    nine: "rgb(24, 47, 144)",
    ten: "rgb(0, 0, 0)",
  };

  function checkWin() {
    for (let i = 0; i < 16; i++) {
      if (squares[i].innerHTML == 1024) {
        document.getElementById("moves-title").style.visibility = "hidden";
        document.getElementById("move").style.visibility = "hidden";
        document.getElementById("homepage").style.visibility = "hidden";

        document.body.style.backgroundColor = "black";

        document.getElementById("result").innerHTML = "You Win!!";
      }
    }
  }
  function applycolor() {
    for (let i = 0; i < 16; i++) {
      switch (parseInt(squares[i].innerHTML)) {
        case 0: {
          squares[i].style.background = "#5a5a5a";
          break;
        }

        case 2: {
          defCol = colorDict.one;

          squares[i].style.background = defCol;

          break;
        }
        case 4: {
          defCol = colorDict.two;
          squares[i].style.background = defCol;

          break;
        }

        case 8: {
          defCol = colorDict.three;

          squares[i].style.background = defCol;
          break;
        }

        case 16: {
          defCol = colorDict.four;

          squares[i].style.background = defCol;
          break;
        }

        case 32: {
          defCol = colorDict.five;

          squares[i].style.background = defCol;
          break;
        }

        case 64: {
          defCol = colorDict.six;

          squares[i].style.background = defCol;
          break;
        }

        case 128: {
          defCol = colorDict.seven;
          squares[i].style.background = defCol;

          break;
        }

        case 256: {
          defCol = colorDict.eight;
          squares[i].style.background = defCol;

          break;
        }

        case 512: {
          defCol = colorDict.nine;
          squares[i].style.background = defCol;

          break;
        }

        case 1024: {
          defCol = colorDict.ten;
          squares[i].style.background = defCol;

          break;
        }
      }
    }

    checkWin();
  }

  applycolor();

  function reallyGameOver() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML == squares[i + 1].innerHTML && i % 4 != 3) {
        return false;
      }
      if (i < 12) {
        if (squares[i].innerHTML == squares[i + 4].innerHTML) {
          return false;
        }
      }
    }
    return true;
  }

  function swipeUp() {
    function rawArrange(times) {
      for (let iter = 0; iter < times; iter++) {
        for (let i = 0; i < 12; i++) {
          if (squares[i].innerHTML == 0) {
            if (squares[i + 4].innerHTML != 0) {
              squares[i].innerHTML = squares[i + 4].innerHTML;
              squares[i + 4].innerHTML = 0;
            }
          }
        }
      }
    }
    rawArrange(3);

    for (let j = 0; j < 12; j++) {
      if (squares[j].innerHTML == squares[j + 4].innerHTML) {
        squares[j].innerHTML = parseInt(squares[j + 4].innerHTML) * 2;
        squares[j + 4].innerHTML = 0;
      }
    }
    rawArrange(1);
    applycolor();
    generate();

    updateMoves();
  }

  function swipeDown() {
    function rawArrange(times) {
      for (let iter = 0; iter < times; iter++) {
        for (let i = 15; i > 3; i--) {
          if (squares[i].innerHTML == 0) {
            if (squares[i - 4].innerHTML != 0) {
              squares[i].innerHTML = squares[i - 4].innerHTML;
              squares[i - 4].innerHTML = 0;
            }
          }
        }
      }
    }
    rawArrange(3);

    for (let j = 15; j > 3; j--) {
      if (squares[j].innerHTML == squares[j - 4].innerHTML) {
        squares[j].innerHTML = parseInt(squares[j - 4].innerHTML) * 2;
        squares[j - 4].innerHTML = 0;
      }
    }
    rawArrange(1);
    applycolor();
    generate();

    updateMoves();
  }

  function swipeLeft() {
    function rawArrange(times) {
      for (let iter = 0; iter < times; iter++) {
        for (let i = 0; i < 15; i++) {
          if (squares[i].innerHTML == 0 && i % 4 != 3) {
            if (squares[i + 1].innerHTML != 0) {
              squares[i].innerHTML = squares[i + 1].innerHTML;
              squares[i + 1].innerHTML = 0;
            }
          }
        }
      }
    }
    rawArrange(3);

    for (let j = 0; j < 15; j++) {
      if (squares[j].innerHTML == squares[j + 1].innerHTML && j % 4 != 3) {
        squares[j].innerHTML = parseInt(squares[j + 1].innerHTML) * 2;
        squares[j + 1].innerHTML = 0;
      }
    }
    rawArrange(1);
    applycolor();
    generate();

    updateMoves();
  }

  function swipeRight() {
    function rawArrange(times) {
      for (let iter = 0; iter < times; iter++) {
        for (let i = 15; i > 0; i--) {
          if (squares[i].innerHTML == 0 && i % 4 != 0) {
            if (squares[i - 1].innerHTML != 0) {
              squares[i].innerHTML = squares[i - 1].innerHTML;
              squares[i - 1].innerHTML = 0;
            }
          }
        }
      }
    }
    rawArrange(3);

    for (let j = 15; j > 0; j--) {
      if (squares[j].innerHTML == squares[j - 1].innerHTML && j % 4 != 0) {
        squares[j].innerHTML = parseInt(squares[j - 1].innerHTML) * 2;
        squares[j - 1].innerHTML = 0;
      }
    }
    rawArrange(1);
    applycolor();
    generate();

    updateMoves();
  }

  function updateMoves() {
    moves = moves + 1;
    document.getElementById("move").innerHTML = moves;
  }

  //motion

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38" || e.keyCode == "87") {
      swipeUp();
    } else if (e.keyCode == "40" || e.keyCode == "83") {
      swipeDown();
    } else if (e.keyCode == "37" || e.keyCode == "65") {
      swipeLeft();
    } else if (e.keyCode == "39" || e.keyCode == "68") {
      swipeRight();
    }
  }

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    );
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        //console.log("left")
        swipeLeft();
      } else {
        //console.log("right")
        swipeRight();
      }
    } else {
      if (yDiff > 0) {
        //console.log("up")
        swipeUp();
      } else {
        //console.log("down")
        swipeDown();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
});
