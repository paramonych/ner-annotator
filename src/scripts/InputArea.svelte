<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { onSelect } from "./utils"
  
  export let tag 
  export let value

  let dispatch = createEventDispatcher()
  
  $: {
    dispatch('textChanged', value)
  }

</script>


<textarea id="input-text" bind:value on:select={onSelect} spellcheck="false"></textarea>
  

