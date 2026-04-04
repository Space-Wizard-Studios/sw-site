import { ProjectCard } from '@common/ProjectsGallery/ProjectCard';
import { ActiveFilterChips } from '@common/ProjectsGallery/FilterPopover';
import { FilterProvider, useFilters } from '@common/ProjectsGallery/FilterContext';
import { cn } from '@lib/utils';

import type { ProcessedProject } from '@lib/collections/projectHelpers';

interface ProjectGalleryProps {
    className?: string;
    projects: ProcessedProject[];
}

export function ProjectGalleryInner({ className }: Readonly<{ className?: string }>) {
    const { filteredProjects } = useFilters();

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {/* Chips de filtros ativos */}
            <div className='flex flex-wrap items-center gap-2'>
                <ActiveFilterChips />
            </div>

            {/* Galeria de Projetos */}
            <div className={cn('grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3')}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => {
                        const projectUrl = `/projects/${project.data.slug}`;
                        return (
                            <ProjectCard key={project.id || project.data.slug} project={project} href={projectUrl} />
                        );
                    })
                ) : (
                    <p className='text-on-surface/70 col-span-full text-center'>
                        Nenhum projeto encontrado para os filtros selecionados.
                    </p>
                )}
            </div>
        </div>
    );
}

export function ProjectGallery({ className, projects }: ProjectGalleryProps) {
    return (
        <FilterProvider projects={projects}>
            <ProjectGalleryInner className={className} />
        </FilterProvider>
    );
}

export { FilterPopover } from '@common/ProjectsGallery/FilterPopover';
export { FilterProvider } from '@common/ProjectsGallery/FilterContext';
