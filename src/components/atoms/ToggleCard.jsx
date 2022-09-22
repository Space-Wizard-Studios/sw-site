import { useState } from 'react';

export default function ToggleCard(props) {

	const [isOpen, setOpen] = useState(false);

	function toggleCard() {
		setOpen(!isOpen);
	}

	return (
		<div className={`${props.className} ${isOpen ? 'toggled' : null}`}>
			<div className="absolute -mt-8 -mr-8 right-0">{props.icon}</div>
			<div className="card-body">
				<div>{props.title}</div>
				<div>{isOpen ? props.description : props.subtitle}</div>
				<button
					type="button"
					className="rounded-lg text-sm p-2.5 inline-flex items-center relative sw-text-reverse"
					aria-label="Toggle"
					onClick={toggleCard}
				>
					{isOpen ? props.buttonIconMinus : props.buttonIconPlus}
				</button>
			</div>
		</div>
	);
}
