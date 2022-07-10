<script lang="ts">
	import { Router, Route } from 'svelte-routing';
	import { globalHistory } from 'svelte-routing/src/history';
	import { onMount, onDestroy } from 'svelte';
	import { isLocaleLoaded, setupI18n, _ } from './util/i18n';
	import { currentPath, currentUser } from "./stores/util.js"
	import { translatedPageName } from './stores/titleStore';
	import Modal from './util/Modal.svelte';
	import Footer from './layout/Footer.svelte';
	import Header from "./layout/Header.svelte";
	import NotificationPanel from './layout/NotificationPanel.svelte';
	import Home from './pages/Home.svelte'
	import Login from './pages/Login.svelte'
	import Admin from './pages/Admin.svelte';
	import NotificationDemo from './pages/NotificationDemo.svelte';
	import DandDCalculator from './pages/DandDCalculator.svelte';
import Spare from './pages/Spare.svelte';

	export let url = "/";
	var unsub;

	onMount(() => {
		// listen for changes to the Window history (to pick up URL changes)
		unsub = globalHistory.listen(({ location, action }) => {
			$currentPath = location.pathname;
		});
	})

	onDestroy(() => {
		unsub();
	})

    $: if (!$isLocaleLoaded) {
		console.log("in if !$isLocaleLoaded")
        setupI18n({ withLocale: 'en' });
    }
</script>

<svelte:head>
	<title>{$translatedPageName}</title>
</svelte:head>

<Modal>
	<!-- <Timeout /> -->
	<Router url="{url}">
		{#if $isLocaleLoaded}
			<div class="page-layout">
				<div class="header" role="banner" >
					<Header on:locale-changed={e => setupI18n({ withLocale: e.detail})} />
				</div>
				<NotificationPanel />
				<div class="content" role="main">
					{#if $currentUser}
						<Route path="/" component="{Home}" />
						<Route path="/admin" component="{Admin}" />
						<Route path="/notificationDemo" component="{NotificationDemo}" /> 
						<Route path="/dndcalc" component="{DandDCalculator}" /> 
						<Route path="/spare" component="{Spare}" /> 
					{:else}
						<Route path="/" component="{Login}" />
					{/if}
				</div>
				<div class="footer" role="contentinfo">
					<Footer/>
				</div>
			</div>
		{:else}
			<p>Loading languages...</p>
		{/if}
	</Router>
</Modal>

<style type="text/scss">
	@import './styles/global';

	.page-layout {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: $background;
	}

	.header {
		flex: 0 0 auto;
	}

	.content {
		flex: 1 1 100%;
	}
	
	.footer {
		flex: 0 0 auto;
	}
</style>