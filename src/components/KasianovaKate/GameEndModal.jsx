import styles from './GameEndModal.module.css'

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function StatCard({ label, value }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  )
}

function GameEndModal({ open, status, seconds, stats, onRestart, onDismiss }) {
  const overlayClasses = [styles.overlay]
  if (open) overlayClasses.push(styles.show)

  const statusText = status === 'win' ? 'NEURAL NETWORK SECURED' : 'SYSTEM COMPROMISED'
  const titleText = status === 'win' ? 'MISSION ACCOMPLISHED' : 'MISSION FAILED'

  return (
    <div className={overlayClasses.join(' ')}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
        <h2 className={styles.title}>{titleText}</h2>
        <div className={`${styles.result} ${styles[status === 'win' ? 'win' : 'lose']}`}>{statusText}</div>
        <div className={styles.stats}>
          <StatCard label="Mines Guessed Correctly" value={stats.correctGuesses} />
          <StatCard label="Total Flags Used" value={stats.flagsUsed} />
          <StatCard label="Mines Accidentally Opened" value={stats.minesOpened} />
          <StatCard label="Time Elapsed" value={formatTime(seconds)} />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={onRestart}>
            Restart Mission
          </button>
          <button type="button" className={styles.button} onClick={onDismiss}>
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameEndModal

