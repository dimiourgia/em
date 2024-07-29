export default function Placeholder(){

    return(<div className="min-h-80 bg- md:min-h-screen pb-16">
        <div className="container mx-auto">
          
          <div className="bg-gray-100 py-4 text-neutral-800 px-6 font-roboto w-full flex flex-col gap-4 items-center justify-center">
            <div className="h-8 w-1/3 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded"></div>
          </div>
      
          <div className="flex mt-10">
            <div className="px-4 pt-5 bg-white">
              <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
                <div className="py-5">
                  <details className="group" open>
                    <summary className="font-heading flex justify-between items-center cursor-pointer list-none space-x-4">
                      <span className="h-6 w-16 bg-gray-300 animate-pulse rounded"></span>
                      <span className=" transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shape-rendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="text-neutral-600 group-open:animate-fadeIn">
                      {["S", "M", "L", "XL", "2XL"].map((size) => (
                        <div key={size} className="pt-[20px] flex items-center">
                          <div className="h-4 w-4 bg-gray-300 animate-pulse rounded mr-4"></div>
                          <div className="h-6 w-8 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>
            <div className="sm:col-span-10 w-full">
              <div className="flex flex-wrap rounded-lg items-center w-auto justify-center">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-40 h-60 bg-gray-300 animate-pulse m-2 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full mx-2"></div>
          <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full mx-2"></div>
          <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full mx-2"></div>
        </div>
      </div>
      )
}