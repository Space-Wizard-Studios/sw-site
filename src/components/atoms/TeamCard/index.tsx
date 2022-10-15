import { memberLinks, MemberLinks } from '@core/MemberLinks';
import { motion } from 'framer-motion';

export interface Props {
	photo?: React.ReactNode;
	name: string;
	roles: string[];
	skills: string[];
	links: MemberLinks;
}

export default function TeamCard({ photo, name, roles, skills, links }: Props) {
	return (
		<div className="card card-compact shadow-lg relative overflow-visible bg-gradient-to-b from-sw-secondary-300 to-sw-secondary-600 dark:from-sw-primary-600 dark:to-sw-primary-800 text-sw-secondary-500">
			<div className="card-body place-items-center items-center relative">
				<div className="avatar -mt-8 absolute">
					<div className="w-24 rounded-full ring ring-sw-navy dark:ring-sw-flamingo ring-offset-base-100 ring-offset-2">
						{photo}
					</div>
				</div>

				<div className="mt-20 w-full text-center">
					<h2 className="text-lg font-extrabold spacewiz__text">{name}</h2>
					<div className="my-2 text-sw-primary/60 dark:text-sw-secondary/60">
						{roles.map((r, i) => (
							<p key={i}>{r}</p>
						))}
					</div>
				</div>

				<div className="mt-2 text-center">
					{skills.map((s, i) => (
						<span
							key={i}
							className="badge m-1 p-1 text-sw-primary dark:text-sw-secondary bg-sw-secondary-700 dark:bg-sw-primary-900 border-none"
						>
							{s}
						</span>
					))}
				</div>

				<div className="card-actions justify-end">
					<div className="dropdown dropdown-top">
						<button className="btn btn-circle m-1 bg-sw-navy dark:bg-sw-flamingo text-sw-primary border-none">
							+
						</button>

						<ul className="dropdown-content menu p-2 shadow-md bg-base-100 rounded-box w-52 bg-sw-primary">
							{Object.entries(links).map(([key, value]) => {
								return (
									<li key={key}>
										<a target="_blank" href={value}>
											{memberLinks[key].name}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
