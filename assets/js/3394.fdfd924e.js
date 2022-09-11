"use strict";
exports.id = 3394;
exports.ids = [3394];
exports.modules = {

/***/ 3394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_controlbar_button": () => (/* binding */ DyteControlbarButton)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);



const dyteControlbarButtonCss = ":host{--background-color:var(\n    --dyte-controlbar-button-background-color,\n    rgb(var(--dyte-colors-background-1000, 8 8 8))\n  );--icon-size:var(--dyte-controlbar-button-icon-size, var(--dyte-space-7, 28px));--button-spacing:var(--dyte-controlbar-button-spacing, var(--dyte-space-1, 4px));position:relative;box-sizing:border-box;display:inline-flex;padding:var(--dyte-space-1, 4px);font-family:var(--dyte-font-family, sans-serif);margin-left:var(--dyte-space-0\\.5, 2px);margin-right:var(--dyte-space-0\\.5, 2px);height:100%;width:auto;min-width:var(--dyte-space-20, 80px);-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--dyte-border-radius-md, 8px);transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;color:rgb(var(--dyte-colors-text-1000, 255 255 255));border:var(--dyte-border-width-md, 2px) solid transparent;background-color:var(--background-color)}button{font-family:var(--dyte-font-family, sans-serif)}:host(.red-icon) #icon{--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}:host([disabled]){color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}button{box-sizing:border-box;display:inline-flex;height:100%;width:100%;flex:1 1 0%;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-width:var(--dyte-border-width-none, 0);border-style:none;background-color:transparent;color:inherit;outline:2px solid transparent;outline-offset:2px}.label{text-align:center;font-size:12px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}#warning-indicator{position:absolute;top:var(--dyte-space-1, 4px);right:var(--dyte-space-2, 8px);height:var(--dyte-space-4, 16px);width:var(--dyte-space-4, 16px);--tw-text-opacity:1;color:rgba(var(--dyte-colors-warning, 255 205 7) / var(--tw-text-opacity))}:host([size='sm']) #warning-indicator{right:var(--dyte-space-0, 0px);top:var(--dyte-space-0, 0px);height:var(--dyte-space-3, 12px);width:var(--dyte-space-3, 12px)}:host(:hover){--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}#icon{margin-bottom:var(--button-spacing);width:var(--icon-size);height:var(--icon-size)}:host([size='sm']),:host([variant='horizontal']){--button-spacing:0px}:host(.leave:hover){--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity));border:var(--dyte-border-width-md, 2px) solid rgb(var(--dyte-colors-danger, 255 45 45))}:host(.active){--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-400, 53 110 253) / var(--tw-text-opacity));border:var(--dyte-border-width-md, 2px) solid rgb(var(--dyte-colors-brand-400, 53 110 253))}:host([size='sm']){margin-left:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-0, 0px);min-width:var(--dyte-space-14, 56px)}:host([size='sm']) .label{display:none}:host([variant='horizontal']){width:100%;padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px)}:host([variant='horizontal']) button{flex-direction:row;justify-content:flex-start}:host([variant='horizontal']) #icon{margin-right:var(--dyte-space-3, 12px)}:host([variant='horizontal']) .label{display:block;font-size:14px}:host([variant='horizontal']) #warning-indicator{right:auto;left:var(--dyte-space-4, 16px)}";

const DyteControlbarButton = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Variant */
    this.variant = 'button';
    /** Whether to show warning icon */
    this.showWarning = false;
    /** Whether button is disabled */
    this.disabled = false;
    /** Icon Pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("button", { "aria-label": this.label, disabled: this.disabled, part: "button" }, this.isLoading ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-spinner", { id: "icon", part: "spinner" })) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { id: "icon", icon: this.icon, tabIndex: -1, "aria-hidden": true, part: "icon" })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "label", part: "label" }, this.label), this.showWarning && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { id: "warning-indicator", icon: this.iconPack.warning, part: "warning-indicator" })))));
  }
};
DyteControlbarButton.style = dyteControlbarButtonCss;




/***/ })

};
;