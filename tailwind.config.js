const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            transitionTimingFunction: {
                'my-favorite': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            },
            spacing: {
                4.5: '1.125rem',
                5.5: '1.375rem',
                6.5: '1.625rem',
                7.5: '1.875rem',
                8.5: '2.125rem',
                9.5: '2.375rem',
            },
            fontFamily: {
                sans: ['var(--josie-font)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                pink: '#FE65B7',
                blue: '#446DF6',
                orange: '#FBB02D',
                yellow: '#FFFF4C',
                green: '#ACECA1',
                purple: '#AB87FF',
                lightest: '#FFFFFF',
                light: '#EFEFEF',
                medium: '#CFCFCF',
                dark: '#8F8F8F',
                darkest: '#333333',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
