import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';


const HEIGHT = 60;
const WIDTH = 60;
export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }) {
  let url;

  if (emblem) {
    url = color === 'light' ? '/assets/logo-emblem.svg' : '/assets/logo-emblem--dark.svg';
  } else {
    url = color === 'light' ? '/assets/logo.svg' : '/assets/logo--dark.svg';
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <Logo color={color} height={height} width={width} {...props} />
  );
}
