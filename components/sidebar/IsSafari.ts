const IS_SAFARI =
    typeof navigator !== 'undefined' &&
    ((/Safari/.test(navigator.userAgent) &&
        /Apple Computer/.test(navigator.vendor)) ||
        ((!!navigator.userAgent.match(/iPad/i) ||
            !!navigator.userAgent.match(/iPhone/i)) &&
            !!navigator.userAgent.match(/WebKit/i) &&
            !navigator.userAgent.match(/CriOS/i)))

export default IS_SAFARI
