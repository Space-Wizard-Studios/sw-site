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

// Define more specific types based on your schema if possible
type Platform = 'Web' | 'iOS' | 'Android' | 'Desktop' | 'AR' | 'Mobile'; // Added AR, Mobile based on content
type Product =
    | 'Website'
    | 'Mobile App'
    | 'Aplicativo Multiplataforma'
    | 'Consulting'
    | 'E-commerce'
    | 'Backend'
    | 'Systems' // Added based on content
    | 'Games' // Added based on content
    | 'Interactivity' // Added based on content
    | string; // Keep string for flexibility
type Framework =
    | 'React'
    | 'React Native'
    | 'Next.js'
    | 'Laravel'
    | 'Flutter'
    | 'Firebase'
    | 'Tailwind CSS'
    | 'Astro' // Added based on content
    | 'Unity' // Added based on content
    | 'JavaScript' // Added based on content
    | 'TypeScript' // Added based on content
    | 'Meta' // Added based on content (Meta Spark)
    | 'Figma' // Added based on content
    | string; // Keep string for flexibility

interface ProjectCardProps {
    project: ProcessedProject;
    className?: string;
}

// Icon mappings - Add new icons as needed
const platformIcons: Record<string, React.ReactNode> = {
    // Use string index for broader compatibility
    Web: <Globe className='h-4 w-4' />,
    iOS: <Smartphone className='h-4 w-4' />,
    Android: <Smartphone className='h-4 w-4' />,
    Mobile: <Smartphone className='h-4 w-4' />, // Map Mobile to Smartphone
    Desktop: <Laptop className='h-4 w-4' />,
    AR: <Layers className='h-4 w-4' />, // Example icon for AR
    // Add default or handle missing keys
};

const productIcons: Record<string, React.ReactNode> = {
    'Website': <Globe className='h-4 w-4' />,
    'Mobile App': <Smartphone className='h-4 w-4' />,
    'Aplicativo Multiplataforma': <MonitorSmartphone className='h-4 w-4' />,
    'Consulting': <Briefcase className='h-4 w-4' />,
    'E-commerce': <ShoppingBag className='h-4 w-4' />,
    'Backend': <Server className='h-4 w-4' />,
    'Systems': <Server className='h-4 w-4' />, // Map Systems to Server icon
    'Games': <Layers className='h-4 w-4' />, // Map Games to Layers icon
    'Interactivity': <Code className='h-4 w-4' />, // Map Interactivity to Code icon
    // Add default or handle missing keys
};

const frameworkIcons: Record<string, React.ReactNode> = {
    'React': <Code className='h-4 w-4' />,
    'React Native': <Code className='h-4 w-4' />,
    'Next.js': <Code className='h-4 w-4' />,
    'Laravel': <FileCode className='h-4 w-4' />,
    'Flutter': <Layers className='h-4 w-4' />,
    'Firebase': <Database className='h-4 w-4' />,
    'Tailwind CSS': <PenTool className='h-4 w-4' />,
    'Astro': <Code className='h-4 w-4' />, // Example icon
    'Unity': <Layers className='h-4 w-4' />, // Example icon
    'JavaScript': <Code className='h-4 w-4' />, // Example icon
    'TypeScript': <Code className='h-4 w-4' />, // Example icon
    'Meta': <Code className='h-4 w-4' />, // Example icon for Meta Spark
    'Figma': <PenTool className='h-4 w-4' />, // Example icon
    // Add default or handle missing keys
};

// Helper function to get icon or default
const getIcon = (map: Record<string, React.ReactNode>, key: string | undefined) => {
    if (!key) return <Code className='h-4 w-4' />; // Handle undefined key
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
        <Badge variant={variant} className='mb-1 mr-1 flex items-center gap-1 capitalize'>
            {' '}
            {/* Added capitalize */}
            {icon}
            {showLabel && <span className='ml-1'>{label}</span>}
        </Badge>
    );
}

type TabType = 'overview' | 'where' | 'how' | 'details';

export function ProjectCard({ project, className }: ProjectCardProps) {
    const { data } = project;
    // Destructure properties from data
    const { title, date, subtitle, category, summary, hero } = data;

    // Extract category details safely, providing defaults
    const products = category?.products ?? [];
    const platforms = category?.platforms ?? [];
    const frameworks = category?.frameworks ?? [];
    const tags = category?.tags ?? [];

    // Helper to get the string value (id or the string itself)
    // Handles cases where the item might be a string or an {id, collection} object
    const getItemString = (item: string | { id: string; collection?: string }): string => {
        return typeof item === 'string' ? item : item.id;
    };

    const primaryProduct = products.length > 0 ? getItemString(products[0]) : undefined;

    const imageUrl = hero?.src ?? ''; 

    console.log('ProjectCard Data:', { title, date, subtitle, products, platforms, frameworks, tags, imageUrl });

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
                'group relative h-[360px] w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 dark:bg-gray-800',
                isExpanded ? 'shadow-lg' : '',
                className,
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className='flex h-full flex-col'>
                {/* Image Section */}
                <div className='relative h-[280px] w-full'>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={hero?.alt ?? title ?? 'Project image'} // Use hero alt or title as fallback
                            // Use 'fill' if using Next.js Image or adjust CSS for background image
                            // fill // Uncomment if using Next.js <Image>
                            // For standard img, use width/height and object-fit
                            width={800} // Example width, adjust as needed
                            height={600} // Example height, adjust as needed
                            className='h-full w-full object-cover transition-transform duration-500 ease-out'
                            style={{
                                transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
                            }}
                        />
                    ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700'>
                            <span className='text-gray-500'>No Image</span>
                        </div>
                    )}

                    {/* Icon badges overlay on image */}
                    <div className='absolute left-0 top-0 flex w-full flex-wrap p-3'>
                        {/* Product Badge (show first product) */}
                        {primaryProduct && (
                            <IconBadge
                                icon={getIcon(productIcons, primaryProduct)}
                                label={primaryProduct}
                                showLabel={false}
                                variant='outline'
                            />
                        )}

                        {/* Platform Badges */}
                        {platforms.map((item) => {
                            const platform = getItemString(item);
                            return (
                                <IconBadge
                                    key={platform}
                                    icon={getIcon(platformIcons, platform)} // Use getIcon helper
                                    label={platform}
                                    showLabel={false}
                                    variant='outline'
                                />
                            );
                        })}

                        {/* Framework Badges */}
                        {frameworks.map((item) => {
                            const framework = getItemString(item);
                            return (
                                <IconBadge
                                    key={framework}
                                    icon={getIcon(frameworkIcons, framework)} // Use getIcon helper
                                    label={framework}
                                    showLabel={false}
                                    variant='outline'
                                />
                            );
                        })}
                    </div>

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60' />

                    {/* Expanded View (Tabs) */}
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
                                    {/* Conditionally render tabs if data exists */}
                                    {platforms.length > 0 && (
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
                                    )}
                                    {(products.length > 0 || frameworks.length > 0) && (
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
                                    )}
                                    {tags.length > 0 && (
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
                                    )}
                                </div>

                                {/* Tab Content */}
                                <div className='flex-grow overflow-y-auto p-4 text-white'>
                                    {/* Overview Tab */}
                                    {activeTab === 'overview' && (
                                        <div>
                                            <div className='mb-2 flex items-center justify-between'>
                                                <h3 className='text-xs font-medium text-gray-300'>Summary</h3>
                                                {/* Format date if needed */}
                                                <span className='text-xs text-gray-400'>{date}</span>
                                            </div>
                                            <p className='text-xs leading-relaxed text-gray-100'>{summary}</p>
                                        </div>
                                    )}

                                    {/* Where Tab */}
                                    {activeTab === 'where' && platforms.length > 0 && (
                                        <div>
                                            <h3 className='mb-2 text-xs font-medium text-gray-300'>Platforms</h3>
                                            <div className='flex flex-wrap'>
                                                {platforms.map((item) => {
                                                    const platform = getItemString(item); // Get string value
                                                    return (
                                                        <IconBadge
                                                            key={platform} // Use string as key
                                                            icon={getIcon(platformIcons, platform)}
                                                            label={platform} // Use string as label
                                                            showLabel={true}
                                                            variant='outline'
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* How Tab */}
                                    {activeTab === 'how' && (products.length > 0 || frameworks.length > 0) && (
                                        <div>
                                            {products.length > 0 && (
                                                <div className='mb-3'>
                                                    <h3 className='mb-2 text-xs font-medium text-gray-300'>
                                                        Service Type
                                                    </h3>
                                                    <div className='flex flex-wrap'>
                                                        {/* Show all products or just the primary one? Showing all here */}
                                                        {products.map((item) => {
                                                            const product = getItemString(item); // Get string value
                                                            return (
                                                                <IconBadge
                                                                    key={product} // Use string as key
                                                                    icon={getIcon(productIcons, product)}
                                                                    label={product} // Use string as label
                                                                    showLabel={true}
                                                                    variant='outline'
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {frameworks.length > 0 && (
                                                <div>
                                                    <h3 className='mb-2 text-xs font-medium text-gray-300'>
                                                        Frameworks
                                                    </h3>
                                                    <div className='flex flex-wrap'>
                                                        {frameworks.map((item) => {
                                                            const framework = getItemString(item); // Get string value
                                                            return (
                                                                <IconBadge
                                                                    key={framework} // Use string as key
                                                                    icon={getIcon(frameworkIcons, framework)} // Use getIcon helper
                                                                    label={framework} // Use string as label
                                                                    showLabel={true}
                                                                    variant='outline'
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Details Tab */}
                                    {activeTab === 'details' && tags.length > 0 && (
                                        <div>
                                            <h3 className='mb-2 text-xs font-medium text-gray-300'>Tags</h3>
                                            <div className='flex flex-wrap'>
                                                {tags.map((item) => {
                                                    const tag = getItemString(item); // Get string value
                                                    return (
                                                        <Badge
                                                            key={tag} // Use string as key
                                                            variant='outline'
                                                            className='mb-1 mr-1 border-white/30 capitalize text-white' // Added capitalize
                                                        >
                                                            {tag} {/* Render string */}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content Section */}
                <div className='relative flex h-[80px] flex-grow items-center bg-white p-4 dark:bg-gray-800'>
                    <div className='flex-grow pr-10'>
                        {' '}
                        {/* Added padding-right to prevent overlap with button */}
                        <h2 className='truncate text-lg font-bold leading-tight text-gray-900 dark:text-white'>
                            {title}
                        </h2>
                        <p className='truncate text-sm text-gray-600 dark:text-gray-300'>{subtitle}</p>
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={handleToggle}
                        className={cn(
                            'absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600', // Added hover states and z-index
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