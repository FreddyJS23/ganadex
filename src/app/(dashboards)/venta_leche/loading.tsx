import {
    SkeletonBarChart,
    SkeletonCard,
    SkeletonLineChart,
    SkeletonTable,
} from '@/components/skeletons';

export default function Loading() {
    return (
        <div className="flex p-4  gap-8 flex-col sm:pl-12">
            {/* cards */}
            <div className="flex">
                <SkeletonCard />
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
                {/*   grafico ganancia */}
                <article className="w-full shadow-cards p-4 flex flex-col bg-base-100">
                    <SkeletonLineChart />
                </article>

                {/* tabla ventas */}
                <div className="flex flex-col gap-2">
                    <SkeletonTable />
                </div>
            </div>
        </div>
    );
}
