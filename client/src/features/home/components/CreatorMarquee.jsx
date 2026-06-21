import { useEffect, useRef } from 'react'
import creatorSoftPortrait from '../../../assets/creators/Screenshot 2026-06-21 233811.png'
import creatorMuralPortrait from '../../../assets/creators/Screenshot 2026-06-21 233936.png'
import creatorSportsPortrait from '../../../assets/creators/Screenshot 2026-06-21 234103.png'
import creatorHboCard from '../../../assets/creators/Screenshot 2026-06-21 234203.png'
import creatorLionLogo from '../../../assets/creators/Screenshot 2026-06-21 234247.png'
import creatorFounderCard from '../../../assets/creators/Screenshot 2026-06-21 234322.png'
import creatorMetaCard from '../../../assets/creators/Screenshot 2026-06-21 234703.png'

const creatorCards = [
  {
    src: creatorSportsPortrait,
    alt: 'Creator portrait in blue and yellow outfit',
    cardClass: 'w-[210px] rounded-full',
    imageClass: 'object-cover object-top',
  },
  {
    src: creatorHboCard,
    alt: 'HBO building brand card',
    cardClass: 'w-[340px] rounded-lg',
    imageClass: 'object-cover object-top',
  },
  {
    src: creatorLionLogo,
    alt: 'Black and white creator logo card',
    cardClass: 'w-[250px] rounded-lg bg-black',
    imageClass: 'object-contain p-7',
  },
  {
    src: creatorSoftPortrait,
    alt: 'Minimal creator portrait',
    cardClass: 'w-[250px] rounded-lg',
    imageClass: 'object-cover object-top',
  },
  {
    src: creatorMuralPortrait,
    alt: 'Smiling creator portrait against mural wall',
    cardClass: 'w-[340px] rounded-lg',
    imageClass: 'object-cover object-center',
  },
  {
    src: creatorMetaCard,
    alt: 'Meta brand card',
    cardClass: 'w-[250px] rounded-lg bg-white',
    imageClass: 'object-contain p-7',
  },
  {
    src: creatorFounderCard,
    alt: 'Founder portrait card on dark green background',
    cardClass: 'w-[250px] rounded-lg',
    imageClass: 'object-cover object-center',
  },
]

export function CreatorMarquee() {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    let frameId
    let position = 0
    let previousTime = performance.now()

    const animate = (time) => {
      const halfWidth = track.scrollWidth / 2
      const delta = time - previousTime
      previousTime = time

      if (!pausedRef.current && halfWidth > 0) {
        position = (position + delta * 0.045) % halfWidth
        track.style.transform = `translate3d(${-position}px, 0, 0)`
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [])

  const marqueeCards = [...creatorCards, ...creatorCards]

  return (
    <div
      className="mt-14 w-full overflow-hidden pb-14 [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]"
      aria-label="Animated creator profile examples"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      <div ref={trackRef} className="flex w-max items-center gap-5 will-change-transform">
        {marqueeCards.map((card, index) => (
          <article
            className={`h-[252px] shrink-0 overflow-hidden bg-[#f7f3eb] shadow-2xl shadow-slate-900/10 ${card.cardClass}`}
            key={`${card.alt}-${index}`}
          >
            <img className={`h-full w-full ${card.imageClass}`} src={card.src} alt={card.alt} />
          </article>
        ))}
      </div>
    </div>
  )
}
