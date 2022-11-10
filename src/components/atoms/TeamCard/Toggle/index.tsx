import { motion } from 'framer-motion';
import { Minus, Plus } from '@icons/card_button';

interface Props {
	isOpen: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ isOpen, onClick }: Props) {
	return (
		<motion.button
			layout
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={(e) => onClick(e)}
			className="z-10 w-10 h-10 p-3 rounded-full bg-sw-navy dark:bg-sw-flamingo border-none"
		>
			{isOpen ? (
				<Minus className="m-auto w-4 h-4 text-sw-primary" />
			) : (
				<Plus className="m-auto w-4 h-4 text-sw-primary" />
			)}
		</motion.button>
	);
}
