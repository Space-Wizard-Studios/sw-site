import { getCollection } from 'astro:content';

import type { CollectionEntry } from 'astro:content';
import type { SocialLinkItem } from '@components/common/SocialLinks';
import type { TeamMemberSocial } from '@schemas/teamSchema';

// Cache for pre-fetched social entries
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

export async function getAllSocials(): Promise<CollectionEntry<'socials'>[]> {
    const allSocialsEntries = await getCollection('socials');
    return allSocialsEntries.filter((entry) => !entry.data.draft);
}

export async function resolveSocialLinks(rawSocials: TeamMemberSocial[] | undefined | null): Promise<SocialLinkItem[]> {
    if (!rawSocials || rawSocials.length === 0) {
        return [];
    }

    const socialsMap = await getSocialsMap();

    // Map to the final SocialLinkItem structure using the Map
    const resolvedSocials: SocialLinkItem[] = rawSocials.map((social) => {
        const socialId = social.type.id;
        const socialData = socialsMap.get(socialId);

        return {
            type: socialId,
            url: social.url,
            title: socialData?.title || socialId,
        };
    });

    return resolvedSocials;
}