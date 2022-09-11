"use strict";
exports.id = 5472;
exports.ids = [5472];
exports.modules = {

/***/ 25472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_plugin_main": () => (/* binding */ DytePluginMain)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76851);




const dytePluginMainCss = ":host{display:flex;height:100%;width:100%;flex-direction:column;overflow:hidden;border-radius:var(--dyte-border-radius-lg, 12px);font-family:var(--dyte-font-family, sans-serif);color:rgb(var(--dyte-colors-text-1000, 255 255 255))}header{display:flex;height:var(--dyte-space-8, 32px);align-items:center;justify-content:space-between;padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}header>div{display:flex;align-items:center}dyte-button{display:flex;height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px);flex-direction:column;align-items:center;border-radius:9999px}dyte-button dyte-icon{height:var(--dyte-space-3, 12px);width:var(--dyte-space-3, 12px)}iframe{display:block;flex:1 1 0%;margin:var(--dyte-space-0, 0px);border-width:var(--dyte-border-width-none, 0);border-style:none;padding:var(--dyte-space-0, 0px);outline:2px solid transparent;outline-offset:2px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-video-bg, 24 24 24) / var(--tw-bg-opacity))}.iframe-container{position:relative;height:100%;width:100%}.block-inputs{position:absolute;z-index:10;height:100%;width:100%;border-left-width:var(--dyte-border-width-none, 0);border-top-width:var(--dyte-border-width-lg, 4px);border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-border-opacity))}iframe{height:100%;width:100%}";

const DytePluginMain = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    this.canClosePlugin = false;
    this.canControl = true;
  }
  componentDidLoad() {
    this.meetingChanged(this.meeting);
    this.pluginChanged(this.plugin);
  }
  meetingChanged(meeting) {
    var _a;
    if (meeting != null) {
      const v1permissions = meeting.self.permissions;
      if (!(0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_2__.a)(v1permissions) && v1permissions.plugins.config !== undefined) {
        // camelcase ts normalizer in webcore also normalize uuid
        // temp hack
        Object.keys(v1permissions.plugins.config || {}).forEach((k) => {
          v1permissions.plugins.config[k.toLowerCase()] = v1permissions.plugins.config[k];
        });
        const normalizedPluginId = this.plugin.id.replace(new RegExp('-', 'g'), '');
        const whitelistedControl = (((_a = v1permissions.plugins.config[normalizedPluginId]) === null || _a === void 0 ? void 0 : _a.defaultAccess) || 'blacklist') ===
          'whitelist';
        if (this.plugin.enabledBy === meeting.self.userId || v1permissions.plugins.canEditAcl) {
          this.canControl = true;
        }
        else if (whitelistedControl) {
          this.canControl = false;
        }
      }
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.w)(() => {
        this.canClosePlugin = meeting.self.permissions.plugins.canClose;
      });
    }
  }
  pluginChanged(plugin) {
    if (plugin != null) {
      plugin.addPluginView(this.iframeEl);
    }
  }
  render() {
    if (this.plugin == null)
      return null;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("header", { part: "header" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, this.plugin.name), this.canClosePlugin && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", onClick: () => this.plugin.deactivate(), part: "button" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.dismiss }))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: 'iframe-container' }, !this.canControl && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "block-inputs" }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("iframe", { ref: (el) => (this.iframeEl = el), part: "iframe" }))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"],
    "plugin": ["pluginChanged"]
  }; }
};
DytePluginMain.style = dytePluginMainCss;




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