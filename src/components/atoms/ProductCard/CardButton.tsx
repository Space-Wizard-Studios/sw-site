import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Rocket, Planet, ChevronRight } from '@icons/card_button';

export interface CardButtonProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CardButton({ isOpen, setOpen }: CardButtonProps) {
	const [isDragging, setIsDragging] = useState(false);

	const x = useMotionValue(1);
	const background = useTransform(x, [0, 0.8], ['#00ff00', '#ff0000']);

	const constraintsRef = useRef<HTMLDivElement>(null);
	const handleRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLButtonElement>(null);

	function getDistance() {
		let buttonX = handleRef.current?.getBoundingClientRect().x ?? 1000;
		let buttonY = handleRef.current?.getBoundingClientRect().y ?? 1000;
		let targetX = targetRef.current?.getBoundingClientRect().x ?? 1000;
		let targetY = targetRef.current?.getBoundingClientRect().y ?? 1000;

		let dx = buttonX - targetX;
		let dy = buttonY - targetY;
		let dist = Math.sqrt(dx * dx + dy * dy);

		let width = constraintsRef.current?.getBoundingClientRect().width ?? 1000;
		return Math.abs(dist / width);
	}

	function handleDragStart(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		setIsDragging(true);
	}

	function handleDrag(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		const dist = getDistance();
		x.set(dist);
	}

	function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		const dist = getDistance();
		x.set(dist);

		setOpen(dist < 0.05);
		setIsDragging(false);
	}

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				opacity: {
					duration: 1,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'linear',
				},
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},
	};

	const item = {
		hidden: {
			translateX: 0,
			opacity: 0,
		},
		show: {
			opacity: [0, 1, 0],
			translateX: [-100, 100],
			transition: {
				translateX: {
					duration: 2,
					repeat: Infinity,
					ease: 'circInOut',
				},
				opacity: {
					duration: 2,
					repeat: Infinity,
					ease: 'circInOut',
				},
			},
		},
	};

	return (
		<div className="grow relative w-full h-16 mb-4">
			<motion.div animate={{ opacity: isOpen ? 0 : 1 }} ref={constraintsRef}>
				<div className="absolute right-6 left-6 bottom-3 mx-auto my-3 h-4 rounded-full bg-sw-secondary-900 dark:bg-sw-primary-900">
					<div className="relative w-full h-full">
						<motion.div
							className="grid grid-flow-col justify-center"
							variants={container}
							initial="hidden"
							animate="show"
						>
							<motion.div variants={item}>
								<ChevronRight className="w-4 h-4 text-sw-navy dark:text-sw-flamingo" />
							</motion.div>
							<motion.div variants={item}>
								<ChevronRight className="w-4 h-4 text-sw-navy dark:text-sw-flamingo" />
							</motion.div>
							<motion.div variants={item}>
								<ChevronRight className="w-4 h-4 text-sw-navy dark:text-sw-flamingo" />
							</motion.div>
						</motion.div>
					</div>
				</div>
				<div className="absolute left-0 bottom-0 w-8 h-8 m-4 rounded-full bg-sw-secondary-900 dark:bg-sw-primary-900"></div>
			</motion.div>

			<motion.button
				ref={targetRef}
				className="absolute right-0 bottom-0 w-12 h-12 p-2.5 m-2 text-sm font-bold rounded-full bg-sw-secondary-900 text-sw-primary dark:bg-sw-primary-900 dark:text-sw-secondary"
				onClick={() => setOpen(!isOpen)}
			>
				<Planet className="absolute left-0 right-0 top-0 bottom-0 m-auto w-8 h-8" />
			</motion.button>

			<motion.div
				ref={handleRef}
				drag="x"
				dragConstraints={constraintsRef}
				dragMomentum={false}
				dragElastic={0.1}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDrag={handleDrag}
				className="absolute left-0 bottom-0 w-12 h-12 p-2.5 m-2 text-sm font-bold z-10"
			>
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="absolute left-0 top-0 w-12 h-12 rounded-full bg-sw-navy dark:bg-sw-flamingo text-sw-primary"
					style={{ cursor: 'grab', rotate: '45deg' }}
				>
					<Rocket
						flames={isDragging ? 1 : 0}
						className="absolute left-0 right-0 top-0 bottom-0 m-auto w-6 h-6"
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}
