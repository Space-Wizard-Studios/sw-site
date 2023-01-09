export interface MetaSEO {
	title?: string;
	description?: string;
	image?: string;

	canonical?: string | URL;
	nofollow?: boolean;

	ogTitle?: string;
	ogType?: string;
}
