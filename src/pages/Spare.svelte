<script>
        
   // provided as a prop from svelte-routing (get a warning if we don't declare this)
   export let location;

</script>

<div class="page">

    <h2>A Spare page</h2>
    <p>Placeholder in case I get any more ideas of things I'd like to try  out</p>
    
</div>

<style type="text/scss">
    @import '../styles/global';

    h1, p {
        color: $highlight;
    }

    .page {
        padding: 0 2rem;
    }
</style>