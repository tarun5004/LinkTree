import { useState } from 'react'
import { motion } from 'framer-motion'
import landingHero from '../../assets/landing-hero.png'
import makeThemClickCard from '../../assets/click-card/ChatGPT Image Jun 22, 2026, 01_46_30 AM.png'
import lookBetterCard from '../../assets/click-card/ChatGPT Image Jun 22, 2026, 02_17_52 AM.png'
import monetizeMoreCard from '../../assets/click-card/ChatGPT Image Jun 22, 2026, 02_24_36 AM.png'
import growFasterCard from '../../assets/click-card/ChatGPT Image Jun 22, 2026, 02_26_35 AM.png'
import { routes } from '../../app/routes.js'
import { navigate } from '../../shared/lib/router.js'
import { CreatorMarquee } from './components/CreatorMarquee.jsx'
import { LandingFeatureCard } from './components/LandingFeatureCard.jsx'

const steps = [
  {
    title: 'Register with Google',
    summary: 'Sign in fast with a trusted account.',
    detail: 'Google login keeps onboarding quick and removes the need to remember another password.',
  },
  {
    title: 'Claim your username',
    summary: 'Pick the public handle for your page.',
    detail: 'Your username becomes the memorable link people can type, share, and recognize.',
  },
  {
    title: 'Add content links',
    summary: 'Organize socials, products, videos, and offers.',
    detail: 'Put the most important links in one profile so followers do not get lost across platforms.',
  },
  {
    title: 'Share one public URL',
    summary: 'Use one link everywhere.',
    detail: 'Add the same URL to Instagram, YouTube, resumes, campaigns, and client messages.',
  },
]

const ctaButton =
  'min-h-12 min-w-56 rounded-lg border border-[#d7f80f] bg-[#d7f80f] px-6 text-sm font-black text-[#10220f] transition hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300/25'

export function HomePage() {
  const [activeStep, setActiveStep] = useState(0)
  const selectedStep = steps[activeStep]

  return (
    <main className="bg-[#f7f7f2] font-sans text-slate-500">
      <section className="grid min-h-[calc(100svh-73px)] grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] items-center gap-8 bg-[#174b17] px-5 py-12 text-white md:px-20 md:py-24 max-lg:grid-cols-1">
        <div className="max-w-[600px]">
          <p className="text-xs font-black uppercase tracking-widest text-[#d7f80f]">
            Link in bio, but useful
          </p>
          <h1 className="my-5 max-w-2xl text-6xl font-black leading-[0.9] text-white md:text-[104px]">
            All your content in a single link.
          </h1>
          <p className="max-w-xl font-bold text-white/85">
            Build one public page for your socials, portfolio, products,
            videos, bookings, and campaigns. Then use analytics to see what
            people actually click.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className={ctaButton} type="button" onClick={() => navigate(routes.register)}>
              Get started for free
            </button>
            <button
              className="min-h-12 rounded-lg border border-white/40 bg-transparent px-6 text-sm font-black text-white transition hover:border-[#d7f80f] focus:outline-none focus:ring-4 focus:ring-lime-300/25"
              type="button"
              onClick={() => navigate(routes.login)}
            >
              Login
            </button>
          </div>
        </div>

        <div className="grid place-items-center max-lg:order-first">
          <img
            className="w-full max-w-[720px] -rotate-2 rounded-lg shadow-2xl shadow-black/30"
            src={landingHero}
            alt="Creator profile page mockup with floating media and analytics cards"
          />
        </div>
      </section>

      <section
        className="overflow-hidden bg-[linear-gradient(#f7f7f2_0_78%,#eeede8_78%_100%)] pt-16 md:pt-24"
        aria-labelledby="creator-strip-title"
      >
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 id="creator-strip-title" className="mb-4 text-4xl font-black leading-none text-slate-950 md:text-6xl">
            Your favorite creators are already building link hubs.
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-slate-500">
            Use one profile to connect audience attention with every place your
            work lives.
          </p>
          <button className={ctaButton} type="button" onClick={() => navigate(routes.register)}>
            Claim your username
          </button>
        </div>
        <CreatorMarquee />
      </section>

      <section className="bg-[#f7f7f2] px-5 py-16 md:px-20 md:py-24" aria-labelledby="features-title">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 id="features-title" className="mb-5 text-4xl font-black leading-none text-slate-950 md:text-6xl">
            Your LinkTree. Your way.
          </h2>
          <button className={ctaButton} type="button" onClick={() => navigate(routes.register)}>
            Claim your username
          </button>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-5 max-md:grid-cols-1">
          <LandingFeatureCard
            imageAlt="Monetize more feature card showing product, tip, earnings, and top products panels"
            imageSrc={monetizeMoreCard}
          />

          <LandingFeatureCard
            imageAlt="Grow faster feature card showing analytics dashboards and click trends"
            imageSrc={growFasterCard}
          />

          <LandingFeatureCard
            imageAlt="Look better feature card showing profile customization and theme controls"
            imageSrc={lookBetterCard}
          />

          <LandingFeatureCard
            imageAlt="Make them click feature card showing creator profile, podcast, shop picks, and link panels"
            imageSrc={makeThemClickCard}
          />
        </div>
      </section>

      <section className="bg-[#f7f7f2] px-5 py-16 md:px-20 md:py-24" aria-labelledby="steps-title">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.7fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-teal-700">How to use</p>
            <h2 id="steps-title" className="mt-2 text-4xl leading-tight text-slate-950 md:text-5xl">
              From Google login to live profile in minutes.
            </h2>
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[22px] bg-[#174b17] p-6 text-white shadow-2xl shadow-emerald-950/20"
            initial={{ opacity: 0.92, y: 10 }}
            key={selectedStep.title}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#d7f80f]">
              Step {String(activeStep + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-2xl font-black">{selectedStep.title}</h3>
            <p className="mt-2 text-sm font-bold text-white/80">{selectedStep.detail}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
              <motion.div
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                className="h-full rounded-full bg-[#d7f80f]"
                initial={{ width: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </div>

        <ol className="mt-8 grid grid-cols-4 gap-3 max-md:grid-cols-1">
          {steps.map((step, index) => (
            <li key={step.title}>
              <motion.button
                aria-pressed={activeStep === index}
                className={`min-h-32 w-full rounded-lg border p-5 text-left transition focus:outline-none focus:ring-4 focus:ring-lime-300/30 ${
                  activeStep === index
                    ? 'border-[#d7f80f] bg-[#d7f80f] text-[#10220f] shadow-xl shadow-lime-900/10'
                    : 'border-slate-200 bg-white text-slate-950 hover:border-teal-700/30'
                }`}
                onClick={() => setActiveStep(index)}
                type="button"
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mb-4 block text-xs font-black text-teal-700">{String(index + 1).padStart(2, '0')}</span>
                <span className="block font-black">{step.title}</span>
                <span className="mt-2 block text-sm font-bold text-slate-500">{step.summary}</span>
              </motion.button>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-slate-200 bg-[#f7f7f2] px-5 py-6 text-center text-sm font-bold text-slate-500 md:px-20">
        All copyright reserved to goodTech.
      </footer>
    </main>
  )
}
