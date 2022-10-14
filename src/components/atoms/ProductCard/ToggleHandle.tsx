import { useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Rocket } from '@icons/card_button';

interface Props {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	targetRef: React.RefObject<Element>;
	constraintsRef: React.RefObject<Element>;
}

export function ToggleHandle({ isOpen, setOpen, targetRef, constraintsRef }: Props) {
	const [clickOpen, setClickOpen] = useState(false);
	const [clickDistance, setClickDistance] = useState(0);

	const [wasDrag, setWasDrag] = useState(false);
	const [isMoving, setIsMoving] = useState(false);

	const ref = useRef<HTMLButtonElement>(null);

	function openCard(open: boolean) {
		if (open) {
			console.log('boom!');
		}

		setOpen(open);
	}

	function getDistance() {
		let buttonX = ref.current?.getBoundingClientRect().x ?? 0;
		let targetX = targetRef.current?.getBoundingClientRect().x ?? 0;
		return targetX - buttonX;
	}

	function getNormDistance() {
		let dist = getDistance();
		let width = constraintsRef.current?.getBoundingClientRect().width ?? 1;
		return Math.abs(dist / width);
	}

	function handleDragStart(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		setIsMoving(true);

		setClickDistance(0);
		setClickOpen(false);
	}

	function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		const dist = getNormDistance();

		openCard(dist < 0.05);
		setIsMoving(false);

		setWasDrag(true);
		setTimeout(() => {
			setWasDrag(false);
		}, 10);
	}

	function handleClick() {
		if (wasDrag) {
			return;
		}

		if (isOpen && !clickOpen) {
			return;
		}

		if (!isOpen && getNormDistance() < 0.5) {
			return;
		}

		setClickDistance(!isOpen ? getDistance() - 10 : 0);

		setClickOpen(!isOpen);
		setIsMoving(true);

		setTimeout(() => {
			openCard(!isOpen);
			setIsMoving(false);
		}, 700);
	}

	const variants = {
		closed: {
			translateX: 0,
		},
		opened: {
			translateX: clickDistance,
			transition: { duration: 0.75, ease: 'easeOut' },
		},
	};

	return (
		<motion.button
			ref={ref}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			drag="x"
			dragConstraints={constraintsRef}
			dragMomentum={false}
			dragElastic={0.1}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onClick={handleClick}
			variants={variants}
			initial="closed"
			animate="opened"
			className="absolute left-0 bottom-0 w-12 h-12 rounded-full p-2.5 m-2 z-10 bg-sw-navy dark:bg-sw-flamingo text-sw-primary"
			style={{ rotate: '45deg' }}
		>
			<Rocket flames={isMoving ? 1 : 0} className="absolute left-0 right-0 top-0 bottom-0 m-auto w-6 h-6" />
		</motion.button>
	);
}
