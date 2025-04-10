import '@styles/toggle.scss';

import { Fragment } from 'react';
import { Menu } from '@headlessui/react';

type Link = {
	href: string;
	label: string;
};

type MenuList = {
	label: string;
	links: Link[];
};

type Props = {
	menus: MenuList[];
};

export function MenuLinks({ menus }: Props) {
	return (
		<ul className="flex flex-col p-3 mx-4 rounded-lg md:flex-row md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 bg-sw-secondary-200 dark:bg-sw-primary-700">
			{menus.map(({ label, links }, i) => (
				<li key={i}>
					<Menu>
						<Menu.Button className="flex items-center justify-between w-full">
							<span className="font-bold">{label}</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5 ml-1 md:w-4 md:h-4"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</Menu.Button>
						<Menu.Items
							as="ul"
							className="absolute p-2 mt-4 z-10 grid grid-cols-2 text-xs bg-sw-secondary-200 dark:bg-sw-primary-700 border rounded-lg shadow-md"
						>
							{links.map(({ label, href }) => (
								<Menu.Item key={href} as={Fragment}>
									{({ active }) => (
										<li className="m-2">
											<a
												href={href}
												className={`${
													active
														? 'text-gray-500 dark:text-gray-400 hover:text-sw-navy dark:hover:text-sw-flamingo'
														: ' text-black dark:text-white'
												}`}
											>
												{label}
											</a>
										</li>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</Menu>
				</li>
			))}
		</ul>
	);
}
