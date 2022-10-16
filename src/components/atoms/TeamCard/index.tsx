import { Socials } from '~/components/core/SocialLinks';
import { MemberPicture } from './MemberPicture';
import { MemberSocials } from './MemberSocials';
import { MemberInfo } from './MemberInfo';

export interface Props {
	photo?: React.ReactNode;
	name: string;
	roles: string[];
	skills: string[];
	links: Socials;
}

export default function TeamCard({ photo, name, roles, skills, links }: Props) {
	return (
		<div className="card card-compact shadow-lg relative overflow-visible bg-gradient-to-b from-sw-secondary-300 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800 text-sw-secondary-500">
			<div className="card-body place-items-center items-center relative">
				<MemberPicture photo={photo} />
				<MemberInfo name={name} roles={roles} skills={skills} />
				<MemberSocials links={links} />
			</div>
		</div>
	);
}
