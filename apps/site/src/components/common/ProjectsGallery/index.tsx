import { ProjectCard } from '@common/ProjectCard';
import { cn } from '@lib/utils';

import type { ProcessedProject } from '@lib/collections/projectHelpers';

interface ProjectGalleryProps {
    className?: string;
    projects: ProcessedProject[];
}

export function ProjectGallery({ className, projects }: ProjectGalleryProps) {
    return (
        <div className={cn('grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-3', className)}>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    );
}
