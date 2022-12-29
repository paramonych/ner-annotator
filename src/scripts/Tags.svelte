<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { BIO } from "./enums"
  
  let value = BIO.DEFAULT
  export let options = []
  let dispatch = createEventDispatcher()
  
  $: {
    console.log(value)
    dispatch('tagChanged', value)
  }
</script>

<div class="tags-manager">
  <select bind:value={value}>
    {#each options as option}
      <option value={option} disabled={option == BIO.DEFAULT} selected={option == BIO.DEFAULT}>{option}</option>
    {/each}
  </select>
</div>
  

