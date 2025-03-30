import { CarouselImagesLogin, CarouselTextLogin } from "@/components/carousel";
import { TabLogin } from "@/components/tab login";
import { Logos } from "@/ui/Logos";
import Image from "next/image";
import cattleBackgroundLogin from "public/cattleBackgroundLogin.png";

export default function Page() {
  return (
    <>
      <div className="flex flex-col sm:flex-row max-w-5xl h-screen sm:h-[95vh] sm:mx-auto sm:mt-[2.5vh]">
        {/* imagen android */}
        <div className="sm:hidden">
          <Image
            style={{
              filter: "drop-shadow(0 0 20px rgba(0, 0, 0, .5))",
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
            }}
            className="absolute h-[270px]"
            alt="cattle login"
            src={cattleBackgroundLogin}
          />
        </div>
        {/*seccion izquierda formularios */}
        <div className="flex size-full z-10 pt-16 flex-col justify-center items-center rounded-lg gap-4  sm:bg-base-100 sm:p-4 sm:w-2/4 sm:h-[500px] sm:max-h-[100%]">
          <Logos small={false} />

          <TabLogin />
        </div>

        {/* seccion derecha */}
        <div className="hidden sm:flex  bg-backgroundLogin w-2/4 flex-col justify-center items-center gap-12">
          {/* mockup */}
          <div className="w-full flex flex-col items-center px-8">
            {/* display mockup */}
            <div className="w-11/12 ">
              {" "}
              <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[132px] max-w-[238px] md:h-[140px] md:max-w-[267px]">
                <div className="rounded-lg overflow-hidden h-[132px] md:h-[140px] bg-white dark:bg-gray-800">
                  <CarouselImagesLogin />
                </div>
              </div>
            </div>
            {/* keyboard mockup */}
            <div className="w-full">
              <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[250px] md:h-[16px] md:max-w-[310px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
              </div>
            </div>
          </div>
          <div className="px-4 w-full ">
            <CarouselTextLogin />
          </div>
        </div>
      </div>
    </>
  );
}
