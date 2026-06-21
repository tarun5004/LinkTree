import landingHero from '../../assets/landing-hero.png'
import creatorSoftPortrait from '../../assets/creators/Screenshot 2026-06-21 233811.png'
import creatorGreenPortrait from '../../assets/creators/Screenshot 2026-06-21 233936.png'
import creatorFounderPortrait from '../../assets/creators/Screenshot 2026-06-21 234322.png'
import { routes } from '../../app/routes.js'
import { navigate } from '../../shared/lib/router.js'
import { CreatorMarquee } from './components/CreatorMarquee.jsx'
import { LandingFeatureCard } from './components/LandingFeatureCard.jsx'

const steps = [
  'Register with Google',
  'Claim your username',
  'Add content links',
  'Share one public URL',
]

const chartBars = [
  { height: 'h-[70px]', hover: 'group-hover:scale-y-125' },
  { height: 'h-28', hover: 'group-hover:scale-y-110' },
  { height: 'h-[92px]', hover: 'group-hover:scale-y-125' },
  { height: 'h-[154px]', hover: 'group-hover:scale-y-105' },
  { height: 'h-[116px]', hover: 'group-hover:scale-y-120' },
  { height: 'h-[78px]', hover: 'group-hover:scale-y-110' },
]

const ctaButton =
  'min-h-12 min-w-56 rounded-lg border border-[#d7f80f] bg-[#d7f80f] px-6 text-sm font-black text-[#10220f] transition hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300/25'

export function HomePage() {
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

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 max-md:grid-cols-1">
          <LandingFeatureCard
            title="Monetize more."
            text="Send people to products, paid calls, merch, affiliate links, or your latest offer."
            tone="bg-[#553104] text-white"
          >
            <div className="relative h-48 w-full max-w-[340px]">
              <div className="absolute left-5 top-12 h-24 w-40 -rotate-6 rounded-lg bg-white p-3 shadow-2xl shadow-black/25 transition duration-500 ease-out group-hover:-translate-x-8 group-hover:-translate-y-3 group-hover:-rotate-12">
                <p className="mb-2 text-center text-[10px] font-black text-slate-950">Favorites</p>
                <div className="grid grid-cols-2 gap-2">
                  <span className="h-12 rounded-md bg-[#e87417]" />
                  <span className="h-12 rounded-md bg-[#27180b]" />
                </div>
              </div>
              <div className="absolute left-28 top-3 grid h-32 w-28 rotate-6 place-items-center rounded-lg bg-fuchsia-500 p-3 text-center shadow-2xl shadow-black/25 transition duration-500 ease-out group-hover:-translate-y-7 group-hover:rotate-2 group-hover:scale-105">
                <span className="h-16 w-12 rounded-md bg-white/90 shadow-lg shadow-black/20" />
                <p className="text-xs font-black text-slate-950">Lip Stain</p>
                <p className="text-[11px] font-black text-white">$24</p>
              </div>
              <div className="absolute right-4 top-12 h-28 w-36 -rotate-6 rounded-lg bg-stone-100 p-3 text-slate-950 shadow-2xl shadow-black/25 transition duration-500 ease-out group-hover:translate-x-8 group-hover:-translate-y-2 group-hover:rotate-6">
                <p className="mb-2 text-right text-[10px] font-black">Support me</p>
                <div className="mb-2 grid grid-cols-3 gap-1">
                  {['$5', '$10', '$15'].map((amount) => (
                    <span className="rounded-md bg-white px-1 py-1 text-center text-[9px] font-black" key={amount}>
                      {amount}
                    </span>
                  ))}
                </div>
                <span className="block h-5 rounded bg-slate-200" />
                <span className="mt-2 block h-6 rounded-full bg-slate-950" />
              </div>
            </div>
          </LandingFeatureCard>

          <LandingFeatureCard
            title="Grow faster."
            text="Track views and clicks so your next content decision is based on real behavior."
            tone="bg-[#efc3ed] text-slate-950"
          >
            <div className="relative h-48 w-full max-w-[360px] overflow-hidden">
              <span className="absolute left-8 top-5 rounded-full bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-lg shadow-fuchsia-900/10 transition duration-500 ease-out group-hover:-translate-y-2 group-hover:translate-x-3">
                Clicks
              </span>
              <div className="absolute inset-x-7 top-8 space-y-7">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span className="block h-px bg-slate-950/10" key={index} />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-6 flex h-40 items-end justify-center gap-3">
                {chartBars.map((bar) => (
                  <span
                    className={`origin-bottom rounded-t-full rounded-b-lg bg-fuchsia-600 transition duration-500 ease-out ${bar.height} ${bar.hover} w-10 group-hover:-translate-y-2`}
                    key={bar.height}
                  />
                ))}
              </div>
              <div className="absolute inset-x-11 bottom-0 grid grid-cols-6 text-center text-[10px] font-bold text-slate-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          </LandingFeatureCard>

          <LandingFeatureCard
            title="Look better."
            text="Create a polished public profile that feels like your brand, not a messy list."
            tone="bg-cyan-500 text-slate-950"
          >
            <div className="relative h-48 w-full max-w-[340px]">
              <div className="absolute left-12 top-14 h-20 w-28 -rotate-12 overflow-hidden rounded-lg bg-stone-100 shadow-xl shadow-black/20 transition duration-500 ease-out group-hover:-translate-x-8 group-hover:translate-y-2 group-hover:-rotate-[18deg]">
                <div className="h-8 bg-stone-200" />
                <div className="grid grid-cols-3 gap-1 p-2">
                  <span className="h-7 rounded bg-slate-200" />
                  <span className="h-7 rounded bg-slate-300" />
                  <span className="h-7 rounded bg-slate-400" />
                </div>
              </div>
              <div className="absolute left-28 top-2 h-36 w-32 rotate-6 overflow-hidden rounded-lg bg-orange-500 shadow-2xl shadow-black/20 transition duration-500 ease-out group-hover:-translate-y-7 group-hover:rotate-2 group-hover:scale-105">
                <img className="h-full w-full object-cover object-top" src={creatorSoftPortrait} alt="" />
              </div>
              <div className="absolute right-7 top-11 h-28 w-28 rotate-12 overflow-hidden rounded-lg bg-purple-300 shadow-xl shadow-black/20 transition duration-500 ease-out group-hover:translate-x-8 group-hover:translate-y-2 group-hover:rotate-[18deg]">
                <img className="h-full w-full object-cover object-top" src={creatorGreenPortrait} alt="" />
              </div>
              <span className="absolute right-16 top-0 h-10 w-10 rounded-full bg-white/80 shadow-lg shadow-black/10 transition duration-500 ease-out group-hover:-translate-y-4 group-hover:translate-x-6" />
            </div>
          </LandingFeatureCard>

          <LandingFeatureCard
            title="Make them click."
            text="Place your best links first and guide visitors toward the action you care about."
            tone="bg-[#d7f80f] text-[#13210c]"
          >
            <div className="relative h-48 w-full max-w-[340px]">
              <div className="absolute left-12 top-14 grid h-20 w-24 -rotate-12 place-items-center rounded-lg bg-fuchsia-200 shadow-xl shadow-black/10 transition duration-500 ease-out group-hover:-translate-x-10 group-hover:translate-y-2 group-hover:-rotate-[22deg]">
                <span className="h-12 w-12 rounded-full bg-slate-950/85" />
              </div>
              <div className="absolute left-[7.5rem] top-4 h-[136px] w-28 overflow-hidden rounded-lg bg-white p-2 shadow-2xl shadow-black/15 transition duration-500 ease-out group-hover:-translate-y-7 group-hover:rotate-3 group-hover:scale-105">
                <img className="mb-2 h-20 w-full rounded-md object-cover object-top" src={creatorFounderPortrait} alt="" />
                <p className="text-center text-[10px] font-black">New podcast</p>
                <p className="text-center text-[9px] font-bold text-slate-500">Listen now</p>
              </div>
              <div className="absolute right-12 top-6 h-32 w-20 rotate-12 rounded-full bg-[#b47724] shadow-xl shadow-black/10 transition duration-500 ease-out group-hover:translate-x-10 group-hover:-translate-y-4 group-hover:rotate-[22deg]">
                <span className="absolute left-1/2 top-2 h-28 w-2 -translate-x-1/2 rounded-full bg-[#f6d277]" />
                <span className="absolute left-8 top-0 h-6 w-8 rounded-full border-4 border-[#f6d277]" />
              </div>
              <div className="absolute right-3 top-24 h-16 w-14 rotate-12 rounded-lg bg-purple-500 shadow-xl shadow-black/10 transition duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-7" />
              <div className="absolute left-6 top-8 h-12 w-12 rounded-full bg-pink-300 shadow-lg shadow-black/10 transition duration-500 ease-out group-hover:-translate-x-6 group-hover:-translate-y-5" />
            </div>
          </LandingFeatureCard>
        </div>
      </section>

      <section className="bg-[#f7f7f2] px-5 py-16 md:px-20 md:py-24" aria-labelledby="steps-title">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-widest text-teal-700">How to use</p>
          <h2 id="steps-title" className="mt-2 text-4xl leading-tight text-slate-950 md:text-5xl">
            From Google login to live profile in minutes.
          </h2>
        </div>
        <ol className="grid grid-cols-4 gap-3 max-md:grid-cols-1">
          {steps.map((step, index) => (
            <li className="min-h-28 rounded-lg border border-slate-200 bg-white p-5 font-bold text-slate-950" key={step}>
              <span className="mb-4 block text-xs font-black text-teal-700">{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
