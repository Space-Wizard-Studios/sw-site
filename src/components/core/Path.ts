export function getSlugFromURL(url?: string) {
	return url?.split('/').reverse()[0].split('.')[0];
}

export function getLocaleFromURL(url?: string) {
	return url?.split('/')[2];
}
