import '@babel/polyfill'
import App from './App.svelte'

new App({
  target: document.getElementById('app')!
})