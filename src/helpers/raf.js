export const raf = () => {
    let lastTime = 0;
    let currTime, timeToCall, id;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = callback => {
            currTime = Date.now();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = window.setTimeout(() => { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = id => clearTimeout(id);
    }
};