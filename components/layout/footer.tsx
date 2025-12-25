"use client"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white">

      <div className="relative">
        {/* Bottom Bar */}
        <div
          className=" backdrop-blur-sm"
        >
          <div className="px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between space-y-4">
              <div className="flex items-center text-lg">
                © Copyrght 2025 
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}
