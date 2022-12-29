import { Carousel } from 'flowbite-react';
import type { ImageProps } from '@widgets/projects/ProjectCarousel.astro';

export type CarouselProps = {
	images: ImageProps[];
};

export default function SimpleCarousel({ images }: CarouselProps) {
	return (
		<Carousel slide={false} className="h-56">
			{images.map(({ src, title, description }, i) => (
				<img key={i} src={src} alt="" />
			))}
		</Carousel>
	);
}
