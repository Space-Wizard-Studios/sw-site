import { motion } from 'framer-motion';

interface Props {
	onClick: Function;
}

export function Toggle({ onClick }: Props) {
	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => onClick()}
			className=" w-12 h-12 rounded-full bg-sw-navy dark:bg-sw-flamingo text-sw-primary border-none"
		>
			+
		</motion.button>
	);
}
