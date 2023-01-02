<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { getSelection } from "./utils"
  
  export let tag 
  export let value

  let dispatch = createEventDispatcher()
  
  $: {
    dispatch('textChanged', value)
  }

  function selectionChanged(_) {
    dispatch('selectionChanged', {start: _.target.selectionStart, stop: _.target.selectionEnd, target: _.target})
  }
</script>


<textarea id="input-text" bind:value on:select={selectionChanged} spellcheck="false"></textarea>
  

