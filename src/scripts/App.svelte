<script lang="ts">
  import { onMount } from 'svelte'
  import { BIO, defaults, Span } from './values'
  import InputArea from './InputArea.svelte'
  import Tags from './Tags.svelte'
  import { randomColor } from './utils'

  let time = new Date()
  let hours = 0
  let minutes = 0
  let seconds = 0

  let options = [BIO.DEFAULT, BIO.NEW, BIO.LOC, BIO.ORG, BIO.PER]
  let selectedTag = BIO.DEFAULT
  let newTag = ''
  let markup = defaults.markup
  let colors = ['','', randomColor(), randomColor(), randomColor()]

  $: {
    hours = time.getHours()
    minutes = time.getMinutes()
    seconds = time.getSeconds()
  }

  function newTagSubmit() {
    const tag = newTag.toUpperCase()

    if(options.filter(_ => _ == tag ).length == 0) {
      options.push(tag)
      colors.push(randomColor())
      selectedTag = tag
    } else {
      selectedTag = BIO.DEFAULT
    }
  }

  function processSelection(_) {
    let selection = _.detail
    let start = markup.text.indexOf(selection)
    let stop = markup.text.indexOf(selection) + selection.length

    let existing = markup.spans.filter(_ => (_.start == start && _.stop == stop)).length
    let overlapping = markup.spans.filter(_ => (_.start < start && start < _.stop || _.start < stop && stop < _.stop)).length
    
    if(selectedTag != BIO.DEFAULT && stop > start && !existing && !overlapping) { 
      markup.spans = [...markup.spans, {
        start: start,
        stop: stop,
        type: selectedTag
      }]
    }
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
    <Tags on:tagChanged={_ => selectedTag = _.detail} bind:options {colors} bind:selectedTag/>
  {/if}
</div> 


<InputArea bind:tag={selectedTag} on:textChanged={_ => markup = {...markup, text: _.detail}} on:selectionChanged={processSelection} bind:value={markup.text}/>

<div class="result">
  {JSON.stringify(markup)}
</div>
  

