import { motion, LayoutGroup, AnimatePresence } from 'motion/react'
import { socials, type Socials } from '@common/SocialLinks'
import { Toggle } from './Toggle'

interface Props {
  links: Socials
  isOpen: boolean
  toggleOpen: React.MouseEventHandler<HTMLButtonElement>
}

export function MemberSocials({ links, isOpen, toggleOpen }: Props) {
  const links_dict = Object.entries(links)
  const n_links = links_dict.length

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      translateX: '-100%'
    },
    show: (index: number) => ({
      opacity: 1,
      scale: 1,
      translateX: '0%',
      transition: {
        delay: 0.15 * (index + 1),
        duration: 0.25
      }
    }),
    hide: (index: number) => ({
      opacity: 0,
      scale: 0,
      translateX: '-50%',
      transition: {
        delay: 0.075 * (n_links - index),
        duration: 0.12
      }
    })
  }

  return (
    <LayoutGroup>
      <div className='flex w-full justify-center mb-auto'>
        <motion.div layout style={{ borderRadius: '99999px' }} className='flex flex-wrap p-4 gap-2 bg-sw-secondary-900 dark:bg-sw-primary-900 rounded-full'>
          <Toggle isOpen={isOpen} onClick={toggleOpen} />

          <AnimatePresence>
            {isOpen &&
              links_dict.map(([key, value], index) => {
                return (
                  <motion.a
                    key={key}
                    target='_blank'
                    href={value}
                    variants={variants}
                    custom={index}
                    initial='hidden'
                    animate='show'
                    exit='hide'
                    className='z-0 inline-flex items-center w-10 h-10 rounded-full bg-sw-navy dark:bg-sw-flamingo border-none'
                  >
                    {socials[key].icon({
                      className: 'm-auto w-8 h-8 text-sw-secondary dark:text-sw-primary'
                    })}
                  </motion.a>
                )
              })}
          </AnimatePresence>
        </motion.div>
      </div>
    </LayoutGroup>
  )
}
