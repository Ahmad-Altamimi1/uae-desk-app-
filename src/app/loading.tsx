import React from "react";

const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 z-50">
      {/* Decorative elements */}
      <div className="absolute top-10 left-20 w-24 h-24 border-2 border-green-100 rounded-full opacity-30" />
      <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-green-100 rounded-full opacity-30" />
      <div className="absolute top-1/4 right-1/4 text-yellow-300 text-2xl opacity-40">
        +
      </div>
      <div className="absolute bottom-1/3 left-1/3 text-yellow-300 text-2xl opacity-40">
        +
      </div>
      <div className="absolute top-20 right-1/3 text-yellow-300 text-2xl opacity-40">
        +
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-8 relative">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="relative h-24 w-64 mb-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold">
                  <span className="text-green-500">H</span>
                  <span className="text-green-500">L</span>
                  <span className="text-green-500">A</span>
                </div>
              </div>
            </div>

            {/* Company name */}
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">HOLISTIC</h1>
              <h1 className="text-2xl font-bold tracking-tight">LEGACY</h1>
              <h1 className="text-2xl font-bold tracking-tight">ACCOUNTING</h1>
            </div>

            {/* Tagline */}
            <div className="mt-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
              AUDIT - TAX - ASSURANCE
            </div>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="mt-8">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
