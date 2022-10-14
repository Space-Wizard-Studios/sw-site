import { useRef } from 'react';
import { ToggleTrack } from './ToggleTrack';
import { ToggleTarget } from './ToggleTarget';
import { ToggleParticle } from './ToggleParticle';
import { ToggleHandle } from './ToggleHandle';

interface Props {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Toggle({ isOpen, setOpen }: Props) {
	const constraintsRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	return (
		<div className="grow relative w-full h-16 mb-4">
			<ToggleTrack isOpen={isOpen} constraintsRef={constraintsRef} />
			<ToggleTarget isOpen={isOpen} targetRef={targetRef} />
			<ToggleParticle isOpen={isOpen} />
			<ToggleHandle isOpen={isOpen} setOpen={setOpen} targetRef={targetRef} constraintsRef={constraintsRef} />
		</div>
	);
}
