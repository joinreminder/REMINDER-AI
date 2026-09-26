import AilyxHero         from '../components/AilyxHero'
import LogoTicker        from '../components/LogoTicker'
import AilyxServices     from '../components/AilyxServices'
import AilyxSolution     from '../components/AilyxSolution'
import AilyxAudit        from '../components/AilyxAudit'
import AilyxIntegrations from '../components/AilyxIntegrations'
import AilyxTeam         from '../components/AilyxTeam'
import AilyxIncludes     from '../components/AilyxIncludes'
import AilyxForWho       from '../components/AilyxForWho'
import AilyxGuarantee    from '../components/AilyxGuarantee'
import CsFaq             from '../components/CsFaq'
import AilyxFooterCTA    from '../components/AilyxFooterCTA'
import AilyxFooter       from '../components/AilyxFooter'

export default function HomePage() {
  return (
    <>
      <main>
        <AilyxHero />          {/* Hero */}
        <LogoTicker />         {/* Social proof logos */}
        <AilyxServices />      {/* O problema */}
        <AilyxSolution />      {/* Roadmap Gratuito */}
        <AilyxAudit />         {/* As 5 Dimensões */}
        <AilyxIntegrations />  {/* O que recebe */}
        <AilyxTeam />          {/* Como funciona — 3 passos */}
        <AilyxIncludes />      {/* O mecanismo */}
        <AilyxForWho />        {/* Para quem é */}
        <AilyxGuarantee />     {/* 30-Day Pilot */}
        <CsFaq />              {/* FAQ */}
        <AilyxFooterCTA />     {/* O primeiro passo */}
      </main>
      <AilyxFooter />
    </>
  )
}
