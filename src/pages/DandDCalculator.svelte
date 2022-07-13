<script>
  import { onMount } from 'svelte';
  import { pageNameKey } from "../stores/titleStore";
  import ImageValue from "../dndcomponents/ImageValue.svelte";
  import StatBlock from "../dndcomponents/StatBlock.svelte";
import { httpGet } from '../util/api';
import SavingThrows from '../dndcomponents/SavingThrows.svelte';

  $pageNameKey = "dndcalc";

  // provided as a prop from svelte-routing (get a warning if we don't declare this)
  export let location;

    // data loaded from DB
    let races = [];
    let classes = [];
    let selectedRace = {};
    let selectedClass = {};

  // character's primary attributes
  let str = 8;
  let dex = 8;
  let con = 8;
  let int = 8;
  let wis = 8;
  let chr = 8;

  let xp = 0;

  // bonuses/penalties computed from the primary attributes
  $: strAdj = Math.floor((str - 10) / 2);
  $: dexAdj = Math.floor((dex - 10) / 2);
  $: conAdj = Math.floor((con - 10) / 2);
  $: intAdj = Math.floor((int - 10) / 2);
  $: wisAdj = Math.floor((wis - 10) / 2);
  $: chrAdj = Math.floor((chr - 10) / 2);

  $: hitDie = selectedClass?.hitDie;

  $: armorClass = 10 + dexAdj;
  $: hitPoints = ((hitDie + conAdj) + ((level - 1) * ((selectedClass.hitDie / 2 + 1) + conAdj)));
  $: level = calcLevel(xp);
  $: speed = selectedRace?.move;
  $: initiative = dexAdj;

  $: proficiency = Math.floor((level - 1) / 4) + 2;

    onMount(async () => {
       const raceResult = await httpGet("races");
       races = raceResult.data;
       selectedRace = races[0];
       
       const classResult = await httpGet("classes");
       classes = classResult.data;
       selectedClass = classes[0];
    });

    async function loadData() {
        races = await httpGet("/races");
    }

  function calcLevel(currentXP) {
    if (currentXP < 300) return 1;
    if (currentXP < 900) return 2;
    if (currentXP < 2700) return 3;
    if (currentXP < 6500) return 4;
    if (currentXP < 14000) return 5;
    if (currentXP < 23000) return 6;
    if (currentXP < 34000) return 7;
    if (currentXP < 48000) return 8;
    if (currentXP < 64000) return 9;
    if (currentXP < 85000) return 10;
    if (currentXP < 100000) return 11;
    if (currentXP < 120000) return 12;
    if (currentXP < 140000) return 13;
    if (currentXP < 165000) return 14;
    if (currentXP < 195000) return 15;
    if (currentXP < 225000) return 16;
    if (currentXP < 265000) return 17;
    if (currentXP < 305000) return 18;
    if (currentXP < 355000) return 19;
    if (currentXP >= 355000) return 20;
  }
</script>

<div class="page">
  <h2>D&D (Reactive) Character Sheet</h2>
  <div class="grid-container">
    <!-- First row -->
    <div class="characterId">
      <div class="inputGrouping">
        <label for="charName">Name</label>
        <input id="charName" />
      </div>
      <div class="inputGrouping">
        <label for="charRace">Race</label>
        <select id="charRace" bind:value={selectedRace}>
            {#each races as race}
                <option value={race}>{race.name}</option>
            {/each}
        </select>
      </div>
      <div class="inputGrouping">
        <label for="charClass">Class</label>
        <select id="charClass" bind:value={selectedClass}>
            {#each classes as prof}
                <option value={prof}>{prof.name}</option>
            {/each}
        </select>
      </div>
      <div class="inputGrouping">
        <label for="charXP">Experience Points</label>
        <input id="charXP" bind:value={xp} />
      </div>
    </div>
    <!-- First Column -->
    <div class="stat-column">
      <StatBlock label="Strength" bind:value={str} />
      <StatBlock label="Dexterity" bind:value={dex} />
      <StatBlock label="Constitution" bind:value={con} />
      <StatBlock label="Intelligence" bind:value={int} />
      <StatBlock label="Wisdom" bind:value={wis} />
      <StatBlock label="Charisma" bind:value={chr} />
    </div>
    <!-- Second Column -->
    <div class="combat-stats">
      <ImageValue title="Level" value={level} imageUrl="/images/scroll_icon.png"/>
      <ImageValue title="Armor Class" value={armorClass} imageUrl="/images/shield_icon.png"/>
      <ImageValue title="Hit Points" value={hitPoints} imageUrl="/images/heart_icon_V2.png"/>
    </div>
    <div class="other-stats">
        <ImageValue title="Proficiency" value={proficiency} imageUrl="/images/target_icon_v1.png" />
        <ImageValue title="Speed" value={speed} imageUrl="/images/move_icon.png" />
        <ImageValue title="Initiative" value={initiative} imageUrl="/images/d20_icon.png" />
    </div>
    <div class="saving-throws">
        <SavingThrows {selectedClass} {strAdj} {dexAdj} {conAdj} {intAdj} {wisAdj} {chrAdj} {proficiency}></SavingThrows>
    </div>
  </div>
</div>

<style type="text/scss">
  @import "../styles/global";

  .grid-container {
    display: grid;
    grid-template-columns: [first] 8rem [second] 23rem [third] 40rem [fourth] auto [end];
    grid-template-rows: [top] 4rem [second] 9rem [third] 9rem [fourth] auto [bottom];
  }

  .inputGrouping {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .characterId {
    grid-column-start: second;
    grid-column-end: fourth;
    grid-row-start: top;
    grid-row-end: second;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .stat-column {
    grid-column-start: first;
    grid-column-end: second;
    grid-row-start: second;
    grid-row-end: bottom;
  }

  .combat-stats {
    grid-column-start: second;
    grid-column-end: third;
    grid-row-start: second;
    grid-row-end: third;
    display: flex;
    flex-direction: row;
  }

  .other-stats {
    grid-column-start: second;
    grid-column-end: third;
    grid-row-start: third;
    grid-row-end: fourth;
    display: flex;
    flex-direction: row;
  }

  .saving-throws {
    grid-column-start: second;
    grid-column-end: third;
    grid-row-start: fourth;
    grid-row-end: bottom;
  }

  h1,
  p {
    color: $highlight;
  }

  label {
    margin-right: 0.5rem;
  }

  .page {
    padding: 0 2rem;
    color: $text;
  }
</style>
