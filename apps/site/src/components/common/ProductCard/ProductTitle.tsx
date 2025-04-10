interface Props {
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
}

export function ProductTitle({ title, subtitle }: Props) {
	return (
		<div className="grid grid-flow-row relative grid-rows-2 items-start">
			<h4 className="spacewiz__text--accent">{title}</h4>
			<h5 className="spacewiz__text">{subtitle}</h5>
		</div>
	);
}
