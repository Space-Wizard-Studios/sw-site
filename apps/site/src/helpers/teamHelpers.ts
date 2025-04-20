import { getCollection, type CollectionEntry } from 'astro:content';
import { getImageByPath } from '@helpers/getImageByPath';
import type { SocialLinkItem } from '@common/SocialLinks'; // Import the specific item type

// Define the proper type for a team member using the Zod schema
export type TeamMember = CollectionEntry<'team'>;

// Define the stricter skill type expected by TeamCard
type StrictSkill = { name: string; tooltip: string };

// Define a type for the processed team member
export type ProcessedTeamMember = Omit<TeamMember, 'data'> & {
    data: Omit<TeamMember['data'], 'skills' | 'links'> & {
        photo?: Awaited<ReturnType<typeof getImageByPath>>;
        // Ensure links conforms to the stricter SocialLinkItem array type
        links: SocialLinkItem[];
        skills: StrictSkill[];
    };
};

export async function getAllTeamMembers(): Promise<ProcessedTeamMember[]> {
    const allMembers = await getCollection('team');

    const processedMembers = await Promise.all(
        allMembers
            .filter((member: TeamMember) => !member.data.draft)
            .map(async (member: TeamMember): Promise<ProcessedTeamMember> => {
                const photoData = member.data.photoSrc
                    ? await getImageByPath(member.data.photoSrc, member.data.name, { width: 200, height: 200, fit: 'cover' })
                    : null;

                // Filter skills
                const validSkills = (member.data.skills ?? [])
                    .filter((skill): skill is StrictSkill =>
                        typeof skill?.name === 'string' && skill.name.trim() !== '' &&
                        typeof skill?.tooltip === 'string' && skill.tooltip.trim() !== ''
                    );

                // Filter links to ensure they have valid name and url, conforming to SocialLinkItem
                const validLinks = (member.data.links ?? [])
                    .filter((link): link is SocialLinkItem => // Use type predicate
                        typeof link?.name === 'string' && link.name.trim() !== '' &&
                        typeof link?.url === 'string' && link.url.trim() !== ''
                    );


                const memberData = {
                    ...member.data,
                    photo: photoData || undefined,
                    links: validLinks, // Assign the filtered, strictly typed links
                    skills: validSkills,
                };

                return {
                    ...member,
                    data: memberData,
                };
            })
    );

    processedMembers.sort((a, b) => a.data.name.localeCompare(b.data.name));

    return processedMembers;
}