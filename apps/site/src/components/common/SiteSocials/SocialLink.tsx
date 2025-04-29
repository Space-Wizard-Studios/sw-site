import { SocialIcons } from '@common/Icons';

type Props = {
    socialKey: string;
    aria: string;
    url: string;
};

export function SocialLink({ socialKey, aria, url }: Props) {
    const IconComponent = SocialIcons[socialKey];

    if (!IconComponent) {
        console.warn(`[SocialLink] IconComponent not found for social key: ${socialKey}`);
        return null;
    }

    return (
        <a href={url} aria-label={aria} title={aria} target='_blank' rel='noopener'>
            <div className='hover:text-primary h-6 w-6 text-on-surface transition-colors'>
                <IconComponent className='h-full w-full' />
            </div>
        </a>
    );
}
