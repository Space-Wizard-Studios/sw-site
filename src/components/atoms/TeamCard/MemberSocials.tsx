import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { socials, Socials } from '@core/SocialLinks';
import { Toggle } from './Toggle';

interface Props {
	links: Socials;
	isOpen: boolean;
	toggleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export function MemberSocials({ links, isOpen, toggleOpen }: Props) {
	const links_dict = Object.entries(links);
	const n_links = links_dict.length;

	return (
		<LayoutGroup>
			<motion.div
				layout
				style={{ borderRadius: '99999px' }}
				className="card-actions justify-end bg-sw-primary-900"
			>
				<div className="flex p-4 gap-2">
					<Toggle isOpen={isOpen} onClick={toggleOpen} />

					<AnimatePresence>
						{isOpen &&
							links_dict.map(([key, value], index) => {
								return (
									<motion.a
										key={key}
										target="_blank"
										href={value}
										initial={{ opacity: 0, translateX: '-100%' }}
										animate={{
											opacity: 1,
											translateX: '0%',
											transition: { delay: 0.15 * (index + 1) },
										}}
										exit={{
											opacity: 0,
											translateX: '-50%',
											transition: {
												delay: 0.1 * n_links - 0.1 * index,
												duration: 0.08,
											},
										}}
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
