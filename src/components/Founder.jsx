const STATS = [
  { val: '+30', label: 'clínicas implementadas' },
  { val: '€2M+', label: 'receita recuperada' },
  { val: '< 6 sem.', label: 'tempo médio de implementação' },
]

const POINTS = [
  'Calculamos o ROI projetado antes de qualquer compromisso — se os números não justificarem, dizemos isso primeiro.',
  'Implementamos nós o sistema inteiro. O tempo pedido à clínica é menos de 3 horas no total.',
  'Trabalhamos com no máximo 3 clínicas por mês — para garantir que cada implementação tem atenção total.',
]

export default function Founder() {
  return (
    <section className="section" id="founder">
      <div className="container">

        <div className="founder__inner anim">

          {/* Left — photo + stats */}
          <div className="founder__left">
            <div className="founder__photo">
              {/* Substitua este bloco por uma <img> real quando tiver foto */}
              <div className="founder__photo-placeholder">
                <span className="founder__photo-initials">R</span>
                <span style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 600, marginTop: 8 }}>
                  Adicione a sua foto aqui
                </span>
              </div>
            </div>

            <div className="founder__stats">
              {STATS.map(s => (
                <div key={s.label} className="founder__stat">
                  <span className="founder__stat-val">{s.val}</span>
                  <span className="founder__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — copy */}
          <div className="founder__right">
            <span className="label" style={{ display: 'block', marginBottom: 18 }}>Quem está por trás da Reminder</span>

            <h2 className="h2" style={{ marginBottom: 24 }}>
              Não somos uma agência.<br />
              <mark style={{ background: 'none', color: 'var(--purple)' }}>Somos parceiros de crescimento.</mark>
            </h2>

            <p className="founder__bio">
              A Reminder nasceu da frustração de ver clínicas excelentes a perder receita por razões evitáveis.
              Não por falta de pacientes — mas por falta de sistemas. Faltas que ninguém confirma,
              tratamentos que ficam por fechar, pacientes que desaparecem sem que ninguém vá buscar.
            </p>

            <p className="founder__bio">
              A nossa abordagem é diferente: calculamos primeiro, implementamos depois.
              Trabalhamos com um número limitado de clínicas por mês — porque crescimento real
              exige atenção real.
            </p>

            <div className="founder__points">
              {POINTS.map((point, i) => (
                <div key={i} className="founder__point">
                  <span className="founder__point-icon">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="#final-cta" className="btn btn--primary btn--lg">
                Marcar o Diagnóstico Gratuito →
              </a>
              <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>
                Resposta em 24h úteis
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
