interface Props {
    name: string;
    roles: string[];
    skills: { name: string; tooltip: string }[];
    isOpen: boolean;
}

export function MemberInfo({ name, roles, skills, isOpen }: Props) {
    return (
        <>
            <div className='flex flex-col text-center'>
                <h4 className='spacewiz__text text-lg font-extrabold'>{name}</h4>
                <div className='text-sw-primary/60 dark:text-sw-secondary/60 my-2'>
                    {roles.map((r, i) => (
                        <p key={i}>{r}</p>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap content-start justify-center gap-3'>
                {skills.map(({ name, tooltip }, i) => (
                    // TODO
                    // <Tooltip key={i} content={tooltip}>
                    <span className='text-sw-primary dark:text-sw-secondary bg-sw-secondary-900 dark:bg-sw-primary-900 rounded-xl border-none p-2 text-xs font-light'>
                        {name}
                    </span>
                    // </Tooltip>
                ))}
            </div>
        </>
    );
}
