<script>
    import { _ } from 'svelte-i18n';
	import { notificationStore } from './../stores/notificationStore.js';
	import { currentUser } from './../stores/util.js';
    import CryptoES from 'crypto-es';
    import { httpGet } from "../util/api.js";
    import { navigate } from "svelte-routing";
    import { pageNameKey } from "../stores/titleStore";
	import { isMobile } from './../stores/mediaStore.js';

    $pageNameKey = "login";

    let account;
    let username;
    let password;

    async function login() {
        notificationStore.clearAll();  // remove all messages before adding new or navigating away
        let encryptedPass = encryptPassword();
        let url = `users?account=${account}&username=${username}&password=${encryptedPass}`;

        let { data } = await httpGet(url);
        // no match will still return a 200, but with a result object of {}, so just check that it has properties
        if (data.length > 0) {
            $currentUser = data;
            navigate("/");
        } else {
            notificationStore.addError("Credentials not found");
        }
    }

    function encryptPassword() {
        // Encrypt
        return CryptoES.HmacSHA256(password, 'Random Passphrase needed to unhash').toString();
    }
</script>

{#if $isMobile}
<div class="mobileBackground">
    <h1>{$_('login.title')}</h1>
    <p>{$_('login.prompt')}</p>
    <label for="acctField">{$_('login.account')}</label>
    <input id="acctField" type="text" bind:value={account}>

    <label for="userField">{$_('login.user')}</label>
    <input id="userField" type="text" bind:value={username}>

    <label for="passField">{$_('login.password')}</label>
    <input id="passField" type="password" bind:value={password}>

    <button on:click={() => login()}>{$_('login.loginBtn')}</button>
</div>
{:else}
<div class="main">
    <div class="centerBubble">
        <div class="loginBubble">
            <h1>{$_('login.title')}</h1>
            <p>{$_('login.prompt')}</p>
            <label for="acctField">{$_('login.account')}</label>
            <input id="acctField" type="text" bind:value={account}>

            <label for="userField">{$_('login.user')}</label>
            <input id="userField" type="text" bind:value={username}>

            <label for="passField">{$_('login.password')}</label>
            <input id="passField" type="password" bind:value={password}>

            <button on:click={() => login()}>{$_('login.loginBtn')}</button>
        </div>
    </div>
</div>
{/if}

<style type="text/scss">
    @import '../styles/global';
      
    .mobileBackground {
        padding: 2rem;
        background-color: $back-dark;
        height: 100%;
    }

  .main {
     height: 100%;
     position: relative;
     background: darkslategray;
     overflow: hidden;
  }    
 
  .main:before {
     content: "";
     display: block;
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     height:100%;
     z-index: 1;
     opacity: 0.5;
     background-image: url("/images/forest.jpg");
     background-size: cover;
     background-repeat:  no-repeat;
  }
  
  .centerBubble {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 90%;
    }

    .loginBubble {
        border-radius: 5px;
        border: none;                       
        background-color: $background;
        color: $text;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        padding: 1.25rem;
        z-index: 100;
    }

    input{
        display: block;
        margin-bottom: 1rem;
        margin-top: 0.25rem;
    }
</style>