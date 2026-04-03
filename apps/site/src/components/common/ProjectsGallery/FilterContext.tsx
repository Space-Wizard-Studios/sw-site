import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

import type { ProcessedProject } from '@lib/collections/projectHelpers';
import type { ResolvedProduct, ResolvedPlatform, ResolvedFramework } from '@lib/resolveProjectCategories';

import {
    type CategoryKey,
    type ResolvedCategoryItem,
    extractUniqueCategories,
    projectMatchesSelections,
    calculateDynamicCategoryCounts,
    calculateAvailableOptions,
} from './types';

interface FilterState {
    selections: Record<CategoryKey, string[]>;
    allCategoriesMap: Record<CategoryKey, ResolvedCategoryItem[]>;
    availableOptions: Record<CategoryKey, Set<string>>;
    dynamicCategoryCounts: Record<CategoryKey, Map<string, number>>;
    filteredProjects: ProcessedProject[];
    totalSelected: number;
    onCheckboxChange: (key: CategoryKey, itemId: string) => void;
    onClearCategory: (key: CategoryKey) => void;
    onClearAll: () => void;
}

const FilterContext = createContext<FilterState | null>(null);

export function useFilters() {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error('useFilters must be used within FilterProvider');
    return ctx;
}

export function FilterProvider({ projects, children }: Readonly<{ projects: ProcessedProject[]; children: ReactNode }>) {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

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

    const allCategoriesMap: Record<CategoryKey, ResolvedCategoryItem[]> = {
        products: extractUniqueCategories<ResolvedProduct>(projects, 'products'),
        platforms: extractUniqueCategories<ResolvedPlatform>(projects, 'platforms'),
        frameworks: extractUniqueCategories<ResolvedFramework>(projects, 'frameworks'),
    };

    const filteredProjects = projects.filter((project) => projectMatchesSelections(project, selections));

    const availableOptions = {
        products: calculateAvailableOptions('products', selections, allCategoriesMap, projects),
        platforms: calculateAvailableOptions('platforms', selections, allCategoriesMap, projects),
        frameworks: calculateAvailableOptions('frameworks', selections, allCategoriesMap, projects),
    };

    const dynamicCategoryCounts = calculateDynamicCategoryCounts(projects, selections, allCategoriesMap);

    const onCheckboxChange = (key: CategoryKey, itemId: string) => {
        setters[key]((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
    };

    const onClearCategory = (key: CategoryKey) => setters[key]([]);

    const onClearAll = () => {
        setSelectedProducts([]);
        setSelectedPlatforms([]);
        setSelectedFrameworks([]);
    };

    const totalSelected = selectedProducts.length + selectedPlatforms.length + selectedFrameworks.length;

    const value = useMemo<FilterState>(
        () => ({
            selections,
            allCategoriesMap,
            availableOptions,
            dynamicCategoryCounts,
            filteredProjects,
            totalSelected,
            onCheckboxChange,
            onClearCategory,
            onClearAll,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedProducts, selectedPlatforms, selectedFrameworks, projects],
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}
