interface HardwareSpecs {
    memory: number;
    hardwareConcurrency: number;
}

var hardwareSpecs = {
    memory: 4,
    hardwareConcurrency: 4,
}

var referer = '';
var browserVendor = '';
var fontHeightOffset = 0;
var fontWidthOffset = 0;

var canvasOffsetRed = 0, canvasOffsetGreen = 0, canvasOffsetBlue = 0, canvasOffsetAlpha = 0;

var webglValueIndexSeed = 0.234567654, webglValueOffset = 0.05;

var audioContextOffset = 0.5

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

var specsInject = function () {
    const originalDeviceMemoryDescriptor = Object.getOwnPropertyDescriptor(Navigator.prototype, 'deviceMemory');
    const originalVendorDescriptor = Object.getOwnPropertyDescriptor(Navigator.prototype, 'vendor');
    const originalRefererDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'referer');
    Object.defineProperty(Navigator.prototype, 'deviceMemory', {
        get() {
            return hardwareSpecs['memory']
        }
    });
    if (browserVendor) {
        Object.defineProperty(Navigator.prototype, "vendor", {
            get() {
                return browserVendor
            }
        });
    }
    if (referer) {
        Object.defineProperty(Document.prototype, "referrer", {
            get() {
                return referer;
            }
        });
    }

    Object.getOwnPropertyDescriptor = (obj, prop) => {
        if (obj === Navigator.prototype) {
            switch (prop) {
                case 'deviceMemory':
                    return originalDeviceMemoryDescriptor;
                case 'vendor':
                    return originalVendorDescriptor;
            }
        } else if (obj === Document.prototype) {
            switch (prop) {
                case 'referer':
                    originalRefererDescriptor
            }
        }
        return Reflect.getOwnPropertyDescriptor(obj, prop);
    };

};

var fontInject = function () {
    var rand = {
        noise: function () {
            var SIGN = Math.random() < Math.random() ? -1 : 1;
            console.log(Math.floor(Math.random() + SIGN * Math.random()));
            return Math.floor(Math.random() + SIGN * Math.random());
        },
        sign: function () {
            const tmp = [-1, -1, -1, -1, -1, -1, +1, -1, -1, -1];
            const index = Math.floor(Math.random() * tmp.length);
            return tmp[index];
        }
    };

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        get() {
            const height = Math.floor(this.getBoundingClientRect().height);
            const result = height + fontHeightOffset;
            return result;
        }
    });

    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        get() {
            const width = Math.floor(this.getBoundingClientRect().width);
            const result = width + fontWidthOffset;
            return result;
        }
    });
};

var webglInject = function () {
    var config = {
        random: {
            value: function () {
                return Math.random();
            },
            item: function (e: any[]) {
                var rand = e.length * config.random.value();
                return e[Math.floor(rand)];
            },
            number: function (power: [number] | number) {
                if (Array.isArray(power)) {
                    return Math.pow(2, config.random.item(power));
                }
                return Math.pow(2, power);
            },
            int: function (power: [Int32Array] | number) {
                if (Array.isArray(power)) {
                    // @ts-ignore
                    return config.random.item(power.map(p => new Int32Array([Math.pow(2, p), Math.pow(2, p)])));
                }
                return new Int32Array([Math.pow(2, power), Math.pow(2, power)]);
            },
            float: function (power: [Float32Array] | number) {
                if (Array.isArray(power)) {
                    // @ts-ignore
                    return config.random.item(power.map(p => new Float32Array([1, Math.pow(2, p)])));
                }
                return new Float32Array([1, Math.pow(2, power)]);
            }
        },
        spoof: {
            webgl: {
                buffer: function (target: typeof WebGLRenderingContext | typeof WebGL2RenderingContext) {
                    var proto = target.prototype;
                    const bufferData = proto.bufferData;
                    Object.defineProperty(proto, "bufferData", {
                        value: function () {
                            if (Math.min(...arguments[1]) >= 0 && arguments[1].constructor == Float32Array) {
                                var index = Math.floor(webglValueIndexSeed * arguments[1].length);
                                var noise = 0.1 * webglValueOffset;
                                arguments[1][index] = arguments[1][index] <= 0.5 ? arguments[1][index] + noise : arguments[1][index] - noise;
                            }
                            // @ts-ignore
                            return bufferData.apply(this, arguments);
                        }
                    });
                },
                parameter: function (target: typeof WebGLRenderingContext | typeof WebGL2RenderingContext) {
                    var proto = target.prototype;
                    const getParameter = proto.getParameter;
                    Object.defineProperty(proto, "getParameter", {
                        value: function () {
                            switch (arguments[0]) {
                                case 3415: return 0;
                                case 3414: return 24;
                                case 36348: return 30;
                                case 7936: return "WebKit";
                                case 37445: return webglParam37445;
                                case 7937: return "WebKit WebGL";
                                case 3379: return config.random.number(webglParam3379);
                                case 36347: return config.random.number(webglParam36347);
                                case 34076: return config.random.number(webglParam34076);
                                case 34024: return config.random.number(webglParam34024);
                                case 3386: return config.random.int(webglParam3386);
                                case 3413: return config.random.number(webglParam3413);
                                case 3412: return config.random.number(webglParam3412);
                                case 3411: return config.random.number(webglParam3411);
                                case 3410: return config.random.number(webglParam3410);
                                case 34047: return config.random.number(webglParam34047);
                                case 34930: return config.random.number(webglParam34930);
                                case 34921: return config.random.number(webglParam34921);
                                case 35660: return config.random.number(webglParam35660);
                                case 35661: return config.random.number(webglParam35661);
                                case 36349: return config.random.number(webglParam36349);
                                case 33902: return config.random.float(webglParam33902);
                                case 33901: return config.random.float(webglParam33901);
                                case 37446: return webglParam37446;
                                default:
                                    // @ts-ignore
                                    return getParameter.apply(this, arguments);
                            }
                        }
                    });
                }
            }
        }
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
        getChannelData: function (e: typeof AudioBuffer | typeof OfflineAudioContext) {
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
                }
            });
        },
        createAnalyser: function (e: typeof AudioContext | typeof OfflineAudioContext) {
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
                        }
                    });
                    return results;
                }
            });
        }
    };
    context.getChannelData(AudioBuffer);
    context.createAnalyser(AudioContext);
    context.getChannelData(OfflineAudioContext);
    context.createAnalyser(OfflineAudioContext);
    // document.documentElement.dataset.acxscriptallow = true;
};

var canvasInject = function () {
    const toBlob = HTMLCanvasElement.prototype.toBlob;
    const toDataURL = HTMLCanvasElement.prototype.toDataURL;
    const getImageData = CanvasRenderingContext2D.prototype.getImageData;

    var noisify = function (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        if (context) {
            const shift = {
                r: Math.floor(canvasOffsetRed),
                g: Math.floor(canvasOffsetGreen),
                b: Math.floor(canvasOffsetBlue),
                a: Math.floor(canvasOffsetAlpha)
            };
            const width = canvas.width;
            const height = canvas.height;
            if (width && height) {
                const imageData = getImageData.apply(context, [0, 0, width, height]);
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        const n = ((i * (width * 4)) + (j * 4));
                        imageData.data[n + 0] = imageData.data[n + 0] == 0 || imageData.data[n + 0] == 255 ? imageData.data[n + 0] : imageData.data[n + 0] + shift.r;
                        imageData.data[n + 1] = imageData.data[n + 1] == 0 || imageData.data[n + 1] == 255 ? imageData.data[n + 1] : imageData.data[n + 1] + shift.g;
                        imageData.data[n + 2] = imageData.data[n + 2] == 0 || imageData.data[n + 2] == 255 ? imageData.data[n + 2] : imageData.data[n + 2] + shift.b;
                        imageData.data[n + 3] = imageData.data[n + 3] == 0 || imageData.data[n + 3] == 255 ? imageData.data[n + 3] : imageData.data[n + 3] + shift.a;
                    }
                }
                context.putImageData(imageData, 0, 0);
            }
        }
    };

    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
        value: function () {
            noisify(this, this.getContext("2d"));
            // @ts-ignore
            return toBlob.apply(this, arguments);
        }
    });

    Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
        value: function () {
            noisify(this, this.getContext("2d"));
            // @ts-ignore
            return toDataURL.apply(this, arguments);
        }
    });

    Object.defineProperty(CanvasRenderingContext2D.prototype, "getImageData", {
        value: function () {
            noisify(this.canvas, this);
            // @ts-ignore
            return getImageData.apply(this, arguments);
        }
    });

    // document.documentElement.dataset.cbscriptallow = true;
};
canvasInject();
audiocontextInject();
webglInject();
fontInject();
specsInject();