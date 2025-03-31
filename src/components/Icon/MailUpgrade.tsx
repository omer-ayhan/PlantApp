import Svg, {
  Path,
  G,
  Rect,
  Stop,
  LinearGradient,
  Defs,
  type SvgProps,
} from 'react-native-svg';

const MailUpgrade = (props: SvgProps) => {
  return (
    <Svg width="52" height="45" fill="none" viewBox="0 0 52 45" {...props}>
      <G filter="url(#a)">
        <Path
          fill="url(#b)"
          d="M28.674 23.355a4.81 4.81 0 0 1-5.348 0l-13.113-8.742a5 5 0 0 1-.213-.151v14.325a2.945 2.945 0 0 0 2.946 2.945h26.108A2.945 2.945 0 0 0 42 28.787V14.462q-.104.078-.214.151z"
        />
        <Path
          fill="url(#c)"
          d="m11.253 13.053 13.113 8.742a2.94 2.94 0 0 0 3.268 0l13.113-8.742A2.8 2.8 0 0 0 42 10.71a2.95 2.95 0 0 0-2.945-2.944h-26.11A2.95 2.95 0 0 0 10 10.712c0 .943.469 1.818 1.253 2.34"
        />
      </G>
      <G filter="url(#d)">
        <Rect
          width="15"
          height="15"
          x="31"
          y="2"
          fill="#E82C13"
          fillOpacity=".9"
          rx="7.5"
        />
        <Path
          fill="#fff"
          d="M38.67 12.341h.984V6h-.984L37 7.187v.966l1.595-1.138h.075z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="b"
          x1="26"
          x2="41.809"
          y1="14.462"
          y2="37.551"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F0D399" />
          <Stop offset="1" stopColor="#D9A846" />
        </LinearGradient>
        <LinearGradient
          id="c"
          x1="26"
          x2="38.334"
          y1="7.766"
          y2="29.186"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F0D399" />
          <Stop offset="1" stopColor="#D9A846" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default MailUpgrade;
