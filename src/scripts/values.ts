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
    markup: {text: '', spans: []}
}