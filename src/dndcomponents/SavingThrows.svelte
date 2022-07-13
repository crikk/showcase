<script>
    export let selectedClass;
    export let strAdj;
    export let dexAdj;
    export let conAdj;
    export let intAdj;
    export let wisAdj;
    export let chrAdj;
    export let proficiency;

    $: strSaveProf = selectedClass?.saves?.includes("str");
    $: dexSaveProf = selectedClass?.saves?.includes("dex");
    $: conSaveProf = selectedClass?.saves?.includes("con");
    $: intSaveProf = selectedClass?.saves?.includes("int");
    $: wisSaveProf = selectedClass?.saves?.includes("wis");
    $: chrSaveProf = selectedClass?.saves?.includes("chr");
</script>

<fieldset>
    <legend>Saving Throws</legend>
    <table>
        <tr>
            <td><input type="checkbox" readonly bind:checked={strSaveProf}></td>
            <td>{strSaveProf ? (strAdj + proficiency) : strAdj}</td>
            <td>Strength</td>
        </tr>
        <tr>
            <td><input type="checkbox" readonly bind:checked={dexSaveProf}></td>
            <td>{dexSaveProf ? (dexAdj + proficiency) : dexAdj}</td>
            <td>Dexterity</td>
        </tr>
        <tr>
            <td><input type="checkbox" readonly bind:checked={conSaveProf}></td>
            <td>{conSaveProf ? (conAdj + proficiency) : conAdj}</td>
            <td>Constitution</td>
        </tr>
        <tr>
            <td><input type="checkbox" readonly bind:checked={intSaveProf}></td>
            <td>{intSaveProf ? (intAdj + proficiency) : intAdj}</td>
            <td>Intelligence</td>
        </tr>
        <tr>
            <td><input type="checkbox" readonly bind:checked={wisSaveProf}></td>
            <td>{wisSaveProf ? (wisAdj + proficiency) : wisAdj}</td>
            <td>Wisdom</td>
        </tr>
        <tr>
            <td><input type="checkbox" readonly bind:checked={chrSaveProf}></td>
            <td>{chrSaveProf ? (chrAdj + proficiency) : chrAdj}</td>
            <td>Charisma</td>
        </tr>
    </table>

</fieldset>

<style type="text/scss">
    @import "../styles/global";

    tr {
        vertical-align: baseline;
    }

    td:nth-child(1) {
        width: 1rem;
    }

    td:nth-child(2) {
        min-width: 2rem;
        max-width: 2rem;
        text-align: end;
    }

    td:nth-child(3) {
        padding-left: 1rem;
    }
</style>  