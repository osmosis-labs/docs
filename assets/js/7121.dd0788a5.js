"use strict";
exports.id = 7121;
exports.ids = [7121];
exports.modules = {

/***/ 67121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_mixed_grid": () => (/* binding */ DyteMixedGrid)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47502);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(61070);
/* harmony import */ var _index_330fca84_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62292);
/* harmony import */ var _string_703da00e_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67553);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);








const dyteMixedGridCss = ":host{display:block;height:100%;width:100%;font-family:var(--dyte-font-family, sans-serif);display:flex}main{display:flex;padding-left:var(--dyte-space-4, 16px);flex:6}main #switcher{margin-right:var(--dyte-space-4, 16px);box-sizing:border-box;display:flex;height:100%;width:var(--dyte-space-16, 64px);flex-direction:column}main #tabs{height:100%;flex:1 1 0%}dyte-button{z-index:10}.aside{width:66.666667%;max-width:400px;flex:6}.tab{display:flex;height:var(--dyte-space-16, 64px);width:var(--dyte-space-16, 64px);align-items:center;justify-content:center;margin-bottom:var(--dyte-space-2, 8px);font-size:12px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.tab.active{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}.tab img{height:var(--dyte-space-7, 28px);width:var(--dyte-space-7, 28px);border-radius:var(--dyte-border-radius-sm, 4px)}@media (orientation: portrait){:host{flex-direction:column}:host .aside{width:100%;max-width:100%;flex:1 1 0%}:host main{height:50%;flex:none;flex-direction:column-reverse;padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px)}:host #switcher{margin-top:var(--dyte-space-4, 16px);height:var(--dyte-space-16, 64px);width:100%;flex-direction:row}:host #tabs{flex:1 1 0%}:host .tab{margin:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-2, 8px)}}:host([size='sm']){flex-direction:column}:host([size='sm']) .aside{width:100%;max-width:100%}:host([size='sm']) main{height:50%;flex:none;flex-direction:column-reverse;padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px)}:host([size='sm']) #switcher{margin-top:var(--dyte-space-4, 16px);height:var(--dyte-space-16, 64px);width:100%;flex-direction:row}:host([size='sm']) #tabs{flex:1 1 0%}:host([size='sm']) .tab{margin:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-2, 8px)}";

const DyteMixedGrid = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Participants */
    this.participants = [];
    /** Pinned Participants */
    this.pinnedParticipants = [];
    /** Screenshare Participants */
    this.screenShareParticipants = [];
    /** Active Plugins */
    this.plugins = [];
    /**
     * Aspect Ratio of participant tile
     *
     * Format: `width:height`
     */
    this.aspectRatio = '16:9';
    /** Gap between participant tiles */
    this.gap = 8;
    /** UI Config */
    this.config = _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Icon Pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_3__.u)();
  }
  componentWillLoad() {
    // initialise states
    this.initialised = false;
    this.screenShareParticipantsChanged(this.screenShareParticipants);
    this.pluginsChanged(this.plugins);
    this.initialised = true;
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.meeting.spotlight) === null || _a === void 0 ? void 0 : _a.removeListener('activeTabUpdate', this.spotlightTabUpdateListener);
  }
  meetingChanged(meeting) {
    var _a, _b, _c, _d;
    if (meeting != null) {
      if (((_a = meeting.spotlight) === null || _a === void 0 ? void 0 : _a.selfActiveTab) != undefined) {
        this.onSpotlightTabUpdate((_b = meeting.spotlight.selfActiveTab) === null || _b === void 0 ? void 0 : _b.type, (_c = meeting.spotlight.selfActiveTab) === null || _c === void 0 ? void 0 : _c.id);
      }
      this.spotlightTabUpdateListener = (spotlightTab) => {
        this.onSpotlightTabUpdate(spotlightTab === null || spotlightTab === void 0 ? void 0 : spotlightTab.type, spotlightTab === null || spotlightTab === void 0 ? void 0 : spotlightTab.id);
      };
      (_d = meeting.spotlight) === null || _d === void 0 ? void 0 : _d.addListener('activeTabUpdate', this.spotlightTabUpdateListener);
    }
  }
  screenShareParticipantsChanged(participants = []) {
    // If active tab has already been initialised by spotlight then don't change tab.
    if (!this.initialised && this.activeTab != null)
      return;
    if (this.activeTab == null && participants.length > 0) {
      this.setActiveTab({ type: 'screenshare', participant: participants[0] });
    }
    else {
      this.revalidateActiveTab();
    }
  }
  pluginsChanged(plugins) {
    // If active tab has already been initialised by spotlight then don't change tab.
    if (!this.initialised && this.activeTab != null)
      return;
    if (plugins.length > 0) {
      const lastIndex = plugins.length - 1;
      this.setActiveTab({ type: 'plugin', plugin: plugins[lastIndex] });
    }
    else {
      this.revalidateActiveTab();
    }
  }
  revalidateActiveTab() {
    if (this.activeTab != null) {
      if (this.activeTab.type === 'screenshare') {
        const { participant } = this.activeTab;
        if (!this.screenShareParticipants.some((p) => p.id === participant.id)) {
          this.reassignActiveTab();
        }
      }
      else {
        const { plugin } = this.activeTab;
        if (!this.plugins.some((p) => p.id === plugin.id)) {
          this.reassignActiveTab();
        }
      }
    }
  }
  setActiveTab(activeTab, shouldUpdateSelfActiveTab = true) {
    var _a;
    this.activeTab = activeTab;
    const id = activeTab.type === 'screenshare' ? activeTab.participant.id : activeTab.plugin.id;
    if (shouldUpdateSelfActiveTab)
      (_a = this.meeting.spotlight) === null || _a === void 0 ? void 0 : _a.setSelfActiveTab({ type: activeTab.type, id }, 0);
  }
  reassignActiveTab() {
    if (this.screenShareParticipants.length > 0) {
      this.setActiveTab({ type: 'screenshare', participant: this.screenShareParticipants[0] });
    }
    else if (this.plugins.length > 0) {
      const lastIndex = this.plugins.length - 1;
      this.setActiveTab({ type: 'plugin', plugin: this.plugins[lastIndex] });
    }
  }
  shouldShowSwitcher() {
    return this.screenShareParticipants.length + this.plugins.length > 1;
  }
  onSpotlightTabUpdate(type, id) {
    if (type == undefined)
      return;
    if (id == undefined)
      return;
    switch (type) {
      case 'plugin':
        const plugin = this.plugins.find((p) => p.id === id);
        if (plugin != undefined)
          this.setActiveTab({ type: 'plugin', plugin }, false);
        break;
      case 'screenshare':
        const participant = this.screenShareParticipants.find((ssp) => ssp.id === id);
        if (participant != undefined)
          this.setActiveTab({ type: 'screenshare', participant }, false);
    }
  }
  render() {
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("main", { id: "main-view", part: "main-view" }, this.shouldShowSwitcher() && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { id: "switcher", key: "switcher" }, this.screenShareParticipants.map((participant) => {
      var _a, _b, _c;
      const name = (0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_6__.f)(participant.name);
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { title: `${name}'s Screen Share`, key: participant.id, kind: "icon", class: {
          tab: true,
          active: ((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.type) === 'screenshare' &&
            ((_b = this.activeTab) === null || _b === void 0 ? void 0 : _b.participant.id) === participant.id,
        }, onClick: () => this.setActiveTab({ type: 'screenshare', participant }) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "center" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.share_screen_person }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "name" }, participant.id === ((_c = this.meeting) === null || _c === void 0 ? void 0 : _c.self.id)
        ? this.t('You')
        : (0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_6__.s)(name, 6)))));
    }), this.plugins.map((plugin) => {
      var _a, _b;
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { title: plugin.name, key: plugin.id, kind: "icon", class: {
          tab: true,
          active: ((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.type) === 'plugin' && ((_b = this.activeTab) === null || _b === void 0 ? void 0 : _b.plugin.id) === plugin.id,
        }, onClick: () => this.setActiveTab({ type: 'plugin', plugin }) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "center" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("img", { src: plugin.picture }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "name" }, (0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_6__.s)(plugin.name, 6)))));
    }))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { id: "tabs", key: "tabs" }, this.screenShareParticipants.map((participant) => {
      var _a, _b;
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_4__.R, { element: "dyte-screenshare-view", defaults: defaults, props: {
          participant,
          key: participant.id,
          style: {
            display: ((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.type) === 'screenshare' &&
              ((_b = this.activeTab) === null || _b === void 0 ? void 0 : _b.participant.id) === participant.id
              ? 'flex'
              : 'none',
          },
        }, childProps: { participant, isScreenShare: true }, deepProps: true }));
    }), this.plugins.map((plugin) => {
      var _a, _b;
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_4__.R, { element: "dyte-plugin-main", defaults: defaults, props: {
          plugin,
          key: plugin.id,
          style: {
            display: ((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.type) === 'plugin' && ((_b = this.activeTab) === null || _b === void 0 ? void 0 : _b.plugin.id) === plugin.id
              ? 'flex'
              : 'none',
          },
        } }));
    }))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_4__.R, { element: "dyte-mixed-grid", defaults: defaults, childProps: {
        part: 'participants-grid',
        class: 'aside',
        participants: this.participants,
        pinnedParticipants: this.pinnedParticipants,
        screenShareParticipants: this.screenShareParticipants,
        plugins: this.plugins,
        aspectRatio: this.aspectRatio,
        gap: this.gap,
        size: 'sm',
      }, onlyChildren: true })));
  }
  get host() { return (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.g)(this); }
  static get watchers() { return {
    "meeting": ["meetingChanged"],
    "screenShareParticipants": ["screenShareParticipantsChanged"],
    "plugins": ["pluginsChanged"]
  }; }
};
DyteMixedGrid.style = dyteMixedGridCss;




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

/***/ 67553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ sanitizeLink),
/* harmony export */   "f": () => (/* binding */ formatName),
/* harmony export */   "h": () => (/* binding */ hasOnlyEmojis),
/* harmony export */   "s": () => (/* binding */ shorten)
/* harmony export */ });
/**
 * Shorten a string upto a maximum length of characters and add `...` as suffix if it exceeds the maximum length
 * @param str The The string you want to shorten
 * @param maxLength Maximum length of character
 * @returns Formatted shortedned string
 */
const shorten = (str, maxLength = 20) => {
  if (str == null)
    return '';
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}...`;
  }
  return str;
};
/**
 * Checks if a given string consists of only emojis.
 *
 * However this classifies a string with numbers as emoji as well.
 * Which works in our favour for now in chat as it enlarges messages with just numbers.
 * @param str String on which to perform the check on
 * @returns A Boolean value which indicates if string consists of only emojis
 */
const hasOnlyEmojis = (str) => {
  const num = /^\d+$/;
  const re = /^\p{Emoji}+$/u;
  return re.test(str) && !num.test(str);
};
const sanitizeLink = (link) => {
  // TODO: needs more work
  if (link === null || link === void 0 ? void 0 : link.trim().toLowerCase().startsWith('javascript:')) {
    return 'https://dyte.io';
  }
  return link;
};
/**
 * Formats a given name and returns **Participant** for unnamed participants.
 * @param name Name of participant
 * @returns Name to use in the UI
 */
const formatName = (name) => {
  name = name === null || name === void 0 ? void 0 : name.trim();
  if (name === '')
    return 'Participant';
  return name;
};




/***/ })

};
;