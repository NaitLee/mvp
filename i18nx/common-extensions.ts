
export const en: Extension = (thing, v) => {
    if (typeof v !== 'object') return undefined;
    if (typeof thing === 'string' && Object.hasOwn(v, 'an'))
        return 'aeiou'.includes(thing.toLowerCase()[0]) ? 'an' : 'a';
    else if (typeof thing === 'number' && Object.hasOwn(v, '1st'))
        return (thing > 10 && thing < 20) || (thing < -10 && thing > -20) || thing % 10 > 4
            ? '4th'
            : [, '1st', '2nd', '3rd'][thing % 10];
}