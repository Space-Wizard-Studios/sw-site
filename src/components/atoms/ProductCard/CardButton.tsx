import { useRef } from 'react';
import { CardButtonTrack } from './CardButtonTrack';
import { CardButtonTarget } from './CardButtonTarget';
import { CardButtonHandle } from './CardButtonHandle';

interface Props {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CardButton({ isOpen, setOpen }: Props) {
	const constraintsRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	return (
		<div className="grow relative w-full h-16 mb-4">
			<CardButtonTrack isOpen={isOpen} constraintsRef={constraintsRef} />
			<CardButtonTarget isOpen={isOpen} targetRef={targetRef} />
			<CardButtonHandle isOpen={isOpen} setOpen={setOpen} targetRef={targetRef} constraintsRef={constraintsRef} />
		</div>
	);
}
