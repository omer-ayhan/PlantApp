import React from 'react';

import IcoMoon, {IconProps as NativeIconProps} from 'react-icomoon';
import {Svg, Path} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import iconSet from './icons.json';

type IconProps = Omit<NativeIconProps, 'icon'> & {
  name: IconNames;
  color?: string;
  size?: number;
};

const Icon = ({name, size = scale(24), ...props}: IconProps) => (
  <IcoMoon
    native
    SvgComponent={Svg}
    PathComponent={Path}
    iconSet={iconSet}
    icon={name}
    size={size}
    {...props}
  />
);

export default Icon;
