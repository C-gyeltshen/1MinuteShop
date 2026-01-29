export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              Discover Your Next
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Favorite Product
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-8">
              Curated collection of premium products handpicked for quality and
              style.
            </p>
            <button className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
              Shop Now →
            </button>
          </div>
          <div className="hidden md:block">
            <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center text-5xl lg:text-6xl">
              📦
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}