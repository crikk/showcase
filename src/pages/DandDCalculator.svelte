<script>
import ImageValue from "../dndcomponents/ImageValue.svelte";
import StatBlock from "../dndcomponents/StatBlock.svelte";

    
   // provided as a prop from svelte-routing (get a warning if we don't declare this)
   export let location;

   // character's primary attributes
    let str = 8;
    let dex = 8;
    let con = 8;
    let int = 8;
    let wis = 8;
    let chr = 8;

    let xp = 0;

    let hitDie = 8;

    // bonuses/penalties computed from the primary attributes
    $: strAdj = Math.floor((str -10) / 2);
    $: dexAdj = Math.floor(dex -10) / 2;
    $: conAdj = Math.floor(con -10) / 2;
    $: intAdj = Math.floor(int -10) / 2;
    $: wisAdj = Math.floor(wis -10) / 2;
    $: chrAdj = Math.floor(chr -10) / 2;

    $: armorClass = (10 + dexAdj);
    $: hitPoints = (hitDie + conAdj);
    $: level = calcLevel(xp);
    $: speed = "6\"";
    $: initiative = dexAdj;

    $: proficiency = ((Math.floor((level - 1) / 4)) + 2);

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
        <div class="characterId">
            <div class="inputGrouping">
                <label for="charName">Name</label>
                <input id="charName">
            </div>
            <div class="inputGrouping">
                <label for="charRace">Race</label>
                <input id="charRace">
            </div>
            <div class="inputGrouping">
                <label for="charClass">Class</label>
                <input id="charClass">
            </div>
            <div class="inputGrouping">
                <label for="charXP">Experience Points</label>
                <input id="charXP" bind:value={xp}>
            </div>
        </div>
        <div class="stat-column">
            <StatBlock label="Strength" bind:value="{str}"></StatBlock>
            <StatBlock label="Dexterity" bind:value="{dex}"></StatBlock>
            <StatBlock label="Constitution" bind:value="{con}"></StatBlock>
            <StatBlock label="Intelligence" bind:value="{int}"></StatBlock>
            <StatBlock label="Wisdom" bind:value="{wis}"></StatBlock>
            <StatBlock label="Charisma" bind:value="{chr}"></StatBlock>
        </div>
        <div class="combat-stats">
            <ImageValue title="Armor Class" value={armorClass} imageUrl="/images/shield_icon.png"></ImageValue>
            <ImageValue title="Hit Points" value={hitPoints} imageUrl="/images/heart_icon_V2.png"></ImageValue>
            <ImageValue title="Level" value={level} imageUrl="/images/scroll_icon.png"></ImageValue>
        </div>
        <div class="other-stats">
            <ImageValue title="Proficiency" value={proficiency} colour="aquamarine"></ImageValue>
            <ImageValue title="Initiative" value={initiative} colour="burlywood"></ImageValue>
            <ImageValue title="Speed" value={speed} colour="hotpink"></ImageValue>
        </div>
    </div>
</div>

<style type="text/scss">
    @import '../styles/global';

    .grid-container {
        display: grid;
        grid-template-columns: [first] 8rem [second] 23rem [third] auto [end];
        grid-template-rows: [top] 4rem [second] 10rem [third] auto [bottom];
    }

    .inputGrouping {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .characterId {
        grid-column-start: second;
        grid-column-end: end;
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
        grid-row-end: bottom;
        display: flex;
        flex-direction: row;
    }

    h1, p {
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