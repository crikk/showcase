<script>
    
   // provided as a prop from svelte-routing (get a warning if we don't declare this)
   export let location;

</script>

<div class="page">
    <h1>D&D Character Sheet Calculator</h1>

</div>

<style type="text/scss">
    @import '../styles/global';

    h1 {
        color: $highlight;
    }

    .page {
        padding: 0 2rem;
    }
</style>