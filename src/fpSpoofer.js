

var fontHeightOffset = 0;
var fontWidthOffset = 0;

var hasBattery = true;

var browser = "safari";
var historyCount = 4;

var webglValueIndexSeed = 0.234567654,
    webglValueOffset = 0.05;

var audioContextOffset = 0.5;

var canvasSpoofIndexes = [1, 0, 0, -1, -1, 1, -1, 1, 1, -1];

var webglParam37445 = "Google Inc. (Intel)";
var webglParam3379 = 15;
var webglParam36347 = 12;
var webglParam34076 = 14;
var webglParam34024 = 14;
var webglParam3386 = 13;
var webglParam3413 = 4;
var webglParam3412 = 4;
var webglParam3411 = 4;
var webglParam3410 = 4;
var webglParam34047 = 3;
var webglParam34930 = 3;
var webglParam34921 = 3;
var webglParam35660 = 3;
var webglParam35661 = 6;
var webglParam36349 = 11;
var webglParam33902 = 12;
var webglParam33901 = 12;
var webglParam37446 = "Intel(R) HD Graphics";

var fontInject = function () {
    var rand = {
        noise: function () {
            var SIGN = Math.random() < Math.random() ? -1 : 1;
            return Math.floor(Math.random() + SIGN * Math.random());
        },
        sign: function () {
            const tmp = [-1, -1, -1, -1, -1, -1, +1, -1, -1, -1];
            const index = Math.floor(Math.random() * tmp.length);
            return tmp[index];
        },
    };

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        get() {
            const height = Math.floor(this.getBoundingClientRect().height);
            const result = height + fontHeightOffset;
            return result;
        },
    });

    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        get() {
            const width = Math.floor(this.getBoundingClientRect().width);
            const result = width + fontWidthOffset;
            return result;
        },
    });
};

var webglInject = function () {
    var config = {
        random: {
            value: function () {
                return Math.random();
            },
            item: function (e) {
                var rand = e.length * config.random.value();
                return e[Math.floor(rand)];
            },
            number: function (power) {
                if (Array.isArray(power)) {
                    return Math.pow(2, config.random.item(power));
                }
                return Math.pow(2, power);
            },
            int: function (power) {
                if (Array.isArray(power)) {
                    // @ts-ignore
                    return config.random.item(
                        power.map((p) => new Int32Array([Math.pow(2, p), Math.pow(2, p)]))
                    );
                }
                return new Int32Array([Math.pow(2, power), Math.pow(2, power)]);
            },
            float: function (power) {
                if (Array.isArray(power)) {
                    // @ts-ignore
                    return config.random.item(
                        power.map((p) => new Float32Array([1, Math.pow(2, p)]))
                    );
                }
                return new Float32Array([1, Math.pow(2, power)]);
            },
        },
        spoof: {
            webgl: {
                buffer: function (target) {
                    var proto = target.prototype;
                    const bufferData = proto.bufferData;
                    Object.defineProperty(proto, "bufferData", {
                        value: function () {
                            if (
                                Math.min(...arguments[1]) >= 0 &&
                                arguments[1].constructor == Float32Array
                            ) {
                                var index = Math.floor(
                                    webglValueIndexSeed * arguments[1].length
                                );
                                var noise = 0.1 * webglValueOffset;
                                arguments[1][index] =
                                    arguments[1][index] <= 0.5
                                        ? arguments[1][index] + noise
                                        : arguments[1][index] - noise;
                            }
                            // @ts-ignore
                            return bufferData.apply(this, arguments);
                        },
                    });
                },
                parameter: function (target) {
                    var proto = target.prototype;
                    const getParameter = proto.getParameter;
                    Object.defineProperty(proto, "getParameter", {
                        value: function () {
                            switch (arguments[0]) {
                                case 3415:
                                    return 0;
                                case 3414:
                                    return 24;
                                case 36348:
                                    return 30;
                                case 7936:
                                    return "WebKit";
                                case 37445:
                                    return webglParam37445;
                                case 7937:
                                    return "WebKit WebGL";
                                case 3379:
                                    return config.random.number(webglParam3379);
                                case 36347:
                                    return config.random.number(webglParam36347);
                                case 34076:
                                    return config.random.number(webglParam34076);
                                case 34024:
                                    return config.random.number(webglParam34024);
                                case 3386:
                                    return config.random.int(webglParam3386);
                                case 3413:
                                    return config.random.number(webglParam3413);
                                case 3412:
                                    return config.random.number(webglParam3412);
                                case 3411:
                                    return config.random.number(webglParam3411);
                                case 3410:
                                    return config.random.number(webglParam3410);
                                case 34047:
                                    return config.random.number(webglParam34047);
                                case 34930:
                                    return config.random.number(webglParam34930);
                                case 34921:
                                    return config.random.number(webglParam34921);
                                case 35660:
                                    return config.random.number(webglParam35660);
                                case 35661:
                                    return config.random.number(webglParam35661);
                                case 36349:
                                    return config.random.number(webglParam36349);
                                case 33902:
                                    return config.random.float(webglParam33902);
                                case 33901:
                                    return config.random.float(webglParam33901);
                                case 37446:
                                    return webglParam37446;
                                default:
                                    // @ts-ignore
                                    return getParameter.apply(this, arguments);
                            }
                        },
                    });
                },
            },
        },
    };
    config.spoof.webgl.buffer(WebGLRenderingContext);
    config.spoof.webgl.buffer(WebGL2RenderingContext);
    config.spoof.webgl.parameter(WebGLRenderingContext);
    config.spoof.webgl.parameter(WebGL2RenderingContext);
    // document.documentElement.dataset.wgscriptallow = true;
};

var audiocontextInject = function () {
    const context = {
        BUFFER: null,
        getChannelData: function (e) {
            // @ts-ignore
            const getChannelData = e.prototype.getChannelData;
            Object.defineProperty(e.prototype, "getChannelData", {
                value: function () {
                    //@ts-ignore
                    const results = getChannelData.apply(this, arguments);
                    if (context.BUFFER !== results) {
                        // @ts-ignore
                        context.BUFFER = results;
                        for (var i = 0; i < results.length; i += 100) {
                            let index = Math.floor(audioContextOffset * i);
                            results[index] += audioContextOffset * 0.0000001;
                        }
                    }
                    return results;
                },
            });
        },
        createAnalyser: function (e) {
            // @ts-ignore
            const createAnalyser = e.prototype.__proto__.createAnalyser;
            // @ts-ignore
            Object.defineProperty(e.prototype.__proto__, "createAnalyser", {
                value: function () {
                    const results = createAnalyser.apply(this, arguments);
                    const getFloatFrequencyData = results.__proto__.getFloatFrequencyData;
                    Object.defineProperty(results.__proto__, "getFloatFrequencyData", {
                        value: function () {
                            for (var i = 0; i < arguments[0].length; i += 100) {
                                let index = Math.floor(audioContextOffset * i);
                                arguments[0][index] += audioContextOffset * 0.1;
                            }
                            return getFloatFrequencyData.apply(this, arguments);
                        },
                    });
                    return results;
                },
            });
        },
    };
    context.getChannelData(AudioBuffer);
    context.createAnalyser(AudioContext);
    context.getChannelData(OfflineAudioContext);
    context.createAnalyser(OfflineAudioContext);
    // document.documentElement.dataset.acxscriptallow = true;
};
function spoofer() {

    switch (browser) {
        case "safari":
            changeBrowserToSafari();
            webglParam37445 = "Apple Inc."
            webglParam37446 = "Apple GPU"
        case "chrome-ios":
            changeBrowserToChromeIos()
            webglParam37445 = "Apple Inc."
            webglParam37446 = "Apple GPU"
    }
    audiocontextInject();
    webglInject();
    fontInject();
    specsInject();

    if (historyCount) {
        spoofHistory(historyCount);
    }
    if (hasBattery) {
        injectBattery();
    }
    canvas(canvasSpoofIndexes);
}
// Listen for the custom event
document.addEventListener('SpoofdataFetchedEvent', function (event) {
    console.log(event.detail)
    fontHeightOffset = parseFloat(event.detail.fontHeightOffset);
    fontWidthOffset = parseFloat(event.detail.fontWidthOffset);
    // Cast string to boolean
    hasBattery = event.detail.hasBattery == "false" ? false : true;
    browser = event.detail.browser;
    webglValueIndexSeed = parseFloat(event.detail.webglValueIndexSeed);
    webglValueOffset = parseFloat(event.detail.webglValueOffset);
    audioContextOffset = parseFloat(event.detail.audioContextOffset);
    webglParam37445 = event.detail.webglParam37445;
    webglParam37446 = event.detail.webglParam37446;
    memory = parseInt(event.detail.memory);
    referrer = event.detail.referrer;
    canvasSpoofIndexes = JSON.parse(event.detail.canvasIndexes);
    historyCount = event.detail.windowHistoryCount;
    spoofer();
});
// bot.incolumitas.com always uses webworker WorkerNavigator correspondence with original navigator's data(deviceMemory in our case),
// It's not possible to influence the execution context of another webworker, i might look into spoofing deviceMemory even in another worker.