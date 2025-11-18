import styles from './Board.module.css'
import Cell from './Cell'

function Board({ board, status, onOpenCell, onToggleFlag }) {
  return (
    <div
      className={styles.board}
      style={{ gridTemplateColumns: `repeat(${board[0]?.length ?? 0}, 60px)` }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              status={status}
              onOpen={() => onOpenCell(rowIndex, colIndex)}
              onToggleFlag={() => onToggleFlag(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board

