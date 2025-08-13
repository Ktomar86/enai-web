import React from 'react'

interface MonolineIconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number
  strokeWidth?: number
}

const MonolineIcon: React.FC<MonolineIconProps> = ({ size = 20, strokeWidth = 1.5, children, ...rest }) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="monoline-icon"
      {...rest}
    >
      {children}
    </svg>
  )
}

export default MonolineIcon


