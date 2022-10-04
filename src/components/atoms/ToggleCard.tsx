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
		<div className="card min-h-[12rem] relative overflow-visible shadow-lg bg-gradient-to-b from-sw-secondary-300 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800 text-sw-secondary-500">
			<div className="absolute mx-auto -mt-8 md:-mt-4 md:-mr-12 right-0 left-0 md:left-auto top-0 w-16 h-16 md:w-24 md:h-24">
				{cardIcon}
			</div>
			<div className="card-body relative text-4xl">
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
						className="rounded-full text-sm p-2.5 items-center font-bold spacewiz__bg--accent text-sw-primary"
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
