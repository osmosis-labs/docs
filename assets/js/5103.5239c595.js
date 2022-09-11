"use strict";
exports.id = 5103;
exports.ids = [5103];
exports.modules = {

/***/ 15103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_audio_visualizer": () => (/* binding */ DyteAudioVisualizer),
/* harmony export */   "dyte_switch": () => (/* binding */ DyteSwitch)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);



/*
WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
on @visionmedia's Emitter from UI Kit.

Why? I wanted it standalone.

I also wanted support for wildcard emitters like this:

emitter.on('*', function (eventName, other, event, payloads) {

});

emitter.on('somenamespace*', function (eventName, payloads) {

});

Please note that callbacks triggered by wildcard registered events also get
the event name as the first argument.
*/

var wildemitter = WildEmitter;

function WildEmitter() { }

WildEmitter.mixin = function (constructor) {
    var prototype = constructor.prototype || constructor;

    prototype.isWildEmitter= true;

    // Listen on the given `event` with `fn`. Store a group name if present.
    prototype.on = function (event, groupName, fn) {
        this.callbacks = this.callbacks || {};
        var hasGroup = (arguments.length === 3),
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];
        func._groupName = group;
        (this.callbacks[event] = this.callbacks[event] || []).push(func);
        return this;
    };

    // Adds an `event` listener that will be invoked a single
    // time then automatically removed.
    prototype.once = function (event, groupName, fn) {
        var self = this,
            hasGroup = (arguments.length === 3),
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];
        function on() {
            self.off(event, on);
            func.apply(this, arguments);
        }
        this.on(event, group, on);
        return this;
    };

    // Unbinds an entire group
    prototype.releaseGroup = function (groupName) {
        this.callbacks = this.callbacks || {};
        var item, i, len, handlers;
        for (item in this.callbacks) {
            handlers = this.callbacks[item];
            for (i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i]._groupName === groupName) {
                    //console.log('removing');
                    // remove it and shorten the array we're looping through
                    handlers.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
        return this;
    };

    // Remove the given callback for `event` or all
    // registered callbacks.
    prototype.off = function (event, fn) {
        this.callbacks = this.callbacks || {};
        var callbacks = this.callbacks[event],
            i;

        if (!callbacks) return this;

        // remove all handlers
        if (arguments.length === 1) {
            delete this.callbacks[event];
            return this;
        }

        // remove specific handler
        i = callbacks.indexOf(fn);
        if (i !== -1) {
            callbacks.splice(i, 1);
            if (callbacks.length === 0) {
                delete this.callbacks[event];
            }
        }
        return this;
    };

    /// Emit `event` with the given args.
    // also calls any `*` handlers
    prototype.emit = function (event) {
        this.callbacks = this.callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this.callbacks[event],
            specialCallbacks = this.getWildcardCallbacks(event),
            i,
            len,
            listeners;

        if (callbacks) {
            listeners = callbacks.slice();
            for (i = 0, len = listeners.length; i < len; ++i) {
                if (!listeners[i]) {
                    break;
                }
                listeners[i].apply(this, args);
            }
        }

        if (specialCallbacks) {
            len = specialCallbacks.length;
            listeners = specialCallbacks.slice();
            for (i = 0, len = listeners.length; i < len; ++i) {
                if (!listeners[i]) {
                    break;
                }
                listeners[i].apply(this, [event].concat(args));
            }
        }

        return this;
    };

    // Helper for for finding special wildcard event handlers that match the event
    prototype.getWildcardCallbacks = function (eventName) {
        this.callbacks = this.callbacks || {};
        var item,
            split,
            result = [];

        for (item in this.callbacks) {
            split = item.split('*');
            if (item === '*' || (split.length === 2 && eventName.slice(0, split[0].length) === split[0])) {
                result = result.concat(this.callbacks[item]);
            }
        }
        return result;
    };

};

WildEmitter.mixin(WildEmitter);

function getMaxVolume (analyser, fftBins) {
  var maxVolume = -Infinity;
  analyser.getFloatFrequencyData(fftBins);

  for(var i=4, ii=fftBins.length; i < ii; i++) {
    if (fftBins[i] > maxVolume && fftBins[i] < 0) {
      maxVolume = fftBins[i];
    }
  }
  return maxVolume;
}


var audioContextType;
if (typeof window !== 'undefined') {
  audioContextType = window.AudioContext || window.webkitAudioContext;
}
// use a single audio context due to hardware limits
var audioContext = null;
var hark = function(stream, options) {
  var harker = new wildemitter();

  // make it not break in non-supported browsers
  if (!audioContextType) return harker;

  //Config
  var options = options || {},
      smoothing = (options.smoothing || 0.1),
      interval = (options.interval || 50),
      threshold = options.threshold,
      play = options.play,
      history = options.history || 10,
      running = true;

  // Ensure that just a single AudioContext is internally created
  audioContext = options.audioContext || audioContext || new audioContextType();

  var sourceNode, fftBins, analyser;

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = smoothing;
  fftBins = new Float32Array(analyser.frequencyBinCount);

  if (stream.jquery) stream = stream[0];
  if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
    //Audio Tag
    sourceNode = audioContext.createMediaElementSource(stream);
    if (typeof play === 'undefined') play = true;
    threshold = threshold || -50;
  } else {
    //WebRTC Stream
    sourceNode = audioContext.createMediaStreamSource(stream);
    threshold = threshold || -50;
  }

  sourceNode.connect(analyser);
  if (play) analyser.connect(audioContext.destination);

  harker.speaking = false;

  harker.suspend = function() {
    return audioContext.suspend();
  };
  harker.resume = function() {
    return audioContext.resume();
  };
  Object.defineProperty(harker, 'state', { get: function() {
    return audioContext.state;
  }});
  audioContext.onstatechange = function() {
    harker.emit('state_change', audioContext.state);
  };

  harker.setThreshold = function(t) {
    threshold = t;
  };

  harker.setInterval = function(i) {
    interval = i;
  };

  harker.stop = function() {
    running = false;
    harker.emit('volume_change', -100, threshold);
    if (harker.speaking) {
      harker.speaking = false;
      harker.emit('stopped_speaking');
    }
    analyser.disconnect();
    sourceNode.disconnect();
  };
  harker.speakingHistory = [];
  for (var i = 0; i < history; i++) {
      harker.speakingHistory.push(0);
  }

  // Poll the analyser node to determine if speaking
  // and emit events if changed
  var looper = function() {
    setTimeout(function() {

      //check if stop has been called
      if(!running) {
        return;
      }

      var currentVolume = getMaxVolume(analyser, fftBins);

      harker.emit('volume_change', currentVolume, threshold);

      var history = 0;
      if (currentVolume > threshold && !harker.speaking) {
        // trigger quickly, short history
        for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }
        if (history >= 2) {
          harker.speaking = true;
          harker.emit('speaking');
        }
      } else if (currentVolume < threshold && harker.speaking) {
        for (var i = 0; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }
        if (history == 0) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }
      }
      harker.speakingHistory.shift();
      harker.speakingHistory.push(0 + (currentVolume > threshold));

      looper();
    }, interval);
  };
  looper();

  return harker;
};

/**
 * Draws audio visualizer of variant `bars`
 * @param canvas Canvas element
 * @param volume Current volume
 */
const drawBarsVisualizer = (canvas, volume) => {
  if (canvas == null) {
    return;
  }
  const nSlices = 3;
  const halfwaySlice = Math.round(nSlices / 2);
  const sample = [...Array(nSlices)].map((_, i) => {
    let index = i;
    if (index > halfwaySlice - 1) {
      index = nSlices - index - 1;
    }
    return Math.round(((index + 1) / (halfwaySlice + 1)) * volume);
  });
  const { width, height } = canvas;
  const context = canvas.getContext('2d');
  let x = 2;
  const sliceGraphicWidth = 4;
  const sliceWidth = (width * 1.0) / sample.length;
  const slicePadding = sliceWidth - sliceGraphicWidth;
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'rgb(0,0,0,0.0)';
  context.fillRect(0, 0, width, height);
  const color = getComputedStyle(canvas).getPropertyValue('color');
  context.fillStyle = color;
  context.strokeStyle = color;
  context.lineCap = 'round';
  context.lineWidth = 4;
  context.beginPath();
  for (const item of sample) {
    const y = Math.min(-Math.abs(((item * 1.2) / 10) * height) + height / 2, height / 2 - 2.5);
    const sliceHeight = Math.max((height / 2 - y) * 2, 5);
    context.moveTo(x + slicePadding / 2, y);
    context.lineTo(x + slicePadding / 2, y + sliceHeight);
    x += sliceWidth;
  }
  context.stroke();
};

const dyteAudioVisualizerCss = ":host{display:block;height:var(--dyte-space-6, 24px);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;font-family:var(--dyte-font-family, sans-serif)}canvas,dyte-icon{height:var(--dyte-space-6, 24px);width:var(--dyte-space-6, 24px)}:host([size='sm']){transform:scale(0.9)}canvas{display:none}canvas.visible{display:block}canvas.bars{--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}";

const DyteAudioVisualizer = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Variant */
    this.variant = 'bars';
    /** Icon Pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Audio visualizer for screensharing, it will use screenShareTracks.audio instead of audioTrack */
    this.isScreenShare = false;
    this.volume = 0;
  }
  connectedCallback() {
    this.participantChanged(this.participant);
  }
  componentDidLoad() {
    drawBarsVisualizer(this.visualizer, 0);
  }
  disconnectedCallback() {
    var _a, _b, _c;
    (_a = this.hark) === null || _a === void 0 ? void 0 : _a.stop();
    this.audioUpdateListener &&
      ((_b = this.participant) === null || _b === void 0 ? void 0 : _b.removeListener('audioUpdate', this.audioUpdateListener));
    this.screenShareUpdateListener &&
      ((_c = this.participant) === null || _c === void 0 ? void 0 : _c.removeListener('screenShareUpdate', this.screenShareUpdateListener));
  }
  participantChanged(participant) {
    if (participant != null) {
      this.audioUpdateListener = ({ audioEnabled, audioTrack }) => {
        var _a;
        (_a = this.hark) === null || _a === void 0 ? void 0 : _a.stop();
        if (audioEnabled && audioTrack != null) {
          this.audioEnabled = true;
          const stream = new MediaStream();
          stream.addTrack(audioTrack);
          this.calcVolume(stream);
          // initial draw with volume: 0
          drawBarsVisualizer(this.visualizer, 0);
        }
        else {
          this.volume = 0;
          this.audioEnabled = false;
        }
      };
      if (this.isScreenShare) {
        this.screenShareUpdateListener = ({ screenShareEnabled, screenShareTracks }) => {
          this.audioUpdateListener({
            audioEnabled: screenShareEnabled && screenShareTracks.audio != null,
            audioTrack: screenShareTracks.audio,
          });
        };
        this.screenShareUpdateListener(participant);
        participant.addListener('screenShareUpdate', this.screenShareUpdateListener);
      }
      else {
        this.audioUpdateListener(participant);
        participant.addListener('audioUpdate', this.audioUpdateListener);
      }
    }
  }
  /**
   * Determines the volume from a given MediaStream and updates the components state
   * @param stream A MediaStream with AudioTrack(s) added
   */
  calcVolume(stream) {
    this.hark = hark(stream, {
      play: false,
      interval: 1000 / 10,
    });
    this.hark.on('volume_change', (dBs) => {
      const prevVolume = this.volume;
      // The exact formula to convert from dBs (-100..0) to linear (0..1) is:
      //   Math.pow(10, dBs / 20)
      // However it does not produce a visually useful output, so let exagerate
      // it a bit. Also, let convert it from 0..1 to 0..10 and avoid value 1 to
      // minimize component renderings.
      // if dBs is -Inifnity, set vol to 0
      let audioVol = Math.round(10 ** (dBs / 115) * 10);
      if (audioVol < 3)
        audioVol = 0;
      let volume = Math.round((prevVolume * 2 + audioVol) / 3);
      if (prevVolume !== volume) {
        this.volume = volume;
        drawBarsVisualizer(this.visualizer, this.volume);
      }
    });
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("canvas", { width: "24", height: "24", class: {
        bars: true,
        visible: this.audioEnabled,
      }, ref: (el) => (this.visualizer = el), part: "canvas" }), !this.isScreenShare && !this.audioEnabled && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.mic_off, part: "mic-off-icon" }))));
  }
  static get watchers() { return {
    "participant": ["participantChanged"]
  }; }
};
DyteAudioVisualizer.style = dyteAudioVisualizerCss;

const dyteSwitchCss = ":host{box-sizing:border-box;display:inline-flex;height:var(--dyte-space-6, 24px);width:var(--dyte-space-10, 40px);align-items:center;padding:var(--dyte-space-1, 4px);border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));cursor:pointer}.switch{box-sizing:border-box;height:var(--dyte-space-4, 16px);width:var(--dyte-space-4, 16px);background-color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)));border-radius:9999px;transition-property:var(--dyte-transition-property, all);transition-duration:200ms}:host(.checked){--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}:host(.checked) .switch{transform:translateX(100%)}:host([readonly]),:host([disabled]){cursor:not-allowed;opacity:0.6}";

const DyteSwitch = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.dyteChange = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteChange", 4);
    /** Whether the switch is enabled/checked */
    this.checked = false;
    /** Whether switch is readonly */
    this.readonly = false;
    /** Whether switch is readonly */
    this.disabled = false;
    this.onClick = () => {
      if (!this.readonly && !this.disabled) {
        this.checked = !this.checked;
      }
    };
    this.onKeyPress = (e) => {
      if (this.readonly)
        return;
      switch (e.key) {
        // Enter or Space
        case 'Enter':
        case ' ':
          this.checked = !this.checked;
          break;
      }
    };
  }
  checkedChange(checked) {
    this.dyteChange.emit(checked);
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { role: "switch", tabIndex: this.disabled && 0, "aria-readonly": this.readonly, "aria-checked": this.checked, "aria-disabled": this.disabled, class: { checked: this.checked }, onClick: this.onClick, onKeyPress: this.onKeyPress }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "switch", part: "switch" })));
  }
  static get watchers() { return {
    "checked": ["checkedChange"]
  }; }
};
DyteSwitch.style = dyteSwitchCss;




/***/ })

};
;