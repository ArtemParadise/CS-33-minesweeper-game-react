function StatusMessage({ status }) {
  const statusText = {
    'in-progress': 'System Armed. Sweep Carefully.',
    win: 'Mission Accomplished. Neural Net Secure.',
    lose: 'Mission Failed. System Compromised.'
  }[status]

  return <span>{statusText}</span>
}

export default StatusMessage

