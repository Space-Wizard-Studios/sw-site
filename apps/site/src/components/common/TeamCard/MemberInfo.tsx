import { Badge } from '@components/ui/badge';
import type { ProcessedTeamMember } from '@lib/collections/teamHelpers';

interface Props {
    teamMember: ProcessedTeamMember;
}

export function MemberInfo({ teamMember }: Readonly<Props>) {
    const { name, roles, skills } = teamMember.data;

    return (
        <>
            <div className='flex flex-col text-center'>
                <h4 className='text-lg font-extrabold'>{name}</h4>
                <div className='text-on-surface my-2'>
                    {(roles || []).map((r) => (
                        <p key={r}>{r}</p>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap content-start justify-center gap-2'>
                {(skills || []).map(({ name: skillName, tooltip }) => (
                    <Badge
                        key={skillName}
                        title={tooltip ?? skillName}
                        className='border-on-surface/40 bg-surface-container text-on-surface border'
                    >
                        {skillName}
                    </Badge>
                ))}
            </div>
        </>
    );
}
