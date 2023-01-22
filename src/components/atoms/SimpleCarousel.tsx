import { Carousel } from 'flowbite-react';
import type { ImageProps } from '@widgets/projects/ProjectCarousel.astro';

export type CarouselProps = {
	images: ImageProps[];
};

export default function SimpleCarousel({ images }: CarouselProps) {
	return (
		<Carousel slide={false} className="w-1/2 h-96">
			{images.map(({ src, title, description }, i) => (
				<img key={i} src={src} title={title} alt={description} />
			))}
		</Carousel>
	);
}
