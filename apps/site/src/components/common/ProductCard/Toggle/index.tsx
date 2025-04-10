import { useRef, useState } from 'react';

import { Track } from './Track';
import { Target } from './Target';
import { Particle } from './Particle';
import { Handle } from './Handle';
import { SpeechBubble } from '@atoms/SpeechBubble';

interface Props {
	index: number;
	tooltip: boolean;
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Toggle({ index, tooltip, isOpen, setOpen }: Props) {
	const [hasMoved, setHasMoved] = useState(false);

	const constraintsRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	return (
		<div className="grow relative w-full h-16">
			<Track isOpen={isOpen} constraintsRef={constraintsRef} />
			<Target isOpen={isOpen} targetRef={targetRef} />
			<Particle seed={index} isOpen={isOpen} />
			<Handle
				isOpen={isOpen}
				setOpen={setOpen}
				setHasMoved={setHasMoved}
				targetRef={targetRef}
				constraintsRef={constraintsRef}
			/>

			<div className="absolute left-12 bottom-12 w-20 h-20">
				<SpeechBubble show={tooltip && !hasMoved} />
			</div>
		</div>
	);
}
