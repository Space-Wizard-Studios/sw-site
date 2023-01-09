import { useState } from 'react';
import { motion } from 'framer-motion';

import { Socials } from '@core/SocialLinks';
import { MemberPicture } from './MemberPicture';
import { MemberSocials } from './MemberSocials';
import { MemberInfo } from './MemberInfo';

export interface Props {
	photo?: string;
	name: string;
	roles: string[];
	skills: string[];
	links: Socials;
}

const variants = {
	closed: {
		y: 0,
	},
	opened: {
		y: -8,
	},
};

export default function TeamCard({ photo, name, roles, skills, links }: Props) {
	const [isOpen, setOpen] = useState(false);

	function toggleOpen() {
		setOpen(!isOpen);
	}

	return (
		<motion.div
			variants={variants}
			initial="closed"
			animate={isOpen ? 'opened' : 'closed'}
			className={`grid grid-cols-1 gap-2 pt-24 pb-4 px-4 rounded-2xl relative overflow-visible ${
				isOpen
					? 'shadow-xl shadow-sw-navy/25 dark:shadow-sw-flamingo-700/10'
					: 'shadow-md hover:shadow-sw-navy/25 dark:hover:shadow-sw-flamingo-700/10'
			}
					transition-shadow duration-300
					bg-gradient-to-b from-sw-secondary-300 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800
					text-sw-secondary-500`}
		>
			<MemberPicture photo={photo} isOpen={isOpen} />
			<MemberInfo name={name} roles={roles} skills={skills} isOpen={isOpen} />
			<MemberSocials links={links} isOpen={isOpen} toggleOpen={toggleOpen} />
		</motion.div>
	);
}
