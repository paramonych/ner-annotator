<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { BIO } from "./values"
  
  
  export let options = []
  export let selectedTag
  export let colors
  
  let dispatch = createEventDispatcher()
  
  $: {

    dispatch('tagChanged', selectedTag)
  }
</script>

<div class="tags-manager">
  <select bind:value={selectedTag} style='background-color: {colors[options.indexOf(selectedTag)]};'>
    {#each options as option, index}
      <option value={option} disabled={option == BIO.DEFAULT} selected={option == BIO.DEFAULT} style='background-color: {colors[index]};'>
        {option}
      </option>
    {/each}
  </select>
</div>
  

