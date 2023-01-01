<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { BIO } from "./values"
  import { isTooDark } from "./utils"
  
  export let options = []
  export let selectedTag
  export let colors

  let selectedColor = colors[options.indexOf(selectedTag)]
  let dispatch = createEventDispatcher()
  
  $: {
    selectedColor = colors[options.indexOf(selectedTag)]
    dispatch('tagChanged', selectedTag)
  }
</script>

<div class="tags-manager">
  <select bind:value={selectedTag} style='background-color: {selectedColor};' class:too-dark={isTooDark(selectedColor)}>
    {#each options as option, index}
      <option value={option} disabled={option == BIO.DEFAULT} selected={option == BIO.DEFAULT} style='background-color: {colors[index]};' class:too-dark={isTooDark(colors[index])}>
        {option}
      </option>
    {/each}
  </select>
</div>
  

