import {
  SkeletonBarChart,
  SkeletonCard,
  SkeletonDoughnutChart,
  SkeletonLineChart,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center max-w-5xl m-auto sm:grid grid-cols-4 sm:gap-4 sm:gap-y-12 sm:p-4 sm:pl-8 md:items-center xl:pl-0">
      {/*  grafico torta */}
      <div className="p-4 bg-base-100 col-span-full max-w-xl md:col-span-2 lex justify-center flex-col  w-full shadow-cards">
        <SkeletonDoughnutChart />
      </div>
      {/* cards  */}
      <div className="col-span-full flex flex-wrap gap-8 w-full p-4  justify-center  sm:justify-around md:col-start-3 md:grid md:grid-cols-2 md:p-0 md:gap-4 md:justify-normal ">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="col-span-full flex flex-col justify-around sm:flex-row">
        {/*    grafico vacas productoras */}
        <div className="h-56 w-72   p-4 flex flex-col gap-2  bg-base-100 max-w-72 shadow-cards">
          <SkeletonBarChart cantidadBars={3} />
        </div>

        {/*    grafico vacas menos productoras */}
        <div className="h-56 w-72  p-4 flex flex-col gap-2  bg-base-100 max-w-72  shadow-cards">
          <SkeletonBarChart cantidadBars={3} />
        </div>

        {/* grafico insumos */}
        <div className="p-4 h-60 w-80  flex flex-col bg-base-100 shadow-cards">
          <SkeletonBarChart cantidadBars={2} />
        </div>
      </div>
      {/* grafico produccion anual leche */}
      <div className="p-4 col-span-full shadow-cards flex flex-col gap-2 bg-base-100 ">
        <SkeletonLineChart />
      </div>
    </div>
  );
}
