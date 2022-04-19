document.addEventListener('DOMContentLoaded', () =>  {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    let squares = []
    const width = 4
    let score = 0

    // album consts
    const album_debut = "<img src=\"/images/debut.png\" width=\"100px\" height=\"100px\">"
    const album_fearless = "<img src=\"/images/fearless.png\" width=\"100px\" height=\"100px\">"
    const album_speaknow = "<img src=\"/images/speaknow.png\" width=\"100px\" height=\"100px\">"
    const album_red = "<img src=\"/images/red.png\" width=\"100px\" height=\"100px\">"
    const album_1989 = "<img src=\"/images/1989.png\" width=\"100px\" height=\"100px\">"
    const album_reputation = "<img src=\"/images/reputation.png\" width=\"100px\" height=\"100px\">"
    const album_lover = "<img src=\"/images/lover.png\" width=\"100px\" height=\"100px\">"
    const album_folklore = "<img src=\"/images/folklore.png\" width=\"100px\" height=\"100px\">"
    const album_evermore = "<img src=\"/images/evermore.png\" width=\"100px\" height=\"100px\">"
    const album_fearlessTV = "<img src=\"/images/fearless_TV.png\" width=\"100px\" height=\"100px\">"
    const album_redTV = "<img src=\"/images/red_TV.png\" width=\"100px\" height=\"100px\">"

    // create the game board
    function createBoard() {
      for (let i = 0; i < width * width; i++) {
        square = document.createElement('div')
        square.innerHTML = 0
        gridDisplay.appendChild(square)
        squares.push(square)
      }
      generateNewTile()
      generateNewTile()
    }
    createBoard()
  
    // randomly generate a new tile. will always be the first level (debut)
    function generateNewTile() {
      randomNumber = Math.floor(Math.random() * squares.length)
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2
        checkForGameOver()
      } else generateNewTile()
    }
  
    // move all tiles right
    function moveRight() {
      deSwiftifyGame()
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML
          let totalTwo = squares[i + 1].innerHTML
          let totalThree = squares[i + 2].innerHTML
          let totalFour = squares[i + 3].innerHTML
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
          console.log(row)

          let filteredRow = row.filter(num => num)
          let missing = 4 - filteredRow.length
          let zeros = Array(missing).fill(0)
          let newRow = zeros.concat(filteredRow)
  
          squares[i].innerHTML = newRow[0]
          squares[i +1].innerHTML = newRow[1]
          squares[i +2].innerHTML = newRow[2]
          squares[i +3].innerHTML = newRow[3]
        }
      }
      swiftifyGame()
    }
  
    // move all tiles left
    function moveLeft() {
      deSwiftifyGame()
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML
          let totalTwo = squares[i + 1].innerHTML
          let totalThree = squares[i + 2].innerHTML
          let totalFour = squares[i + 3].innerHTML
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
          let filteredRow = row.filter(num => num)
          let missing = 4 - filteredRow.length
          let zeros = Array(missing).fill(0)
          let newRow = filteredRow.concat(zeros)
  
          squares[i].innerHTML = newRow[0]
          squares[i +1].innerHTML = newRow[1]
          squares[i +2].innerHTML = newRow[2]
          squares[i +3].innerHTML = newRow[3]
        }
      }
      swiftifyGame()
    }
  
    // move all tiles up
    function moveUp() {
      deSwiftifyGame()
      for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + width].innerHTML
        let totalThree = squares[i + (width * 2)].innerHTML
        let totalFour = squares[i + (width * 3)].innerHTML
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
        let filteredColumn = column.filter(num => num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = filteredColumn.concat(zeros)
  
        squares[i].innerHTML = newColumn[0]
        squares[i +width].innerHTML = newColumn[1]
        squares[i+(width*2)].innerHTML = newColumn[2]
        squares[i+(width*3)].innerHTML = newColumn[3]
      }
      swiftifyGame()
    }
  
    // move all tiles down
    function moveDown() {
      deSwiftifyGame()
      for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + width].innerHTML
        let totalThree = squares[i + (width * 2)].innerHTML
        let totalFour = squares[i + (width * 3)].innerHTML
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
        let filteredColumn = column.filter(num => num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filteredColumn)
  
        squares[i].innerHTML = newColumn[0]
        squares[i +width].innerHTML = newColumn[1]
        squares[i+(width*2)].innerHTML = newColumn[2]
        squares[i+(width*3)].innerHTML = newColumn[3]
      }
      swiftifyGame()
    }
  
    // combine two tiles that are next to eachother (left/right)
    // i.e. when 2 8s meet they join to make 1 16
    function combineRow() {
      deSwiftifyGame()
      for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i +1].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML) 
          squares[i].innerHTML = combinedTotal
          squares[i +1].innerHTML = 0   
          score += combinedTotal
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()
    }
  
    // combine two tiles that are next to eachother (above/below)
    // i.e. when 2 8s meet they join to make 1 16
    function combineColumn() {
      deSwiftifyGame()
      for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i +width].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
          squares[i].innerHTML = combinedTotal
          squares[i +width].innerHTML = 0
          score += combinedTotal
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()
    }
  
    // assign functions to keyCodes
    function control(e) {
      if(e.keyCode === 37) {
        keyLeft()
      } else if (e.keyCode === 38) {
        keyUp()
      } else if (e.keyCode === 39) {
        keyRight()
      } else if (e.keyCode === 40) {
        keyDown()
      }
    }
    document.addEventListener('keyup', control)
  
    function keyRight() {
      moveRight()
      combineRow()
      moveRight()
      generateNewTile()
    }
  
    function keyLeft() {
      moveLeft()
      combineRow()
      moveLeft()
      generateNewTile()
    }
  
    function keyUp() {
      moveUp()
      combineColumn()
      moveUp()
      generateNewTile()
    }
  
    function keyDown() {
      moveDown()
      combineColumn()
      moveDown()
      generateNewTile()
    }
  
    // check for the number 2048 in the squares to win
    // check for red TV in the squares to win
    function checkForWin() {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = "You win! Stream Red (Taylor's Version)."
          document.removeEventListener('keyup', control)
          setTimeout(() => clear(), 3000)
        }
      }
    }
  
    // check if there are no zeros on the board to lose
    function checkForGameOver() {
      let zeros = 0
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          zeros++
        }
      }
      if (zeros === 0) {
        resultDisplay.innerHTML = 'Game Over'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  
    // clear timer
    function clear() {
      clearInterval(myTimer)
    }
  
    // converts the display from numbers to Taylor Swift albums
    function swiftifyGame() {
      for (let i = 0; i < width * width; i++) { 
        if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
        else if (squares[i].innerHTML == 2) squares[i].innerHTML = album_debut
        else if (squares[i].innerHTML  == 4) squares[i].innerHTML =album_fearless
        else if (squares[i].innerHTML  == 8) squares[i].innerHTML =album_speaknow
        else if (squares[i].innerHTML  == 16) squares[i].innerHTML =album_red
        else if (squares[i].innerHTML  == 32) squares[i].innerHTML =album_1989
        else if (squares[i].innerHTML == 64) squares[i].innerHTML =album_reputation
        else if (squares[i].innerHTML == 128) squares[i].innerHTML =album_lover
        else if (squares[i].innerHTML == 256) squares[i].innerHTML =album_folklore
        else if (squares[i].innerHTML == 512) squares[i].innerHTML =album_evermore
        else if (squares[i].innerHTML == 1024) squares[i].innerHTML =album_fearlessTV
        else if (squares[i].innerHTML == 2048) squares[i].innerHTML =album_redTV
      }
    }

    // converts display from Taylor Swift albums to numbers so that game logic can properly function
    function deSwiftifyGame() {
      for (let i = 0; i < width * width; i++) { 
        if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
        else if (squares[i].innerHTML == album_debut) squares[i].innerHTML = 2 
        else if (squares[i].innerHTML  == album_fearless) squares[i].innerHTML = 4
        else if (squares[i].innerHTML  == album_speaknow) squares[i].innerHTML = 8
        else if (squares[i].innerHTML  == album_red) squares[i].innerHTML = 16
        else if (squares[i].innerHTML  == album_1989) squares[i].innerHTML = 32
        else if (squares[i].innerHTML == album_reputation) squares[i].innerHTML = 64
        else if (squares[i].innerHTML == album_lover) squares[i].innerHTML = 128
        else if (squares[i].innerHTML == album_folklore) squares[i].innerHTML = 256
        else if (squares[i].innerHTML == album_evermore) squares[i].innerHTML = 512
        else if (squares[i].innerHTML == album_fearlessTV) squares[i].innerHTML = 1024
        else if (squares[i].innerHTML == album_redTV) squares[i].innerHTML = 2048
      }
    }
    
  swiftifyGame()
  var myTimer = setInterval(swiftifyGame, 50)
  
  })


  