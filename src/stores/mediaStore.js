import { readable } from 'svelte/store';

export const isMobile = readable(false, function start(set) {
    function testMobile(mql) {
        set(mql.matches);
    }

    let mql = window.matchMedia("(max-width: 500px)");

    set(mql.matches);
    mql.addListener(testMobile);

    return function stop() {
        mql.removeListener(testMobile);
    };
});