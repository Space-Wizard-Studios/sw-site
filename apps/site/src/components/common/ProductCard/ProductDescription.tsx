import { motion } from 'motion/react'

interface Props {
  isOpen: boolean
  description?: React.ReactNode
}

export function ProductDescription({ isOpen, description }: Props) {
  const closedClipPath = 'circle(0% at 100% 100%)'
  const openedClipPath = 'circle(150% at 100% 100%)'

  return (
    <div className='absolute left-0 top-0 w-full h-full overflow-hidden rounded-2xl'>
      <motion.div
        initial={{ clipPath: closedClipPath }}
        animate={{
          clipPath: isOpen ? openedClipPath : closedClipPath
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className='items-start w-full h-full overflow-y-auto md:py-0 md:pr-24 text-base bg-gradient-to-b from-sw-secondary-200 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800'
      >
        <p className='pt-6 pl-6 spacewiz__text--reversed text-sw-primary dark:text-sw-secondary'>{description}</p>
      </motion.div>
    </div>
  )
}
