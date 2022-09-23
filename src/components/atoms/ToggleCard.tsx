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
		<div className="card flex-grow: 1 w-96 min-h-[12rem] relative overflow-visible sw-bg sw-text-reverse">
			<div className="absolute -mt-12 -mr-12 right-0 top-0 w-[150px] h-[150px] ">{cardIcon}</div>
			<div className="card-body">
				<>{!isOpen ? title : null}</>
				<>{isOpen ? description : subtitle}</>
				<div>
					<motion.button
						animate={{
							rotate: isOpen ? 360 : 0,
							transition: { ease: 'backInOut', duration: 0.25 },
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						type="button"
						className="rounded-full text-sm p-2.5 items-center sw-text sw-bg-reverse"
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
