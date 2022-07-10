<script>
    import { translatedPageName, pageNameKey } from '../stores/titleStore';
</script>

<section class="footerContainer">
    <span class="cp-notice">Copyright ©{new Date().getFullYear()} Chris Clark</span>
</section>

<style type="text/scss">
    @import '../styles/global';
        
    .footerContainer {
        width: 100%;
        background-color: $pri-light;
        color: white;
        padding-top: 0.125rem; 
        padding-bottom: 0.25rem; 
    }

    .cp-notice {
        padding-left: 2rem;
    }
</style>