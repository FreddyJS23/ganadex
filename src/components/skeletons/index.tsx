

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
