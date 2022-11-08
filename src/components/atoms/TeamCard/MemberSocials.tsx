import { socials, Socials } from '@core/SocialLinks';
import { Toggle } from './Toggle';

interface Props {
	links: Socials;
	isOpen: boolean;
	toggleOpen: Function;
}

export function MemberSocials({ links, isOpen, toggleOpen }: Props) {
	return (
		<div className="card-actions justify-end">
			<div className="dropdown dropdown-top">
				<Toggle onClick={toggleOpen} />

				{/* <ul className="dropdown-content menu p-2 shadow-md bg-base-100 rounded-box w-52 bg-sw-primary">
					{Object.entries(links).map(([key, value]) => {
						return (
							<li key={key}>
								<a target="_blank" href={value}>
									{socials[key].name}
								</a>
							</li>
						);
					})}
				</ul> */}
			</div>
		</div>
	);
}
