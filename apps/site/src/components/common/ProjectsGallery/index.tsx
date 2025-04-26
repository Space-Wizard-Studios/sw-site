import { ProjectCard } from '@common/ProjectCard';
import { cn } from '@lib/utils';
import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

// Importar componentes necessários do shadcn/ui
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

import type { ProcessedProject } from '@lib/collections/projectHelpers';
import type { ResolvedProduct, ResolvedPlatform, ResolvedFramework } from '@lib/resolveProjectCategories';

// Tipos auxiliares
type CategoryKey = 'products' | 'platforms' | 'frameworks';
type ResolvedCategoryItem = ResolvedProduct | ResolvedPlatform | ResolvedFramework;

interface ProjectGalleryProps {
    className?: string;
    projects: ProcessedProject[];
}

// Função auxiliar para extrair e ordenar categorias únicas
const extractUniqueCategories = <T extends ResolvedCategoryItem>(
    projects: ProcessedProject[],
    categoryKey: CategoryKey,
): T[] => {
    const categoriesMap = new Map<string, T>();
    projects.forEach((project) => {
        project.data.category?.[categoryKey]?.forEach((item) => {
            if (item && typeof item === 'object' && 'id' in item && !categoriesMap.has(item.id)) {
                categoriesMap.set(item.id, item as T);
            }
        });
    });
    return Array.from(categoriesMap.values()).sort((a, b) => (a.title || a.id).localeCompare(b.title || b.id));
};

// Função para gerar texto do botão do dropdown
const getDropdownButtonText = (
    selectedItems: string[],
    allCategories: ResolvedCategoryItem[],
    placeholder: string,
): string => {
    if (selectedItems.length === 0) return placeholder;
    if (selectedItems.length === 1) {
        const item = allCategories.find((cat) => cat.id === selectedItems[0]);
        return item?.title || selectedItems[0];
    }
    return `${selectedItems.length} selecionados`;
};

// Função para verificar se um projeto corresponde a um conjunto de seleções (lógica estrita)
const projectMatchesSelections = (project: ProcessedProject, selections: Record<CategoryKey, string[]>): boolean => {
    const category = project.data.category;
    if (!category) return false;

    return (Object.keys(selections) as CategoryKey[]).every((key) => {
        const selected = selections[key];
        if (selected.length === 0) return true;
        const projectItemsInCategory = new Set(category[key]?.map((item) => item.id) ?? []);
        return selected.every((id) => projectItemsInCategory.has(id));
    });
};

// Função para calcular contagens DINÂMICAS de projetos por item de categoria,
// considerando as seleções ATUAIS nas OUTRAS categorias.
const calculateDynamicCategoryCounts = (
    projects: ProcessedProject[],
    currentSelections: Record<CategoryKey, string[]>,
    allCategoriesMap: Record<CategoryKey, ResolvedCategoryItem[]>,
): Record<CategoryKey, Map<string, number>> => {
    const dynamicCounts: Record<CategoryKey, Map<string, number>> = {
        products: new Map(),
        platforms: new Map(),
        frameworks: new Map(),
    };

    (Object.keys(allCategoriesMap) as CategoryKey[]).forEach((targetKey) => {
        const allOptionsInTargetCategory = allCategoriesMap[targetKey];
        const currentSelectionsForTarget = currentSelections[targetKey];

        allOptionsInTargetCategory.forEach((option) => {
            const optionId = option.id;
            // Simula a seleção DESTE item (optionId) ADICIONALMENTE aos já selecionados
            // nas OUTRAS categorias.
            const simulatedSelections = { ...currentSelections };

            // A contagem reflete o resultado se este item for adicionado à seleção *atual* da targetKey.
            const potentialTargetSelection = currentSelectionsForTarget.includes(optionId)
                ? currentSelectionsForTarget // Se já selecionado, usa a seleção atual
                : [...currentSelectionsForTarget, optionId]; // Se não, simula adicionar

            simulatedSelections[targetKey] = potentialTargetSelection;

            // Conta quantos projetos correspondem a esta seleção simulada
            const count = projects.filter((project) => projectMatchesSelections(project, simulatedSelections)).length;

            dynamicCounts[targetKey].set(optionId, count);
        });
    });

    return dynamicCounts;
};

export function ProjectGallery({ className, projects }: ProjectGalleryProps) {
    // Estados para seleções múltiplas em todas as categorias
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

    // Estado para controlar a abertura dos dropdowns
    const [dropdownOpenStates, setDropdownOpenStates] = useState<Record<CategoryKey, boolean>>({
        products: false,
        platforms: false,
        frameworks: false,
    });

    // Ref para armazenar timers de fechamento
    const closeTimers = useRef<Record<CategoryKey, NodeJS.Timeout | null>>({
        products: null,
        platforms: null,
        frameworks: null,
    });

    // Limpar timers ao desmontar o componente
    useEffect(() => {
        return () => {
            Object.values(closeTimers.current).forEach((timer) => {
                if (timer) clearTimeout(timer);
            });
        };
    }, []);

    // Mapeamento de estados para facilitar o acesso
    const selections: Record<CategoryKey, string[]> = {
        products: selectedProducts,
        platforms: selectedPlatforms,
        frameworks: selectedFrameworks,
    };

    const setters: Record<CategoryKey, React.Dispatch<React.SetStateAction<string[]>>> = {
        products: setSelectedProducts,
        platforms: setSelectedPlatforms,
        frameworks: setSelectedFrameworks,
    };

    // Extrair todas as categorias únicas
    const productCategories = extractUniqueCategories<ResolvedProduct>(projects, 'products');
    const platformCategories = extractUniqueCategories<ResolvedPlatform>(projects, 'platforms');
    const frameworkCategories = extractUniqueCategories<ResolvedFramework>(projects, 'frameworks');

    const allCategoriesMap: Record<CategoryKey, ResolvedCategoryItem[]> = {
        products: productCategories,
        platforms: platformCategories,
        frameworks: frameworkCategories,
    };

    // Lógica de Filtragem Principal (ESTRITA - INTERSEÇÃO)
    const filteredProjects = projects.filter((project) => projectMatchesSelections(project, selections));

    // Lógica para Calcular Opções Disponíveis (Desabilitar Inválidas - ESTRITA)
    const calculateAvailableOptions = (targetKey: CategoryKey): Set<string> => {
        const availableIds = new Set<string>();
        const currentSelectionsForTarget = selections[targetKey];
        const allPossibleOptions = allCategoriesMap[targetKey];

        allPossibleOptions.forEach((option) => {
            const optionId = option.id;
            const potentialSelections = { ...selections };

            // Simula a seleção desta opção
            const simulatedTargetSelection = currentSelectionsForTarget.includes(optionId)
                ? currentSelectionsForTarget
                : [...currentSelectionsForTarget, optionId];

            potentialSelections[targetKey] = simulatedTargetSelection;

            // Verifica se existe pelo menos um projeto que satisfaça esta seleção potencial ESTRITA
            const hasMatchingProject = projects.some((project) =>
                projectMatchesSelections(project, potentialSelections),
            );

            if (hasMatchingProject) {
                availableIds.add(optionId);
            }
        });

        return availableIds;
    };

    const availableOptions = {
        products: calculateAvailableOptions('products'),
        platforms: calculateAvailableOptions('platforms'),
        frameworks: calculateAvailableOptions('frameworks'),
    };

    const dynamicCategoryCounts = calculateDynamicCategoryCounts(projects, selections, allCategoriesMap);

    // Handler genérico para mudança nos checkboxes
    const handleCheckboxChange = (key: CategoryKey, itemId: string) => {
        const setter = setters[key];
        setter((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
    };

    // Handlers para controlar abertura/fechamento do dropdown no hover
    const handleMouseEnter = (key: CategoryKey) => {
        if (closeTimers.current[key]) {
            clearTimeout(closeTimers.current[key]!);
            closeTimers.current[key] = null;
        }
        setDropdownOpenStates((prev) => ({ ...prev, [key]: true }));
    };

    const handleMouseLeave = (key: CategoryKey) => {
        closeTimers.current[key] = setTimeout(() => {
            setDropdownOpenStates((prev) => ({ ...prev, [key]: false }));
            closeTimers.current[key] = null;
        }, 200);
    };

    const handleOpenChange = (key: CategoryKey, isOpen: boolean) => {
        if (!isOpen && closeTimers.current[key]) {
            return;
        } else if (isOpen && closeTimers.current[key]) {
            clearTimeout(closeTimers.current[key]!);
            closeTimers.current[key] = null;
        }
        setDropdownOpenStates((prev) => ({ ...prev, [key]: isOpen }));

        if (!isOpen && closeTimers.current[key]) {
            clearTimeout(closeTimers.current[key]!);
            closeTimers.current[key] = null;
        }
    };

    const handleClearSelection = (key: CategoryKey) => {
        const setter = setters[key];
        setter([]);
    };

    // Função para renderizar um Dropdown de Filtro
    const renderFilterDropdown = (key: CategoryKey, placeholder: string) => {
        const categories = allCategoriesMap[key];
        const selected = selections[key];
        const available = availableOptions[key];
        const counts = dynamicCategoryCounts[key];

        if (categories.length === 0) return null;

        return (
            <DropdownMenu
                open={dropdownOpenStates[key]}
                onOpenChange={(isOpen) => handleOpenChange(key, isOpen)}
                modal={false}
            >
                <DropdownMenuTrigger
                    asChild
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={() => handleMouseLeave(key)}
                >
                    <Button variant='outline' className='w-full justify-start'>
                        {getDropdownButtonText(selected, categories, placeholder)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={() => handleMouseLeave(key)}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    <div className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <DropdownMenuLabel className='w-full p-0'>
                                {placeholder.replace('Filtrar por ', '')}
                            </DropdownMenuLabel>
                            <div className='flex flex-grow items-center gap-2'>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className=''
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearSelection(key);
                                    }}
                                    aria-label='Limpar seleção'
                                    disabled={selected.length === 0}
                                >
                                    Limpar
                                </Button>

                                <Button
                                    variant='outline'
                                    size='sm'
                                    className=''
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpenStates((prev) => ({ ...prev, [key]: false }));
                                    }}
                                    aria-label='Fechar dropdown'
                                >
                                    <X className='size-4' />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    {categories.map((item) => {
                        const count = counts.get(item.id) || 0;
                        const isDisabled = !available.has(item.id) && !selected.includes(item.id);
                        const isSelected = selected.includes(item.id);
                        const showBadge = count > 0 || isSelected;

                        return (
                            <DropdownMenuItem
                                key={item.id}
                                disabled={isDisabled}
                                onSelect={(event) => {
                                    event.preventDefault();
                                    handleCheckboxChange(key, item.id);
                                }}
                            >
                                <div className='flex flex-grow items-center gap-2'>
                                    {showBadge ? (
                                        <Badge
                                            variant={isDisabled && !isSelected ? 'outline' : 'outline'}
                                            className='border-on-surface h-6 w-6'
                                        >
                                            {count.toString().padStart(2, '0')} {/* Format count here */}
                                        </Badge>
                                    ) : (
                                        <span className='inline-block h-5 shrink-0 basis-5'></span>
                                    )}
                                    <span className='flex-grow truncate'>{item.title || item.id}</span>
                                </div>
                                {isSelected && <Check className='size-4 shrink-0' />}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {/* Seção de Filtros Dropdown */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {renderFilterDropdown('products', 'Filtrar por Serviço')}
                {renderFilterDropdown('platforms', 'Filtrar por Plataforma')}
                {renderFilterDropdown('frameworks', 'Filtrar por Framework')}
            </div>

            {/* Galeria de Projetos Filtrada */}
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
