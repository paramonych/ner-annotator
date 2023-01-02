<script lang="ts">
  import { onMount } from 'svelte'
  import { BIO, defaults } from './values'
  import { randomColor } from './utils'
  
  import InputArea from './InputArea.svelte'
  import Tags from './Tags.svelte'
  import OutputArea from './OutputArea.svelte'

  let time = new Date()
  let hours = 0
  let minutes = 0
  let seconds = 0

  let options = [BIO.DEFAULT, BIO.NEW, BIO.LOC, BIO.ORG, BIO.PER]
  let selectedTag = BIO.DEFAULT
  let newTag = ''
  let markup = defaults.markup
  let colors = ['','', randomColor(), randomColor(), randomColor()]
  let tagWarning = false

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

    let existing = markup.spans.filter(_ => (_.start == start && _.stop == stop))
    let overlapping = markup.spans.filter(_ => (_.start < start && start < _.stop || _.start < stop && stop < _.stop))
    
    if(selection && selectedTag != BIO.DEFAULT && stop > start && !existing.length && !overlapping.length) { 
      markup.spans = [...markup.spans, {
        start: start,
        stop: stop,
        type: selectedTag
      }]
    } else if(selectedTag == BIO.DEFAULT) {
      tagWarning = true
    } else if(existing.length) {
      alert(`Span exist: ${JSON.stringify(existing)}`)
    } else if(overlapping.length) {
      alert(`Span overlaping: ${JSON.stringify(overlapping)}`)
    } else if(!selection) {
      alert('Empty selection is not allowed')
    }
  }

  function tagChanged(_) {
    tagWarning = false
    selectedTag = _.detail
  }

  function removeSpanByIndex(_) {
      markup.spans.splice(_.detail, 1)
      markup = markup    
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
    <Tags on:tagChanged={tagChanged} bind:colors bind:options bind:selectedTag bind:tagWarning/>
  {/if}
</div> 


<InputArea bind:tag={selectedTag} on:textChanged={_ => markup = {...markup, text: _.detail}} on:selectionChanged={processSelection} bind:value={markup.text}/>

<OutputArea bind:markup bind:colors on:removeSpan={removeSpanByIndex} bind:options/>

  

