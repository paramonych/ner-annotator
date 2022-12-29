<script lang="ts">
  import { onMount } from 'svelte'
  import { onSelect } from './utils'

  export let name = 'Anonymous'
  let time = new Date()

  onMount(() => {
    const timer = setInterval(() => {
      time = new Date()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  let hours = 0
  let minutes = 0
  let seconds = 0

  $: {
    hours = time.getHours();
    minutes = time.getMinutes()
    seconds = time.getSeconds()
  }


</script>

<p><span class="the-time">{ hours }:{ minutes }:{ seconds }</span></p>

<div class="header">
</div> 

<h1>Put your text here</h1>

<textarea id="input-text" on:select={onSelect}>
</textarea>
  

