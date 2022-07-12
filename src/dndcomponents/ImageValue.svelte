<script>
    export let title;
    export let value;
    export let imageUrl = "";
    export let colour = "";

    $: background = (imageUrl.length > 0 ? "background-image: url('" + imageUrl + "');" : "background-color: " + colour)
</script>

<div class="iconStatContainer">
    <div class="imageBox" style={background}>
        {value}
    </div>
    {title}
</div>


<style type="text/scss">
    @import '../styles/global';

    .iconStatContainer {
        text-align: center;
        margin-right: 1.5rem;
        margin-bottom: 0.125rem;
    }

    .imageBox {
        border-radius: 10px;
        height: 96px;
        line-height: 96px;
        width: 96px;
        vertical-align: middle;
        font-size: x-large;
        color: black;
        font-weight: bold;
    }

</style>