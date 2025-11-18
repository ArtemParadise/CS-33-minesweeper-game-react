function MinesCounter({ remaining }) {
  return <span>{remaining.toString().padStart(3, '0')}</span>
}

export default MinesCounter

