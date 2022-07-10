<script>
    import Notification from "../common/Notification.svelte";
import { notificationStore } from "../stores/notificationStore";

</script>

<div class="container">
    {#each $notificationStore as notification}
    <Notification {...notification} />
    {/each}

</div>

<style lang="scss">
    @import '../styles/global';

    .container {
        width: 100%;
    }
</style>