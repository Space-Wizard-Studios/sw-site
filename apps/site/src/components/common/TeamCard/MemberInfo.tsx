interface Props {
    name: string;
    roles: string[];
    skills: { name: string; tooltip: string }[];
    isActive: boolean;
}

export function MemberInfo({ name, roles, skills, isActive }: Props) {
    return (
        <>
            <div className='flex flex-col text-center'>
                <h4 className='spacewiz__text text-lg font-extrabold'>{name}</h4>
                <div className='text-on-surface my-2'>
                    {roles.map((r, i) => (
                        <p key={i}>{r}</p>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap content-start justify-center gap-3'>
                {skills.map(({ name, tooltip }, i) => (
                    <span
                        key={i}
                        content={tooltip}
                        className='bg-surface-container-high text-on-surface rounded-xl border-none p-2 text-xs font-light'
                    >
                        {name}
                    </span>
                ))}
            </div>
        </>
    );
}
