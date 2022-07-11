<script>
   import { _ } from 'svelte-i18n';
   import Tile from "../common/Tile.svelte";
   import { pageNameKey } from "../stores/titleStore";
   import { notificationStore } from '../stores/notificationStore';
   import { currentUser } from '../stores/util';

   // provided as a prop from svelte-routing (get a warning if we don't declare this)
   export let location;

    $pageNameKey ="home";
    notificationStore.clearAll();
 </script>
 
 <div class="main">
     <div class="tiles">
         {#if $currentUser?.admin}
            <Tile mainIcon="admin_panel_settings" overlayIcon="" label="{$_('tiles.admin')}" path="admin"></Tile>
         {/if}
         <Tile mainIcon="notifications" overlayIcon="school" label="{$_('tiles.notificationDemo')}" path="notificationDemo"></Tile>
         <Tile mainIcon="castle" overlayIcon="groups_3" label="{$_('tiles.dndcalc')}" path="dndcalc"></Tile>
         <Tile mainIcon="help" overlayIcon="school" label="{$_('tiles.spare')}" path="spare"></Tile>
         <Tile mainIcon="help" overlayIcon="school" label="{$_('tiles.spare')}" path="spare"></Tile>
     </div>
   </div>
 
 <style type="text/scss">
    @import '../styles/global';
        
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
 
  .tiles {
     display: flex;
     position: relative;
     flex-flow: row wrap;
     justify-content: space-evenly;
     align-content: space-between;
     padding: 4rem 0.5rem 5rem;
     z-index: 10;
  }
 
  @media only screen and (min-width: 475px) {
     .tiles {
         padding: 10rem 0.5rem 20rem;
      }
  }
 
  @media only screen and (min-width: 1024px) {
     .tiles {
         padding: 15% 3rem 8rem;
      }
  }
  </style>