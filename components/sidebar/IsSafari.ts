const IS_SAFARI =
    typeof navigator !== 'undefined' &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor)

export default IS_SAFARI
