import { useState } from 'react';
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
				<button
					type="button"
					className="rounded-lg text-sm p-2.5 inline-flex items-center relative sw-text-reverse"
					aria-label="Toggle"
					onClick={() => setOpen(!isOpen)}
				>
					{isOpen ? buttonIconMinus : buttonIconPlus}
				</button>
			</div>
		</div>
	);
}
