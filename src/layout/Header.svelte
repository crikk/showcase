<script>
    import { _ } from 'svelte-i18n';
    import { navigate } from "svelte-routing";
    import { createEventDispatcher } from 'svelte';
	import { currentUser } from "../stores/util.js"

    const dispatch = createEventDispatcher();

    let themeToSwitchTo = 'light_mode';

    function goHome() {
        navigate("/", {});
    }

    function handleLocaleChange() {
        let newLang = $_('header.newLangCode');
        console.log(`handleLocaleChange called with newLang=`, newLang);
        dispatch('locale-changed', newLang);
    }

    function logout() {
        $currentUser = null;
        navigate("/", {});
    }

    function changeTheme() {
        themeToSwitchTo = (themeToSwitchTo == 'dark_mode' ? 'light_mode' : 'dark_mode');
        let root = document.querySelector(':root');

        if (themeToSwitchTo == 'light_mode') { // dark_mode colours
            root.style.setProperty('--primary',  '#000033');
            root.style.setProperty('--pri-light',  '#2a2b5d');
            root.style.setProperty('--pri-dark',  '#00000f');
            root.style.setProperty('--secondary', '#2196f3');
            root.style.setProperty('--sec-light',  '#2196f3');
            root.style.setProperty('--sec-dark',  '#0069c0');
        } else { // switch to dark, means set current to light theme
            root.style.setProperty('--primary',  '#2196f3');
            root.style.setProperty('--pri-light',  '#2196f3');
            root.style.setProperty('--pri-dark',  '#0069c0');
            root.style.setProperty('--secondary', '#000033');
            root.style.setProperty('--sec-light',  '#2a2b5d');
            root.style.setProperty('--sec-dark',  '#00000f');
        }
    }

    $: if ($currentUser) {
        let root = document.querySelector(':root');
        root.style.setProperty('--header-icons',  4);
    } else {
        let root = document.querySelector(':root');
        root.style.setProperty('--header-icons',  2);
    }
</script>

<section class="overall">
    <div class="title-row">
        <h1>{$_('appTitle')}</h1>
        <div class="icon-row">
            {#if $currentUser}
            <button on:click={() => {goHome()}}>
                <div class="labelled-icon">
                    <i class="material-icons icon-size">home</i>
                    <span class="link-text">{$_('header.home')}</span>
                </div>
            </button>
            <button on:click={() => {logout()}}>
                <div class="labelled-icon">
                    <i class="material-icons icon-size">logout</i>
                    <span class="link-text">{$_('header.logout')}</span>
                </div>
            </button>
            {/if}
            <button on:click={() => {changeTheme()}}>
                <div class="labelled-icon">
                    <i class="material-icons icon-size">{themeToSwitchTo}</i>
                    <span class="link-text">{$_(`header.${themeToSwitchTo}`)}</span>
                </div>
            </button>
            <button on:click={() => {handleLocaleChange()}}>
                <div class="labelled-icon">
                    <i class="material-icons icon-size">language</i>
                    <span class="link-text">{$_('header.switchToLang')}</span>
                </div>
            </button>
     </div>
    </div>
</section>

<style type="text/scss">
    @import '../styles/global';
        
    .overall {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: $primary;
        color: white;
    }

    .title-row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .icon-size {
        padding: 0.5rem;
        border-radius: 50%;
        font-size: 32px;
        color: $sec-light;
        transition: transform 1s;
    }

    /* .icon-size:hover,
    .icon-size:focus-within {
        transform: scale(1.175);
     } */

    @media only screen and (min-width: 768px) {
        .title-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 1rem;
        }

        .icon-size {
            font-size: 48px;
            color: $secondary;
        }
    }

    h1 {
        margin: 1.5rem 2rem;
        display: inline-block;
        font-size: 3rem;
    }

    .labelled-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .icon-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        margin-right: 2rem;
        max-width: calc(var(--header-icons, 1) * 6rem);
    }

    .link-text {
        color: lightblue;
    }

    button {
        border: none;
        background: transparent;
    }
</style>
