import { useEffect } from 'react'
import RHero        from '../components/RHero'
import RStats       from '../components/RStats'
import RProblem     from '../components/RProblem'
import RDiagnostico from '../components/RMechanism'
import RSystems     from '../components/RValueStack'
import RProcess     from '../components/RCalculator'
import RTransform   from '../components/RTransform'
import RForWho      from '../components/RGuarantee'
import RSocialProof from '../components/RSocialProof'
import RFaq         from '../components/RFaq'
import RFinalCta    from '../components/RFinalCta'
import RFooter      from '../components/RFooter'

export default function RemindrHomePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') })
      },
      { threshold: 0.12 }
    )
    const observe = () => {
      document.querySelectorAll('.anim:not(.is-visible)').forEach(el => obs.observe(el))
    }
    observe()
    // Re-observe after a tick to catch elements rendered after mount
    const t = setTimeout(observe, 120)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [])

  return (
    <>
      <main>
        <RHero />
        <RStats />
        <RProblem />
        <RDiagnostico />
        <RSystems />
        <RProcess />
        <RTransform />
        <RForWho />
        <RSocialProof />
        <RFaq />
        <RFinalCta />
      </main>
      <RFooter />
    </>
  )
}
