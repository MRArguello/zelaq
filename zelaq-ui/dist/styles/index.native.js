"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/styles/index.native.ts
var index_native_exports = {};
__export(index_native_exports, {
  ThemeProvider: () => import_native.ThemeProvider,
  createGlobalStyle: () => createGlobalStyle,
  css: () => import_native.css,
  styled: () => import_native.styled
});
module.exports = __toCommonJS(index_native_exports);
var import_native = require("styled-components/native");
var createGlobalStyle = () => null;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeProvider,
  createGlobalStyle,
  css,
  styled
});
//# sourceMappingURL=index.native.js.map