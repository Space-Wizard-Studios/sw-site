import type { ProcessedTeamMember } from '@helpers/collections/teamHelpers';

interface Props {
    teamMember: ProcessedTeamMember;
    isActive: boolean;
}

export function MemberInfo({ teamMember, isActive }: Props) {
    const { name, roles, skills } = teamMember.data;

    return (
        <>
            <div className='flex flex-col text-center'>
                <h4 className='spacewiz__text text-lg font-extrabold'>{name}</h4>
                <div className='text-on-surface my-2'>
                    {(roles || []).map((r, i) => (
                        <p key={i}>{r}</p>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap content-start justify-center gap-3'>
                {(skills || []).map(({ name: skillName, tooltip }, i) => (
                    <span
                        key={i}
                        content={tooltip ?? skillName}
                        className='bg-surface-container-high text-on-surface rounded-xl border-none p-2 text-xs font-light'
                    >
                        {skillName}
                    </span>
                ))}
            </div>
        </>
    );
}
