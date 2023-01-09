export interface MetaSEO {
	title?: string;
	description?: string;
	image?: astroHTML.JSX.ImgHTMLAttributes;

	canonical?: string | URL;
	nofollow?: boolean;

	ogTitle?: string;
	ogType?: string;
}