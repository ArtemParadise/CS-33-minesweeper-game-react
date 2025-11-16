// Cell.jsx — ГОТОВО ДЛЯ ЛАБИ №5
import React from 'react';
import mineImage from './photo/image-Photoroom.png';
import flagImage from './photo/flag.png';
import styles from './Cell.module.css';

const CELL_STATE = {
  CLOSED: 'closed',
  OPEN: 'open',
  FLAGGED: 'flagged',
  FLAGGED_MINE: 'flagged-mine',
  DETONATED: 'detonated',
};

const GAME_STATUS = {
  IN_PROGRESS: 'in-progress',
  WON: 'won',
  LOST: 'lost',
};

function Cell({ cell, status, onOpen, onToggleFlag }) {
  const { state, hasMine, neighborMines } = cell;

  const handleClick = (e) => {
    e.preventDefault();
    if (e.type === 'click') onOpen();
    else if (e.type === 'contextmenu') onToggleFlag();
  };

  const showMine =
    hasMine &&
    (state === CELL_STATE.DETONATED ||
      (status !== GAME_STATUS.IN_PROGRESS &&
        (state === CELL_STATE.OPEN || state === CELL_STATE.FLAGGED_MINE)));

  const classList = [styles.cell];
  if (state === CELL_STATE.OPEN) classList.push(styles.open);
  if (state === CELL_STATE.FLAGGED || state === CELL_STATE.FLAGGED_MINE)
    classList.push(styles.flag);
  if (state === CELL_STATE.FLAGGED_MINE) classList.push(styles.correctGuess);
  if (state === CELL_STATE.FLAGGED && !hasMine && status !== GAME_STATUS.IN_PROGRESS)
    classList.push(styles.incorrectGuess);
  if (showMine) classList.push(styles.mine);
  if (state === CELL_STATE.DETONATED) classList.push(styles.detonated);
  if (hasMine && state === CELL_STATE.OPEN && status !== GAME_STATUS.IN_PROGRESS)
    classList.push(styles.revealedMine);
  if (state === CELL_STATE.OPEN && neighborMines > 0)
    classList.push(styles[`number${neighborMines}`]);

  let content = null;
  if (state === CELL_STATE.FLAGGED || state === CELL_STATE.FLAGGED_MINE) {
    content = <img src={flagImage} alt="Прапорець" className={styles.icon} />;
  } else if (showMine) {
    content = <img src={mineImage} alt="Міна" className={styles.icon} />;
  } else if (state === CELL_STATE.OPEN && neighborMines > 0) {
    content = neighborMines;
  }

  const disabled =
    status !== GAME_STATUS.IN_PROGRESS &&
    state !== CELL_STATE.FLAGGED &&
    state !== CELL_STATE.FLAGGED_MINE;

  return (
    <button
      type="button"
      className={classList.join(' ')}
      onClick={handleClick}
      onContextMenu={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Cell;