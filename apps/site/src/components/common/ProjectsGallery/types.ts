import type { ProcessedProject } from '@lib/collections/projectHelpers';
import type { ResolvedProduct, ResolvedPlatform, ResolvedFramework } from '@lib/resolveProjectCategories';

export type CategoryKey = 'products' | 'platforms' | 'frameworks';
export type ResolvedCategoryItem = ResolvedProduct | ResolvedPlatform | ResolvedFramework;

export interface FilterSection {
    key: CategoryKey;
    label: string;
}

export const FILTER_SECTIONS: FilterSection[] = [
    { key: 'products', label: 'Serviços' },
    { key: 'platforms', label: 'Plataformas' },
    { key: 'frameworks', label: 'Frameworks' },
];

// Extrair e ordenar categorias únicas de um conjunto de projetos
export const extractUniqueCategories = <T extends ResolvedCategoryItem>(
    projects: ProcessedProject[],
    categoryKey: CategoryKey,
): T[] => {
    const categoriesMap = new Map<string, T>();
    projects.forEach((project) => {
        project.data.category?.[categoryKey]?.forEach((item: ResolvedCategoryItem) => {
            if (item && typeof item === 'object' && 'id' in item && !categoriesMap.has(item.id)) {
                categoriesMap.set(item.id, item as T);
            }
        });
    });
    return Array.from(categoriesMap.values()).sort((a, b) => (a.title || a.id).localeCompare(b.title || b.id));
};

// Verificar se um projeto corresponde a um conjunto de seleções (lógica estrita — interseção)
export const projectMatchesSelections = (
    project: ProcessedProject,
    selections: Record<CategoryKey, string[]>,
): boolean => {
    const category = project.data.category;
    if (!category) return false;

    return (Object.keys(selections) as CategoryKey[]).every((key) => {
        const selected = selections[key];
        if (selected.length === 0) return true;
        const projectItemsInCategory = new Set(category[key]?.map((item: ResolvedCategoryItem) => item.id) ?? []);
        return selected.every((id) => projectItemsInCategory.has(id));
    });
};

// Calcular contagens dinâmicas por item, considerando seleções nas outras categorias
export const calculateDynamicCategoryCounts = (
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
            const simulatedSelections = { ...currentSelections };
            const potentialTargetSelection = currentSelectionsForTarget.includes(optionId)
                ? currentSelectionsForTarget
                : [...currentSelectionsForTarget, optionId];

            simulatedSelections[targetKey] = potentialTargetSelection;
            const count = projects.filter((project) => projectMatchesSelections(project, simulatedSelections)).length;
            dynamicCounts[targetKey].set(optionId, count);
        });
    });

    return dynamicCounts;
};

// Calcular opções disponíveis (não-desabilitadas) para uma categoria
export const calculateAvailableOptions = (
    targetKey: CategoryKey,
    selections: Record<CategoryKey, string[]>,
    allCategoriesMap: Record<CategoryKey, ResolvedCategoryItem[]>,
    projects: ProcessedProject[],
): Set<string> => {
    const availableIds = new Set<string>();
    const currentSelectionsForTarget = selections[targetKey];

    allCategoriesMap[targetKey].forEach((option) => {
        const optionId = option.id;
        const potentialSelections = { ...selections };
        const simulatedTargetSelection = currentSelectionsForTarget.includes(optionId)
            ? currentSelectionsForTarget
            : [...currentSelectionsForTarget, optionId];

        potentialSelections[targetKey] = simulatedTargetSelection;

        if (projects.some((project) => projectMatchesSelections(project, potentialSelections))) {
            availableIds.add(optionId);
        }
    });

    return availableIds;
};
