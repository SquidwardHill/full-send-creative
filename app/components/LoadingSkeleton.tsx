export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero section skeleton */}
      <section className="md:p-4 text-left max-w-screen-lg mx-auto bg-center md:mt-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col md:flex-row md:gap-12 md:mb-4 mr-8 md:mr-0 items-center">
            <div className="relative md:w-1/2 p-4 md:p-0">
              <div className="w-full h-96 bg-gray-700 rounded-lg"></div>
              <div className="absolute bottom-0 right-0 md:bottom-[-40px] md:right-[-40px] z-20">
                <div className="w-40 md:w-54 h-40 md:h-54 bg-gray-600 rounded-lg"></div>
              </div>
            </div>
            <div className="px-4 md:px-0 md:w-1/2">
              <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
              <div className="h-12 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies skeleton */}
      <section className="mt-24 text-center max-w-screen-lg mx-auto">
        <div className="flex flex-row items-center gap-8 mb-4">
          <div className="flex">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
          </div>
          <div className="bg-gradient-to-r from-bubblegum-500 to-pink-300 h-0.5 flex-1"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-2">
          {[1, 2].map((i) => (
            <div key={i} className="group relative w-full overflow-hidden">
              <div className="w-full h-64 bg-gray-700 rounded-lg"></div>
              <div className="mt-4 h-6 bg-gray-700 rounded w-3/4 mx-auto"></div>
              <div className="mt-2 h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills skeleton */}
      <section className="mt-24 text-center max-w-screen-lg mx-auto">
        <div className="flex flex-row items-center gap-8 mb-4">
          <div className="flex">
            <div className="h-6 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="bg-gradient-to-r from-bubblegum-500 to-pink-300 h-0.5 flex-1"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-20 h-20 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </section>
    </div>
  );
}
