import { motion } from 'framer-motion'

export function LandingFeatureCard({ imageAlt, imageSrc }) {
  return (
    <motion.article
      className="group overflow-hidden rounded-[22px] bg-white shadow-xl shadow-slate-950/8 ring-1 ring-slate-950/5"
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      whileHover={{ y: -8, scale: 1.012 }}
    >
      <motion.img
        alt={imageAlt}
        animate={{ scale: [1.01, 1.018, 1.01], y: [0, -3, 0] }}
        className="aspect-[3/2] h-full w-full object-cover transition duration-500 group-hover:brightness-[1.03]"
        draggable="false"
        src={imageSrc}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.035 }}
      />
    </motion.article>
  )
}
