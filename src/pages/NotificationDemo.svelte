<script>
    import { _ } from 'svelte-i18n';
    import { pageNameKey } from "../stores/titleStore";
    import { notificationStore } from "../stores/notificationStore";

    $pageNameKey = "notificationDemo";

    var msg;

    function addError() {
        notificationStore.addError(msg);
        msg = "";
    }

    function addWarning() {
        notificationStore.addWarning(msg);
        msg = "";
    }

    function addInfo() {
        notificationStore.addInfo(msg);
        msg = "";
    }
</script>

<div class="page-style">
    <h2>{$_("notificationDemo.title")}</h2>

    <div class="column spacing">
        <label for="msg-input">{$_("notificationDemo.label")}</label>
        <input id="msg-input" type="text" bind:value={msg}>

        <div class="row">
            <button on:click="{() => addError()}">Add Error</button>
            <button on:click="{() => addWarning()}">Add Warning</button>
            <button on:click="{() => addInfo()}">Add Info</button>
        </div>
    </div>
</div>


<style type="text/scss">
    @import '../styles/global';

    .spacing {
        justify-content: space-evenly;
        min-height: 9rem;
    }

    .page-style {
        height: 100%;
        background-color: $back-light;
        color: $text;
        padding: 1rem;
        @media (min-width: 500px) {
            padding: 2rem;
        }
    }

    button {
        margin-right: 3rem;
    }
 </style>    