import '@babel/polyfill'
import App from './App.svelte'

new App({
  target: document.getElementById('app')!
})

// window.onload = () => {
//     let input = document.getElementById('input-text')
//     input?.addEventListener("select", onSelect)
// }

// export function onSelect(e: any) {
//     let selection

//     if (window.getSelection) {
//         selection = window.getSelection()?.toString()
//     } else if (document.getSelection) {
//         selection = document.getSelection()?.toString()
//     } else if ((document as any).selection && (document as any).selection.type != "Control") {
//         selection = (document as any).selection.createRange().text
//     }

//     console.log(selection)
// }
