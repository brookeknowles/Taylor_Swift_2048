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
      for (let i=0; i < width*width; i++) {
        square = document.createElement('div')
        square.innerHTML = 0
        gridDisplay.appendChild(square)
        squares.push(square)
      }
      generate()
      generate()
    }
    createBoard()
  
    // randomly generate a new tile
    function generate() {
      randomNumber = Math.floor(Math.random() * squares.length)
      if (squares[randomNumber].innerHTML == 0) {
        // squares[randomNumber].innerHTML = 2
        squares[randomNumber].innerHTML ="<img src=\"/images/debut.png\" width=\"100px\" height=\"100px\">";
        checkForGameOver()
      } else generate()
    }
  
    // move all tiles right
    function moveRight() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML
          let totalTwo = squares[i+1].innerHTML
          let totalThree = squares[i+2].innerHTML
          let totalFour = squares[i+3].innerHTML
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
    }
  
    // move all tiles left
    function moveLeft() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML
          let totalTwo = squares[i+1].innerHTML
          let totalThree = squares[i+2].innerHTML
          let totalFour = squares[i+3].innerHTML
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
    }
  
    // move all tiles up
    function moveUp() {
      for (let i=0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
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
    }
  
    // move all tiles down
    function moveDown() {
      for (let i=0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
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
    }

    // function calculates which album comes after 2 of the same are combined
    // inputs will be in form squares[i].innerHTML
    function swiftieMath(tileA, tileB) {
        if (tileA == tileB == album_debut){
            // this will be the combinedTotal
            return album_fearless
        }
        else if (tileA == tileB == album_fearless){
            return album_speaknow
        }
        else if (tileA == tileB == album_speaknow){
            return album_red
        }
        else if (tileA == tileB == album_red){
            return album_1989
        }
        else if (tileA == tileB == album_1989){
            return album_reputation
        }
        else if (tileA == tileB == album_reputation){
            return album_lover
        }
        else if (tileA == tileB == album_lover){
            return album_folklore
        }
        else if (tileA == tileB == album_folklore){
            return album_evermore
        }
        else if (tileA == tileB == album_evermore){
            return album_fearlessTV
        }
        else if (tileA == tileB == album_fearlessTV){
            return album_redTV
        }
    }

    // calculates score since images of albums dont add as well as integers
    function scoreCalculation(combinedTotal){
        if (combinedTotal == album_debut){
            return 2
        }
        if (combinedTotal == album_fearless){
            return 4
        }
        if (combinedTotal == album_speaknow){
            return 8
        }
        if (combinedTotal == album_red){
            return 16
        }
        if (combinedTotal == album_1989){
            return 32
        }
        if (combinedTotal == album_reputation){
            return 64
        }
        if (combinedTotal == album_lover){
            return 128
        }
        if (combinedTotal == album_folklore){
            return 256
        }
        if (combinedTotal == album_evermore){
            return 512
        }
        if (combinedTotal == album_fearlessTV){
            return 1024
        }
        if (combinedTotal == album_redTV){
            return 2048
        }
    }
  
    // combine two tiles that are next to eachother (left/right)
    // i.e. when 2 8s meet they join to make 1 16
    function combineRow() {
      for (let i =0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i +1].innerHTML) {
          // let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML) 
          // adding ints works but not adding images. will need to add some swiftiemath
          // let combinedTotal = swiftieMath(squares[i].innerHTML, squares[i+1].innerHTML)
          let combinedTotal = swiftieMath(squares[i].innerHTML, squares[i +1].innerHTML)
          squares[i].innerHTML = combinedTotal
          squares[i +1].innerHTML = 0
          score += scoreCalculation(combinedTotal)      // need some swiftiemath for this one too
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()
    }
  
    // combine two tiles that are next to eachother (above/below)
    // i.e. when 2 8s meet they join to make 1 16
    function combineColumn() {
      for (let i =0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i +width].innerHTML) {
          // let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
          let combinedTotal = swiftieMath(squares[i].innerHTML, squares[i +width].innerHTML)
          squares[i].innerHTML = combinedTotal
          squares[i +width].innerHTML = 0
          score += scoreCalculation(combinedTotal)
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
      generate()
    }
  
    function keyLeft() {
      moveLeft()
      combineRow()
      moveLeft()
      generate()
    }
  
    function keyUp() {
      moveUp()
      combineColumn()
      moveUp()
      generate()
    }
  
    function keyDown() {
      moveDown()
      combineColumn()
      moveDown()
      generate()
    }
  
    // check for the number 2048 in the squares to win
    // check for red TV in the squares to win
    function checkForWin() {
      for (let i=0; i < squares.length; i++) {
        // if (squares[i].innerHTML == 2048) {
        if (squares[i].innerHTML == "<img src=\"/images/red_TV.png\" width=\"100px\" height=\"100px\">"){
          resultDisplay.innerHTML = 'You WIN'
          document.removeEventListener('keyup', control)
          setTimeout(() => clear(), 3000)
        }
      }
    }
  
    // check if there are no zeros on the board to lose
    function checkForGameOver() {
      let zeros = 0
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          zeros++
        }
      }
      if (zeros === 0) {
        resultDisplay.innerHTML = 'You LOSE'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  
    // clear timer
    function clear() {
      clearInterval(myTimer)
    }
  
    // add taylor swift
    function addTaylorSwift() {
        for (let i=0; i < squares.length; i++) {
          if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
          else if (squares[i].innerHTML == 2) squares[i].innerHTML =album_debut
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
    addTaylorSwift()
  
    // add colours
//     function addColours() {
//       for (let i=0; i < squares.length; i++) {
//         if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
//         else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
//         else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8' 
//         else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179' 
//         else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4' 
//         else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064' 
//         else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e' 
//         else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982' 
//         else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c' 
//         else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
//         else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5' 
//         else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
//       }
//   }
//   addColours()
  
  var myTimer = setInterval(addTaylorSwift, 50)
  
  })