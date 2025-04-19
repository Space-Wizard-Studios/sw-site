import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Rocket } from '@icons/ProductCardIcons';

interface Props {
    isActive: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setHasMoved: React.Dispatch<React.SetStateAction<boolean>>;
    targetRef: React.RefObject<HTMLElement>;
    constraintsRef: React.RefObject<HTMLElement>;
}

// duração da animação de abrir, em segundos
const openDuration = 0.5;
// duração da animação de fechar, em segundos
const closeDuration = 0.3;

function getDistance(a: React.RefObject<HTMLElement>, b: React.RefObject<HTMLElement>) {
    let buttonX = a.current?.offsetLeft ?? 0;
    let targetX = b.current?.offsetLeft ?? 0;
    return targetX - buttonX;
}

function getNormDistance(
    a: React.RefObject<HTMLElement>,
    b: React.RefObject<HTMLElement>,
    w: React.RefObject<HTMLElement>,
) {
    let dist = getDistance(a, b);
    let width = w.current?.offsetWidth ?? 1;
    return Math.abs(dist / width);
}

const variants = {
    closed: {
        translateX: 0,
        transition: { duration: closeDuration, ease: 'easeOut' },
    },
    opened: (x: number) => ({
        translateX: x,
        transition: { duration: openDuration, ease: 'easeIn' },
    }),
};

export function Handle({ isActive, setOpen, setHasMoved, targetRef, constraintsRef }: Props) {
    const [clickDistance, setClickDistance] = useState(0);
    const [clickOpen, setClickOpen] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    const ref = useRef<HTMLButtonElement>(null);

    function handleClick() {
        if (!isActive && getNormDistance(ref, targetRef, constraintsRef) < 0.5) {
            return;
        }

        setClickDistance(!isActive ? getDistance(ref, targetRef) : 0);
        setClickOpen(!isActive);
        setIsMoving(true);

        setHasMoved(true);

        setTimeout(
            () => {
                setOpen(!isActive);
                setIsMoving(false);
            },
            isActive ? closeDuration * 100 : openDuration * 1000 - 100,
        );
    }

    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleClick}
            variants={variants}
            custom={clickDistance}
            initial='closed'
            animate={clickOpen ? 'opened' : 'closed'}
            className='bg-sw-navy dark:bg-sw-flamingo absolute bottom-2 left-0 z-10 h-12 w-12 rounded-full p-2.5'
            aria-label='Detalhes do serviço'
        >
            <Rocket
                flames={isMoving ? 1 : 0}
                className='text-sw-secondary dark:text-sw-primary absolute bottom-0 left-0 right-0 top-0 m-auto h-6 w-6'
                style={{ rotate: '45deg' }}
            />
        </motion.button>
    );
}
