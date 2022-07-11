<script>
   import { _ } from 'svelte-i18n';
   import { getContext } from 'svelte';
   import { notificationStore } from "../stores/notificationStore";

   const { close } = getContext('simple-modal');

   export let onCancel = () => {};
   export let onOkay = () => {};
   export let title = "dlgCreateTitle";
   export let isAdmin = true;
   export let username = "";
   export let password = "";
   let confPassword = "";
   export let id;

    function _onCancel() {
        onCancel();
        close();
    }

    function _onOkay() {
        if (password == confPassword) {
            onOkay(username, password, isAdmin, id);
            close();
        } else {
            notificationStore.addError("Passwords don't match");
        }
    }
</script>

<h1>{$_('admin.dialog.' + title)}</h1>
<div class="column bottom-spacing">
    <label for="name-input">{$_('admin.dialog.username')}</label>
    <input id="name-input" type="text" maxlength="50" bind:value={username} on:keydown={e => e.which === 13 && _onOkay()} />
</div>
<div class="column bottom-spacing">
    <label for="name-input">{$_('admin.dialog.password')}</label>
    <input id="name-input" type="password" maxlength="50" bind:value={password} on:keydown={e => e.which === 13 && _onOkay()} />
</div>
<div class="column bottom-spacing">
    <label for="name-input">{$_('admin.dialog.confPassword')}</label>
    <input id="name-input" type="password" maxlength="50" bind:value={confPassword} on:keydown={e => e.which === 13 && _onOkay()} />
</div>
<div class="row bottom-spacing">
  <label><input type="checkbox" bind:checked={isAdmin}>{$_('admin.dialog.admin')}</label>
</div>
<div class="row button-spacing">
    <button on:click={_onCancel}>{$_('buttons.cancel')}</button>
    <button on:click={_onOkay}>{$_('buttons.ok')}</button>
</div>

<style>
    .bottom-spacing {
        margin-bottom: 0.75rem;
    }

    .button-spacing {
        justify-content: space-around;
    }
</style>