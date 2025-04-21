type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX | 'currentColor';

export type IconProps = {
    color?: Color;
    [x: string]: any;
};
