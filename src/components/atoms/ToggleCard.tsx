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

	const closedClipPath = 'circle(0% at 100% 100%)';
	const openedClipPath = 'circle(150% at 100% 100%)';

	return (
		<div className="relative min-h-[12rem] ">
			<div className="card relative w-full h-full overflow-hidden shadow-lg bg-gradient-to-b from-sw-secondary-300 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800 text-sw-secondary-500">
				<div className="card-body relative text-4xl">
					<>{title}</>
					<>{subtitle}</>

					<motion.div
						initial={{ clipPath: closedClipPath }}
						animate={{
							clipPath: isOpen ? openedClipPath : closedClipPath,
						}}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute w-full h-full left-0 top-0 p-8 text-4xl spacewiz__bg"
					>
						{description}
					</motion.div>

					<div className="absolute right-0 bottom-0">
						<motion.button
							animate={{
								rotate: isOpen ? 360 : 0,
								transition: { ease: 'backInOut', duration: 0.25 },
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							type="button"
							className="rounded-full text-sm p-2.5 items-center m-2 font-bold spacewiz__bg--accent text-sw-primary"
							aria-label="Toggle"
							onClick={() => setOpen(!isOpen)}
						>
							{isOpen ? buttonIconMinus : buttonIconPlus}
						</motion.button>
					</div>
				</div>
			</div>

			<div className="absolute mx-auto -mt-8 md:-mt-4 md:-mr-12 right-0 left-0 md:left-auto top-0 w-16 h-16 md:w-24 md:h-24">
				{cardIcon}
			</div>
		</div>
	);
}
