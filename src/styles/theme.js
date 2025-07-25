import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1',
    onPrimary: '#ffffff',
    primaryContainer: '#e0e7ff',
    onPrimaryContainer: '#1e1b4b',
    secondary: '#06b6d4',
    onSecondary: '#ffffff',
    secondaryContainer: '#cffafe',
    onSecondaryContainer: '#164e63',
    tertiary: '#f59e0b',
    onTertiary: '#ffffff',
    tertiaryContainer: '#fef3c7',
    onTertiaryContainer: '#92400e',
    error: '#ef4444',
    onError: '#ffffff',
    errorContainer: '#fecaca',
    onErrorContainer: '#991b1b',
    background: '#fafafa',
    onBackground: '#1f2937',
    surface: '#ffffff',
    onSurface: '#374151',
    surfaceVariant: '#f3f4f6',
    onSurfaceVariant: '#6b7280',
    outline: '#d1d5db',
    outlineVariant: '#e5e7eb',
    success: '#10b981',
    onSuccess: '#ffffff',
    warning: '#f59e0b',
    onWarning: '#ffffff',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400',
    },
    titleLarge: {
      fontSize: 22,
      fontWeight: '600',
    },
    titleMedium: {
      fontSize: 18,
      fontWeight: '500',
    },
    headlineLarge: {
      fontSize: 32,
      fontWeight: '700',
    },
  },
  roundness: 12,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 20,
  },
};