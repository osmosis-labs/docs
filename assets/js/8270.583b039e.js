"use strict";
exports.id = 8270;
exports.ids = [8270];
exports.modules = {

/***/ 18270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_screen_share_toggle": () => (/* binding */ DyteScreenShareToggle)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _logger_52e6d49d_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29799);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76851);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41969);








const dyteScreenShareToggleCss = ":host{display:block;font-family:var(--dyte-font-family, sans-serif)}";

const deviceCanScreenShare = () => {
  return (typeof navigator !== 'undefined' &&
    typeof navigator.mediaDevices !== 'undefined' &&
    'getDisplayMedia' in navigator.mediaDevices);
};
const DyteScreenShareToggle = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Variant */
    this.variant = 'button';
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    /**
     * Maximum screen share count (value from preset)
     * -1 denotes there is no limit on maximum
     */
    this.maxScreenShareCount = -1;
    this.screenShareCount = 0;
    this.screenShareEnabled = false;
    this.canScreenShare = false;
    this.shareScreenPermission = 'NOT_REQUESTED';
    this.selfScreenShareListener = ({ screenShareEnabled }) => {
      this.screenShareEnabled = screenShareEnabled;
    };
    this.screenShareListener = ({ screenShareEnabled }) => {
      const currentCount = this.screenShareCount + (screenShareEnabled ? 1 : -1);
      this.screenShareCount = Math.max(currentCount, 0);
    };
    this.participantLeftListener = ({ screenShareEnabled }) => {
      if (screenShareEnabled) {
        // decrement count if participant who left had screenShareEnabled
        // and don't let it go below 0 (just a failsafe)
        this.screenShareCount = Math.max(this.screenShareCount - 1, 0);
      }
    };
    this.selfJoinStateListener = () => {
      this.updateCanProduce(this.meeting);
    };
    this.selfJoinStateRejectedListener = () => {
      this.updateCanProduce(this.meeting);
    };
    this.mediaPermissionErrorListener = ({ kind, message }) => {
      if (kind === 'screenshare') {
        this.shareScreenPermission = message;
      }
    };
    this.reachedMaxScreenShares = () => {
      // checks if a limit exists, and if limit is reached
      return this.maxScreenShareCount > 0 && this.screenShareCount >= this.maxScreenShareCount;
    };
    this.toggleScreenShare = () => {
      var _a;
      const self = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self;
      if (self == null ||
        !this.canScreenShare ||
        this.reachedMaxScreenShares() ||
        this.hasPermissionError()) {
        return;
      }
      if (self.screenShareEnabled) {
        self.disableScreenShare();
      }
      else {
        self.enableScreenShare();
      }
    };
  }
  connectedCallback() {
    if (!deviceCanScreenShare()) {
      _logger_52e6d49d_js__WEBPACK_IMPORTED_MODULE_3__.l.error('[dyte-screenshare-toggle] Device does not support screensharing.');
      return;
    }
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.participants.joined.removeListener('screenShareUpdate', this.screenShareListener);
    (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.participants.joined.removeListener('participantLeft', this.participantLeftListener);
    (_c = this.meeting) === null || _c === void 0 ? void 0 : _c.self.removeListener('screenShareUpdate', this.selfScreenShareListener);
    (_d = this.meeting) === null || _d === void 0 ? void 0 : _d.self.removeListener('mediaPermissionError', this.mediaPermissionErrorListener);
    (_e = this.meeting) === null || _e === void 0 ? void 0 : _e.self.removeListener('joinStageRequestAccepted', this.selfJoinStateListener);
    (_f = this.meeting) === null || _f === void 0 ? void 0 : _f.self.removeListener('joinStageRequestRejected', this.selfJoinStateRejectedListener);
    (_g = this.meeting) === null || _g === void 0 ? void 0 : _g.self.removeListener('stageJoined', this.selfJoinStateListener);
    (_h = this.meeting) === null || _h === void 0 ? void 0 : _h.self.removeListener('stageLeft', this.selfJoinStateListener);
    (_j = this.meeting) === null || _j === void 0 ? void 0 : _j.self.removeListener('removedFromStage', this.selfJoinStateListener);
  }
  meetingChanged(meeting) {
    var _a;
    if (meeting != null) {
      const self = meeting.self;
      this.canScreenShare = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.c)(_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.P.ScreenShare, self.permissions);
      this.updateCanProduce(meeting);
      this.maxScreenShareCount = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.a)(meeting.self.permissions)
        ? -1
        : (_a = meeting.self.permissions.maxScreenShareCount) !== null && _a !== void 0 ? _a : -1;
      this.screenShareEnabled = self.screenShareEnabled;
      let screenShareCount = 0;
      for (const participant of meeting.participants.joined.toArray()) {
        if (participant.screenShareEnabled) {
          screenShareCount++;
        }
      }
      this.screenShareCount = screenShareCount;
      meeting.participants.joined.addListener('screenShareUpdate', this.screenShareListener);
      meeting.participants.joined.addListener('participantLeft', this.participantLeftListener);
      self.addListener('screenShareUpdate', this.selfScreenShareListener);
      self.addListener('mediaPermissionError', this.mediaPermissionErrorListener);
      self.addListener('joinStageRequestAccepted', this.selfJoinStateListener);
      self.addListener('joinStageRequestRejected', this.selfJoinStateRejectedListener);
      self.addListener('stageJoined', this.selfJoinStateListener);
      self.addListener('stageLeft', this.selfJoinStateListener);
      self.addListener('removedFromStage', this.selfJoinStateListener);
    }
  }
  updateCanProduce(meeting) {
    const { self, meta } = meeting;
    const hasPermission = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.c)(_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.P.ScreenShare, self.permissions);
    const isWebinar = meta.viewType === 'WEBINAR';
    this.canScreenShare = false;
    if (!isWebinar && hasPermission) {
      this.canScreenShare = true;
    }
    if (isWebinar && hasPermission) {
      const canPresent = self.permissions.canPresent;
      const canRequest = self.permissions.requestProduce;
      // If the peer can present or has approved request to present
      if (canPresent ||
        (canRequest &&
          (self.webinarStageStatus === 'ON_STAGE' ||
            self.webinarStageStatus === 'ACCEPTED_TO_JOIN_STAGE'))) {
        this.canScreenShare = true;
      }
    }
  }
  hasPermissionError() {
    return (this.shareScreenPermission === 'SYSTEM_DENIED' ||
      this.shareScreenPermission === 'COULD_NOT_START');
  }
  getState() {
    let tooltipLabel = '';
    let label = '';
    let icon = '';
    let classList = {};
    const hasError = this.hasPermissionError();
    const limitReached = this.reachedMaxScreenShares();
    if (this.screenShareEnabled && !hasError) {
      label = this.t('share_screen_stop');
      icon = this.iconPack.share_screen_stop;
      classList['red-icon'] = true;
    }
    else {
      label = this.t('share_screen_start');
      icon = this.iconPack.share_screen_start;
    }
    if (this.shareScreenPermission === 'SYSTEM_DENIED') {
      tooltipLabel = this.t('perm_sys_denied');
      classList['red-icon'] = true;
    }
    else {
      tooltipLabel = label;
    }
    if (limitReached) {
      tooltipLabel = this.t('Maximum screen share limit reached');
    }
    return { tooltipLabel, label, icon, classList, showWarning: hasError || limitReached };
  }
  render() {
    if (!deviceCanScreenShare() || !this.canScreenShare) {
      return null;
    }
    const { tooltipLabel, label, icon, classList, showWarning } = this.getState();
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { title: label }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { placement: "top", kind: "block", label: tooltipLabel, delay: 600, part: "tooltip" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-controlbar-button", { part: "controlbar-button", size: this.size, iconPack: this.iconPack, variant: this.variant, label: label, icon: icon, class: classList, onClick: this.toggleScreenShare, disabled: showWarning, showWarning: showWarning }))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteScreenShareToggle.style = dyteScreenShareToggleCss;




/***/ }),

/***/ 61070:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ getLangData),
/* harmony export */   "u": () => (/* binding */ useLanguage)
/* harmony export */ });
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55752);


// Replace with cdn base path in prod
const LANG_BASE_URL = 'http://localhost:5000';
const getLangData = async (lang) => {
  if (lang == null || lang === 'en' || lang.trim() === '') {
    return _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d;
  }
  try {
    const res = await fetch(`${LANG_BASE_URL}/${lang}.json`);
    if (!res.ok) {
      return _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d;
    }
    // merge fetched language with defaultLanguage to avoid empty properties
    return Object.assign({}, _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d, await res.json());
  }
  catch (_) {
    return _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d;
  }
};
/**
 * Creates an i18n instance from a language dictionary/object.
 * @param lang The language dictionary
 * @returns A function which handles i18n
 */
const useLanguage = (lang = _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d) => {
  return (key) => {
    var _a;
    return (_a = lang[key]) !== null && _a !== void 0 ? _a : key;
  };
};




/***/ }),

/***/ 29799:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ loglevel)
/* harmony export */ });
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41969);


var loglevel = (0,_commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_0__.c)(function (module) {
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    if (module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(_commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_0__.a, function () {

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));
});

loglevel.enableAll();




/***/ }),

/***/ 76851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ ProduceType),
/* harmony export */   "a": () => (/* binding */ isV2Permissions),
/* harmony export */   "c": () => (/* binding */ canProduce),
/* harmony export */   "i": () => (/* binding */ isV2Theme)
/* harmony export */ });
// NOTE:(callmetarush) This file is just till
// we support both V1 and V2 api's.
const isV2Permissions = (permissions) => {
  return 'requestProduceVideo' in permissions;
};
const isV2Theme = (theme) => {
  return !('controlBar' in theme);
};
var ProduceType;
(function (ProduceType) {
  ProduceType[ProduceType["Video"] = 0] = "Video";
  ProduceType[ProduceType["Audio"] = 1] = "Audio";
  ProduceType[ProduceType["ScreenShare"] = 2] = "ScreenShare";
})(ProduceType || (ProduceType = {}));
const canProduce = (produceType, permissions) => {
  switch (produceType) {
    case ProduceType.Video: {
      return ((isV2Permissions(permissions)
        ? permissions.produceVideo
        : permissions.produceVideo.allow) === 'ALLOWED');
    }
    case ProduceType.Audio: {
      return ((isV2Permissions(permissions)
        ? permissions.produceAudio
        : permissions.produceAudio) === 'ALLOWED');
    }
    case ProduceType.ScreenShare: {
      return ((isV2Permissions(permissions)
        ? permissions.produceScreenshare
        : permissions.produceScreenshare.allow) === 'ALLOWED');
    }
  }
};




/***/ })

};
;