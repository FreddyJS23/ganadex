import LineChart from "@/svg/lineChart.svg";

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
export const SkeletonBarChart = ({
  cantidadBars,
}: {
  cantidadBars: number;
}) => {
  const longitudesBar = ["h-1/6", "h-2/6", "h-3/6", "h-4/6", "h-5/6"];
  const totalBars = [];

  for (let bar = 0; bar < cantidadBars; bar++) {
    totalBars.push(1);
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between ">
      <div>
        <div className="skeleton h-['5px'] w-2/6"></div>
      </div>

      <div className="flex gap-4 h-full items-end justify-between border-b-1 border-l-1 border-base-300 p-4">
        {totalBars.map((index) => (
          <div
            key={index}
            className={`skeleton ${longitudesBar[Math.floor(Math.random() * 5)]} w-4`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="w-40 p-2 gap-2 bg-base-100 shadow-cards flex flex-col">
      <div className="skeleton h-2 w-20"></div>
      <div className="skeleton h-2 w-14"></div>
    </div>
  );
};
export const SkeletonTable = () => {
  const cantidadFilas = [0, 1, 2];

  return (
    <div className="w-full gap-8 bg-base-100 rounded-large shadow-small flex flex-col justify-center">
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
            <div key={index} className="flex justify-around gap-4">
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
          "w-full border-b-1 border-l-1 text-base-300 border-base-300 skeleton bg-transparent rounded-none"
        }
      />
    </div>
  );
};

export const SkeletonModal = () => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" checked />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex flex-col gap-4 mb-12">
            <div className="skeleton size-8 rounded-full shrink-0"></div>
            <div className="skeleton h-2 w-2/6"></div>
          </div>

          <div className="flex flex-col gap-12 w-2/4 m-auto mb-12 ">
            <div className="skeleton h-2 w-full"></div>
            <div className="skeleton h-2 w-full"></div>
            <div className="skeleton h-2 w-full"></div>
          </div>

          <div className="flex justify-between w-full gap-6">
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};
