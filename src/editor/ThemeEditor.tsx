import React, { useMemo } from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material';

function ThemeEditor({ theme, children }: {
  theme: 'dark' | 'light',
  children: React.ReactNode
}) {
  const isDark = theme === 'dark';
  const value = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ['inherit'].join(','),
          fontSize: 14,
          button: {
            textTransform: 'none',
          },
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderColor: 'var(--line-divider)',
              },
              notchedOutline: {
                borderColor: 'var(--line-divider)',
              },

            },
          },
          MuiMenuItem: {
            defaultProps: {
              sx: {
                '&.Mui-selected.Mui-focusVisible': {
                  backgroundColor: 'var(--fill-list-hover)',
                },
                '&.Mui-focusVisible': {
                  backgroundColor: 'unset',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                '&:disabled, &:disabled svg': {
                  backgroundColor: 'transparent',
                  color: 'var(--text-caption)',
                },
                '&:hover, &:focus': {
                  backgroundColor: 'var(--fill-list-hover)',
                },
                borderRadius: '4px',
                padding: '2px',
                '&.MuiIconButton-colorInherit': {
                  color: 'var(--icon-primary)',
                },
                '&.MuiIconButton-colorPrimary': {
                  color: 'var(--fill-default)',
                },
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              text: {
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'var(--fill-list-hover)',
                },
              },
              contained: {
                color: 'var(--content-on-fill)',
                boxShadow: 'none',
                '&.MuiButton-containedPrimary': {
                  '&:hover': {
                    backgroundColor: 'var(--content-blue-600)',
                  },
                },

                borderRadius: '8px',
                '&.Mui-disabled': {
                  backgroundColor: 'var(--content-blue-400)',
                  opacity: 0.3,
                  color: 'var(--content-on-fill)',
                },
                '&.MuiButton-containedInherit': {
                  color: 'var(--text-title)',
                  backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                  '&:hover': {
                    backgroundColor: 'var(--bg-body)',
                    boxShadow: 'var(--shadow)',
                  },
                },
              },
              outlined: {
                '&.MuiButton-outlinedInherit': {
                  borderColor: 'var(--line-divider)',
                },
                borderRadius: '8px',
              },

            },
          },

          MuiButtonBase: {
            styleOverrides: {
              root: {
                '&:not(.MuiButton-contained)': {
                  '&:hover': {
                    backgroundColor: 'var(--fill-list-hover)',
                  },
                  '&:active': {
                    backgroundColor: 'var(--fill-list-hover)',
                  },
                },
                '&.MuiMenuItem-root': {
                  borderRadius: '8px',
                },

                borderRadius: '4px',
                padding: '2px',
                boxShadow: 'none !important',
              },
            },

          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                boxShadow: 'var(--shadow)',
                borderRadius: '10px',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderRadius: 0,
              },

              paperAnchorBottom: {
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: '12px',
              },
            },
            defaultProps: {
              sx: {
                '& .MuiBackdrop-root': {
                  backgroundColor: 'var(--bg-mask)',
                },
              },
            },
          },

          MuiTooltip: {
            styleOverrides: {
              arrow: {
                color: 'var(--bg-tips)',
              },
              tooltip: {
                backgroundColor: 'var(--bg-tips)',
                color: 'var(--text-title)',
                fontSize: '0.85rem',
                borderRadius: '8px',
                fontWeight: 400,
              },
            },
          },
          MuiInputBase: {
            defaultProps: {
              sx: {
                '&.Mui-disabled, .Mui-disabled': {
                  color: 'var(--text-caption)',
                  WebkitTextFillColor: 'var(--text-caption) !important',
                },
                borderRadius: '8px',
              },
            },
            styleOverrides: {
              input: {
                backgroundColor: 'transparent !important',
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: 'var(--line-divider)',
              },
            },
          },
        },
        palette: {
          mode: isDark ? 'dark' : 'light',
          primary: {
            main: '#00BCF0',
            dark: '#00BCF0',
          },
          error: {
            main: '#FB006D',
            dark: '#D32772',
          },
          warning: {
            main: '#FFC107',
            dark: '#E9B320',
          },
          info: {
            main: '#00BCF0',
            dark: '#2E9DBB',
          },
          success: {
            main: '#66CF80',
            dark: '#3BA856',
          },
          text: {
            primary: isDark ? '#E2E9F2' : '#333333',
            secondary: isDark ? '#7B8A9D' : '#828282',
            disabled: isDark ? '#363D49' : '#F2F2F2',
          },
          divider: isDark ? '#59647A' : '#BDBDBD',
          background: {
            default: isDark ? '#1A202C' : '#FFFFFF',
            paper: isDark ? '#1A202C' : '#FFFFFF',
          },
        },
      }),
    [isDark],
  );
  return (
    <ThemeProvider theme={value}>{children}</ThemeProvider>
  );
}

export default ThemeEditor;