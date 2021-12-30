export const sanitize = (string: string) => {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&grave;',
        '/': '&#x2F;',
    };
    const reg = /[&<>"'/`]/gi;
    return string.replace(reg, (match) => map[match]);
};

export const switchFn =
    (lookupObject: any, defaultCase = '_default') =>
    (expression: string) =>
        (lookupObject[expression] || lookupObject[defaultCase])();
