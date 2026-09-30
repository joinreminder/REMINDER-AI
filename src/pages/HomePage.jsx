import { lazy, Suspense } from 'react'
import AilyxHero from '../components/AilyxHero'

const AilyxServices      = lazy(() => import('../components/AilyxServices'))
const AilyxCapabilities  = lazy(() => import('../components/AilyxCapabilities'))
const AilyxAudit         = lazy(() => import('../components/AilyxAudit'))
const AilyxForWho    = lazy(() => import('../components/AilyxForWho'))
const CsFaq          = lazy(() => import('../components/CsFaq'))
const AilyxFooterCTA = lazy(() => import('../components/AilyxFooterCTA'))
const AilyxFooter    = lazy(() => import('../components/AilyxFooter'))

export default function HomePage() {
  return (
    <>
      <main>
        <AilyxHero />
        <Suspense fallback={null}>
          <AilyxServices />
          <AilyxCapabilities />
          <AilyxAudit />
          <AilyxForWho />
          <CsFaq />
          <AilyxFooterCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <AilyxFooter />
      </Suspense>
    </>
  )
}
