<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { getSelection, isTooDark } from "./utils"
  
  export let markup
  export let options
  export let colors

  let start = markup.spans.length ? markup.spans[0].start : markup.text.length 
  let stop = markup.spans.length ? markup.spans[markup.spans.length-1].stop : markup.text.length 

  let beginning = markup.text.substring(0, start)
  let ending = markup.text.substring(stop, markup.text.length)

  let dispatch = createEventDispatcher()
  
  $: {
    start = markup.spans.length ? markup.spans[0].start : markup.text.length
    stop = markup.spans.length ? markup.spans[markup.spans.length-1].stop : markup.text.length 

    beginning = markup.text.substring(0, start)
    ending = markup.text.substring(stop, markup.text.length)
  }

  function selectionChanged() {
    dispatch('selectionChanged', getSelection())
  }

</script>

<div class="result">
  {`{"text":"${beginning}`}

  {#each markup.spans as next, index}
    <span class="marked" style='background-color: {colors[options.indexOf(next.type)]};' class:too-dark={isTooDark(colors[options.indexOf(next.type)])}>
      {markup.text.substring(markup.spans[0].start, markup.spans[0].stop)}
      <sup class="type">
        {`${next.start}:${next.stop} ${next.type}`}
      </sup>
      <span class="drop" title="Remove span">
        x
      </span>
    </span>
  {/each}

  {`${ending}","spans":${JSON.stringify(markup.spans)}}`}
</div>
  

