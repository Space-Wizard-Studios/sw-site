import { useState } from 'react';
import { motion } from 'framer-motion';

import type { ReactNode } from 'react';

export interface ToggleCardProps {
	cardIcon?: ReactNode;
	title?: ReactNode;
	subtitle?: ReactNode;
	description?: ReactNode;
	buttonIconMinus?: ReactNode;
	buttonIconPlus?: ReactNode;
}

export default function ToggleCard({
	cardIcon,
	title,
	subtitle,
	description,
	buttonIconMinus,
	buttonIconPlus,
}: ToggleCardProps) {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="card flex-grow: 1 w-96 min-h-[12rem] relative overflow-visible shadow-2xl bg-gradient-to-b from-sw-secondary-200 to-sw-secondary-700 dark:from-sw-primary-600 dark:to-sw-primary-700  text-sw-secondary-500">
			<div className="absolute -mt-12 -mr-12 right-0 top-0 w-[6rem] h-[6rem] bg-red-500">{cardIcon}</div>
			<div className="card-body relative">
				<>{!isOpen ? title : null}</>
				<>{isOpen ? description : subtitle}</>
				<div className="flex justify-end absolute -mr-2 -mb-2 right-0 bottom-0">
					<motion.button
						animate={{
							rotate: isOpen ? 360 : 0,
							transition: { ease: 'backInOut', duration: 0.25 },
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						type="button"
						className="rounded-2xl text-sm p-2.5 items-center font-bold bg-sw-navy dark:bg-sw-flamingo text-sw-primary"
						aria-label="Toggle"
						onClick={() => setOpen(!isOpen)}
					>
						{isOpen ? buttonIconMinus : buttonIconPlus}
					</motion.button>
				</div>
			</div>
		</div>
	);
}
