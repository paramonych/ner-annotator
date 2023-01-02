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
  let resultingMarkup = ''

  $: {
    hours = time.getHours()
    minutes = time.getMinutes()
    seconds = time.getSeconds()
  }

  $: {
    let text = JSON.stringify(markup.text).replaceAll('\\"', "'").replaceAll('\\n', ' ').replaceAll('\\', ' ')
    resultingMarkup = JSON.stringify({...markup, text: text.replaceAll('\"', '')})
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
    let start = _.detail.start
    let stop = _.detail.stop
    
    if(start != void 0 && stop != void 0) {
      let existing = markup.spans.filter(_ => (_.start == start && _.stop == stop))
      let overlapping = markup.spans.filter(_ => (_.start < start && start < _.stop || _.start < stop && stop < _.stop || start < _.start && stop > _.stop))
      
      if(selectedTag != BIO.DEFAULT && stop > start && !existing.length && !overlapping.length) { 
        markup.spans = [...markup.spans, {
          start: start,
          stop: stop,
          type: selectedTag
        }].sort((a,b) => a.start > b.start ? 1 : (a.start == b.start ? 0 : -1))
        
        _.detail.target.selectionStart = void 0
        _.detail.target.selectionEnd = void 0
      } else if(selectedTag == BIO.DEFAULT) {
        tagWarning = true
      } else if(existing.length) {
        alert(`Span exist: ${JSON.stringify(existing)}`)
      } else if(overlapping.length) {
        alert(`Overlaping with existing span: ${JSON.stringify(overlapping)}`)
      } 
    } else {
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
  <h5>Select the text in</h5>

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

{#if markup.spans.length}
  <a class="download" download="ner-annotations.json" href={`data:text/json;charset=utf-8,${resultingMarkup}`}>Download results</a>  
{/if}

<OutputArea bind:markup bind:colors on:removeSpan={removeSpanByIndex} bind:options/>

  

