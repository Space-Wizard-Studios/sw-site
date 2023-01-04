import { useState } from 'react';

import { ProductTitle } from './ProductTitle';
import { ProductDescription } from './ProductDescription';
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
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="flex relative min-h-[16rem]">
			<div
				className={`grid grid-cols-1 w-full h-full p-6 overflow-visible content-between ${
					isOpen
						? 'shadow-xl shadow-sw-navy/25 dark:shadow-sw-flamingo-700/10'
						: 'shadow-md hover:shadow-sw-navy/25 dark:hover:shadow-sw-flamingo-700/10'
				} transition-shadow duration-500 bg-gradient-to-b rounded-2xl from-sw-secondary-200 to-sw-secondary-300 dark:from-sw-primary-600/75 dark:to-sw-primary-600 text-sw-primary dark:text-sw-secondary`}
			>
				<ProductTitle title={title} subtitle={subtitle} />
				<ProductDescription isOpen={isOpen} description={description} />
				<Toggle tooltip={tooltip} isOpen={isOpen} setOpen={setOpen} />
			</div>

			<div className="absolute mx-auto z-10 -mt-8 md:-mt-4 md:-mr-12 right-0 left-0 md:left-auto top-0 w-16 h-16 md:w-24 md:h-24">
				<ProductCanvas isOpen={isOpen} modelPath={iconSrc} modelColor={iconColor} />
			</div>
		</div>
	);
}
