interface Props {
	name: string;
	roles: string[];
	skills: string[];
	isOpen: boolean;
}

export function MemberInfo({ name, roles, skills, isOpen }: Props) {
	return (
		<>
			<div className="mt-24 w-full text-center">
				<h2 className="text-lg font-extrabold spacewiz__text">{name}</h2>
				<div className="my-2 text-sw-primary/60 dark:text-sw-secondary/60">
					{roles.map((r, i) => (
						<p key={i}>{r}</p>
					))}
				</div>
			</div>

			<div className="my-2 text-center">
				{skills.map((s, i) => (
					<span
						key={i}
						className="inline-flex items-center justify-center m-1 p-2 font-light text-sm rounded-xl text-sw-primary dark:text-sw-secondary bg-sw-secondary-900 dark:bg-sw-primary-900 border-none"
					>
						{s}
					</span>
				))}
			</div>
		</>
	);
}
