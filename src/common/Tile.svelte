<script>
import CompositeIcon from "../common/CompositeIcon.svelte";
import { navigate } from "svelte-routing";

export var mainIcon;
export var overlayIcon;
export var label = "";
export var path = "";

</script>

<button class="tile-background" on:click="{() => { navigate(path)}}">
    <CompositeIcon {mainIcon} {overlayIcon}/>
    <span class="label-text">{label}</span>
</button>

<style type="text/scss">
    @import '../styles/global';
        
    .tile-background {
        margin: 0.5rem;
        border-radius: 5px;
        box-shadow: 5px 5px 10px 5px $primary;
        border: none;                       
        background-color: white;
        display: flex;
        padding: 1rem;
        opacity: 1;
        flex-direction: column;
        align-items: center;
        width: 8rem;
        height: 12rem;
    }
       
    @media only screen and (min-width: 1024px) {
        .tile-background {
            margin: 1.5rem;
            padding: 1.5rem 1rem;
            width: 10rem;
            height: 15rem;
        }
    }
       
    @media only screen and (min-width: 475px) {
        .tile-background {
            margin: 1rem;
            padding: 1.5rem 1rem;
            width: 10rem;
            height: 15rem;
        }
    }

    .label-text {
        margin-top: 1rem;
        color: $primary;
        font-weight: 600;
        font-size: 1.25rem
    }
</style>