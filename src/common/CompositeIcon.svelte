<script>
    export var mainIcon;
    export var overlayIcon;
</script>

<div class="icon-container">
    <i class="material-icons main-icon">{mainIcon}</i>
    <i class="material-icons overlay-icon">{overlayIcon}</i>
    <!-- <span class="link-text">Home</span> -->
</div>

<style type="text/scss">
@import '../styles/global';

.icon-container {
    position: relative;
}

.main-icon {
    font-size: 4rem;
    color: $primary;
}

.overlay-icon {
    font-size: 2rem;
    font-weight: 600;
    color: $secondary;
    position: absolute;
    top: 2.25rem;
    left: 2.25rem;
}
</style>
