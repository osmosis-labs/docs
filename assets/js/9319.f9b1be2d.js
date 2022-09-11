"use strict";
exports.id = 9319;
exports.ids = [9319];
exports.modules = {

/***/ 29319:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_meeting": () => (/* binding */ DyteMeeting)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _index_96b0df1d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72559);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7147);
/* harmony import */ var _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47502);
/* harmony import */ var _index_330fca84_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62292);
/* harmony import */ var _config_062dc574_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20358);
/* harmony import */ var _user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(58318);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(79781);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76851);
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(41969);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(55752);
/* harmony import */ var _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(60804);














const getIconPack = async (url) => {
  // check for both null/undefined
  if (url == null) {
    return _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__.d;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__.d;
    }
    // merge defaultIconPack with the received iconPack so as to
    // fill the missing icons with default ones
    return Object.assign({}, _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__.d, await res.json());
  }
  catch (_) {
    return _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__.d;
  }
};

const sm = 640;
const md = 768;
const lg = 1080;
const xl = 2160;
const breakpoints = {
	sm: sm,
	md: md,
	lg: lg,
	xl: xl
};

/**
 * Get the screen breakpoint from a given width
 * @param width The width of the container
 * @returns The screen breakpoint value
 */
const getSize = (width) => {
  if (width >= breakpoints.lg)
    return 'lg';
  else if (width >= breakpoints.md)
    return 'md';
  else
    return 'sm';
};

const dyteMeetingCss = ":host{box-sizing:border-box;display:flex;flex-direction:column;font-family:var(--dyte-font-family, sans-serif);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));overflow:hidden;position:fixed;top:var(--dyte-space-0, 0px);right:var(--dyte-space-0, 0px);bottom:var(--dyte-space-0, 0px);left:var(--dyte-space-0, 0px);height:100%;width:100%}:host([mode='fill']){position:relative}";

const DyteMeeting = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    this.roomJoinedListener = () => {
      this.setStates({ meeting: 'joined' });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.meeting = 'joined';
    };
    this.waitlistedListener = () => {
      this.setStates({ meeting: 'waiting' });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.meeting = 'waiting';
    };
    this.roomLeftListener = ({ state: state$1 }) => {
      const states = this.states || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s;
      if ((states === null || states === void 0 ? void 0 : states.roomLeftState) === 'disconnected') {
        this.setStates({ meeting: 'ended' });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.meeting = 'ended';
        return;
      }
      this.setStates({ meeting: 'ended', roomLeftState: state$1 });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.meeting = 'ended';
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.roomLeftState = state$1;
    };
    this.mediaPermissionErrorListener = ({ kind }) => {
      if (['audio', 'video'].includes(kind)) {
        this.setStates({ activePermissionsMessage: true });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activePermissionsMessage = true;
      }
    };
    this.joinStateAcceptedListener = () => {
      this.setStates({ activeJoinStage: true });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeJoinStage = true;
    };
    /** Whether to load config from preset */
    this.loadConfigFromPreset = true;
    /** Whether to apply the design system on the document root from config */
    this.applyDesignSystem = true;
    /** Fill type */
    this.mode = 'fixed';
    /** Language */
    this.language = 'en';
    /** UI Config */
    this.config = _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_4__.d;
    this.states = {
      meeting: 'idle',
      prefs: {
        mirrorVideo: true,
        muteNotificationSounds: false,
        autoScroll: true,
      },
    };
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__.d;
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
  }
  connectedCallback() {
    var _a;
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.host);
    if (this.applyDesignSystem &&
      ((_a = this.config) === null || _a === void 0 ? void 0 : _a.designTokens) != null &&
      typeof document !== 'undefined') {
      (0,_config_062dc574_js__WEBPACK_IMPORTED_MODULE_6__.p)(document.documentElement, this.config.designTokens);
    }
    this.meetingChanged(this.meeting);
    this.iconPackUrlChanged(this.iconPackUrl);
    this.languageChanged(this.language);
    this.initializePreferences();
  }
  clearListeners(meeting) {
    var _a;
    if (meeting == undefined)
      return;
    meeting.self.removeListener('roomJoined', this.roomJoinedListener);
    meeting.self.removeListener('roomLeft', this.roomLeftListener);
    meeting.self.removeListener('mediaPermissionError', this.mediaPermissionErrorListener);
    meeting.self.removeListener('waitlisted', this.waitlistedListener);
    meeting.self.removeListener('joinStageRequestAccepted', this.joinStateAcceptedListener);
    (_a = meeting.connectedMeetings) === null || _a === void 0 ? void 0 : _a.removeAllListeners('moveToConnectedMeeting');
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this.clearListeners(this.meeting);
  }
  meetingChanged(meeting) {
    var _a, _b, _c;
    if (meeting == null)
      return;
    if (this.loadConfigFromPreset && meeting.self.suggestedTheme != null) {
      const theme = meeting.self.suggestedTheme;
      const { config, data } = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_9__.i)(theme)
        ? { config: _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_4__.d, data: { showSetupScreen: true } }
        : (0,_config_062dc574_js__WEBPACK_IMPORTED_MODULE_6__.g)(theme);
      if (this.config === _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_4__.d) {
        // only override the config if the object is same as defaultConfig
        // which means it's a different object passed via prop
        this.config = config;
      }
      if (this.showSetupScreen == null) {
        // only override this value if the prop isn't passed
        this.showSetupScreen = data.showSetupScreen;
      }
      meeting.self.addListener('waitlisted', this.waitlistedListener);
      meeting.self.addListener('roomJoined', this.roomJoinedListener);
      meeting.self.addListener('roomLeft', this.roomLeftListener);
      meeting.self.addListener('mediaPermissionError', this.mediaPermissionErrorListener);
      meeting.self.addListener('joinStageRequestAccepted', this.joinStateAcceptedListener);
      if (this.applyDesignSystem &&
        ((_a = this.config) === null || _a === void 0 ? void 0 : _a.designTokens) != null &&
        typeof document !== 'undefined') {
        (0,_config_062dc574_js__WEBPACK_IMPORTED_MODULE_6__.p)(document.documentElement, this.config.designTokens);
      }
      if (this.showSetupScreen && this.newMeeting == null) {
        this.states = Object.assign(Object.assign({}, this.states), { meeting: 'setup' });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.meeting = 'setup';
      }
      else {
        // join directly to the meeting
        meeting.joinRoom();
      }
    }
    meeting.self.addListener('roomJoined', this.roomJoinedListener);
    meeting.self.addListener('roomLeft', this.roomLeftListener);
    meeting.self.addListener('mediaPermissionError', this.mediaPermissionErrorListener);
    (_b = meeting.connectedMeetings) === null || _b === void 0 ? void 0 : _b.addListener('connectedMeetingState', (data) => {
      var _a;
      if (((_a = data.meetings) === null || _a === void 0 ? void 0 : _a.filter((x) => x.status !== 'INACTIVE').length) == 0) {
        this.stateUpdate.emit({
          activeBreakoutRoomGrid: false,
          activeBreakoutRooms: false,
        });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeBreakoutRoomGrid = false;
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeBreakoutRooms = false;
      }
      else {
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeBreakoutRooms = true;
        this.stateUpdate.emit({
          activeBreakoutRooms: true,
        });
      }
    });
    if (this.applyDesignSystem &&
      ((_c = this.config) === null || _c === void 0 ? void 0 : _c.designTokens) != null &&
      typeof document !== 'undefined') {
      (0,_config_062dc574_js__WEBPACK_IMPORTED_MODULE_6__.p)(document.documentElement, this.config.designTokens);
    }
    if (this.showSetupScreen) {
      this.states = Object.assign(Object.assign({}, this.states), { meeting: 'setup' });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.meeting = 'setup';
    }
    else {
      // join directly to the meeting
      meeting.joinRoom();
    }
    meeting.connectedMeetings.on('moveToConnectedMeeting', async ({ meetingId, authToken }) => {
      var _a, _b, _c, _d;
      let activeOverlayModal = {
        active: true,
        icon: this.iconPack.breakout_rooms,
        title: 'Breakout Rooms Initiated',
        description: 'You are being moved to a breakout room. it may take a few moments.',
      };
      if (meeting.meta.roomName !== ((_a = meeting.connectedMeetings.parentMeeting) === null || _a === void 0 ? void 0 : _a.id)) {
        activeOverlayModal = {
          active: true,
          icon: this.iconPack.breakout_rooms,
          title: `Switching to ${(_c = (_b = meeting.connectedMeetings.list.find((x) => x.id === meetingId)) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : 'Main Room'}`,
          description: 'It may take a few moments.',
        };
      }
      this.stateUpdate.emit({
        activeOverlayModal,
        activeBreakoutRoomGrid: false,
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeOverlayModal = activeOverlayModal;
      const switchedMeeting = await meeting.connectedMeetings.switchMeeting({
        authToken,
        defaults: {
          audio: false,
          video: false,
        },
      });
      this.clearListeners((_d = this.newMeeting) !== null && _d !== void 0 ? _d : this.meeting);
      const roomLeftState = 'breakout-rooms';
      if (this.newMeeting != null) {
        await this.newMeeting.leaveRoom(roomLeftState);
      }
      else {
        await this.meeting.leaveRoom(roomLeftState);
      }
      this.newMeeting = switchedMeeting;
      window.newM = this.newMeeting;
      this.meetingChanged(this.newMeeting);
      this.stateUpdate.emit({
        activeOverlayModal: { active: false },
        activeBreakoutRooms: true,
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeOverlayModal = { active: false };
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.activeBreakoutRooms = true;
    });
  }
  async iconPackUrlChanged(url) {
    this.iconPack = await getIconPack(url);
  }
  async languageChanged(lang) {
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)(await (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.g)(lang));
  }
  listenState(e) {
    e.stopPropagation();
    this.setStates(e.detail);
  }
  initializePreferences() {
    const prefs = (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_7__.g)();
    this.setStates({ prefs });
    _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s.prefs = prefs;
  }
  handleResize() {
    this.size = getSize(this.host.clientWidth);
  }
  setStates(states) {
    const newStates = Object.assign({}, this.states);
    (0,_index_96b0df1d_js__WEBPACK_IMPORTED_MODULE_1__.l)(newStates, states);
    this.states = newStates;
  }
  render() {
    var _a;
    const defaults = {
      meeting: (_a = this.newMeeting) !== null && _a !== void 0 ? _a : this.meeting,
      size: this.size,
      states: this.states || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_8__.s,
      config: this.config,
      iconPack: this.iconPack,
      t: this.t,
    };
    return (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_5__.R, { element: "dyte-meeting", defaults: defaults, asHost: true });
  }
  get host() { return (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.g)(this); }
  static get watchers() { return {
    "meeting": ["meetingChanged"],
    "iconPackUrl": ["iconPackUrlChanged"],
    "language": ["languageChanged"]
  }; }
};
DyteMeeting.style = dyteMeetingCss;




/***/ }),

/***/ 60804:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ gracefulStorage$1)
/* harmony export */ });
const handler = {
  get: (target, name, receiver) => (...args) => {
    try {
      return Reflect.get(target, name, receiver).apply(target, args);
    }
    catch (_a) {
      return null;
    }
  },
};
let gracefulStorage;
try {
  gracefulStorage = new Proxy(localStorage, handler);
}
catch (_a) {
  gracefulStorage = new Proxy({}, handler);
}
const gracefulStorage$1 = gracefulStorage;




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

/***/ 62292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ Render)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);


/**
 * Computes selectors and returns them based on their priority.
 */
const computeSelectors = ({ element, size, states = {}, config = {}, }) => {
  let selectors = [];
  const data = config === null || config === void 0 ? void 0 : config.root[element];
  const add = (selector) => {
    selectors.push(selector);
    if (typeof size === 'string') {
      selectors.push(`${selector}.${size}`);
    }
  };
  add(element);
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    // check if the data variable is an object, strictly and not an array or just null
    const { state, states: elementStates } = data;
    let selector = element;
    let activeStates = [];
    if (Array.isArray(elementStates)) {
      activeStates = elementStates.filter((state) => states[state]);
      activeStates.sort();
      for (const state of activeStates) {
        add(`${selector}.${state}`);
      }
      if (activeStates.length > 1) {
        const booleanStateSelector = [selector, ...activeStates].join('.');
        add(booleanStateSelector);
      }
    }
    if (typeof state === 'string') {
      // dyte-meeting[meeting=joined]
      const keyValueSelector = `${element}[${state}=${states[state]}]`;
      add(keyValueSelector);
      for (const state of activeStates) {
        add(`${keyValueSelector}.${state}`);
      }
      if (activeStates.length > 1) {
        const withBooleanStateSelector = [keyValueSelector, ...activeStates].join('.');
        add(withBooleanStateSelector);
      }
    }
  }
  return selectors;
};
/**
 * Returns the computed styles - styles obtained from combining styles from all computed selectors
 * on the basis of their priorities.
 */
const getComputedStyles = ({ selectors, styles }) => {
  if (!Array.isArray(selectors) || styles == null)
    return {};
  const computedStyles = {};
  for (const selector of selectors) {
    const style = styles[selector];
    if (style != null) {
      Object.assign(computedStyles, style);
    }
  }
  return computedStyles;
};
/**
 * Returns the computed children which are to be rendered inside an element
 */
const getComputedChildren = ({ selectors, root }) => {
  if (!Array.isArray(selectors) || root == null)
    return [];
  for (let i = selectors.length - 1; i >= 0; i--) {
    const selector = selectors[i];
    const children = root[selector];
    if (Array.isArray(children)) {
      return children;
    }
    else if (Array.isArray(children === null || children === void 0 ? void 0 : children.children)) {
      return children.children;
    }
  }
  return [];
};

/**
 * Renders the children of an element.
 */
const RenderChildren = ({ elements, defaults, props = {}, deepProps = false, }) => {
  if (!Array.isArray(elements) || elements.length === 0)
    return null;
  return elements.map((element) => {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(Render, { element: element, defaults: defaults, props: props, childProps: deepProps && props }));
  });
};
/**
 * Renders an element from UI Config
 */
const Render = ({ element, defaults, childProps = {}, props = {}, onlyChildren = false, asHost = false, deepProps = false, }, children) => {
  var _a;
  const { config, size, states } = defaults;
  let Tag, configProps = {};
  if (Array.isArray(element)) {
    // get props if element is passed in array form:
    // ['dyte-participant-tile', { variant: 'gradient' }]
    [Tag, configProps] = element;
  }
  else {
    Tag = element;
  }
  const elemData = (_a = config === null || config === void 0 ? void 0 : config.root) === null || _a === void 0 ? void 0 : _a[Tag];
  if (elemData != null && 'props' in elemData) {
    props = Object.assign(Object.assign({}, elemData['props']), props);
  }
  props = Object.assign(Object.assign({}, props), configProps);
  const selectors = computeSelectors({ element: Tag, size, states, config });
  const computedChildren = getComputedChildren({ selectors, root: config.root });
  if (onlyChildren) {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(RenderChildren, { elements: computedChildren, defaults: defaults, props: childProps, deepProps: deepProps }));
  }
  const styles = getComputedStyles({ selectors, styles: config.styles });
  if (asHost) {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, Object.assign({}, defaults, { style: styles }, props),
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(RenderChildren, { elements: computedChildren, defaults: defaults, props: childProps, deepProps: deepProps }),
      children));
  }
  if (Tag.startsWith('dyte-')) {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(Tag, Object.assign({}, defaults, { style: styles }, props),
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(RenderChildren, { elements: computedChildren, defaults: defaults, props: childProps, deepProps: deepProps }),
      children));
  }
  else {
    const [HTMLTag, id] = Tag.split('#');
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(HTMLTag, { id: id, style: styles },
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(RenderChildren, { elements: computedChildren, defaults: defaults, props: childProps, deepProps: deepProps }),
      children));
  }
};




/***/ }),

/***/ 79781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ onChange),
/* harmony export */   "s": () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);


const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.a !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.a)();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.f));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.f));
            cleanupElements(elmsToUpdate);
        },
    };
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

const { state, onChange } = createStore({});




/***/ }),

/***/ 58318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ getPreference),
/* harmony export */   "g": () => (/* binding */ getUserPreferences),
/* harmony export */   "s": () => (/* binding */ setPreference)
/* harmony export */ });
/* harmony import */ var _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60804);


const KEY = 'dyte-prefs';
const setPreference = (key, value) => {
  const data = JSON.parse(_graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.getItem(KEY) || '{}');
  data[key] = JSON.stringify(value);
  _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.setItem('dyte-prefs', JSON.stringify(data));
};
const getPreference = (key) => {
  const data = JSON.parse(_graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.getItem(KEY) || '{}');
  return data[key];
};
const getUserPreferences = () => {
  const prefs = JSON.parse(_graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.getItem(KEY) || '{}');
  const mirrorVideo = prefs['mirror-video'] ? prefs['mirror-video'] === 'true' : true;
  const muteNotificationSounds = prefs['mute-notification-sounds']
    ? prefs['mute-notification-sounds'] === 'true'
    : false;
  const autoScroll = prefs['auto-scroll'] ? prefs['auto-scroll'] === 'true' : true;
  return { mirrorVideo, muteNotificationSounds, autoScroll };
};




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