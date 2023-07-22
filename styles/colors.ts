type Primary = 'light' | 'main' | 'dark';
export const Primary: Record<Primary, string> = {
  light: '#1C65ED',
  main: '#349EFB',
  dark: '#3A4CA8',
};

type Brand = 'facebook' | 'naver' | 'kakao' | 'apple' | 'google';
export const brand: Record<Brand, string> = {
  facebook: '#3b5998',
  naver: '#1fc600',
  kakao: '#fae100',
  apple: '#000000',
  google: '#dc4e41',
};

type Black = 's100' | 's200';
export const black: Record<Black, string> = {
  s100: '#303030',
  s200: '#000000',
};

type White = 's100' | 's200' | 's300';
export const white: Record<White, string> = {
  s100: '#ffffff',
  s200: '#fafafa',
  s300: '#f3f3f3',
};

type Gray = 's100' | 's200' | 's300' | 's400' | 's500';
export const gray: Record<Gray, string> = {
  s100: '#eeeeee',
  s200: '#cccccc',
  s300: '#aaaaaa',
  s400: '#888888',
  s500: '#666666',
};

type Blue = 's100' | 's200' | 's300' | 's400';
export const blue: Record<Blue, string> = {
  s100: '#40a6ff',
  s200: '#1a8bff',
  s300: '#2980b9',
  s400: '#3A4CA8',
};
