import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { TeamMemberSocial } from '@schemas/teamSchema';

export type ResolvedSocial = TeamMemberSocial & {
    id: string;
    title: string;
};

let socialsMapCache: Map<string, CollectionEntry<'socials'>['data']> | null = null;

async function getSocialsMap(): Promise<Map<string, CollectionEntry<'socials'>['data']>> {
    if (socialsMapCache) {
        return socialsMapCache;
    }
    const allSocialsEntries = await getCollection('socials');
    socialsMapCache = new Map(allSocialsEntries.map((entry) => [entry.id, entry.data]));
    console.log(`[socialHelpers] Pre-fetched and cached ${socialsMapCache.size} social entries.`);
    return socialsMapCache;
}

export async function resolveTeamSocials(rawSocials: TeamMemberSocial[] | undefined | null): Promise<ResolvedSocial[]> {
    if (!rawSocials || rawSocials.length === 0) {
        return [];
    }

    const socialsMap = await getSocialsMap();

    const resolvedSocials: ResolvedSocial[] = rawSocials.map((social) => {
        const socialId = social.type.id;
        const socialData = socialsMap.get(socialId);

        return {
            ...social,
            id: socialId,
            title: socialData?.title || socialId,
        };
    });

    return resolvedSocials;
}