<script lang="ts">
  import { onMount } from 'svelte'
    import { bind } from 'svelte/internal';
    import { BIO } from './enums';
    import InputArea from './InputArea.svelte';
  import Tags from './Tags.svelte'
  import { onSelect } from './utils'

  let time = new Date()
  let hours = 0
  let minutes = 0
  let seconds = 0

  let options = [BIO.DEFAULT, BIO.NEW, BIO.LOC, BIO.ORG, BIO.PER]
  let selectedTag = ''
  let newTag = ''

  $: {
    hours = time.getHours()
    minutes = time.getMinutes()
    seconds = time.getSeconds()
  }

  $: {
    console.log(selectedTag)
  }

  function newTagSubmit() {
    console.log(newTag)
  }

  onMount(() => {
    const timer = setInterval(() => time = new Date(), 1000)
    return () => clearInterval(timer)
  })
</script>

<p><span class="the-time">{ hours > 9 ? hours : `0${hours}` }:{ minutes > 9 ? minutes : `0${minutes}` }:{ seconds > 9 ? seconds : `0${seconds}` }</span></p>

<div class="header">
  <h1>Put your text here</h1>

  {#if selectedTag == BIO.NEW}
    <div class="new-tag">
      <input placeholder="Type your tag" bind:value={newTag}/>
      <button on:click={newTagSubmit}>Add</button>
      <button on:click={_ => selectedTag = BIO.DEFAULT}>Cancel</button>
    </div>
  {:else}
    <Tags on:tagChanged={_ => selectedTag = _.detail} bind:options/>
  {/if}
</div> 


<InputArea bind:tag={selectedTag}/>
  

