import { writable, derived } from 'svelte/store';
import { dictionary, locale } from 'svelte-i18n';

export const pageNameKey = writable("");

export const translatedPageName = derived([pageNameKey, locale, dictionary], ([$pageNameKey, $locale, $dictionary]) => {
    var name = "";
    var appName = "";
    if ($dictionary[$locale]) {
        name = $dictionary[$locale]["winTitles"][$pageNameKey];
        appName = $dictionary[$locale]["winTitles"]["app"];
    }
    return name + " | " + appName;
});