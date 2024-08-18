// contentScript.ts
function injectScript(file_path: string) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(file_path);
    script.onload = () => {
        script.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

// Inject your custom script
injectScript('fpSpoofer.js');
