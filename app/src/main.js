import './main.scss'

import Color from 'color'

const PIECE_WIDTH = 16
const PIECE_HEIGHT = PIECE_WIDTH

const KEY_MOVE_LEFT = 'a'
const KEY_MOVE_UP = 'w'
const KEY_MOVE_DOWN = 's'
const KEY_MOVE_RIGHT = 'd'

const DIRECTION_UP = 0
const DIRECTION_DOWN = 1
const DIRECTION_LEFT = 2
const DIRECTION_RIGHT = 3

const PIECE_BLANK = 0
const PIECE_APPLE = 1
const PIECE_HEAD = 2
const PIECE_TAIL_UP = 3
const PIECE_TAIL_DOWN = 4
const PIECE_TAIL_LEFT = 5
const PIECE_TAIL_RIGHT = 6

const COLOR_BLANK = '#ffffff'
const COLOR_SNAKE_HEAD = '#0000ff'
const COLOR_SNAKE_TAIL = '#00ff00'
const COLOR_APPLE = '#ff0000'

function placeApple(board) {
  let numBlankSquares = 0
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === PIECE_BLANK) {
        numBlankSquares++
      }
    }
  }

  let a = Math.floor(Math.random() * numBlankSquares)

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === PIECE_BLANK) {
        a--
        if (a === 0) {
          board[i][j] = PIECE_APPLE
        }
      }
    }
  }
}

window.onload = () => {
  const boardWidth = 32
  const boardHeight = 32
  const board = ([...new Array(boardHeight)]).map(() => [...new Array(boardWidth).fill(PIECE_BLANK)])

  placeApple(board)

  const canvas = document.getElementById('canvas')
  canvas.width = PIECE_HEIGHT * board.length
  canvas.height = PIECE_WIDTH * board[0].length
  const context = canvas.getContext('2d')

  const scoreIndicator = document.getElementById('score-indicator')

  board[0][0] = PIECE_TAIL_RIGHT
  board[0][1] = PIECE_TAIL_RIGHT
  board[0][2] = PIECE_HEAD

  let tailRow = 0
  let tailCol = 0
  let headRow = 0
  let headCol = 2
  let direction = DIRECTION_RIGHT
  let nextDirection = DIRECTION_RIGHT
  let running = true
  let score = 0

  document.addEventListener('keydown', e => {
    switch (e.key) {
    case KEY_MOVE_UP:
      if (direction !== DIRECTION_DOWN) {
        nextDirection = DIRECTION_UP
      }
      break
    case KEY_MOVE_DOWN:
      if (direction !== DIRECTION_UP) {
        nextDirection = DIRECTION_DOWN
      }
      break
    case KEY_MOVE_LEFT:
      if (direction !== DIRECTION_RIGHT) {
        nextDirection = DIRECTION_LEFT
      }
      break
    case KEY_MOVE_RIGHT:
      if (direction != DIRECTION_LEFT) {
        nextDirection = DIRECTION_RIGHT
      }
      break
    }
  })

  function draw () {
    direction = nextDirection
    board[headRow][headCol] = direction

    switch (direction) {
    case DIRECTION_UP:
      board[headRow][headCol] = PIECE_TAIL_UP
      headRow--
      break
    case DIRECTION_DOWN:
      board[headRow][headCol] = PIECE_TAIL_DOWN
      headRow++
      break
    case DIRECTION_LEFT:
      board[headRow][headCol] = PIECE_TAIL_LEFT
      headCol--
      break
    case DIRECTION_RIGHT:
      board[headRow][headCol] = PIECE_TAIL_RIGHT
      headCol++
      break
    }

    if (headRow < 0 || headRow > boardHeight - 1 || headCol < 0 || headCol > boardWidth - 1) {
      running = false
      return
    }

    switch (board[headRow][headCol]) {
    case PIECE_TAIL_UP:
    case PIECE_TAIL_DOWN:
    case PIECE_TAIL_LEFT:
    case PIECE_TAIL_RIGHT:
      running = false
      break
    case PIECE_APPLE:
      placeApple(board)
      score++
      scoreIndicator.innerText = score
      break
    default:
      const tip = board[tailRow][tailCol]
      board[tailRow][tailCol] = PIECE_BLANK

      switch (tip) {
      case PIECE_TAIL_UP:
        tailRow--
        break
      case PIECE_TAIL_DOWN:
        tailRow++
        break
      case PIECE_TAIL_LEFT:
        tailCol--
        break
      case PIECE_TAIL_RIGHT:
        tailCol++
        break
      }
    }

    board[headRow][headCol] = PIECE_HEAD

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        switch(board[i][j]) {
        case PIECE_BLANK:
          context.fillStyle = COLOR_BLANK
          break
        case PIECE_APPLE:
          context.fillStyle = COLOR_APPLE
          break
        case PIECE_HEAD:
          context.fillStyle = COLOR_SNAKE_HEAD
          break
        case PIECE_TAIL_DOWN:
        case PIECE_TAIL_LEFT:
        case PIECE_TAIL_UP:
        case PIECE_TAIL_RIGHT:
          context.fillStyle = COLOR_SNAKE_TAIL
        }

        context.fillRect(j * PIECE_HEIGHT, i * PIECE_WIDTH, PIECE_HEIGHT, PIECE_WIDTH)
      }
    }

    if (running) {
      setTimeout(() => window.requestAnimationFrame(draw), 50)
    }
  }

  window.requestAnimationFrame(draw)
}