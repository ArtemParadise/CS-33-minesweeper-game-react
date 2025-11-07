import { useCallback, useEffect, useMemo, useState } from 'react'
import Board from './Board'
import Timer from './Timer'
import MinesCounter from './MinesCounter'
import StatusMessage from './StatusMessage'
import GameEndModal from './GameEndModal'
import styles from './Game.module.css'

const CELL_STATE = {
  CLOSED: 'closed',
  OPEN: 'open',
  FLAGGED: 'flagged',
  DETONATED: 'detonated',
  FLAGGED_MINE: 'flagged-mine'
}

const GAME_STATUS = {
  IN_PROGRESS: 'in-progress',
  WIN: 'win',
  LOSE: 'lose'
}

const GAME_CONFIG = {
  ROWS: 9,
  COLS: 10,
  MINES: 15
}

function createCell(hasMine = false) {
  return {
    hasMine,
    neighborMines: 0,
    state: CELL_STATE.CLOSED
  }
}

function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createCell())
  )
}

function placeMines(board, mines) {
  const rows = board.length
  const cols = board[0].length
  let placed = 0

  while (placed < mines) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    if (!board[r][c].hasMine) {
      board[r][c].hasMine = true
      placed += 1
    }
  }
}

function countAdjacentMines(board, row, col) {
  let count = 0
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue
      const nr = row + dr
      const nc = col + dc
      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {
        if (board[nr][nc].hasMine) count += 1
      }
    }
  }
  return count
}

function assignNeighborCounts(board) {
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[0].length; c += 1) {
      const cell = board[r][c]
      if (!cell.hasMine) {
        cell.neighborMines = countAdjacentMines(board, r, c)
      }
    }
  }
}

function createBoard(rows, cols, mines) {
  const board = createEmptyBoard(rows, cols)
  placeMines(board, mines)
  assignNeighborCounts(board)
  return board
}

function createGame() {
  return {
    rows: GAME_CONFIG.ROWS,
    cols: GAME_CONFIG.COLS,
    mines: GAME_CONFIG.MINES,
    status: GAME_STATUS.IN_PROGRESS,
    board: createBoard(GAME_CONFIG.ROWS, GAME_CONFIG.COLS, GAME_CONFIG.MINES)
  }
}

function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })))
}

function cloneGame(game) {
  return {
    ...game,
    board: cloneBoard(game.board)
  }
}

function inBounds(game, row, col) {
  return row >= 0 && row < game.rows && col >= 0 && col < game.cols
}

function floodOpen(board, row, col, game) {
  const stack = [[row, col]]

  while (stack.length) {
    const [cr, cc] = stack.pop()
    const cell = board[cr][cc]
    if (cell.state !== CELL_STATE.CLOSED || cell.hasMine) continue

    cell.state = CELL_STATE.OPEN

    if (cell.neighborMines === 0) {
      for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
          if (dr === 0 && dc === 0) continue
          const nr = cr + dr
          const nc = cc + dc
          if (inBounds(game, nr, nc) && board[nr][nc].state === CELL_STATE.CLOSED) {
            stack.push([nr, nc])
          }
        }
      }
    }
  }
}

function checkWinCondition(board) {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.hasMine && cell.state !== CELL_STATE.OPEN) {
        return false
      }
    }
  }
  return true
}

function getFlagCount(board) {
  return board.reduce(
    (sum, row) =>
      sum +
      row.filter(
        (cell) => cell.state === CELL_STATE.FLAGGED || cell.state === CELL_STATE.FLAGGED_MINE
      ).length,
    0
  )
}

function revealPostGameBoard(game) {
  game.board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.state === CELL_STATE.FLAGGED) {
        if (cell.hasMine) {
          cell.state = CELL_STATE.FLAGGED_MINE
        }
      } else if (cell.hasMine && cell.state !== CELL_STATE.DETONATED) {
        cell.state = CELL_STATE.OPEN
      }
    })
  })
  return game
}

function calculateStats(game) {
  let correctGuesses = 0
  let flagsUsed = 0
  let minesOpened = 0

  game.board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.state === CELL_STATE.FLAGGED || cell.state === CELL_STATE.FLAGGED_MINE) {
        flagsUsed += 1
      }
      if (cell.state === CELL_STATE.FLAGGED_MINE) {
        correctGuesses += 1
      }
      if (cell.hasMine && (cell.state === CELL_STATE.OPEN || cell.state === CELL_STATE.DETONATED)) {
        minesOpened += 1
      }
    })
  })

  return { correctGuesses, flagsUsed, minesOpened }
}

function MinesweeperGame() {
  const [game, setGame] = useState(() => createGame())
  const [firstClick, setFirstClick] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!timerActive) return undefined
    const id = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(id)
  }, [timerActive])

  const remainingMines = useMemo(
    () => Math.max(game.mines - getFlagCount(game.board), 0),
    [game]
  )

  const resetGame = useCallback(() => {
    setGame(createGame())
    setFirstClick(false)
    setElapsedSeconds(0)
    setTimerActive(false)
    setModalOpen(false)
  }, [])

  const handleOpenCell = useCallback(
    (row, col) => {
      if (game.status !== GAME_STATUS.IN_PROGRESS) return
      const selected = game.board[row][col]
      if (selected.state !== CELL_STATE.CLOSED) return

      if (!firstClick) {
        setFirstClick(true)
        setTimerActive(true)
        setElapsedSeconds(0)
      }

      let outcome = null

      setGame((current) => {
        if (current.status !== GAME_STATUS.IN_PROGRESS) return current
        const currentCell = current.board[row][col]
        if (currentCell.state !== CELL_STATE.CLOSED) return current

        let nextGame = cloneGame(current)

        if (nextGame.board[row][col].hasMine) {
          nextGame.board[row][col].state = CELL_STATE.DETONATED
          nextGame.status = GAME_STATUS.LOSE
          nextGame = revealPostGameBoard(nextGame)
          outcome = GAME_STATUS.LOSE
          return nextGame
        }

        if (nextGame.board[row][col].neighborMines === 0) {
          floodOpen(nextGame.board, row, col, nextGame)
        } else {
          nextGame.board[row][col].state = CELL_STATE.OPEN
        }

        if (checkWinCondition(nextGame.board)) {
          nextGame.status = GAME_STATUS.WIN
          nextGame = revealPostGameBoard(nextGame)
          outcome = GAME_STATUS.WIN
        }

        return nextGame
      })

      if (outcome) {
        setTimerActive(false)
        setModalOpen(true)
      }
    },
    [game, firstClick]
  )

  const handleToggleFlag = useCallback(
    (row, col) => {
      if (game.status !== GAME_STATUS.IN_PROGRESS) return
      const selected = game.board[row][col]
      if (selected.state === CELL_STATE.OPEN || selected.state === CELL_STATE.DETONATED) return

      setGame((current) => {
        if (current.status !== GAME_STATUS.IN_PROGRESS) return current
        const nextGame = cloneGame(current)
        const nextCell = nextGame.board[row][col]

        if (nextCell.state === CELL_STATE.FLAGGED || nextCell.state === CELL_STATE.FLAGGED_MINE) {
          nextCell.state = CELL_STATE.CLOSED
        } else {
          const placedFlags = getFlagCount(nextGame.board)
          if (placedFlags >= nextGame.mines) {
            return current
          }
          nextCell.state = CELL_STATE.FLAGGED
        }

        return nextGame
      })
    },
    [game]
  )

  useEffect(() => {
    if (game.status !== GAME_STATUS.IN_PROGRESS) {
      setTimerActive(false)
    }
  }, [game.status])

  const stats = useMemo(() => calculateStats(game), [game])

  const foundMines = useMemo(() => {
    let count = 0
    game.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasMine && (cell.state === CELL_STATE.FLAGGED || cell.state === CELL_STATE.FLAGGED_MINE)) {
          count += 1
        }
      })
    })
    return count
  }, [game])

  const notFoundMines = useMemo(() => Math.max(game.mines - foundMines, 0), [game.mines, foundMines])

  return (
    <div className={styles.page}>
      <h1>CYBER MINESWEEPER 2077</h1>
      <div className={styles.boardShell}>
        <div className={styles.header}>
          <button type="button" className={styles.startButton} onClick={resetGame}>
            Initiate
          </button>
          <div className={styles.digits}>
            <Timer seconds={elapsedSeconds} />
          </div>
          <div className={styles.digits}>
            <MinesCounter remaining={remainingMines} />
          </div>
        </div>

        <div className={styles.miniStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Found</span>
            <span className={styles.statValue}>{foundMines}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Not Found</span>
            <span className={styles.statValue}>{notFoundMines}</span>
          </div>
        </div>

        <div className={styles.field}>
          <Board
            board={game.board}
            status={game.status}
            onOpenCell={handleOpenCell}
            onToggleFlag={handleToggleFlag}
          />
        </div>

        <div className={styles.statusBar}>
          <StatusMessage status={game.status} />
        </div>
      </div>

      <GameEndModal
        open={modalOpen}
        status={game.status}
        seconds={elapsedSeconds}
        stats={stats}
        onRestart={resetGame}
        onDismiss={() => setModalOpen(false)}
      />
    </div>
  )
}

export default MinesweeperGame

