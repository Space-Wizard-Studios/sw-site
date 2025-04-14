import { useRef } from 'react';
import { RocketCard } from '@common/ProductCard/RocketCard';
import { ProductsProvider, useProductsContext } from '@common/ProductCard/RocketCard/ProductsContext';
import { RocketToggle } from '@common/ProductCard/RocketCard/FlyingToggle/RocketToggle';
import { cn } from '@helpers/cn';

interface Props {
    className?: string;
}

export function ProductsContent({ className }: Props) {
    const { containerRef } = useProductsContext();

    const productData = [
        {
            index: 0,
            title: 'Jogos e Gamificação',
            subtitle: 'Magia e entretenimento em experiências jogáveis.',
            description: (
                <>
                    Criar jogos é dar forma a ideias por meio de sistemas, mundos e interações.
                    <br />
                    <br />
                    Desenvolvemos experiências únicas com foco em narrativa, jogabilidade e design funcional.
                    {/* <ul>
                        <li>Desenvolvimento em C# (Godot);</li>
                        <li>Prototipagem rápida e validação;</li>
                        <li>Game design e balanceamento;</li>
                        <li>Organização de projetos colaborativos.</li>
                    </ul> */}
                </>
            ),
        },
        {
            index: 1,
            title: 'Sistemas Web acessíveis e responsivos',
            subtitle: 'Sites, páginas e plataformas que engajam de verdade.',
            description: (
                <>
                    Unimos web e game design para transformar sites em experiências vivas.
                    <br />
                    <br />
                    Incorporamos elementos 3D, interações jogáveis e sistemas de progressão para dar vida ao conteúdo.
                    {/* <ul>
                        <li>Sites institucionais e interativos;</li>
                        <li>Aplicações com gamificação;</li>
                        <li>Integração com APIs e back-ends;</li>
                        <li>Animações e navegação personalizada.</li>
                    </ul> */}
                </>
            ),
        },
        {
            index: 2,
            title: 'Apps e soluções interativas',
            subtitle: 'Aplicações que encantam pela experiência.',
            description: (
                <>
                    Desenvolvemos apps com foco em UX, imersão e fluidez.
                    <br />
                    <br />
                    Seja para fins educativos, culturais ou promocionais, criamos experiências envolventes que conectam
                    pessoas e ideias.
                    {/* <ul>
                        <li>Apps multiplataforma;</li>
                        <li>Protótipos navegáveis;</li>
                        <li>Interfaces intuitivas e acessíveis;</li>
                        <li>Mecânicas lúdicas e interativas.</li>
                    </ul> */}
                </>
            ),
        },
        {
            index: 3,
            title: 'Sonoplastia, áudio e música',
            subtitle: 'Imersão sonora sob medida para o seu projeto.',
            description: (
                <>
                    Cuidamos de cada etapa da produção sonora - da composição à finalização.
                    <br />
                    <br />
                    Criamos trilhas e ambientações que ampliam o impacto emocional e narrativo dos projetos.
                    {/* <ul>
                        <li>Trilha sonora original;</li>
                        <li>Efeitos sonoros e ambiências;</li>
                        <li>Mixagem e masterização;</li>
                        <li>Áudio adaptado para jogos e vídeos.</li>
                    </ul> */}
                </>
            ),
        },
    ];

    return (
        <>
            <section
                id='products-container'
                ref={containerRef}
                className={cn(
                    'relative grid grid-cols-1 content-around gap-8 bg-red-500/50 md:grid-cols-2 lg:grid-cols-4',
                    className,
                )}
            >
                {productData.map((product) => (
                    <RocketCard
                        key={product.index}
                        index={product.index}
                        title={product.title}
                        subtitle={product.subtitle}
                        description={product.description}
                    />
                ))}
                <RocketToggle />
            </section>
        </>
    );
}

export function Products({ className }: Props) {
    return (
        <ProductsProvider>
            <ProductsContent className={className} />
        </ProductsProvider>
    );
}
