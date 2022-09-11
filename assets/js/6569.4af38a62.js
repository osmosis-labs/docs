"use strict";
exports.id = 6569;
exports.ids = [6569];
exports.modules = {

/***/ 96569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_breakout_room_grid": () => (/* binding */ DyteGrid)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _index_96b0df1d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72559);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79781);
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41969);






const dyteBreakoutRoomGridCss = ":host{display:flex;width:100%;flex-grow:1;flex-direction:column;margin-left:var(--dyte-space-4, 16px);margin-right:var(--dyte-space-4, 16px);border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));padding:var(--dyte-space-4, 16px);height:100%}.header{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.header p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px);font-size:16px;font-weight:500;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}h2{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px);font-size:16px;color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.buttons{display:flex;flex-direction:row;align-items:center}.buttons dyte-button{margin-left:var(--dyte-space-2, 8px)}.buttons dyte-button:nth-child(1){--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.buttons .button-row{display:flex;flex-direction:row;align-items:center}.buttons .button-row dyte-icon{margin-right:var(--dyte-space-1, 4px);height:var(--dyte-space-4, 16px)}.rooms-grid{margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-2, 8px);flex-grow:1;overflow:hidden}.rooms-grid div{display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));overflow-y:scroll;height:94%;grid-gap:16px}.rooms-grid::-webkit-scrollbar{width:var(--dyte-space-1\\.5, 6px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.rooms-grid::-webkit-scrollbar-thumb{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}";

const DyteGrid = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    this.editBreakout = () => {
      var _a, _b, _c;
      this.stateUpdate.emit({
        activeBreakoutRoomsManager: {
          active: !((_b = (_a = this.states) === null || _a === void 0 ? void 0 : _a.activeBreakoutRoomsManager) === null || _b === void 0 ? void 0 : _b.active),
          mode: 'edit',
        },
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomsManager = {
        active: !((_c = _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomsManager) === null || _c === void 0 ? void 0 : _c.active),
      };
      this.meeting.connectedMeetings.stateManager.reset();
      this.meeting.connectedMeetings.stateManager.init();
    };
    this.endBreakout = async () => {
      var _a;
      const activeOverlayModal = {
        active: true,
        icon: this.iconPack.breakout_rooms,
        title: 'Ending Breakout Rooms.',
        description: 'It may take a few moments.',
      };
      this.stateUpdate.emit({
        activeOverlayModal,
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeOverlayModal = activeOverlayModal;
      await this.meeting.connectedMeetings.deleteConnectedMeetings((_a = this.meeting.connectedMeetings.list) === null || _a === void 0 ? void 0 : _a.filter((meeting) => meeting.status === 'ACTIVE').map((m) => {
        return m.id;
      }));
      this.stateUpdate.emit({
        activeBreakoutRooms: false,
        activeBreakoutRoomGrid: false,
        activeOverlayModal: { active: false },
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRooms = false;
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomGrid = false;
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeOverlayModal = { active: false };
    };
    this.closeBreakoutGrid = () => {
      this.stateUpdate.emit({ activeBreakoutRoomGrid: false });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomGrid = false;
    };
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    const permissions = (_a = this.meeting.self.permissions) === null || _a === void 0 ? void 0 : _a.connectedMeetings;
    const activeMeeting = (_c = (_b = this.meeting.connectedMeetings) === null || _b === void 0 ? void 0 : _b.list) === null || _c === void 0 ? void 0 : _c.find((meeting) => meeting.id === this.meeting.meta.roomName);
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "header" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, "Breakout Rooms Overview"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "buttons" }, permissions.canAlterConnectedMeetings && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "ghost" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "button-row", onClick: this.editBreakout }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.edit }), "Edit Breakout"))), permissions.canAlterConnectedMeetings && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "danger", onClick: this.endBreakout }, "End Breakout")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", variant: "ghost", onClick: this.closeBreakoutGrid }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.dismiss })))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "rooms-grid" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-breakout-room-tile", { meeting: this.meeting, states: this.states, room: this.meeting.connectedMeetings.parentMeeting, isParent: true, isCurrent: ((_d = this.meeting.connectedMeetings.parentMeeting) === null || _d === void 0 ? void 0 : _d.id) === this.meeting.meta.roomName }), activeMeeting && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-breakout-room-tile", { meeting: this.meeting, states: this.states, room: activeMeeting, isCurrent: true })), (_f = (_e = this.meeting.connectedMeetings) === null || _e === void 0 ? void 0 : _e.list) === null || _f === void 0 ? void 0 :
      _f.map((room) => {
        if (room.status !== 'ACTIVE' || (activeMeeting === null || activeMeeting === void 0 ? void 0 : activeMeeting.id) === room.id)
          return;
        return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-breakout-room-tile", { meeting: this.meeting, states: this.states, room: room, isParent: false, isCurrent: (room === null || room === void 0 ? void 0 : room.id) === this.meeting.meta.roomName }));
      })))));
  }
};
DyteGrid.style = dyteBreakoutRoomGridCss;




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




/***/ })

};
;