import { motion } from 'motion/react'
import { ChevronRight } from '@icons/card_button'

interface Props {
  isOpen: boolean
  constraintsRef: React.Ref<HTMLDivElement>
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear'
      },
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
}

const item = {
  hidden: {
    translateX: 0,
    opacity: 0
  },
  show: {
    opacity: [0, 1, 0],
    translateX: [-100, 100],
    transition: {
      translateX: {
        duration: 2,
        repeat: Infinity,
        ease: 'circInOut'
      },
      opacity: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
}

export function Track({ isOpen, constraintsRef }: Props) {
  return (
    <motion.div
      animate={{ opacity: isOpen ? 0 : 1 }}
      // TODO
      // ref={constraintsRef}
    >
      <div className='absolute right-6 left-6 bottom-3 mx-auto my-3 h-4 rounded-full bg-sw-secondary-900 dark:bg-sw-primary-900'>
        <div className='relative w-full h-full'>
          <motion.div className='grid grid-flow-col justify-center' variants={container} initial='hidden' animate='show'>
            <motion.div variants={item}>
              <ChevronRight className='w-4 h-4 text-sw-navy dark:text-sw-flamingo' />
            </motion.div>
            <motion.div variants={item}>
              <ChevronRight className='w-4 h-4 text-sw-navy dark:text-sw-flamingo' />
            </motion.div>
            <motion.div variants={item}>
              <ChevronRight className='w-4 h-4 text-sw-navy dark:text-sw-flamingo' />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className='absolute left-0 bottom-0 w-8 h-8 m-4 rounded-full bg-sw-secondary-900 dark:bg-sw-primary-900' />
    </motion.div>
  )
}
