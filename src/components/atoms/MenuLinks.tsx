import '@styles/toggle.scss';

import { Fragment } from 'react'
import { Menu } from '@headlessui/react'

const projects = [
	{ href: '/projects/ar', label: 'AR/VR' },
	{ href: '/projects/gamedev', label: 'Games' },
	{ href: '/projects/webdev', label: 'Web' }

]

const support = [
	{ href: '/policies/privacy', label: 'Privacidade' },
	{ href: '/policies/terms', label: 'Termos de Uso' }
]

export function MenuLinks() {
	return (
		<ul
			className="flex flex-col p-3 mx-4 rounded-lg md:flex-row md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 bg-sw-secondary-500 dark:bg-sw-primary-800"
		>
			<li>
				<Menu>
					<Menu.Button className="flex items-center justify-between w-full">
						<span>Projetos</span>
						<svg aria-hidden="true" className="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
						</svg>
					</Menu.Button>
					<ul className="absolute p-2 m-4 z-10 grid grid-cols-2 text-xs bg-white border rounded-lg shadow-md">
						<Menu.Items as={Fragment} >
							{projects.map((link) => (
								<Menu.Item key={link.href} as={Fragment}>
									{({ active }) => (
										<li className="m-2">
											<a
												href={link.href}
												className={`${active ? 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500' : 'bg-white text-black'
													}`}
											>
												{link.label}
											</a>
										</li>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</ul>
				</Menu>
			</li>
			<li>
				<Menu>
					<Menu.Button className="flex items-center justify-between w-full">
						<span>Suporte</span>
						<svg aria-hidden="true" className="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
						</svg>
					</Menu.Button>
					<ul className="absolute p-2 mt-4 z-10 grid text-xs bg-white border rounded-lg shadow-md">
						<Menu.Items as={Fragment}>
							{support.map((link) => (
								<Menu.Item key={link.href} as={Fragment}>
									{({ active }) => (
										<li className="m-2">
											<a
												href={link.href}
												className={`${active ? 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500' : 'bg-white text-black'
													}`}
											>
												{link.label}
											</a>
										</li>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</ul>
				</Menu>
			</li>

		</ul>
	)
}
