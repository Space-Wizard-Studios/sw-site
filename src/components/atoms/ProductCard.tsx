import { useState } from 'react';
import { motion } from 'framer-motion';

import ProductCardCanvas from '@atoms/ProductCardCanvas';
import { Plus, Minus } from '../icons/plus_minus';

import type { ReactNode } from 'react';

export interface ProductCardProps {
	iconSrc: string;
	iconColor: number;
	title?: ReactNode;
	subtitle?: ReactNode;
	description?: ReactNode;
}

export default function ProductCard({ iconSrc, iconColor, title, subtitle, description }: ProductCardProps) {
	const [isOpen, setOpen] = useState(false);

	const closedClipPath = 'circle(0% at 100% 100%)';
	const openedClipPath = 'circle(150% at 100% 100%)';

	return (
		<div className="relative min-h-[12rem] ">
			<div className="card relative w-full h-full overflow-hidden transition-shadow duration-500 shadow-md bg-gradient-to-b rounded-4xl hover:shadow-sw-navy/25 dark:hover:shadow-sw-flamingo-700/10 from-sw-secondary-200 to-sw-secondary-300 dark:from-sw-primary-600/75 dark:to-sw-primary-600 text-primary dark:text-sw-secondary">
				<div className="h-full p-4 relative">
					<h2 className="spacewiz__text--accent">{title}</h2>
					<h3 className="spacewiz__text">{subtitle}</h3>

					<motion.div
						initial={{ clipPath: closedClipPath }}
						animate={{
							clipPath: isOpen ? openedClipPath : closedClipPath,
						}}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute flex items-center w-full h-full left-0 top-0 overflow-y-auto p-6 pr-24 text-base bg-gradient-to-b from-sw-secondary-200 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800"
					>
						<p className="spacewiz__text--reversed text-sw-primary dark:text-sw-secondary">{description}</p>
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
							className="rounded-full text-sm p-2.5 items-center m-2 font-bold bg-sw-navy dark:bg-sw-flamingo text-sw-primary"
							aria-label="Toggle"
							onClick={() => setOpen(!isOpen)}
						>
							{isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
						</motion.button>
					</div>
				</div>
			</div>

			<div className="absolute mx-auto -mt-8 md:-mt-4 md:-mr-12 right-0 left-0 md:left-auto top-0 w-16 h-16 md:w-24 md:h-24">
				<ProductCardCanvas modelPath={iconSrc} modelColor={iconColor} />
			</div>
		</div>
	);
}
