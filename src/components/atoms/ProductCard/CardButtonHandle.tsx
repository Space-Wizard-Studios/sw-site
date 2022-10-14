import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Rocket } from '@icons/card_button';

interface Props {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	targetRef: React.RefObject<Element>;
	constraintsRef: React.RefObject<Element>;
}

export function CardButtonHandle({ isOpen, setOpen, targetRef, constraintsRef }: Props) {
	const x = useMotionValue(1);
	const background = useTransform(x, [0, 0.8], ['#00ff00', '#ff0000']);

	const [clickOpen, setClickOpen] = useState(false);
	const [clickDistance, setClickDistance] = useState(0);

	const [wasDrag, setWasDrag] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const ref = useRef<HTMLButtonElement>(null);

	function getDistance() {
		let buttonX = ref.current?.getBoundingClientRect().x ?? 1000;
		let targetX = targetRef.current?.getBoundingClientRect().x ?? 1000;
		return targetX - buttonX;
	}

	function getNormDistance() {
		let dist = getDistance();
		let width = constraintsRef.current?.getBoundingClientRect().width ?? 1000;
		return Math.abs(dist / width);
	}

	function handleDragStart(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		setIsDragging(true);

		setClickDistance(0);
		setClickOpen(false);
	}

	function handleDrag(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		const dist = getNormDistance();
		x.set(dist);
	}

	function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		const dist = getNormDistance();
		x.set(dist);

		setOpen(dist < 0.05);
		setIsDragging(false);
		setWasDrag(true);

		setTimeout(() => {
			setWasDrag(false);
		}, 10);
	}

	function handleClick() {
		if (wasDrag) {
			setWasDrag(false);
			return;
		}

		const dist = getDistance();
		setClickDistance(dist);
		setClickOpen(!isOpen);

		setTimeout(
			() => {
				setOpen(!isOpen);
				setClickOpen(false);
			},
			isOpen ? 10 : 700
		);
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
			drag="x"
			dragConstraints={constraintsRef}
			dragMomentum={false}
			dragElastic={0.1}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDrag={handleDrag}
			onClick={handleClick}
			variants={variants}
			initial="closed"
			animate="opened"
			className="absolute left-0 bottom-0 w-12 h-12 rounded-full p-2.5 m-2 z-10 text-sw-primary"
		>
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className="absolute left-0 top-0 w-12 h-12 rounded-full bg-sw-navy dark:bg-sw-flamingo"
				style={{ cursor: 'grab', rotate: '45deg' }}
			>
				<Rocket
					flames={isDragging || clickOpen ? 1 : 0}
					className="absolute left-0 right-0 top-0 bottom-0 m-auto w-6 h-6"
				/>
			</motion.div>
		</motion.button>
	);
}
