import {
  createTheme,
  MantineThemeOverride,
  mergeMantineTheme,
  DEFAULT_THEME
} from '@mantine/core';
import { themeColors } from '@/theme/colors.ts';

export const themeOverride: MantineThemeOverride = createTheme({
  colors: themeColors,
  primaryColor: 'primary'
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
