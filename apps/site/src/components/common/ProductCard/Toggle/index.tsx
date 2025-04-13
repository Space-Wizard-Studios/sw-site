import { useRef, useState } from 'react';

import { Track } from './Track';
import { Target } from './Target';
import { Particle } from './Particle';
import { Handle } from './Handle';
import { SpeechBubble } from '@common/SpeechBubble';

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
        <div className='relative h-16 w-full grow'>
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

            <div className='absolute bottom-12 left-12 h-20 w-20'>
                <SpeechBubble show={tooltip && !hasMoved} />
            </div>
        </div>
    );
}
