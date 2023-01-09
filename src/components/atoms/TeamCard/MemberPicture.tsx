import { motion } from 'framer-motion';

interface Props {
	photo?: string;
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
			className="flex absolute w-full h-24 items-center content-center justify-center"
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
				className="absolute w-[6.5rem] h-[6.5rem] -mt-8 rounded-full bg-gradient-to-bl from-sw-navy-800 via-sw-navy-400 to-sw-navy-800 dark:from-sw-flamingo-800 dark:via-sw-flamingo-400 dark:to-sw-flamingo-800"
			>
				<div className="w-full"></div>
			</motion.div>
			<div className="absolute -mt-8">
				<div className="w-24 h-full rounded-full overflow-hidden">
					<img src={photo} width="100%" height="100%" />
				</div>
			</div>
		</motion.div>
	);
}
