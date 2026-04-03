import { cn } from '@lib/utils';
import { Check, SlidersHorizontal, X } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';

import { useFilters } from './FilterContext';
import { FILTER_SECTIONS } from './types';

export function FilterPopover() {
    const {
        selections,
        allCategoriesMap,
        availableOptions,
        dynamicCategoryCounts,
        totalSelected,
        onCheckboxChange,
        onClearCategory,
        onClearAll,
    } = useFilters();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='gap-2'>
                    <SlidersHorizontal className='size-4' />
                    Filtrar
                    {totalSelected > 0 && (
                        <Badge variant='secondary' className='ml-1 h-5 min-w-5 px-1'>
                            {totalSelected}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align='end'
                className='w-auto max-w-[min(95vw,48rem)] p-0'
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                {/* Cabeçalho */}
                <div className='flex items-center justify-between border-b border-surface/40 px-4 py-2'>
                    <span className='text-sm font-semibold'>Filtros</span>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={onClearAll}
                        disabled={totalSelected === 0}
                    >
                        Limpar tudo
                    </Button>
                </div>

                {/* Seções lado a lado */}
                <div className='grid max-h-80 grid-cols-1 divide-x divide-surface/40 overflow-y-auto sm:grid-cols-3'>
                    {FILTER_SECTIONS.map(({ key, label }) => {
                        const categories = allCategoriesMap[key];
                        const selected = selections[key];
                        const available = availableOptions[key];
                        const counts = dynamicCategoryCounts[key];

                        if (categories.length === 0) return null;

                        return (
                            <div key={key} className='flex min-w-44 flex-col'>
                                {/* Cabeçalho da seção */}
                                <div className='sticky top-0 z-10 flex items-center justify-between bg-surface-container px-3 py-2'>
                                    <span className='text-xs font-semibold uppercase tracking-wider text-on-surface/60'>
                                        {label}
                                    </span>
                                    {selected.length > 0 && (
                                        <button
                                            className='text-xs text-on-surface/50 transition-colors hover:text-on-surface'
                                            onClick={() => onClearCategory(key)}
                                        >
                                            <X className='size-3' />
                                        </button>
                                    )}
                                </div>

                                {/* Lista de itens */}
                                <div className='flex flex-col pb-2'>
                                    {categories.map((item) => {
                                        const count = counts.get(item.id) || 0;
                                        const isDisabled = !available.has(item.id) && !selected.includes(item.id);
                                        const isSelected = selected.includes(item.id);

                                        return (
                                            <button
                                                key={item.id}
                                                disabled={isDisabled}
                                                onClick={() => onCheckboxChange(key, item.id)}
                                                className={cn(
                                                    'flex w-full items-center gap-2 px-3 py-1.5 text-sm transition-colors',
                                                    isSelected
                                                        ? 'font-medium text-on-surface'
                                                        : 'text-on-surface/80',
                                                    !isDisabled && 'hover:bg-surface-container-high',
                                                    isDisabled && 'cursor-not-allowed opacity-40',
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                                                        isSelected
                                                            ? 'border-primary bg-primary'
                                                            : 'border-on-surface/30 bg-transparent',
                                                    )}
                                                >
                                                    {isSelected && (
                                                        <Check className='size-3 text-on-primary' />
                                                    )}
                                                </span>

                                                <span className='grow truncate text-left'>
                                                    {item.title || item.id}
                                                </span>

                                                <span
                                                    className={cn(
                                                        'shrink-0 font-mono text-xs tabular-nums',
                                                        isSelected
                                                            ? 'text-on-surface/70'
                                                            : 'text-on-surface/40',
                                                    )}
                                                >
                                                    {count.toString().padStart(2, '0')}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export function ActiveFilterChips() {
    const { selections, allCategoriesMap, onCheckboxChange } = useFilters();

    const chips = FILTER_SECTIONS.flatMap(({ key, label }) =>
        selections[key].map((id) => {
            const item = allCategoriesMap[key].find((c) => c.id === id);
            return (
                <Badge key={`${key}-${id}`} variant='outline' className='gap-1 pl-2 pr-1'>
                    <span className='text-xs text-on-surface/50'>{label}:</span>
                    <span>{item?.title || id}</span>
                    <button
                        onClick={() => onCheckboxChange(key, id)}
                        className='ml-0.5 rounded hover:opacity-70'
                        aria-label={`Remover filtro ${item?.title || id}`}
                    >
                        <X className='size-3' />
                    </button>
                </Badge>
            );
        }),
    );

    return <>{chips}</>;
}
