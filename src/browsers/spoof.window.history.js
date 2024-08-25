const spoofHistory = (historyCount) => {
    for (let n = 0; n < historyCount; ++n) {
        if (window.history.length >= historyCount) {
            break;
        }

        window.history.pushState(null, '');
    }
}