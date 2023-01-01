<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { BIO } from "./enums"
  
  
  export let options = []
  export let selectedTag

  let dispatch = createEventDispatcher()
  
  $: {
    dispatch('tagChanged', selectedTag)
  }
</script>

<div class="tags-manager">
  <select bind:value={selectedTag}>
    {#each options as option}
      <option value={option} disabled={option == BIO.DEFAULT} selected={option == BIO.DEFAULT}>{option}</option>
    {/each}
  </select>
</div>
  

