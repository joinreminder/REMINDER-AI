import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRIC_GROUPS = [
  {
    title: 'PROSPECTS / LEADS',
    metrics: ['Processados', 'Contactados', 'Qualificados'],
    color: '#5aabff',
  },
  {
    title: 'ENGAGEMENT',
    metrics: ['Respostas', 'Respostas positivas', 'Follow-ups concluidos'],
    color: '#4ade80',
  },
  {
    title: 'MEETINGS',
    metrics: ['Reunioes marcadas', 'Reunioes realizadas', 'Show rate'],
    color: '#a78bfa',
  },
  {
    title: 'PIPELINE',
    metrics: ['Oportunidades', 'Pipeline influenciado', 'Conversoes'],
    color: '#f59e0b',
  },
]

/* Fake dashboard data for the mockup */
const DASHBOARD_METRICS = [
  { label: 'Prospects contactados', value: '1,247', change: '+18%', up: true },
  { label: 'Taxa de resposta', value: '34%', change: '+6pp', up: true },
  { label: 'Reunioes marcadas', value: '47', change: '+23%', up: true },
  { label: 'Show rate', value: '89%', change: '+4pp', up: true },
  { label: 'Oportunidades', value: '31', change: '+19%', up: true },
  { label: 'Pipeline gerado', value: '€187k', change: '+27%', up: true },
]

export default function AilyxDashboard() {
  const headRef = useRef(null)
  const dashRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headRef.current, start: 'top 78%', once: true },
      })
      if (dashRef.current) {
        gsap.from(dashRef.current, {
          y: 40, opacity: 0, scale: 0.97, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: dashRef.current, start: 'top 82%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: '#F3F6FB', padding: 'clamp(80px, 10vw, 120px) 0', borderTop: '1px solid #e8edf5' }}>
      <div className="ayl-container">

        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ayl-section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>Metricas</div>
          <h2 className="ayl-h2" style={{ color: '#0a1c42', marginBottom: '12px' }}>
            Nao queremos mais actividade. Queremos mais oportunidades.
          </h2>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto' }}>
            Antes de comecar, estabelecemos um baseline. Depois acompanhamos:
          </p>
        </div>

        {/* Metric categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '800px', margin: '0 auto 40px' }} className="ayl-metrics-cats">
          {METRIC_GROUPS.map((group, i) => (
            <div key={i} style={{
              padding: '20px 16px',
              background: '#fff',
              border: '1.5px solid #e8edf5',
              borderRadius: '14px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '10px', color: group.color,
                letterSpacing: '0.08em', marginBottom: '12px',
              }}>
                {group.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {group.metrics.map((m, j) => (
                  <span key={j} style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div ref={dashRef} style={{
          maxWidth: '800px', margin: '0 auto 40px',
          padding: '28px',
          background: '#fff',
          border: '1.5px solid #e8edf5',
          borderRadius: '20px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0a1c42' }}>Reminder Dashboard</span>
            </div>
            <span style={{ fontSize: '11px', color: '#999', fontFamily: 'Sora, sans-serif' }}>Ultimos 30 dias</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="ayl-dash-grid">
            {DASHBOARD_METRICS.map((m, i) => (
              <div key={i} style={{
                padding: '16px',
                background: '#F8FAFF',
                borderRadius: '12px',
                border: '1px solid #e8edf5',
              }}>
                <div style={{ fontSize: '11px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>{m.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '22px', color: '#0a1c42' }}>{m.value}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#4ade80' }}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key metric */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', padding: '20px 32px',
            background: '#06142e', border: '1px solid rgba(33,127,241,0.3)', borderRadius: '14px',
          }}>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700,
              fontSize: '15px', margin: 0, lineHeight: 1.5,
            }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>A metrica que importa: </span>
              <span style={{ color: '#5aabff' }}>Reunioes qualificadas e oportunidades geradas.</span>
            </p>
          </div>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginTop: '16px', maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto' }}>
            Nao otimizamos para enviar mais mensagens. Otimizamos para criar mais oportunidades comerciais.
          </p>
        </div>

      </div>
    </section>
  )
}
