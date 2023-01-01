export function onSelect() {
    let selection

    if (window.getSelection) {
        selection = window.getSelection()?.toString()
    } else if (document.getSelection) {
        selection = document.getSelection()?.toString()
    } else if ((document as any).selection && (document as any).selection.type != "Control") {
        selection = (document as any).selection.createRange().text
    }

    console.log(selection)
}

export function randomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`
}