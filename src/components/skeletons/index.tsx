import LineChart from '@/svg/lineChart.svg';

export const SkeletonDoughnutChart = () => {
    return (
        <div className="flex gap-4 items-center">
            <div className="skeleton size-56 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-4 w-16"></div>
            </div>
        </div>
    );
};
export const SkeletonBarChart = () => {
    return (
        <div className="flex flex-col gap-4 w-full h-full justify-between">
            <div>
                <div className="skeleton h-1 w-16"></div>
            </div>

            <div className="flex gap-4 items-end justify-between">
                <div className="skeleton h-8 w-4"></div>
                <div className="skeleton h-14 w-4"></div>
                <div className="skeleton h-16 w-4"></div>
                <div className="skeleton h-8 w-4"></div>
                <div className="skeleton h-12 w-4"></div>
               
            </div>
        </div>
    );
};

export const SkeletonCard = () => {
    return (
        <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col md:w-full lg:w-full">
            <div className="skeleton h-2 w-20"></div>
            <div className="skeleton h-2 w-14"></div>
        </div>
    );
};
export const SkeletonTable = () => {
    let cantidadFilas = [0, 1, 2];

    return (
        <div className="w-full p-4 gap-8 bg-base-100 rounded-large shadow-small flex flex-col justify-center">
            <div className="skeleton h-8 w-11/12 rounded-lg bg-base-200 flex gap-4 justify-around items-center">
                <div className="skeleton h-2 w-20"></div>
                <div className="skeleton h-2 w-20"></div>
                <div className="skeleton h-2 w-20"></div>
                <div className="skeleton h-2 w-20"></div>
                <div className="skeleton h-2 w-20"></div>
            </div>
            <div className="flex flex-col gap-12 w-11/12">
                {cantidadFilas.map((index) => {
                    return (
                        <div className="flex justify-around gap-4">
                            <div className="skeleton h-2 w-20"></div>
                            <div className="skeleton h-2 w-20"></div>
                            <div className="skeleton h-2 w-20"></div>
                            <div className="skeleton h-2 w-20"></div>
                            <div className="skeleton h-2 w-20"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const SkeletonLineChart = () => {
    return (
        <div className="flex flex-col gap-8 w-full h-full ">
            <div>
                <div className="skeleton h-2 w-2/6"></div>
            </div>

            <LineChart
                className={
                    'w-full border-b-1 border-l-1 text-base-300 skeleton bg-transparent rounded-none'
                }
            />
        </div>
    );
};
