import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowLeftIcon = ({ color = "#190E26", ...props }: SvgProps) => (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    color={color}
    {...props}
  >
    {/* <Path d="M4.13045 10.2257L16.6305 10.2257" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /> */}
    <Path
      d="M9.17237 15.2461C9.17237 15.2461 4.1307 12.5286 4.1307 10.2269C4.1307 7.92359 9.17237 5.20526 9.17237 5.20526"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowLeftIcon;
