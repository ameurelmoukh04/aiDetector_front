import React from 'react'

const Split = () => {
  return (
    <div className="flex h-screen">
  <div className="w-1/4 bg-gray-100 p-4">
    {/* Left side */}
    <h2 className="text-xl font-semibold">Left Panel</h2>
  </div>

  <div className="w-3/4 bg-white p-4">
    {/* Right side */}
    <h2 className="text-xl font-semibold">Right Panel</h2>
  </div>
</div>
  )
}

export default Split