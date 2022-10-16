interface Props {
	photo?: React.ReactNode;
}

export function MemberPicture({ photo }: Props) {
	return (
		<div className="avatar -mt-8 absolute">
			<div className="w-24 rounded-full ring ring-sw-navy dark:ring-sw-flamingo ring-offset-base-100 ring-offset-2">
				{photo}
			</div>
		</div>
	);
}
