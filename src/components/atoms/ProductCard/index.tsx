import { useState } from 'react';
import { motion } from 'framer-motion';

import { ProductCanvas } from './ProductCanvas';
import { Toggle } from './Toggle';

interface Props {
	iconSrc: string;
	iconColor: number;
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
	description?: React.ReactNode;
	tooltip?: boolean;
}

export default function ProductCard({ iconSrc, iconColor, title, subtitle, description, tooltip = false }: Props) {
	const closedClipPath = 'circle(0% at 100% 100%)';
	const openedClipPath = 'circle(150% at 100% 100%)';

	const [isOpen, setOpen] = useState(false);

	return (
		<div className="relative min-h-[16rem]">
			<div
				className={`card relative w-full h-full overflow-visible p-6 ${
					isOpen
						? 'shadow-xl shadow-sw-navy/25 dark:shadow-sw-flamingo-700/10'
						: 'shadow-md hover:shadow-sw-navy/25 dark:hover:shadow-sw-flamingo-700/10'
				} transition-shadow duration-500 bg-gradient-to-b rounded-2xl from-sw-secondary-200 to-sw-secondary-300 dark:from-sw-primary-600/75 dark:to-sw-primary-600 text-primary dark:text-sw-secondary`}
			>
				<div className="grid grid-flow-row grid-rows-2 items-start">
					<h2 className="spacewiz__text--accent">{title}</h2>
					<h3 className="spacewiz__text">{subtitle}</h3>
				</div>

				<div className="absolute left-0 top-0 w-full h-full overflow-hidden rounded-2xl">
					<motion.div
						initial={{ clipPath: closedClipPath }}
						animate={{
							clipPath: isOpen ? openedClipPath : closedClipPath,
						}}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						className="flex items-start w-full h-full overflow-y-auto md:py-0 md:pr-24 text-base bg-gradient-to-b from-sw-secondary-200 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800"
					>
						<p className="p-6 spacewiz__text--reversed text-sw-primary dark:text-sw-secondary">
							{description}
						</p>
					</motion.div>
				</div>

				<Toggle tooltip={tooltip} isOpen={isOpen} setOpen={setOpen} />
			</div>

			<div className="absolute mx-auto z-10 -mt-8 md:-mt-4 md:-mr-12 right-0 left-0 md:left-auto top-0 w-16 h-16 md:w-24 md:h-24">
				<ProductCanvas isOpen={isOpen} modelPath={iconSrc} modelColor={iconColor} />
			</div>
		</div>
	);
}
