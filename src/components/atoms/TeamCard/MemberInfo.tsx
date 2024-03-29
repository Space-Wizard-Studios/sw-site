import { Tooltip } from "flowbite-react";

interface Props {
	name: string;
	roles: string[];
	skills: { name: string; tooltip: string; }[];
	isOpen: boolean;
}

export function MemberInfo({ name, roles, skills, isOpen }: Props) {
	return (
		<>
			<div className="flex flex-col text-center">
				<h4 className="text-lg font-extrabold spacewiz__text">{name}</h4>
				<div className="my-2 text-sw-primary/60 dark:text-sw-secondary/60">
					{roles.map((r, i) => (
						<p key={i}>{r}</p>
					))}
				</div>
			</div>

			<div className="flex flex-wrap content-start justify-center gap-3">
				{skills.map(({ name, tooltip }, i) => (
					<Tooltip key={i} content={tooltip}>
					<span
						className="font-light text-xs rounded-xl p-2 text-sw-primary dark:text-sw-secondary bg-sw-secondary-900 dark:bg-sw-primary-900 border-none"
					>
						{name}
					</span>
					</Tooltip>
				))}
			</div>
		</>
	);
}
