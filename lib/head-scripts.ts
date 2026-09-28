// Inline scripts that run in <head> before first paint. Kept out of "use client"
// modules so the server can inline them as plain strings.

/** Runs before first paint (see layout.tsx) so the saved theme never flashes. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}document.documentElement.classList.add('js');})();`;

/**
 * Decides before first paint whether to show the loader: first homepage visit
 * of the session, JS on, motion allowed. Everyone else goes straight in.
 */
export const loaderScript = `(function(){try{var d=document.documentElement;if(/\\/work\\//.test(location.pathname))return;if(sessionStorage.getItem('intro-seen'))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('loading');}catch(e){}})();`;
