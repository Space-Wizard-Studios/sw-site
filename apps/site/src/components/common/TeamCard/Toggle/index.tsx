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
			onClick={(e) => onClick(e)}
			className="z-10 w-10 h-10 p-3 rounded-full bg-sw-navy dark:bg-sw-flamingo border-none text-sw-secondary dark:text-sw-primary"
			aria-label="Redes sociais"
		>
			{isOpen ? <Minus className="m-auto w-4 h-4 " /> : <Plus className="m-auto w-4 h-4" />}
		</motion.button>
	);
}
