import { getCollection } from 'astro:content';

import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import type { TeamMember } from '@schemas/teamSchema';

import { resolveTeamSocials, type ResolvedSocial } from '@lib/resolveTeamSocials';
import { getImageMetadataByPath } from '@lib/getImageMetadataByPath';

type ProcessedTeamMemberData = Omit<TeamMember, 'socials' | 'image'> & {
    socials: ResolvedSocial[];
    image?: Omit<NonNullable<TeamMember['image']>, 'src'> & {
        src?: string | undefined;
    };
};

export type ProcessedTeamMember = Omit<CollectionEntry<'team'>, 'data'> & {
    data: ProcessedTeamMemberData;
};

export async function getAllTeamMembers(): Promise<ProcessedTeamMember[]> {
    const members = await getCollection('team', ({ data }) => {
        return data.draft !== true;
    });

    const nonDraftMembers = members.filter((member) => !member.data.draft);

    const processedMembers = await Promise.all(
        nonDraftMembers.map(async (member) => {
            let processedImage: ProcessedTeamMemberData['image'] = undefined;
            let imageSrcString: string | undefined = undefined;

            // needs to process the image
            if (member.data.image?.src) {
                const photoMetadata = getImageMetadataByPath(member.data.image.src) ?? undefined;
                imageSrcString = photoMetadata?.src ?? undefined;
                processedImage = {
                    ...member.data.image,
                    src: imageSrcString,
                };
            } else if (member.data.image) {
                processedImage = {
                    ...member.data.image, // spread other properties of the hero (alt, title)
                    src: undefined,
                };
            }

            // process socials
            const rawSocials = member.data.socials;
            const resolvedSocials = await resolveTeamSocials(rawSocials);

            // filter skills
            const validSkills = (member.data.skills ?? []).filter(
                (skill) => typeof skill?.name === 'string' && skill.name.trim() !== '',
            );

            const { image, socials, skills, ...originalData } = member.data;

            // builds the processed data object
            const memberData: ProcessedTeamMemberData = {
                ...originalData, // original data
                image: processedImage, // assign the processed image object
                socials: resolvedSocials, // assign processed socials
                skills: validSkills, // assign filtered skills
            };

            // build the processed team member
            const processedMember: ProcessedTeamMember = {
                ...member,
                data: memberData,
            };

            return processedMember;
        }),
    );

    processedMembers.sort((memberA, memberB) => {
        const nameA = memberA.data.name.toLowerCase();
        const nameB = memberB.data.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    // console.log('[teamHelpers] processed team members:', processedMembers);

    return processedMembers;
}
