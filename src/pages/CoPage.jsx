import CoNav            from '../components/CoNav'
import CoHero           from '../components/CoHero'
import CoProblem        from '../components/CoProblem'
import CoCost           from '../components/CoCost'
import CoCategory       from '../components/CoCategory'
import CoMechanism      from '../components/CoMechanism'
import CoProduct        from '../components/CoProduct'
import CoOhShit         from '../components/CoOhShit'
import CoServices       from '../components/CoServices'
import CoOffer          from '../components/CoOffer'
import CoProof          from '../components/CoProof'
import CoTransformation from '../components/CoTransformation'
import CoForWho         from '../components/CoForWho'
import CoGuarantee      from '../components/CoGuarantee'
import CoRoadmap        from '../components/CoRoadmap'
import CoFaq            from '../components/CoFaq'
import CoFooterCta      from '../components/CoFooterCta'
import CoFooter         from '../components/CoFooter'

export default function CoPage() {
  return (
    <div className="co-page">
      <CoNav />
      <main>
        <CoHero />           {/* 01 — Hero */}
        <CoProblem />        {/* 02 — O problema */}
        <CoCost />           {/* 03 — O custo invisível */}
        <CoCategory />       {/* 04 — O que é a Reminder AI (nova secção) */}
        <CoMechanism />      {/* 05 — Deteta → Executa → Verifica → Escala */}
        <CoProduct />        {/* 06 — Primeiro workflow: Venda → Cliente pronto */}
        <CoOhShit />         {/* 07 — O momento */}
        <CoServices />       {/* 08 — AI Workers */}
        <CoOffer />          {/* 09 — Implementação em 4 semanas */}
        <CoProof />          {/* 10 — Resultados / capacidade */}
        <CoTransformation /> {/* 11 — Transformação */}
        <CoForWho />         {/* 12 — É para si? */}
        <CoGuarantee />      {/* 13 — Garantia */}
        <CoRoadmap />        {/* 14 — O caminho */}
        <CoFaq />            {/* 15 — FAQ */}
        <CoFooterCta />      {/* 16 — CTA final */}
      </main>
      <CoFooter />
    </div>
  )
}
