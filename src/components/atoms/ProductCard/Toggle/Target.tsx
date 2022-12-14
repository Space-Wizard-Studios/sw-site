import { motion } from 'framer-motion';
import { Planet } from '@icons/card_button';

interface Props {
	isOpen: boolean;
	targetRef: React.Ref<HTMLDivElement>;
}

export function Target({ isOpen, targetRef }: Props) {
	return (
		<motion.div
			ref={targetRef}
			animate={{ opacity: isOpen ? 0 : 1 }}
			className="absolute right-0 bottom-0 w-12 h-12 p-2.5 m-2 rounded-full bg-sw-secondary-900 dark:bg-sw-primary-900"
		>
			<Planet className="absolute left-0 right-0 top-0 bottom-0 m-auto w-8 h-8 text-sw-primary dark:text-sw-secondary" />
		</motion.div>
	);
}
