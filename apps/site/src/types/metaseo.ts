export interface MetaSEO {
    title?: string;
    description?: string;
    canonical?: string | URL;
    robots?: {
        noindex?: boolean;
        nofollow?: boolean;
    };
    og?: {
        title?: string;
        description?: string;
        type?: 'website' | 'article' | 'product';
        image?: string;
    };
}
