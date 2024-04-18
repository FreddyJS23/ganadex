import {
    SkeletonBarChart,
    SkeletonCard,
    SkeletonTable,
} from '@/components/skeletons';

export default function Loading() {
    return (
        <section className="flex p-4  gap-8 flex-col sm:pl-12">
            {/* cards */}
            <article className="flex justify-around flex-wrap gap-4 items-center">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </article>

            {/*   grafico venta */}
            <article className="w-full h-44 md:h-52 xl:h-64 shadow-cards bg-base-100 p-4 flex flex-col gap-4">
                <SkeletonBarChart cantidadBars={12} />
            </article>

            {/* tabla ventas */}
            <article className="flex flex-col gap-2">
                <SkeletonTable />
            </article>
        </section>
    );
}
