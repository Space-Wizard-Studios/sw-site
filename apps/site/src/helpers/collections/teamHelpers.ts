import { getCollection } from 'astro:content';

import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import type { SocialLinkItem } from '@components/common/SocialLinks';
import type { TeamMember } from '@schemas/teamSchema';

import { resolveSocialLinks } from './socialHelpers';
import { getImageMetadataByPath } from '@helpers/getImageMetadataByPath';


type ProcessedTeamMemberData = Omit<TeamMember, 'photoSrc' | 'socials'> & {
    photo?: ImageMetadata | undefined; // Replaces photoSrc
    socials: SocialLinkItem[]; // Replaces socials
};

export type ProcessedTeamMember = Omit<CollectionEntry<'team'>, 'data'> & {
    data: ProcessedTeamMemberData;
};

export async function getAllTeamMembers(): Promise<ProcessedTeamMember[]> {
    const members = await getCollection('team', ({ data }) => {
        return data.draft !== true;
    });

    const processedMembers = await Promise.all(
        members.map(async (member) => {
            console.log(`[teamHelpers] Processing member: ${member.data.name}`);

            let photoData: ImageMetadata | undefined = undefined;
            if (member.data.photoSrc) {
                photoData = getImageMetadataByPath(member.data.photoSrc) ?? undefined;
            }

            const rawSocials = member.data.socials;
            const resolvedSocials = await resolveSocialLinks(rawSocials);
            // console.log(`[teamHelpers] Resolved socials for ${member.data.name}:`, JSON.stringify(resolvedSocials));

            // Filter skills (ensure the type remains compatible with TeamMember['skills'])
            const validSkills = (member.data.skills ?? []).filter(
                (skill) => typeof skill?.name === 'string' && skill.name.trim() !== '',
            );

            // Construct the processed data object, ensuring it matches ProcessedTeamMemberData
            const memberData: ProcessedTeamMemberData = {
                ...member.data,
                photo: photoData,
                socials: resolvedSocials,
                skills: validSkills,
            };

            return {
                ...member,
                data: memberData,
            } as ProcessedTeamMember;
        }),
    );

    console.log(`[teamHelpers] Finished processing ${processedMembers.length} members.`);
    return processedMembers;
}
