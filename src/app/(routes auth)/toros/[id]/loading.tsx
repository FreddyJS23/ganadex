export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
      {/* titulo */}
      <div className="skeleton h-4 w-80"></div>
      <div className="flex flex-col gap-5 md:flex-row items-center ">
        <div className="">
          {/*  imagen */}

          <div className="skeleton size-64"></div>
        </div>

        {/*  detalles */}
        <div className="flex">
          <div className=" flex  flex-wrap gap-4 bg-base-100 justify-between md:gap-y-4 p-4 shadow-[0px_0px_6px_-3px] shadow-primary rounded-md border-primary lg:justify-items-center ">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-between">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center gap-4 divide-y divide-primary/[.20]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="skeleton size-8  rounded-full"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="skeleton size-8  rounded-full"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="skeleton size-8  rounded-full"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="skeleton size-8  rounded-full"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-24 w-full"></div>
      </div>
    </div>
  );
}
