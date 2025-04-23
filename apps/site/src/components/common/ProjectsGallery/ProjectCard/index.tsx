import type React from 'react';
import { useState } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import {
    Code,
    Globe,
    Laptop,
    Smartphone,
    MonitorSmartphone,
    Layers,
    PenTool,
    Briefcase,
    Server,
    ShoppingBag,
    FileCode,
    Database,
    Tag,
    MapPin,
    Settings,
    FileText,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';

import type { ProcessedProject } from '@lib/collections/projectHelpers';

type Platform = 'Web' | 'iOS' | 'Android' | 'Desktop';
type Product =
    | 'Website'
    | 'Mobile App'
    | 'Aplicativo Multiplataforma'
    | 'Consulting'
    | 'E-commerce'
    | 'Backend'
    | string;
type Framework = 'React' | 'React Native' | 'Next.js' | 'Laravel' | 'Flutter' | 'Firebase' | 'Tailwind CSS' | string;

interface ProjectCardProps {
    project: ProcessedProject;
    className?: string;
}

// Icon mappings
const platformIcons: Record<Platform, React.ReactNode> = {
    Web: <Globe className='h-4 w-4' />,
    iOS: <Smartphone className='h-4 w-4' />,
    Android: <Smartphone className='h-4 w-4' />,
    Desktop: <Laptop className='h-4 w-4' />,
};

const productIcons: Record<string, React.ReactNode> = {
    'Website': <Globe className='h-4 w-4' />,
    'Mobile App': <Smartphone className='h-4 w-4' />,
    'Aplicativo Multiplataforma': <MonitorSmartphone className='h-4 w-4' />,
    'Consulting': <Briefcase className='h-4 w-4' />,
    'E-commerce': <ShoppingBag className='h-4 w-4' />,
    'Backend': <Server className='h-4 w-4' />,
};

const frameworkIcons: Record<string, React.ReactNode> = {
    'React': <Code className='h-4 w-4' />,
    'React Native': <Code className='h-4 w-4' />,
    'Next.js': <Code className='h-4 w-4' />,
    'Laravel': <FileCode className='h-4 w-4' />,
    'Flutter': <Layers className='h-4 w-4' />,
    'Firebase': <Database className='h-4 w-4' />,
    'Tailwind CSS': <PenTool className='h-4 w-4' />,
};

// Helper function to get icon or default
const getIcon = (map: Record<string, React.ReactNode>, key: string) => {
    return map[key] || <Code className='h-4 w-4' />;
};

interface IconBadgeProps {
    icon: React.ReactNode;
    label: string;
    showLabel?: boolean;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

function IconBadge({ icon, label, showLabel = false, variant = 'secondary' }: IconBadgeProps) {
    return (
        <Badge variant={variant} className='mb-1 mr-1 flex items-center gap-1'>
            {icon}
            {showLabel && <span className='ml-1'>{label}</span>}
        </Badge>
    );
}

type TabType = 'overview' | 'where' | 'how' | 'details';

export function ProjectCard({ project, className }: ProjectCardProps) {
    const { title, date, subtitle, category, summary } = project;
    // const { products, platforms, frameworks, tags } = category || {};

    // TODO - placeholder 
    const product: Product = 'Website';
    const platforms: Platform[] = ['Web', 'iOS', 'Android'];
    const frameworks: Framework[] = ['React', 'Next.js'];
    const tags: string[] = ['Tag1', 'Tag2', 'Tag3'];

    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Handle toggle button click
    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setActiveTab('overview');
        }
    };

    // Handle tab change
    const handleTabChange = (tab: TabType) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveTab(tab);
    };

    return (
        <motion.div
            className={cn(
                'group relative h-[360px] w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 dark:bg-gray-800', // Further reduced height
                isExpanded ? 'shadow-lg' : '',
                className,
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Card with two sections: image and content */}
            <div className='flex h-full flex-col'>
                {/* Hero Image Section - Larger height */}
                <div className='relative h-[280px] w-full'>
                    {/* <Image
                        src={imageUrl || '/placeholder.svg'}
                        alt={title}
                        fill
                        className='object-cover transition-transform duration-500 ease-out'
                        style={{
                            transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
                        }}
                    /> */}

                    {/* Icon badges overlay on image */}
                    <div className='absolute left-0 top-0 flex w-full flex-wrap p-3'>
                        {/* Service Type Badge */}
                        <IconBadge
                            icon={getIcon(productIcons, product)}
                            label={product}
                            showLabel={false}
                            variant='outline'
                        />

                        {/* Platform Badges */}
                        {platforms.map((platform) => (
                            <IconBadge
                                key={platform}
                                icon={platformIcons[platform]}
                                label={platform}
                                showLabel={false}
                                variant='outline'
                            />
                        ))}

                        {/* Framework Badges */}
                        {frameworks.map((framework) => (
                            <IconBadge
                                key={framework}
                                icon={getIcon(frameworkIcons, framework)}
                                label={framework}
                                showLabel={false}
                                variant='outline'
                            />
                        ))}
                    </div>

                    {/* Gradient overlay for readability */}
                    <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60' />

                    {/* Tabs that appear when expanded */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='absolute inset-0 flex flex-col bg-black/70 backdrop-blur-sm'
                            >
                                {/* Tab Navigation */}
                                <div className='flex border-b border-white/20'>
                                    <button
                                        onClick={handleTabChange('overview')}
                                        className={cn(
                                            'flex items-center border-b-2 px-3 py-2 text-xs font-medium transition-colors',
                                            activeTab === 'overview'
                                                ? 'border-white text-white'
                                                : 'border-transparent text-gray-300 hover:text-white',
                                        )}
                                    >
                                        <FileText className='mr-1 h-3 w-3' />
                                        Overview
                                    </button>
                                    <button
                                        onClick={handleTabChange('where')}
                                        className={cn(
                                            'flex items-center border-b-2 px-3 py-2 text-xs font-medium transition-colors',
                                            activeTab === 'where'
                                                ? 'border-white text-white'
                                                : 'border-transparent text-gray-300 hover:text-white',
                                        )}
                                    >
                                        <MapPin className='mr-1 h-3 w-3' />
                                        Where?
                                    </button>
                                    <button
                                        onClick={handleTabChange('how')}
                                        className={cn(
                                            'flex items-center border-b-2 px-3 py-2 text-xs font-medium transition-colors',
                                            activeTab === 'how'
                                                ? 'border-white text-white'
                                                : 'border-transparent text-gray-300 hover:text-white',
                                        )}
                                    >
                                        <Settings className='mr-1 h-3 w-3' />
                                        How?
                                    </button>
                                    <button
                                        onClick={handleTabChange('details')}
                                        className={cn(
                                            'flex items-center border-b-2 px-3 py-2 text-xs font-medium transition-colors',
                                            activeTab === 'details'
                                                ? 'border-white text-white'
                                                : 'border-transparent text-gray-300 hover:text-white',
                                        )}
                                    >
                                        <Tag className='mr-1 h-3 w-3' />
                                        Details
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className='flex-grow overflow-y-auto p-4 text-white'>
                                    {/* Overview Tab */}
                                    {activeTab === 'overview' && (
                                        <div>
                                            <div className='mb-2 flex items-center justify-between'>
                                                <h3 className='text-xs font-medium text-gray-300'>Summary</h3>
                                                <span className='text-xs text-gray-400'>{date}</span>
                                            </div>
                                            <p className='text-xs leading-relaxed text-gray-100'>{summary}</p>
                                        </div>
                                    )}

                                    {/* Where Tab */}
                                    {activeTab === 'where' && (
                                        <div>
                                            <h3 className='mb-2 text-xs font-medium text-gray-300'>Platforms</h3>
                                            <div className='flex flex-wrap'>
                                                {platforms.map((platform) => (
                                                    <IconBadge
                                                        key={platform}
                                                        icon={platformIcons[platform]}
                                                        label={platform}
                                                        showLabel={true}
                                                        variant='outline'
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* How Tab */}
                                    {activeTab === 'how' && (
                                        <div>
                                            <div className='mb-3'>
                                                <h3 className='mb-2 text-xs font-medium text-gray-300'>Service Type</h3>
                                                <div className='flex flex-wrap'>
                                                    <IconBadge
                                                        icon={getIcon(productIcons, product)}
                                                        label={product}
                                                        showLabel={true}
                                                        variant='outline'
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className='mb-2 text-xs font-medium text-gray-300'>Frameworks</h3>
                                                <div className='flex flex-wrap'>
                                                    {frameworks.map((framework) => (
                                                        <IconBadge
                                                            key={framework}
                                                            icon={getIcon(frameworkIcons, framework)}
                                                            label={framework}
                                                            showLabel={true}
                                                            variant='outline'
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Details Tab */}
                                    {activeTab === 'details' && (
                                        <div>
                                            <h3 className='mb-2 text-xs font-medium text-gray-300'>Tags</h3>
                                            <div className='flex flex-wrap'>
                                                {tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant='outline'
                                                        className='mb-1 mr-1 border-white/30 text-white'
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content Section - Even smaller height with toggle button */}
                <div className='relative flex h-[80px] flex-grow items-center bg-white p-4 dark:bg-gray-800'>
                    <div className='flex-grow pr-10'>
                        <h2 className='truncate text-lg font-bold leading-tight'>{title}</h2>
                        <p className='truncate text-sm text-gray-600 dark:text-gray-300'>{subtitle}</p>
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={handleToggle}
                        className={cn(
                            'absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-2 transition-colors dark:bg-gray-700',
                            isExpanded ? 'bg-gray-200 dark:bg-gray-600' : '',
                        )}
                        aria-label={isExpanded ? 'Hide details' : 'Show details'}
                    >
                        {isExpanded ? (
                            <ChevronDown className='h-4 w-4 text-gray-600 dark:text-gray-300' />
                        ) : (
                            <ChevronUp className='h-4 w-4 text-gray-600 dark:text-gray-300' />
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
