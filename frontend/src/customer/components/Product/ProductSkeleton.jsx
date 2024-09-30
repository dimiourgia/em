export default function Placeholder(){

    return(
    <div className="min-h-80 bg- md:min-h-screen pb-16">
        <div className="container mx-auto">
          
          <div className="bg-gray-100 py-4 text-neutral-800 px-6 font-roboto w-full flex flex-col gap-4 items-center justify-center">
            <div className="h-8 w-1/3 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded"></div>
          </div>
      
          <div className="flex mt-10">
            <div className="px-4 pt-5 bg-white">
              <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
                <div className="py-5">
                </div>
              </div>
            </div>
            <div className="sm:col-span-10 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-48 h-72 bg-gray-300 animate-pulse rounded"></div>
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