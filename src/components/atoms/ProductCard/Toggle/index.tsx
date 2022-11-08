import { useRef, useState } from 'react';

import { ToggleTrack } from './ToggleTrack';
import { ToggleTarget } from './ToggleTarget';
import { ToggleParticle } from './ToggleParticle';
import { ToggleHandle } from './ToggleHandle';

interface Props {
	tooltip: boolean;
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Toggle({ tooltip, isOpen, setOpen }: Props) {
	const [hasMoved, setHasMoved] = useState(false);

	const constraintsRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	return (
		<div className="grow relative w-full h-16">
			<ToggleTrack isOpen={isOpen} constraintsRef={constraintsRef} />
			<ToggleTarget isOpen={isOpen} targetRef={targetRef} />
			<ToggleParticle isOpen={isOpen} />
			<ToggleHandle
				isOpen={isOpen}
				setOpen={setOpen}
				setHasMoved={setHasMoved}
				targetRef={targetRef}
				constraintsRef={constraintsRef}
			/>

			{tooltip && !hasMoved && (
				<div className="absolute left-6 bottom-16 tooltip tooltip-open bg-sw-flamingo" data-tip="Clica aqui :)">
					<div className="absolute left-0 bottom-0" />
				</div>
			)}
		</div>
	);
}
