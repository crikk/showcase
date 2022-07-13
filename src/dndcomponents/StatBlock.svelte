<script>

    export let label;
    export let value;
    let bonus;

    $: bonus = Math.floor((value - 10) / 2);
</script>
    
<div class="box">
    <label for="{'stat' + label}">{label}</label>
    <input id="{'stat' + label}" bind:value>
    <div class="adjustment">
        {bonus}
    </div>
</div>


<style type="text/scss">
    @import '../styles/global';

    .box {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 0.375rem;
        border-width: 2px;
        border-style: solid;
        border-color: $back-dark;
        align-items: center;
        width: fit-content;
        min-width: 5.375rem;
        padding: 0.25rem 0.5rem;
        height: 4.675rem;
        background: $text;
        color: $background;
        margin-bottom: 1rem;
    }

    .adjustment {
        border-radius: 35%;
        border-width: 2px;
        border-style: solid;
        border-color: $back-light;
        text-align: center;
        min-width: 3rem;
        position: absolute;
        top: 4.375rem;
        background-color: $highlight;
        color: $back-dark;
        font-weight: bold;
    }

    label {
        margin-bottom: 0.25rem;
    }

    input {
        max-width: 2rem;
        text-align: end;
    }
</style>