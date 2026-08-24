import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const navigation = fs.readFileSync(path.join(root, "assets/site-back-navigation.js"), "utf8");

test("back control is a small circle inside a 44px touch target", () => {
  assert.match(navigation, /:host \{[\s\S]*width: 44px;[\s\S]*height: 44px;/);
  assert.match(navigation, /button \{[\s\S]*width: 36px;[\s\S]*height: 36px;[\s\S]*margin: 4px;/);
  assert.match(navigation, /border-radius: 50%/);
  assert.match(navigation, /svg \{ width: 20px; height: 20px;/);
});

test("top-left legacy links reserve title-safe space", () => {
  assert.match(navigation, /shouldReserveBackSpace/);
  assert.match(navigation, /control\.closest\("header, nav, \.topbar/);
  assert.match(navigation, /control\.dataset\.siteBackSpacer = "true"/);
  assert.match(navigation, /\[data-site-back-spacer\][^{]*\{[^}]*width:44px!important/);
  assert.match(navigation, /flex:0 0 44px!important/);
});
