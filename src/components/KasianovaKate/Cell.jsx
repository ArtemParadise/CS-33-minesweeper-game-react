import mineImage from './photo/image-Photoroom.png'
import flagImage from './photo/flag.png'
import styles from './Cell.module.css'

function Cell({ cell, status, onOpen, onToggleFlag }) {
  const { state, hasMine, neighborMines } = cell

  const handleClick = (event) => {
    event.preventDefault()
    if (event.type === 'click') {
      onOpen()
    } else if (event.type === 'contextmenu') {
      onToggleFlag()
    }
  }

  // Decide when to visually show the mine icon/border
  const showMine = hasMine && (state === 'detonated' || (status !== 'in-progress' && (state === 'open' || state === 'flagged-mine')))

  const classNames = [styles.cell]
  if (state === 'open') classNames.push(styles.open)
  if (state === 'flagged' || state === 'flagged-mine') classNames.push(styles.flag)
  if (state === 'flagged-mine') classNames.push(styles.correctGuess)
  if (state === 'flagged' && !hasMine && status !== 'in-progress') classNames.push(styles.incorrectGuess)
  if (showMine) classNames.push(styles.mine)
  if (state === 'detonated') classNames.push(styles.detonated)
  if (hasMine && state === 'open' && status !== 'in-progress') classNames.push(styles.revealedMine)
  if (state === 'open' && neighborMines > 0) classNames.push(styles[`number${neighborMines}`])

  let content = null
  if (state === 'flagged' || state === 'flagged-mine') {
    content = <img src={flagImage} alt="Flag" className={styles.icon} />
  } else if (showMine) {
    content = <img src={mineImage} alt="Mine" className={styles.icon} />
  } else if (!hasMine && state === 'open' && neighborMines > 0) {
    content = neighborMines
  }

  return (
    <button
      type="button"
      className={classNames.filter(Boolean).join(' ')}
      onClick={handleClick}
      onContextMenu={handleClick}
      disabled={status !== 'in-progress' && state !== 'flagged' && state !== 'flagged-mine'}
      aria-label={`cell ${state}${hasMine ? ' mine' : ''}`}
    >
      {content}
    </button>
  )
}

export default Cell

