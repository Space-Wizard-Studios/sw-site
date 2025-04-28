import { siteSocials } from '@/config';
import { SocialLink } from './SocialLink';

export function SiteSocials() {
    return (
        <ul className='flex list-none flex-row flex-wrap gap-4'>
            {Object.entries(siteSocials).map(([key, { url, aria }]) => (
                <li key={key}>
                    <SocialLink socialKey={key} url={url} aria={aria} />
                </li>
            ))}
        </ul>
    );
}