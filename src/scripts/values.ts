export enum BIO {
    DEFAULT = 'Pick the tag',
    NEW = 'Or add new +',
    PER = 'PER',
    LOC = 'LOC',
    ORG = 'ORG'
}

export interface Markup {
    text: string
    spans: Span[]
}

export interface Span {
    start: number
    stop: number
    type: string
}

export const defaults = {
    span: {start: 0, stop: 0, type: ''},
    markup: {
        text: `Apart from adding styles inside style tags, you can also add styles to individual elements using the style attribute. Usually you will want to do styling through CSS, but this can come in handy for dynamic styles, especially when combined with CSS custom properties.

        Add the following style attribute to the paragraph element: style="color: {color}; --opacity: {bgOpacity};"
        
        Great, now you can style the paragraph using variables that change based on your input without having to make a class for every possible value.fddsdfsd sdfsdfsdfh sdkljfh sl`, 
        spans: []
    }
}

