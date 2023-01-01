<script lang="ts">
  import { onSelect } from "./utils"
  
  export let tag 

  export let markup

  let value = ''

  $: {
    markup = {...markup, text: value}
  }

</script>


<textarea id="input-text" bind:value on:select={onSelect} spellcheck="false"></textarea>
  

