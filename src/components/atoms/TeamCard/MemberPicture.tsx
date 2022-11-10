import { motion } from 'framer-motion';

interface Props {
	photo?: React.ReactNode;
	isOpen: boolean;
}

const variants = {
	closed: {
		scale: 1,
	},
	opened: {
		scale: 1.2,
	},
};

export function MemberPicture({ photo, isOpen }: Props) {
	return (
		<motion.div
			variants={variants}
			initial="closed"
			animate={isOpen ? 'opened' : 'closed'}
			className="avatar absolute w-24"
		>
			<motion.div
				animate={{
					rotate: '360deg',
					transition: {
						repeat: Infinity,
						repeatType: 'loop',
						duration: 3.5,
						ease: 'linear',
					},
				}}
				className="avatar absolute w-full -mt-8 p-1 rounded-full bg-gradient-to-bl from-sw-navy-800 via-sw-navy-400 to-sw-navy-800 dark:from-sw-flamingo-800 dark:via-sw-flamingo-400 dark:to-sw-flamingo-800"
			>
				<div className="w-full"></div>
			</motion.div>
			<div className="avatar absolute -mt-8 p-1">
				<div className="w-full rounded-full">{photo}</div>
			</div>
		</motion.div>
	);
}
