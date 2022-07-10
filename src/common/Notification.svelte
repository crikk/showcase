<script>
	import { notificationStore } from './../stores/notificationStore.js';

    export var type;
    export var msg;
    export var id;

</script>


<div class="container">
    <div class="row message-spacing {type}">
        <i class="material-icons main-icon">{type}</i>
        <span>{msg}</span>
        <button on:click="{() => notificationStore.remove(id) }">
            <i class="material-icons main-icon">close</i>
        </button>
    </div>

</div>

<style lang="scss">
    @import '../styles/global';

    .main-icon {
        flex: 0 0 auto;
    }

    .container {
        width: 100%;
        font-size: 1.25rem;
    }

    span {
        margin-left: 1rem;
        flex: 1 1 100%;
    }

    button {
        flex: 0 0 auto;
        background-color: transparent;
        border: none;
        color: black;
    }

    .message-spacing {
        align-items: center;
        padding: 1rem;
    }

    .error {
        color: $error-text;
        background-color: $error-background;
    }

    .warning {
        color: $warning-text;
        background-color: $warning-background;
    }

    .info {
        color: $info-text;
        background-color: $info-background;
    }
</style>