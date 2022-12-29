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