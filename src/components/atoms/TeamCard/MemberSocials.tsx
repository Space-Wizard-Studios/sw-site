import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { socials, Socials } from '@core/SocialLinks';
import { Toggle } from './Toggle';

interface Props {
	links: Socials;
	isOpen: boolean;
	toggleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export function MemberSocials({ links, isOpen, toggleOpen }: Props) {
	return (
		<LayoutGroup>
			<motion.div
				layout
				style={{ borderRadius: '99999px' }}
				transition={{
					layout: {
						staggerChildren: 1,
					},
				}}
				className="card-actions justify-end bg-sw-primary-900"
			>
				<div className="flex p-4 gap-2">
					<Toggle isOpen={isOpen} onClick={toggleOpen} />

					<AnimatePresence>
						{isOpen &&
							Object.entries(links).map(([key, value]) => {
								return (
									<motion.a
										key={key}
										target="_blank"
										href={value}
										initial={{ opacity: 0, translateX: '-100%' }}
										animate={{ opacity: 1, translateX: '0%', transition: { delay: 0.2 } }}
										exit={{ opacity: 0, translateX: '-100%', transition: { duration: 0.2 } }}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="relative z-0 w-10 h-10 rounded-full bg-sw-navy dark:bg-sw-flamingo text-sw-primary border-none"
									>
										{socials[key].icon({
											className: 'absolute m-auto top-0 bottom-0 left-0 right-0 w-8 h-8',
										})}
									</motion.a>
								);
							})}
					</AnimatePresence>
				</div>
			</motion.div>
		</LayoutGroup>
	);
}
