export function getSelection() {
    let selection

    if (window.getSelection) {
        selection = window.getSelection()?.toString()
    } else if (document.getSelection) {
        selection = document.getSelection()?.toString()
    } else if ((document as any).selection && (document as any).selection.type != "Control") {
        selection = (document as any).selection.createRange().text
    }

    return selection
}

export function randomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`
}

export function isTooDark(hexcolor) {
    let r = parseInt(hexcolor.substr(1,2),16);
    let g = parseInt(hexcolor.substr(3,2),16);
    let b = parseInt(hexcolor.substr(5,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    
    return (yiq < 70);
}