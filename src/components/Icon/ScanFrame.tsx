import Svg, {
  Path,
  G,
  Stop,
  LinearGradient,
  Defs,
  type SvgProps,
} from 'react-native-svg';

const ScanFrame = (props: SvgProps) => {
  return (
    <Svg width="324" height="325" fill="none" viewBox="0 0 324 325" {...props}>
      <G filter="url(#a)">
        <Path
          stroke="#51FF4C"
          d="M101.914 49H84.449C67.429 49 53.63 62.798 53.63 79.818v17.573"
          strokeLinecap="round"
          strokeWidth="4.28"
        />
      </G>
      <G filter="url(#b)">
        <Path
          stroke="#51FF4C"
          d="M270.901 97.391V79.818c0-17.02-13.798-30.818-30.818-30.818h-17.465"
          strokeLinecap="round"
          strokeWidth="4.28"
        />
      </G>
      <G filter="url(#c)">
        <Path
          stroke="#51FF4C"
          d="M222.211 267.999h17.466c17.02 0 30.818-13.798 30.818-30.818v-17.573"
          strokeLinecap="round"
          strokeWidth="4.28"
        />
      </G>
      <G filter="url(#d)">
        <Path
          stroke="#51FF4C"
          d="m52.956 219.614.24 17.571c.231 17.019 14.216 30.626 31.235 30.394l17.463-.239"
          strokeLinecap="round"
          strokeWidth="4.28"
        />
      </G>
      <Path
        fill="url(#e)"
        d="M55 80c0-16.568 13.431-30 30-30h154c16.568 0 30 13.432 30 30v118H55z"
      />
      <Defs>
        <LinearGradient
          id="e"
          x1="162"
          x2="162"
          y1="50"
          y2="198"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#51FF4C" stopOpacity=".5" />
          <Stop offset="1" stopColor="#51FF4C" stopOpacity="0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default ScanFrame;
