import { ProjectCard } from './ProjectCard';
import { cn } from '@lib/utils';

import type { ProcessedProject } from '@lib/collections/projectHelpers';

interface ProjectGalleryProps {
    className?: string;
    projects: ProcessedProject[];
}

// const projects = [
//     {
//         title: 'TravelBuddy',
//         tagline: 'Your personal travel assistant and planner',
//         imageUrl: '/placeholder.svg?height=900&width=1600',
//         serviceType: 'Mobile App',
//         platforms: ['iOS', 'Android'],
//         frameworks: ['React Native', 'Firebase'],
//         tags: ['Travel', 'Lifestyle', 'Maps'],
//         summary:
//             'A comprehensive travel companion app that helps users plan trips, discover local attractions, and manage itineraries. Features include offline maps, budget tracking, and local recommendations.',
//     },
//     {
//         title: 'DataViz Pro',
//         tagline: 'Transform complex data into compelling stories',
//         imageUrl: '/placeholder.svg?height=900&width=1600',
//         serviceType: 'Website',
//         platforms: ['Web'],
//         frameworks: ['React', 'D3.js'],
//         tags: ['Data Visualization', 'Analytics', 'Dashboard'],
//         summary:
//             'A powerful data visualization platform that helps businesses transform raw data into interactive charts and graphs. Features include real-time updates, customizable templates, and export options.',
//     },
//     {
//         title: 'SmartHome Hub',
//         tagline: 'Control your entire home from one interface',
//         imageUrl: '/placeholder.svg?height=900&width=1600',
//         serviceType: 'Aplicativo Multiplataforma',
//         platforms: ['Web', 'iOS', 'Android'],
//         frameworks: ['Flutter', 'Node.js'],
//         tags: ['IoT', 'Smart Home', 'Automation'],
//         summary:
//             'A centralized hub for managing all smart home devices regardless of brand. Features include automation routines, energy usage monitoring, and voice control integration.',
//     },
//     {
//         title: 'FoodieFind',
//         tagline: 'Discover local restaurants and hidden gems',
//         imageUrl: '/placeholder.svg?height=900&width=1600',
//         serviceType: 'Mobile App',
//         platforms: ['iOS', 'Android'],
//         frameworks: ['React Native', 'GraphQL'],
//         tags: ['Food', 'Local Business', 'Reviews'],
//         summary:
//             'A restaurant discovery app focused on highlighting local and independent eateries. Features include personalized recommendations, dietary preference filtering, and user-generated reviews.',
//     },
//     {
//         title: 'CodeCollab',
//         tagline: 'Real-time collaborative coding environment',
//         imageUrl: '/placeholder.svg?height=900&width=1600',
//         serviceType: 'Website',
//         platforms: ['Web', 'Desktop'],
//         frameworks: ['Next.js', 'WebSockets'],
//         tags: ['Developer Tools', 'Collaboration', 'SaaS'],
//         summary:
//             'A collaborative coding platform that allows multiple developers to work on the same codebase simultaneously. Features include real-time editing, integrated terminal, and version control.',
//     },
//     {
//         title: 'MindfulMoments',
//         tagline: 'Daily meditation and mindfulness practices',
//         imageUrl: '/placeholder.svg?height=900&width=1600',
//         serviceType: 'Mobile App',
//         platforms: ['iOS', 'Android'],
//         frameworks: ['Flutter', 'Firebase'],
//         tags: ['Health', 'Wellness', 'Meditation'],
//         summary:
//             'A mindfulness app offering guided meditations, breathing exercises, and sleep stories. Features include progress tracking, daily reminders, and personalized recommendations.',
//     },
// ];

export function ProjectGallery({ className, projects }: ProjectGalleryProps) {
    return (
        <div className={cn('grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-3', className)}>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    );
}
