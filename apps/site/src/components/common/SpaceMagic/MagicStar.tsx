import { useState } from 'react';
import MagicButton from './MagicButton';
import MagicExplosion from './MagicExplosion';
import MagicSparkles from './MagicSparkles';
import './magic.css';

type Props = {
    sparkleCount?: number;
    explosionCount?: number;
    explosionRadius?: number;
    
    defaultColorClass?: string;
    magicColorClass?: string;
    sparkleColorClass?: string;

    buttonClassName?: string;
};

export default function MagicStar({
    sparkleCount = 3,
    explosionCount = 12,
    explosionRadius = 60,
    defaultColorClass,
    magicColorClass,
    sparkleColorClass,
    buttonClassName,
}: Props) {
    const [magic, setMagic] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    return (
        <div className='relative isolate inline-flex items-center justify-center'>
            <MagicSparkles seed={clickCount} start={magic} count={sparkleCount} sparkleColorClass={sparkleColorClass} />
            <MagicExplosion
                seed={clickCount}
                start={magic}
                count={explosionCount}
                radius={explosionRadius}
                sparkleColorClass={sparkleColorClass}
            />
            <MagicButton
                magic={magic}
                setMagic={setMagic}
                setClickCount={setClickCount}
                className={buttonClassName}
                defaultColorClass={defaultColorClass}
                magicColorClass={magicColorClass}
            />
        </div>
    );
}
