import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Sijil = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#009FD3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 18.334c4.584 0 8.334-3.75 8.334-8.334 0-4.583-3.75-8.333-8.334-8.333-4.583 0-8.333 3.75-8.333 8.333 0 4.584 3.75 8.334 8.333 8.334ZM6.667 10h6.667M10 13.334V6.667"
    />
  </Svg>
)
export default Sijil
