import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' | 'out'

  useEffect(() => {
    // After loading bar completes (~2s), fade out
    const t1 = setTimeout(() => setPhase('out'), 2200)
    // After fade out (~500ms), unmount
    const t2 = setTimeout(() => onDone(), 2700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`loader${phase === 'out' ? ' loader--out' : ''}`}>
      <div className="loader__inner">
        <img
          src="/logotipo-editado.png"
          alt="Reminder"
          className="loader__bird"
        />
        <p className="loader__text">A iniciar<span className="loader__dots" /></p>
        <div className="loader__bar-track">
          <div className="loader__bar-fill" />
        </div>
      </div>
    </div>
  )
}
