"use strict";
exports.id = 1742;
exports.ids = [1742];
exports.modules = {

/***/ 41742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_sidebar": () => (/* binding */ DyteSidebar)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _index_330fca84_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62292);
/* harmony import */ var _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47502);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79781);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76851);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(55752);









const dyteSidebarCss = ":host{position:relative;box-sizing:border-box;display:flex;width:100%;max-width:var(--dyte-space-80, 320px);flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));font-family:var(--dyte-font-family, sans-serif);color:rgb(var(--dyte-colors-text-1000, 255 255 255));overflow:hidden}.close{position:absolute;top:var(--dyte-space-3, 12px);left:var(--dyte-space-3, 12px)}.title{margin:var(--dyte-space-0, 0px);margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);-webkit-user-select:none;-moz-user-select:none;user-select:none;text-align:center;font-size:16px;font-weight:400}#mobile-header{margin-top:var(--dyte-space-2, 8px);display:flex;align-items:center;justify-content:space-evenly;border-bottom:var(--dyte-border-width-sm, 1px) solid rgb(var(--dyte-colors-background-600, 60 60 60))}#mobile-header dyte-button{border-bottom:var(--dyte-border-width-md, 2px) solid transparent;border-radius:var(--dyte-border-radius-none, 0)}#mobile-header dyte-button:hover{background-color:transparent}#mobile-header dyte-button.active{border-color:rgb(var(--dyte-colors-brand-400, 53 110 253))}dyte-chat,dyte-participants,dyte-plugins{flex:1}:host([view='sidebar']){margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);border-radius:var(--dyte-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}:host([view='full-screen']){position:absolute;top:var(--dyte-space-0, 0px);right:var(--dyte-space-0, 0px);bottom:var(--dyte-space-0, 0px);left:var(--dyte-space-0, 0px);z-index:50;max-width:100%;border:none}";

const DyteSidebar = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Enabled sections in sidebar */
    this.enabledSections = [
      'chat',
      'polls',
      'participants',
      'plugins',
    ];
    /** Default section */
    this.defaultSection = 'chat';
    /** Config */
    this.config = _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_4__.d;
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    /** View type */
    this.view = 'default';
    this.tab = this.defaultSection;
    this.close = () => {
      this.stateUpdate.emit({ activeSidebar: false, sidebar: this.defaultSection });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__.s.sidebar = this.tab;
    };
  }
  connectedCallback() {
    this.viewChanged(this.view);
    this.statesChanged(this.states);
    (0,_store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__.o)('sidebar', () => this.statesChanged());
  }
  disconnectedCallback() {
    this.keydownListener && document.removeEventListener('keydown', this.keydownListener);
  }
  statesChanged(s) {
    const states = s || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__.s;
    if ((states === null || states === void 0 ? void 0 : states.sidebar) != null) {
      this.tab = states.sidebar;
    }
  }
  viewChanged(view) {
    if (view === 'full-screen') {
      this.keydownListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.keydownListener);
    }
  }
  filterSections(sections) {
    if (!this.meeting.self.suggestedTheme)
      return sections;
    if ((0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_6__.i)(this.meeting.self.suggestedTheme))
      return sections;
    const theme = this.meeting.self.suggestedTheme;
    return sections.filter((item) => theme.controlBar.elements[item]);
  }
  viewSection(section) {
    this.tab = section;
    this.stateUpdate.emit({ activeSidebar: true, sidebar: this.tab });
    _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__.s.activeSidebar = true;
    _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__.s.sidebar = this.tab;
  }
  render() {
    var _a;
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_5__.s,
      size: this.size,
      t: this.t,
      iconPack: this.iconPack,
    };
    // NOTE(ishita1805): This makes it easier to use the sidebar component in isolation.
    if (((_a = this.states) === null || _a === void 0 ? void 0 : _a.activeSidebar) === false)
      return null;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, this.view === 'full-screen' && [
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("h3", { class: "title" }, this.t('About Call')),
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { id: "mobile-header" }, this.filterSections(this.enabledSections).map((section) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { key: section, variant: "ghost", class: { active: this.tab === section }, onClick: () => this.viewSection(section) }, this.t(section))))),
    ], (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "ghost", kind: "icon", class: "close", onClick: this.close, "aria-label": this.t('Close') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.dismiss })), this.view !== 'full-screen' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("h3", { class: "title" }, this.t(this.tab)), this.tab === 'chat' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_3__.R, { element: "dyte-chat", defaults: defaults }), this.tab === 'polls' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_3__.R, { element: "dyte-polls", defaults: defaults }), this.tab === 'participants' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_3__.R, { element: "dyte-participants", defaults: defaults }), this.tab === 'plugins' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_330fca84_js__WEBPACK_IMPORTED_MODULE_3__.R, { element: "dyte-plugins", defaults: defaults })));
  }
  static get watchers() { return {
    "states": ["statesChanged"],
    "view": ["viewChanged"]
  }; }
};
DyteSidebar.style = dyteSidebarCss;




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