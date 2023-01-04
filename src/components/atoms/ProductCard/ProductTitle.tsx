interface Props {
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
}

export function ProductTitle({ title, subtitle }: Props) {
	return (
		<div className="grid grid-flow-row grid-rows-2 items-start">
			<h3 className="spacewiz__text--accent">{title}</h3>
			<h4 className="spacewiz__text">{subtitle}</h4>
		</div>
	);
}
