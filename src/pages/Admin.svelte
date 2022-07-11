<script>
  import { _ } from "svelte-i18n";
  import { getContext, onMount } from "svelte";
  import { httpGet, httpPut, httpPost, httpDelete } from "../util/api";
  import { pageNameKey } from "../stores/titleStore";
  import CryptoES from "crypto-es";
  import UserDialog from "../dialogs/UserDialog.svelte";

  // provided as a prop from svelte-routing (get a warning if we don't declare this)
  export let location;

  const { open } = getContext("simple-modal");
  const secret = "Random Passphrase needed to unhash";

  let users = [];           // complete set of all users
  let displayedUsers = [];  // FUTURE: potentially filtered subset of users

  onMount(async () => {
    $pageNameKey = "admin";
    const { data } = await httpGet("users");
    users = data;
    displayedUsers = users;
  });

  function maxId() {
    let maxUser = users.reduce((max, next) => {
      let maxId;
      if (max === undefined || max.id < next.id) maxId = next.id;
      else maxId = max.id;
      return { id: maxId };
    });
    return maxUser.id;
  }

  function editUser(id) {
    let found = users.find((user) => user.id === id);
    open(UserDialog,
      {
        onCancel,
        onOkay: onEditOkay,
        title: "dlgEditTitle",
        id,
        username: found.username,
        password: "", // password is stored as a hash and can't be decrypted, so any edit means reset password
        isAdmin: found.admin,
      },
      { closeOnOuterClick: false }
    );
  }

  async function deleteUser(id) {
    const { data } = await httpDelete("users/" + id);
    users = users.filter((user) => user.id !== id);
    displayedUsers = users;
  }

  function createUser() {
    open(UserDialog, { onCancel, onOkay: onCreateOkay, id: maxId() + 1 }, { closeOnOuterClick: false }
    );
  }

  // Start: Dialog callback methods
  const onCancel = () => {
    console.log("User terminated dialog via cancel, no changes made.");
  };

  const onCreateOkay = (name, pass, isAdmin, id) => {
    addUser(id, name, pass, isAdmin);
  };

  const onEditOkay = (name, pass, isAdmin, id) => {
    updateUser(id, name, pass, isAdmin);
  };
  // End: Dialog callback methods

  async function addUser(id, name, pwd, isAdmin) {
    let encryptedPass = encryptPassword(pwd);
    let body = {
      id: id,
      username: name,
      password: encryptedPass,
      admin: isAdmin,
    };
    const { data } = await httpPost("users", body);
    users = [...users, data];
    displayedUsers = users;
  }

  async function updateUser(id, name, pwd, isAdmin) {
    let encryptedPass = encryptPassword(pwd);
    let body = {
      username: name,
      password: encryptedPass,
      admin: isAdmin,
    };
    const { data } = await httpPut("users/" + id, body);
    let index = users.findIndex((user) => user.id === id);
    users = [...users.slice(0, index), data, ...users.slice(index + 1)];
    displayedUsers = users;
  }

  function encryptPassword(pwd) {
    // Encrypt
    return CryptoES.HmacSHA256(pwd, secret).toString();
  }
</script>

<div class="page">
  <h1>{$_("admin.title")}</h1>

  <button on:click={createUser}>
    <i class="material-icons">person_add</i>{$_("admin.create")}
  </button>
  <p>{$_("admin.prompt")}</p>

  <!-- User table -->
  <table>
    <thead>
      <th style="min-width: 10rem; text-align:left">{$_("admin.ch.name")}</th>
      <th style="min-width: 6rem">{$_("admin.ch.admin")}</th>
      <th>{$_("admin.ch.actions")}</th>
    </thead>
    <tbody>
      {#each displayedUsers as user}
        <tr>
          <td>{user.username}</td>
          <td style="text-align:center">{user.admin}</td>
          <td>
            <div class="button-row">
              <button on:click={() => editUser(user.id)}>
                <i class="material-icons">edit</i>{$_("buttons.edit")}
              </button>
              {#if !user.admin}
                <button
                  aria-label="Delete"
                  on:click={() => deleteUser(user.id)}
                >
                  <i class="material-icons">delete</i>{$_("buttons.delete")}
                </button>
              {/if}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style type="text/scss">
  @import "../styles/global";

  h1 {
    color: $highlight;
  }

  .page {
    padding: 0 2rem;
    color: $text;
  }

  .button-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    margin: 0 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  i {
    margin-right: 0.375rem;
    color: $back-light;
  }

  table {
    margin-top: 2rem;
  }
</style>
