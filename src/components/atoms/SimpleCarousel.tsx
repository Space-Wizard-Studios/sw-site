import { Carousel } from 'flowbite-react';

type ImageProps = {
	src: string;
	title: string;
	description: string;
};

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
