import { useRef, useState } from 'react';

import { Track } from './Track';
import { Target } from './Target';
import { Particle } from './Particle';
import { Handle } from './Handle';
import { SpeechBubble } from '@common/_unused/SpeechBubble';

interface Props {
    index: number;
    tooltip: boolean;
    isActive: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Toggle({ index, tooltip, isActive, setOpen }: Props) {
    const [hasMoved, setHasMoved] = useState(false);

    const constraintsRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <div className='relative h-16 w-full grow'>
            <Track isActive={isActive} constraintsRef={constraintsRef} />
            <Target isActive={isActive} targetRef={targetRef} />
            <Particle seed={index} isActive={isActive} />
            <Handle
                isActive={isActive}
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
