import { FilterProvider } from '@common/ProjectsGallery/FilterContext';
import { FilterPopover } from '@common/ProjectsGallery/FilterPopover';
import { ProjectGalleryInner } from '@common/ProjectsGallery';

import type { ProcessedProject } from '@lib/collections/projectHelpers';

interface ProjectsPageContentProps {
    projects: ProcessedProject[];
    className?: string;
}

export function ProjectsPageContent({ projects, className }: Readonly<ProjectsPageContentProps>) {
    return (
        <FilterProvider projects={projects}>
            <div className='flex flex-col space-y-4'>
                <header className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex flex-col space-y-2'>
                        <h2 className='text-on-surface uppercase'>Projetos</h2>
                        <h3 className='sw-pulse from-primary to-tertiary'>Um gostinho do que fazemos</h3>
                    </div>
                    <FilterPopover />
                </header>
                <ProjectGalleryInner className={className} />
            </div>
        </FilterProvider>
    );
}
