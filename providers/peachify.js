/**
 * peachify - Built from src/peachify/
 * Generated: 2026-05-12T14:13:30.579Z
 * Protected: Yes
 */
(function(globalThis, window, self) {
'use strict';
// Polyfills para ambientes limitados
if (typeof TextEncoder === 'undefined') globalThis.TextEncoder = function() { /* QuickJS polyfill */ };if (typeof TextDecoder === 'undefined') globalThis.TextDecoder = function() { /* QuickJS polyfill */ };
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/peachify/http.js
var BASE_URL = "https://peachify.top";
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";
var HEADERS = {
  "User-Agent": UA,
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  "Origin": BASE_URL,
  "Referer": BASE_URL + "/",
  "Cache-Control": "no-cache"
};
function request(url, opts) {
  const options = opts || {};
  const headers = Object.assign({}, HEADERS, options.headers || {});
  return fetch(url, { method: options.method || "GET", headers, body: options.body || null }).then((res) => {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res;
  });
}

// node_modules/@noble/ciphers/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
function abool(b) {
  if (typeof b !== "boolean")
    throw new TypeError(`boolean expected, not ${b}`);
}
function anumber(n) {
  if (typeof n !== "number")
    throw new TypeError("number expected, got " + typeof n);
  if (!Number.isSafeInteger(n) || n < 0)
    throw new RangeError("positive integer expected, got " + n);
}
function abytes(value, length, title = "") {
  const bytes = isBytes(value);
  const len = value == null ? void 0 : value.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    const message = prefix + "expected Uint8Array" + ofLen + ", got " + got;
    if (!bytes)
      throw new TypeError(message);
    throw new RangeError(message);
  }
  return value;
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance, onlyAligned = false) {
  abytes(out, void 0, "output");
  const min = instance.outputLen;
  if (out.length < min) {
    throw new RangeError("digestInto() expects output buffer of length at least " + min);
  }
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
}
function u8(arr) {
  return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
var swap8IfBE = isLE ? (n) => n : (n) => byteSwap(n) >>> 0;
var byteSwap32 = (arr) => {
  for (let i = 0; i < arr.length; i++)
    arr[i] = byteSwap(arr[i]);
  return arr;
};
var swap32IfBE = isLE ? (u) => u : byteSwap32;
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
function wrapMacConstructor(keyLen, macCons, fromMsg) {
  const mac = macCons;
  const getArgs = fromMsg || (() => []);
  const macC = (msg, key) => mac(key, ...getArgs(msg)).update(msg).digest();
  const tmp = mac(new Uint8Array(keyLen), ...getArgs(new Uint8Array(0)));
  macC.outputLen = tmp.outputLen;
  macC.blockLen = tmp.blockLen;
  macC.create = (key, ...args) => mac(key, ...args);
  return macC;
}
var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes(key, void 0, "key");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      abytes(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
    }
    const tagl = params.tagLength;
    if (tagl && args[1] !== void 0)
      abytes(args[1], void 0, "AAD");
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes(output, void 0, "output");
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes(data);
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes(data);
        if (tagl && data.length < tagl)
          throw new Error('"ciphertext" expected length bigger than tagLength=' + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  abytes(out, void 0, "output");
  if (out.length !== expectedLength)
    throw new Error('"output" expected Uint8Array of length ' + expectedLength + ", got: " + out.length);
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function u64Lengths(dataLength, aadLength, isLE2) {
  anumber(dataLength);
  anumber(aadLength);
  abool(isLE2);
  const num = new Uint8Array(16);
  const view = createView(num);
  view.setBigUint64(0, BigInt(aadLength), isLE2);
  view.setBigUint64(8, BigInt(dataLength), isLE2);
  return num;
}
function isAligned32(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
  return Uint8Array.from(abytes(bytes));
}

// node_modules/@noble/ciphers/_polyval.js
var BLOCK_SIZE = 16;
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var ZEROS32 = /* @__PURE__ */ u32(ZEROS16);
var POLY = 225;
var mul2 = (s0, s1, s2, s3) => {
  const hiBit = s3 & 1;
  return {
    s3: s2 << 31 | s3 >>> 1,
    s2: s1 << 31 | s2 >>> 1,
    s1: s0 << 31 | s1 >>> 1,
    // NIST SP 800-38D §6.3 applies `V >> 1` and XORs R on carry. In this
    // 4x32-bit split, R = 0xe1 || 0^120 lives in the top byte of s0.
    s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
    // reduce % poly
  };
};
var swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
var estimateWindow = (bytes) => {
  if (bytes > 64 * 1024)
    return 8;
  if (bytes > 1024)
    return 4;
  return 2;
};
var GHASH = class {
  // We select bits per window adaptively based on expectedLength
  constructor(key, expectedLength) {
    __publicField(this, "blockLen", BLOCK_SIZE);
    __publicField(this, "outputLen", BLOCK_SIZE);
    __publicField(this, "s0", 0);
    __publicField(this, "s1", 0);
    __publicField(this, "s2", 0);
    __publicField(this, "s3", 0);
    __publicField(this, "finished", false);
    __publicField(this, "destroyed", false);
    __publicField(this, "t");
    __publicField(this, "W");
    __publicField(this, "windowSize");
    abytes(key, 16, "key");
    key = copyBytes(key);
    const kView = createView(key);
    let k0 = kView.getUint32(0, false);
    let k1 = kView.getUint32(4, false);
    let k2 = kView.getUint32(8, false);
    let k3 = kView.getUint32(12, false);
    const doubles = [];
    for (let i = 0; i < 128; i++) {
      doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
      ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
    }
    const W = estimateWindow(expectedLength || 1024);
    if (![1, 2, 4, 8].includes(W))
      throw new Error("ghash: invalid window size, expected 2, 4 or 8");
    this.W = W;
    const bits = 128;
    const windows = bits / W;
    const windowSize = this.windowSize = 2 ** W;
    const items = [];
    for (let w = 0; w < windows; w++) {
      for (let byte = 0; byte < windowSize; byte++) {
        let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
        for (let j = 0; j < W; j++) {
          const bit = byte >>> W - j - 1 & 1;
          if (!bit)
            continue;
          const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
          s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
        }
        items.push({ s0, s1, s2, s3 });
      }
    }
    this.t = items;
  }
  _updateBlock(s0, s1, s2, s3) {
    s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
    const { W, t, windowSize } = this;
    let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
    const mask = (1 << W) - 1;
    let w = 0;
    for (const num of [s0, s1, s2, s3]) {
      for (let bytePos = 0; bytePos < 4; bytePos++) {
        const byte = num >>> 8 * bytePos & 255;
        for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
          const bit = byte >>> W * bitPos & mask;
          const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
          o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
          w += 1;
        }
      }
    }
    this.s0 = o0;
    this.s1 = o1;
    this.s2 = o2;
    this.s3 = o3;
  }
  update(data) {
    aexists(this);
    abytes(data);
    data = copyBytes(data);
    const b32 = u32(data);
    const blocks = Math.floor(data.length / BLOCK_SIZE);
    const left = data.length % BLOCK_SIZE;
    for (let i = 0; i < blocks; i++) {
      this._updateBlock(swap8IfBE(b32[i * 4 + 0]), swap8IfBE(b32[i * 4 + 1]), swap8IfBE(b32[i * 4 + 2]), swap8IfBE(b32[i * 4 + 3]));
    }
    if (left) {
      ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
      this._updateBlock(swap8IfBE(ZEROS32[0]), swap8IfBE(ZEROS32[1]), swap8IfBE(ZEROS32[2]), swap8IfBE(ZEROS32[3]));
      clean(ZEROS32);
    }
    return this;
  }
  destroy() {
    this.destroyed = true;
    const { t } = this;
    for (const elm of t) {
      elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
    }
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this, true);
    this.finished = true;
    const { s0, s1, s2, s3 } = this;
    const o32 = u32(out);
    o32[0] = s0;
    o32[1] = s1;
    o32[2] = s2;
    o32[3] = s3;
    swap32IfBE(o32);
  }
  digest() {
    const res = new Uint8Array(BLOCK_SIZE);
    this.digestInto(res);
    this.destroy();
    return res;
  }
};
var ghash = /* @__PURE__ */ wrapMacConstructor(16, (key, expectedLength) => new GHASH(key, expectedLength), (msg) => [msg.length]);

// node_modules/@noble/ciphers/aes.js
var BLOCK_SIZE2 = 16;
var BLOCK_SIZE32 = 4;
var EMPTY_BLOCK = /* @__PURE__ */ new Uint8Array(BLOCK_SIZE2);
var POLY2 = 283;
function validateKeyLength(key) {
  if (![16, 24, 32].includes(key.length))
    throw new Error('"aes key" expected Uint8Array of length 16/24/32, got length=' + key.length);
}
function mul22(n) {
  return n << 1 ^ POLY2 & -(n >> 7);
}
function mul(a, b) {
  let res = 0;
  for (; b > 0; b >>= 1) {
    res ^= a & -(b & 1);
    a = mul22(a);
  }
  return res;
}
var sbox = /* @__PURE__ */ (() => {
  const t = new Uint8Array(256);
  for (let i = 0, x = 1; i < 256; i++, x ^= mul22(x))
    t[i] = x;
  const box = new Uint8Array(256);
  box[0] = 99;
  for (let i = 0; i < 255; i++) {
    let x = t[255 - i];
    x |= x << 8;
    box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
  }
  clean(t);
  return box;
})();
var rotr32_8 = (n) => n << 24 | n >>> 8;
var rotl32_8 = (n) => n << 8 | n >>> 24;
function genTtable(sbox2, fn) {
  if (sbox2.length !== 256)
    throw new Error("Wrong sbox length");
  const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
  const T1 = T0.map(rotl32_8);
  const T2 = T1.map(rotl32_8);
  const T3 = T2.map(rotl32_8);
  const T01 = new Uint32Array(256 * 256);
  const T23 = new Uint32Array(256 * 256);
  const sbox22 = new Uint16Array(256 * 256);
  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
      const idx = i * 256 + j;
      T01[idx] = T0[i] ^ T1[j];
      T23[idx] = T2[i] ^ T3[j];
      sbox22[idx] = sbox2[i] << 8 | sbox2[j];
    }
  }
  return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
}
var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
var xPowers = /* @__PURE__ */ (() => {
  const p = new Uint8Array(16);
  for (let i = 0, x = 1; i < 16; i++, x = mul22(x))
    p[i] = x;
  return p;
})();
function expandKeyLE(key) {
  abytes(key);
  const len = key.length;
  validateKeyLength(key);
  const { sbox2 } = tableEncoding;
  const toClean = [];
  if (!isLE || !isAligned32(key))
    toClean.push(key = copyBytes(key));
  const k32 = swap32IfBE(u32(key));
  const Nk = k32.length;
  const subByte = (n) => applySbox(sbox2, n, n, n, n);
  const xk = new Uint32Array(len + 28);
  xk.set(k32);
  for (let i = Nk; i < xk.length; i++) {
    let t = xk[i - 1];
    if (i % Nk === 0)
      t = subByte(rotr32_8(t)) ^ xPowers[i / Nk - 1];
    else if (Nk > 6 && i % Nk === 4)
      t = subByte(t);
    xk[i] = xk[i - Nk] ^ t;
  }
  clean(...toClean);
  return xk;
}
function apply0123(T01, T23, s0, s1, s2, s3) {
  return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
}
function applySbox(sbox2, s0, s1, s2, s3) {
  return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
}
function encrypt(xk, s0, s1, s2, s3) {
  const { sbox2, T01, T23 } = tableEncoding;
  let k = 0;
  s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
  const rounds = xk.length / 4 - 2;
  for (let i = 0; i < rounds; i++) {
    const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
    const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
    const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
    const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
    s0 = t02, s1 = t12, s2 = t22, s3 = t32;
  }
  const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
  const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
  const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
  const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
  return { s0: t0, s1: t1, s2: t2, s3: t3 };
}
function ctr32(xk, isLE2, nonce, src, dst) {
  abytes(nonce, BLOCK_SIZE2, "nonce");
  abytes(src);
  dst = getOutput(src.length, dst);
  const ctr = nonce;
  const c32 = u32(ctr);
  const view = createView(ctr);
  const src32 = u32(src);
  const dst32 = u32(dst);
  const ctrPos = isLE2 ? 0 : 12;
  const srcLen = src.length;
  let ctrNum = view.getUint32(ctrPos, isLE2);
  let { s0, s1, s2, s3 } = encrypt(xk, swap8IfBE(c32[0]), swap8IfBE(c32[1]), swap8IfBE(c32[2]), swap8IfBE(c32[3]));
  for (let i = 0; i + 4 <= src32.length; i += 4) {
    dst32[i + 0] = src32[i + 0] ^ swap8IfBE(s0);
    dst32[i + 1] = src32[i + 1] ^ swap8IfBE(s1);
    dst32[i + 2] = src32[i + 2] ^ swap8IfBE(s2);
    dst32[i + 3] = src32[i + 3] ^ swap8IfBE(s3);
    ctrNum = ctrNum + 1 >>> 0;
    view.setUint32(ctrPos, ctrNum, isLE2);
    ({ s0, s1, s2, s3 } = encrypt(xk, swap8IfBE(c32[0]), swap8IfBE(c32[1]), swap8IfBE(c32[2]), swap8IfBE(c32[3])));
  }
  const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
  if (start < srcLen) {
    const b32 = new Uint32Array([s0, s1, s2, s3]);
    swap32IfBE(b32);
    const buf = u8(b32);
    for (let i = start, pos = 0; i < srcLen; i++, pos++)
      dst[i] = src[i] ^ buf[pos];
    clean(b32);
  }
  return dst;
}
function computeTag(fn, isLE2, key, data, AAD) {
  const aadLength = AAD ? AAD.length : 0;
  const h = fn.create(key, data.length + aadLength);
  if (AAD)
    h.update(AAD);
  const num = u64Lengths(8 * data.length, 8 * aadLength, isLE2);
  h.update(data);
  h.update(num);
  const res = h.digest();
  clean(num);
  return res;
}
var gcm = /* @__PURE__ */ wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aesgcm(key, nonce, AAD) {
  if (nonce.length < 8)
    throw new Error("aes/gcm: invalid nonce length");
  const tagLength = 16;
  function _computeTag(authKey, tagMask, data) {
    const tag = computeTag(ghash, false, authKey, data, AAD);
    for (let i = 0; i < tagMask.length; i++)
      tag[i] ^= tagMask[i];
    return tag;
  }
  function deriveKeys() {
    const xk = expandKeyLE(key);
    const authKey = EMPTY_BLOCK.slice();
    const counter = EMPTY_BLOCK.slice();
    ctr32(xk, false, counter, counter, authKey);
    if (nonce.length === 12) {
      counter.set(nonce);
    } else {
      const nonceLen = EMPTY_BLOCK.slice();
      const view = createView(nonceLen);
      view.setBigUint64(8, BigInt(nonce.length * 8), false);
      const g = ghash.create(authKey).update(nonce).update(nonceLen);
      g.digestInto(counter);
      g.destroy();
    }
    const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
    return { xk, authKey, counter, tagMask };
  }
  return {
    encrypt(plaintext) {
      const { xk, authKey, counter, tagMask } = deriveKeys();
      const out = new Uint8Array(plaintext.length + tagLength);
      const toClean = [xk, authKey, counter, tagMask];
      if (!isAligned32(plaintext))
        toClean.push(plaintext = copyBytes(plaintext));
      ctr32(xk, false, counter, plaintext, out.subarray(0, plaintext.length));
      const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
      toClean.push(tag);
      out.set(tag, plaintext.length);
      clean(...toClean);
      return out;
    },
    decrypt(ciphertext) {
      const { xk, authKey, counter, tagMask } = deriveKeys();
      const toClean = [xk, authKey, tagMask, counter];
      if (!isAligned32(ciphertext))
        toClean.push(ciphertext = copyBytes(ciphertext));
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = _computeTag(authKey, tagMask, data);
      toClean.push(tag);
      if (!equalBytes(tag, passedTag)) {
        clean(...toClean);
        throw new Error("aes/gcm: invalid ghash tag");
      }
      const out = ctr32(xk, false, counter, data);
      clean(...toClean);
      return out;
    }
  };
});

// src/peachify/lib/crypto.js
function b64urlToBytes(str) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - b64.length % 4) % 4;
  b64 += "=".repeat(pad);
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
function hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) out[i / 2] = parseInt(hex.substr(i, 2), 16);
  return out;
}
function utf8Decode(bytes) {
  let str = "";
  let i = 0;
  const len = bytes.length;
  while (i < len) {
    const b = bytes[i++];
    if (b < 128) str += String.fromCharCode(b);
    else if (b < 224) str += String.fromCharCode((b & 31) << 6 | bytes[i++] & 63);
    else if (b < 240) str += String.fromCharCode((b & 15) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63);
    else {
      let cp = (b & 7) << 18 | (bytes[i++] & 63) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
      cp -= 65536;
      str += String.fromCharCode(55296 + (cp >> 10), 56320 + (cp & 1023));
    }
  }
  return str;
}
function decryptPayload(dataStr, keyHex) {
  return __async(this, null, function* () {
    if (!keyHex || keyHex.length !== 64) throw new Error("Invalid decryption key");
    const parts = dataStr.split(".");
    if (parts.length !== 3) throw new Error("Invalid payload structure");
    const iv = b64urlToBytes(parts[0]);
    const c1 = b64urlToBytes(parts[1]);
    const c2 = b64urlToBytes(parts[2]);
    console.log(`[Peachify] DECRYPT_DIAG: IV=${iv.length} C1=${c1.length} C2=${c2.length}`);
    if (iv.length !== 12) throw new Error(`Invalid IV length: ${iv.length}. Expected 12.`);
    if (c2.length !== 16) throw new Error(`Invalid tag length: ${c2.length}. Expected 16.`);
    const cipherWithTag = new Uint8Array(c1.length + c2.length);
    cipherWithTag.set(c1, 0);
    cipherWithTag.set(c2, c1.length);
    const key = hexToBytes(keyHex);
    try {
      const plaintext = gcm(key, iv).decrypt(cipherWithTag);
      let txt = utf8Decode(plaintext);
      if (txt.charCodeAt(0) === 65279) txt = txt.slice(1);
      return JSON.parse(txt);
    } catch (err) {
      console.error("[Peachify] DECRYPT_FAIL:", err.message);
      throw new Error("AES-GCM decryption failed: " + err.message);
    }
  });
}

// src/peachify/lib/keyFetcher.js
var cachedKey = null;
var cacheExpiry = 0;
var CHUNK_SCRIPT_REGEX = /<script[^>]*src="(\/_next\/static\/chunks\/ad[0-9a-f]+\.js)"[^>]*>/i;
var KEY_REGEX = new RegExp('db\\s*\\([^,]+,\\s*"([a-f0-9]{64})"\\s*\\)', "i");
function fetchDecryptionKey(type, tmdbId, season, episode) {
  return __async(this, null, function* () {
    var _a;
    if (cachedKey && Date.now() < cacheExpiry) return cachedKey;
    try {
      console.log("[Peachify] KEY_FETCH_START");
      let url = `https://peachify.top/embed/${type}/${tmdbId}`;
      if (type === "tv" && season && episode) {
        url += `/${season}/${episode}`;
      }
      const res = yield request(url);
      const html = yield res.text();
      const chunkMatch = CHUNK_SCRIPT_REGEX.exec(html);
      if (!chunkMatch || !chunkMatch[1]) {
        throw new Error("Dynamic JS chunk URL not found in HTML");
      }
      const chunkUrl = "https://peachify.top" + chunkMatch[1];
      console.log("[Peachify] CHUNK_URL_FOUND:", chunkUrl);
      const jsRes = yield request(chunkUrl, {
        headers: {
          "Accept": "*/*",
          "Sec-Fetch-Dest": "script",
          "Sec-Fetch-Mode": "no-cors",
          "Sec-Fetch-Site": "same-origin",
          "Range": "bytes=-60000"
        }
      });
      console.log("[Peachify] CHUNK_STATUS:", jsRes.status);
      const contentType = ((_a = jsRes.headers) == null ? void 0 : _a.get) ? jsRes.headers.get("content-type") : "unknown";
      console.log("[Peachify] CHUNK_CONTENT_TYPE:", contentType);
      let jsText = yield jsRes.text();
      if (jsText.length > 6e4) {
        jsText = jsText.slice(-6e4);
      }
      console.log("[Peachify] CHUNK_TAIL_SIZE:", jsText.length, "bytes");
      console.log("[Peachify] CHUNK_FULL_CONTENT_START >>>");
      const LOG_CHUNK = 3e3;
      for (let i = 0; i < jsText.length; i += LOG_CHUNK) {
        console.log(jsText.substring(i, i + LOG_CHUNK));
      }
      console.log("<<< CHUNK_FULL_CONTENT_END");
      const keyMatch = KEY_REGEX.exec(jsText);
      if (!keyMatch || !keyMatch[1]) {
        throw new Error("Decryption key not found in JS chunk tail");
      }
      cachedKey = keyMatch[1].trim();
      cacheExpiry = Date.now() + 216e5;
      console.log("[Peachify] KEY_FETCHED:", cachedKey);
      return cachedKey;
    } catch (err) {
      console.error("[Peachify] KEY_FETCH_FAIL:", err.message);
      cachedKey = null;
      cacheExpiry = 0;
      throw new Error("Failed to fetch decryption key: " + err.message);
    }
  });
}

// src/peachify/logic.js
var ENDPOINTS = [
  { base: "https://uwu.eat-peach.sbs", path: "moviebox" },
  { base: "https://uwu.eat-peach.sbs", path: "net" },
  { base: "https://usa.eat-peach.sbs", path: "holly" },
  { base: "https://usa.eat-peach.sbs", path: "air" },
  { base: "https://usa.eat-peach.sbs", path: "multi" }
];
function buildApiUrl(endpoint, type, tmdbId, season, episode) {
  let url = `${endpoint.base}/${endpoint.path}/${type}/${tmdbId}`;
  if (type === "tv" && season && episode) url += `/${season}/${episode}`;
  return url;
}
function fetchAndDecryptSource(type, tmdbId, season, episode) {
  return __async(this, null, function* () {
    var _a, _b;
    console.log("[Peachify] FETCH_START:", type, tmdbId, season, episode);
    let decryptionKey;
    try {
      decryptionKey = yield fetchDecryptionKey(type, tmdbId, season, episode);
    } catch (err) {
      throw new Error("Failed to fetch decryption key: " + err.message);
    }
    const queue = [...ENDPOINTS];
    let allSources = [];
    let allSubtitles = [];
    while (queue.length > 0) {
      const ep = queue.shift();
      const url = buildApiUrl(ep, type, tmdbId, season, episode);
      console.log("[Peachify] REQ:", url);
      try {
        const res = yield request(url);
        const json = yield res.json();
        console.log("[Peachify] RES:", ep.path, "encrypted:", !!json.isEncrypted, "hasData:", !!json.data);
        if (!json.isEncrypted || !json.data) continue;
        const decrypted = yield decryptPayload(json.data, decryptionKey);
        console.log("[Peachify] DECRYPT_OK:", ep.path, "sources:", ((_a = decrypted == null ? void 0 : decrypted.sources) == null ? void 0 : _a.length) || 0);
        if (((_b = decrypted == null ? void 0 : decrypted.sources) == null ? void 0 : _b.length) > 0) {
          allSources = allSources.concat(decrypted.sources);
          if (decrypted.subtitles) allSubtitles = allSubtitles.concat(decrypted.subtitles);
        }
      } catch (err) {
        console.error("[Peachify] FAIL:", ep.path, "->", err.message);
      }
    }
    if (allSources.length === 0) {
      throw new Error("All endpoints failed or returned empty sources");
    }
    console.log("[Peachify] AGGREGATED_SOURCES:", allSources.length);
    return { sources: allSources, subtitles: allSubtitles };
  });
}

// src/peachify/lib/languageFilter.js
var PT_ALIASES = ["pt", "ptbr", "pt-br", "pt_br", "portuguese", "portugu\xEAs", "portugues", "dub", "dublado", "brazilian", "br"];
function normalizeLanguage(lang) {
  if (!lang) return "unknown";
  const lower = String(lang).toLowerCase().trim();
  for (const alias of PT_ALIASES) {
    if (lower.includes(alias)) return "pt";
  }
  if (lower.includes("english") || lower.includes("en") || lower.includes("original")) return "en";
  if (lower.includes("spanish") || lower.includes("es") || lower.includes("castellano")) return "es";
  if (lower.includes("french") || lower.includes("fr")) return "fr";
  if (lower.includes("hindi") || lower.includes("hi")) return "hi";
  if (lower.includes("tamil") || lower.includes("ta")) return "ta";
  if (lower.includes("telugu") || lower.includes("te")) return "te";
  if (lower.includes("russian") || lower.includes("ru")) return "ru";
  return lower.replace(/[^a-z\-]/g, "").slice(0, 5) || "unknown";
}
function matchesLanguage(streamLang, requestedLang) {
  if (!requestedLang || requestedLang === "all") return true;
  const normalizedStream = normalizeLanguage(streamLang);
  const normalizedRequested = normalizeLanguage(requestedLang);
  return normalizedStream === normalizedRequested;
}
function filterStreamsByLanguage(streams, preferredLang) {
  if (!preferredLang || !streams || !Array.isArray(streams)) return streams;
  const isPtRequest = normalizeLanguage(preferredLang) === "pt";
  const matches = [];
  const fallbacks = [];
  for (const stream of streams) {
    const lang = stream.lang;
    if (matchesLanguage(lang, preferredLang)) {
      matches.push(stream);
    } else {
      fallbacks.push(stream);
    }
  }
  if (isPtRequest && matches.length > 0) return matches;
  return matches.length > 0 ? matches : fallbacks;
}
function extractStreamLanguage(src) {
  if (!src || typeof src !== "object") return "Original";
  const fields = ["dub", "audio", "language", "lang", "label", "name", "title"];
  for (const field of fields) {
    const val = src[field];
    if (val && typeof val === "string" && val.trim()) {
      return val.trim();
    }
  }
  const url = src.url || "";
  const urlMatch = url.match(/[/_\-](pt|en|es|fr|hi|ta|te|ru|zh)[\-_\.]/i);
  if (urlMatch) return urlMatch[1].toLowerCase();
  return "Original";
}

// src/peachify/extractor.js
var FB_HDRS = { "Origin": "https://peachify.top", "Referer": "https://peachify.top/" };
function normalizeHeaders(srcHeaders) {
  const headers = __spreadValues({}, FB_HDRS);
  if (!srcHeaders) return headers;
  const lowerMap = {};
  Object.keys(srcHeaders).forEach((k) => lowerMap[k.toLowerCase()] = srcHeaders[k]);
  if (lowerMap.origin) headers["Origin"] = lowerMap.origin;
  if (lowerMap.referer) headers["Referer"] = lowerMap.referer;
  Object.keys(srcHeaders).forEach((k) => {
    const lower = k.toLowerCase();
    if (lower !== "origin" && lower !== "referer") headers[k] = srcHeaders[k];
  });
  return headers;
}
function extractBaseQuality(src) {
  var _a, _b, _c;
  const val = (_c = (_b = (_a = src.quality) != null ? _a : src.resolution) != null ? _b : src.height) != null ? _c : 0;
  if (typeof val === "number" && val > 0) return val;
  const match = String(val).match(/(\d{3,4})/);
  return match ? parseInt(match[1], 10) : 0;
}
function parseHlsQuality(url, headers) {
  return __async(this, null, function* () {
    try {
      const res = yield request(url, { headers });
      const text = yield res.text();
      const match = text.match(/#EXT-X-STREAM-INF:[^\n]*RESOLUTION=\d+x(\d+)/i);
      return match ? parseInt(match[1], 10) : 0;
    } catch (e) {
      return 0;
    }
  });
}
function resolveQuality(src, headers) {
  return __async(this, null, function* () {
    let quality = extractBaseQuality(src);
    const typeLower = (src.type || "").toLowerCase();
    if (quality === 0 && (typeLower.includes("hls") || src.url.includes(".m3u8"))) {
      quality = yield parseHlsQuality(src.url, headers);
    }
    return quality || 1080;
  });
}
function extractDirectUrlAndHeaders(workerProxyUrl) {
  try {
    const parsedUrl = new URL(workerProxyUrl);
    const encodedVideoUrl = parsedUrl.searchParams.get("url");
    const encodedHeaders = parsedUrl.searchParams.get("headers");
    if (!encodedVideoUrl) return { url: workerProxyUrl, headers: {} };
    const videoUrl = decodeURIComponent(encodedVideoUrl);
    let headers = {};
    if (encodedHeaders) {
      try {
        const headersJson = decodeURIComponent(encodedHeaders);
        headers = JSON.parse(headersJson);
      } catch (e) {
      }
    }
    return { url: videoUrl, headers };
  } catch (e) {
    return { url: workerProxyUrl, headers: {} };
  }
}
function extractStreams(data, preferredLang) {
  return __async(this, null, function* () {
    var _a;
    if (!((_a = data == null ? void 0 : data.sources) == null ? void 0 : _a.length)) return [];
    const seen = /* @__PURE__ */ new Set();
    const rawStreams = [];
    const promises = data.sources.map((src) => __async(null, null, function* () {
      const url = src.url || src.src || src.file || src.stream;
      if (!url || seen.has(url)) return;
      seen.add(url);
      const { url: directUrl, headers: embeddedHeaders } = extractDirectUrlAndHeaders(url);
      const finalHeaders = Object.keys(embeddedHeaders).length > 0 ? embeddedHeaders : normalizeHeaders(src.headers);
      const quality = yield resolveQuality(src, finalHeaders);
      const isHls = (src.type || "").toLowerCase().includes("hls") || directUrl.includes(".m3u8");
      const lang = extractStreamLanguage(src);
      rawStreams.push({ _source: src, url: directUrl, quality, type: isHls ? "hls" : "mp4", lang, headers: finalHeaders });
    }));
    yield Promise.all(promises);
    const filtered = filterStreamsByLanguage(rawStreams, preferredLang);
    return filtered.map((stream) => ({
      name: "Peachify",
      title: `Peachify (${stream.lang})`,
      url: stream.url,
      quality: stream.quality,
      type: stream.type,
      group: stream.lang,
      provider: "peachify",
      headers: stream.headers,
      _langCode: normalizeLanguage(stream.lang)
    }));
  });
}

// src/peachify/index.js
function getStreams(tmdbId, mediaType, season, episode, options) {
  return __async(this, null, function* () {
    var preferredLang = options && options.requestedLanguage || options && options.dub || "pt";
    try {
      var data = yield fetchAndDecryptSource(mediaType, tmdbId, season, episode);
      var streams = yield extractStreams(data, preferredLang);
      return streams;
    } catch (err) {
      console.error("Peachify provider error:", (err == null ? void 0 : err.message) || err);
      return [];
    }
  });
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getStreams };
} else {
  global.getStreams = getStreams;
}
/*! Bundled license information:

@noble/ciphers/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/

})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {});

