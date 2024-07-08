//Mon Jul 08 2024 13:13:02 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x4842a4 = new _0x56a9a9("库迪咖啡抢兑"),
  _0x18f1ad = require("axios"),
  _0x171822 = require("md5"),
  _0x1720c4 = "kdcoffer";
const _0xef5f7b = process.env[_0x1720c4] || "";
let _0x192e55 = "1.0.5",
  _0x161dd4 = "",
  _0x6cf99c;
!(async () => {
  await _0x243ab0();
})().catch(_0x8b15d6 => _0x4842a4.logErr(_0x8b15d6)).finally(() => _0x4842a4.done());
async function _0x243ab0() {
  if (_0xef5f7b == "") {
    console.log("没有填写变量,请查看脚本说明: " + _0x1720c4);
    return;
  }
  let _0x1dc329 = _0xef5f7b.split("\n");
  _0x474a4b("\n========== 共找到 " + _0x1dc329.length + " 个账号 ==========");
  if (_0x1dc329.length > 2) {
    console.log("\n检测到账号大于2个 请删除多余账号");
    console.log("退出，结束运行");
    return;
  }
  let _0x5387b0 = 1;
  for (let _0x4e0cfa of _0x1dc329) {
    if (!_0x4e0cfa) {
      continue;
    }
    let _0x328574 = _0x4e0cfa.split("&"),
      _0x42a143 = _0x328574[0],
      _0x5e2347 = _0x328574[1],
      _0x4d0eea = _0x328574[2],
      _0x2f3492 = _0x328574[3];
    const _0x4c1990 = {
      index: _0x5387b0,
      token: _0x42a143,
      mobile: _0x5e2347,
      blackBox: _0x4d0eea,
      activityNo: _0x2f3492
    };
    _0x5387b0 = _0x5387b0 + 1;
    await _0x359ccb(_0x4c1990);
  }
}
async function _0x359ccb(_0x295a10) {
  _0x474a4b("\n========== 账号[" + _0x295a10.index + "]开始抢兑 ==========");
  await _0x1b48a3(_0x295a10);
}
async function _0x1b48a3(_0x8abf31) {
  console.log("等待时间到11:00 请耐心等待⌛️");
  let _0x15fe14 = new Date();
  if (!_0x6cf99c || _0x15fe14 >= _0x6cf99c) {
    _0x6cf99c = new Date();
    _0x6cf99c.setHours(11, 0, 0, 0);
  }
  while (_0x15fe14 < _0x6cf99c) {
    await new Promise(_0x241046 => setTimeout(_0x241046, 1000));
    _0x15fe14 = new Date();
  }
  console.log("时间已到达11:00 开始抢兑");
  const _0x17a144 = [];
  for (let _0x11b060 = 0; _0x11b060 < 50; _0x11b060++) {
    _0x17a144.push(_0x114572(_0x8abf31));
  }
  await Promise.all(_0x17a144);
}
async function _0x114572(_0x598d94) {
  try {
    let _0x745279 = _0xcb4abb(),
      _0x4f59fa = _0x171822("path/cotti-capi/universal/coupon/receiveLaunchRewardH5timestamp" + _0x745279 + "versionv1Bu0Zsh4B0SnKBRfds0XWCSn51WJfn5yN").toUpperCase();
    const _0x46fa7c = {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mi 10 Pro Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220089 MMWEBSDK/20240301 MMWEBID/1663 MicroMessenger/8.0.48.2580(0x28003052) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wxe766d738ad655e8c",
      "Content-Type": "application/json",
      appKey: "2YAhmad694MnzqmcPQ5X6TJ6EoSx6sYx",
      version: "v1",
      timestamp: _0x745279,
      brandMdCode: "20200000006",
      "api-version": "v1",
      token: _0x598d94.token,
      sign: _0x4f59fa,
      Origin: "https://m.cotticoffee.com",
      "X-Requested-With": "com.tencent.mm",
      Referer: "https://m.cotticoffee.com/"
    };
    const _0x2cbe71 = {
      activityNo: _0x598d94.activityNo,
      mobile: _0x598d94.mobile,
      comeFrom: "4",
      openid: null,
      blackBox: _0x598d94.blackBox
    };
    const _0xa77d01 = {
      method: "post",
      url: "https://ma.cotticoffee.com/cotti-capi/universal/coupon/receiveLaunchRewardH5",
      headers: _0x46fa7c,
      data: _0x2cbe71
    };
    let {
      data: _0x39ee7e
    } = await _0x18f1ad.request(_0xa77d01);
    if (_0x39ee7e.code == "200") {
      console.log(_0x39ee7e);
    } else {
      console.log("叼毛，出错了！！！");
    }
  } catch (_0x42e622) {
    console.log(_0x42e622.response.data);
  }
}
async function _0xf1314d(_0x17814b) {
  if (!_0x17814b) {
    return;
  }
  if (_0x4842a4.isNode()) {
    var _0x208a1e = require("./sendNotify");
    await _0x208a1e.sendNotify(_0x4842a4.name, _0x17814b);
  } else {
    _0x4842a4.msg(_0x4842a4.name, "", _0x17814b);
  }
}
function _0x474a4b(_0x2fee6b) {
  if (_0x4842a4.isNode()) {
    if (_0x2fee6b) {
      console.log("" + _0x2fee6b);
      _0x161dd4 += "\n" + _0x2fee6b;
    }
  } else {
    console.log("" + _0x2fee6b);
    _0x161dd4 += "\n" + _0x2fee6b;
  }
}
function _0x1921bc(_0x136ce1) {
  return new Promise(function (_0x8cb866) {
    setTimeout(_0x8cb866, _0x136ce1 * 1000);
  });
}
function _0xcb4abb() {
  return new Date().getTime();
}
function _0x30c7dd(_0x4013ce, _0x5dd1df = 1000) {
  method = _0x4013ce.method ? _0x4013ce.method.toLowerCase() : _0x4013ce.body ? "post" : "get";
  return new Promise(_0x197729 => {
    setTimeout(() => {
      _0x4842a4[method](_0x4013ce, (_0x474d07, _0x59631c, _0x399603) => {
        try {
          if (_0x474d07) {
            console.log(JSON.stringify(_0x474d07));
            _0x4842a4.logErr(_0x474d07);
          } else {
            try {
              _0x399603 = JSON.parse(_0x399603);
            } catch (_0x5c1852) {}
          }
        } catch (_0x583f09) {
          console.log(_0x583f09);
          _0x4842a4.logErr(_0x583f09, _0x59631c);
        } finally {
          _0x197729(_0x399603);
        }
      });
    }, _0x5dd1df);
  });
}
function _0x4f20d3(..._0x49fd22) {}
async function _0x24b0d3() {
  try {
    const _0x4d4757 = ["https://gitee.com/ohhhooh/jd_haoyangmao/raw/master/Notice.json"];
    let _0x12db1c = null;
    for (const _0x6ede14 of _0x4d4757) {
      const _0x1e5552 = {
        "User-Agent": ""
      };
      const _0x2c13ea = {
        url: _0x6ede14,
        headers: _0x1e5552
      };
      const _0xce1168 = await _0x30c7dd(_0x2c13ea);
      if (_0xce1168 && "notice" in _0xce1168) {
        _0x12db1c = _0xce1168.notice.replace(/\\n/g, "\n");
        break;
      }
    }
    if (_0x12db1c) {
      _0x4842a4.DoubleLog(_0x12db1c);
    }
  } catch (_0x14ea7b) {
    console.log(_0x14ea7b);
  }
}
function _0x208229(_0x528b87, _0x3ac5d9 = 3000) {
  return new Promise(_0x360377 => {
    const _0xc0d571 = {};
    _0xc0d571.url = "https://fastly.jsdelivr.net/gh/" + _0x528b87;
    const _0x538dec = _0xc0d571;
    _0x4842a4.get(_0x538dec, (_0x46badc, _0x53ed82, _0x12d817) => {
      try {
        const _0x6a6c6f = /scriptVersionNow\s*=\s*(["'`])([\d.]+)\1/,
          _0x34a843 = _0x12d817.match(_0x6a6c6f),
          _0x14ed93 = _0x34a843 ? _0x34a843[2] : "";
        console.log("\n====== 当前版本：" + _0x192e55 + " 📌 最新版本：" + _0x14ed93 + " ======");
      } catch (_0x3d6937) {
        _0x4842a4.logErr(_0x3d6937, _0x53ed82);
      }
      _0x360377();
    }, _0x3ac5d9);
  });
}
function _0x56a9a9(_0x53b44c, _0x246803) {
  class _0x14b9b8 {
    constructor(_0x4a8a71) {
      this.env = _0x4a8a71;
    }
    send(_0x116097, _0x61c36a = "GET") {
      _0x116097 = "string" == typeof _0x116097 ? {
        url: _0x116097
      } : _0x116097;
      let _0x2c1926 = this.get;
      "POST" === _0x61c36a && (_0x2c1926 = this.post);
      return new Promise((_0x27c4ed, _0x4470b8) => {
        _0x2c1926.call(this, _0x116097, (_0x2f4b73, _0x180063, _0x5b1949) => {
          _0x2f4b73 ? _0x4470b8(_0x2f4b73) : _0x27c4ed(_0x180063);
        });
      });
    }
    get(_0x52ca3a) {
      return this.send.call(this.env, _0x52ca3a);
    }
    post(_0x195c8a) {
      return this.send.call(this.env, _0x195c8a, "POST");
    }
  }
  return new class {
    constructor(_0x570b9e, _0x2ec280) {
      this.userList = [];
      this.userIdx = 0;
      this.name = _0x570b9e;
      this.http = new _0x14b9b8(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x2ec280);
      this.log("", "🔔" + this.name + ",开始!");
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(_0x2463d3, _0x7b8531 = null) {
      try {
        return JSON.parse(_0x2463d3);
      } catch {
        return _0x7b8531;
      }
    }
    toStr(_0x4fcf1c, _0x3df1b0 = null) {
      try {
        return JSON.stringify(_0x4fcf1c);
      } catch {
        return _0x3df1b0;
      }
    }
    getjson(_0x38b552, _0x442b04) {
      let _0x2b7430 = _0x442b04;
      const _0x1464bf = this.getdata(_0x38b552);
      if (_0x1464bf) {
        try {
          _0x2b7430 = JSON.parse(this.getdata(_0x38b552));
        } catch {}
      }
      return _0x2b7430;
    }
    setjson(_0x103718, _0x29b566) {
      try {
        return this.setdata(JSON.stringify(_0x103718), _0x29b566);
      } catch {
        return !1;
      }
    }
    getScript(_0x53ef11) {
      return new Promise(_0x143a3b => {
        const _0x308753 = {
          url: _0x53ef11
        };
        this.get(_0x308753, (_0x5d49c8, _0x2cd6a3, _0xa777c0) => _0x143a3b(_0xa777c0));
      });
    }
    runScript(_0x24f34a, _0x12c486) {
      return new Promise(_0x16bed9 => {
        let _0x6db33d = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x6db33d = _0x6db33d ? _0x6db33d.replace(/\n/g, "").trim() : _0x6db33d;
        let _0x1618fc = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x1618fc = _0x1618fc ? 1 * _0x1618fc : 20;
        _0x1618fc = _0x12c486 && _0x12c486.timeout ? _0x12c486.timeout : _0x1618fc;
        const _0x394f95 = {
          script_text: _0x24f34a,
          mock_type: "cron",
          timeout: _0x1618fc
        };
        const [_0x44df2d, _0x1439dc] = _0x6db33d.split("@"),
          _0x1680e1 = {
            url: "http://" + _0x1439dc + "/v1/scripting/evaluate",
            body: _0x394f95,
            headers: {
              "X-Key": _0x44df2d,
              Accept: "*/*"
            },
            timeout: _0x1618fc
          };
        this.post(_0x1680e1, (_0x564abb, _0x205bb6, _0x582f3c) => _0x16bed9(_0x582f3c));
      }).catch(_0x737358 => this.logErr(_0x737358));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x4181e7 = this.path.resolve(this.dataFile),
          _0x44cc78 = this.path.resolve(process.cwd(), this.dataFile),
          _0x303dce = this.fs.existsSync(_0x4181e7),
          _0x21b7d3 = !_0x303dce && this.fs.existsSync(_0x44cc78);
        if (!_0x303dce && !_0x21b7d3) {
          return {};
        }
        {
          const _0x42ee31 = _0x303dce ? _0x4181e7 : _0x44cc78;
          try {
            return JSON.parse(this.fs.readFileSync(_0x42ee31));
          } catch (_0x1c85bb) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x37c38a = this.path.resolve(this.dataFile),
          _0x2d87cf = this.path.resolve(process.cwd(), this.dataFile),
          _0x28f6e2 = this.fs.existsSync(_0x37c38a),
          _0x45a3bd = !_0x28f6e2 && this.fs.existsSync(_0x2d87cf),
          _0xd86fe1 = JSON.stringify(this.data);
        _0x28f6e2 ? this.fs.writeFileSync(_0x37c38a, _0xd86fe1) : _0x45a3bd ? this.fs.writeFileSync(_0x2d87cf, _0xd86fe1) : this.fs.writeFileSync(_0x37c38a, _0xd86fe1);
      }
    }
    lodash_get(_0x322ae8, _0x54991d, _0x2dffec) {
      const _0x49bfbe = _0x54991d.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x357ae3 = _0x322ae8;
      for (const _0x39e4c3 of _0x49bfbe) if (_0x357ae3 = Object(_0x357ae3)[_0x39e4c3], void 0 === _0x357ae3) {
        return _0x2dffec;
      }
      return _0x357ae3;
    }
    lodash_set(_0x3bb806, _0x42d60d, _0x59b7c2) {
      return Object(_0x3bb806) !== _0x3bb806 ? _0x3bb806 : (Array.isArray(_0x42d60d) || (_0x42d60d = _0x42d60d.toString().match(/[^.[\]]+/g) || []), _0x42d60d.slice(0, -1).reduce((_0x1ccdd1, _0xbec89d, _0x54a875) => Object(_0x1ccdd1[_0xbec89d]) === _0x1ccdd1[_0xbec89d] ? _0x1ccdd1[_0xbec89d] : _0x1ccdd1[_0xbec89d] = Math.abs(_0x42d60d[_0x54a875 + 1]) >> 0 == +_0x42d60d[_0x54a875 + 1] ? [] : {}, _0x3bb806)[_0x42d60d[_0x42d60d.length - 1]] = _0x59b7c2, _0x3bb806);
    }
    getdata(_0x3a6992) {
      let _0x1d0d49 = this.getval(_0x3a6992);
      if (/^@/.test(_0x3a6992)) {
        const [, _0x563153, _0x20b442] = /^@(.*?)\.(.*?)$/.exec(_0x3a6992),
          _0xd5ec21 = _0x563153 ? this.getval(_0x563153) : "";
        if (_0xd5ec21) {
          try {
            const _0x2cecca = JSON.parse(_0xd5ec21);
            _0x1d0d49 = _0x2cecca ? this.lodash_get(_0x2cecca, _0x20b442, "") : _0x1d0d49;
          } catch (_0xc8a2eb) {
            _0x1d0d49 = "";
          }
        }
      }
      return _0x1d0d49;
    }
    setdata(_0x180053, _0x54b9bf) {
      let _0x477730 = !1;
      if (/^@/.test(_0x54b9bf)) {
        const [, _0x5bf0e4, _0x52a3ce] = /^@(.*?)\.(.*?)$/.exec(_0x54b9bf),
          _0x1f06d2 = this.getval(_0x5bf0e4),
          _0x154b16 = _0x5bf0e4 ? "null" === _0x1f06d2 ? null : _0x1f06d2 || "{}" : "{}";
        try {
          const _0x36d37e = JSON.parse(_0x154b16);
          this.lodash_set(_0x36d37e, _0x52a3ce, _0x180053);
          _0x477730 = this.setval(JSON.stringify(_0x36d37e), _0x5bf0e4);
        } catch (_0x315264) {
          const _0x36a9ac = {};
          this.lodash_set(_0x36a9ac, _0x52a3ce, _0x180053);
          _0x477730 = this.setval(JSON.stringify(_0x36a9ac), _0x5bf0e4);
        }
      } else {
        _0x477730 = this.setval(_0x180053, _0x54b9bf);
      }
      return _0x477730;
    }
    getval(_0x5601bf) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(_0x5601bf);
        case "Quantumult X":
          return $prefs.valueForKey(_0x5601bf);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[_0x5601bf];
        default:
          return this.data && this.data[_0x5601bf] || null;
      }
    }
    setval(_0x480317, _0x200249) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(_0x480317, _0x200249);
        case "Quantumult X":
          return $prefs.setValueForKey(_0x480317, _0x200249);
        case "Node.js":
          this.data = this.loaddata();
          this.data[_0x200249] = _0x480317;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[_0x200249] || null;
      }
    }
    initGotEnv(_0x1e1b98) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x1e1b98 && (_0x1e1b98.headers = _0x1e1b98.headers ? _0x1e1b98.headers : {}, void 0 === _0x1e1b98.headers.Cookie && void 0 === _0x1e1b98.cookieJar && (_0x1e1b98.cookieJar = this.ckjar));
    }
    get(_0x381278, _0x89aafc = () => {}) {
      switch (_0x381278.headers && (delete _0x381278.headers["Content-Type"], delete _0x381278.headers["Content-Length"], delete _0x381278.headers["content-type"], delete _0x381278.headers["content-length"]), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const _0x5b6f0e = {
            "X-Surge-Skip-Scripting": !1
          };
          this.isSurge() && this.isNeedRewrite && (_0x381278.headers = _0x381278.headers || {}, Object.assign(_0x381278.headers, _0x5b6f0e));
          $httpClient.get(_0x381278, (_0x4b567b, _0x2d541f, _0x14a327) => {
            !_0x4b567b && _0x2d541f && (_0x2d541f.body = _0x14a327, _0x2d541f.statusCode = _0x2d541f.status ? _0x2d541f.status : _0x2d541f.statusCode, _0x2d541f.status = _0x2d541f.statusCode);
            _0x89aafc(_0x4b567b, _0x2d541f, _0x14a327);
          });
          break;
        case "Quantumult X":
          const _0x45dd9b = {
            hints: !1
          };
          this.isNeedRewrite && (_0x381278.opts = _0x381278.opts || {}, Object.assign(_0x381278.opts, _0x45dd9b));
          $task.fetch(_0x381278).then(_0x1a9bc2 => {
            const {
                statusCode: _0x51f210,
                statusCode: _0x175087,
                headers: _0xe71717,
                body: _0x143bdd,
                bodyBytes: _0x382e47
              } = _0x1a9bc2,
              _0x319c00 = {
                status: _0x51f210,
                statusCode: _0x175087,
                headers: _0xe71717,
                body: _0x143bdd,
                bodyBytes: _0x382e47
              };
            _0x89aafc(null, _0x319c00, _0x143bdd, _0x382e47);
          }, _0x1f4e1d => _0x89aafc(_0x1f4e1d && _0x1f4e1d.error || "UndefinedError"));
          break;
        case "Node.js":
          let _0x55b4fe = require("iconv-lite");
          this.initGotEnv(_0x381278);
          this.got(_0x381278).on("redirect", (_0xcace5e, _0x1cebc5) => {
            try {
              if (_0xcace5e.headers["set-cookie"]) {
                const _0x3d4a75 = _0xcace5e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                _0x3d4a75 && this.ckjar.setCookieSync(_0x3d4a75, null);
                _0x1cebc5.cookieJar = this.ckjar;
              }
            } catch (_0x3b105b) {
              this.logErr(_0x3b105b);
            }
          }).then(_0x13f9e4 => {
            const {
                statusCode: _0x5284cb,
                statusCode: _0x25e67b,
                headers: _0x31de0a,
                rawBody: _0x4bd55c
              } = _0x13f9e4,
              _0x264b9a = _0x55b4fe.decode(_0x4bd55c, this.encoding),
              _0x2043a9 = {
                status: _0x5284cb,
                statusCode: _0x25e67b,
                headers: _0x31de0a,
                rawBody: _0x4bd55c,
                body: _0x264b9a
              };
            _0x89aafc(null, _0x2043a9, _0x264b9a);
          }, _0x53d8ec => {
            const {
              message: _0x59f00f,
              response: _0x590bbf
            } = _0x53d8ec;
            _0x89aafc(_0x59f00f, _0x590bbf, _0x590bbf && _0x55b4fe.decode(_0x590bbf.rawBody, this.encoding));
          });
      }
    }
    post(_0x6735c3, _0x410787 = () => {}) {
      const _0x42b60e = _0x6735c3.method ? _0x6735c3.method.toLocaleLowerCase() : "post";
      switch (_0x6735c3.body && _0x6735c3.headers && !_0x6735c3.headers["Content-Type"] && !_0x6735c3.headers["content-type"] && (_0x6735c3.headers["content-type"] = "application/x-www-form-urlencoded"), _0x6735c3.headers && (delete _0x6735c3.headers["Content-Length"], delete _0x6735c3.headers["content-length"]), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const _0x557e66 = {
            "X-Surge-Skip-Scripting": !1
          };
          this.isSurge() && this.isNeedRewrite && (_0x6735c3.headers = _0x6735c3.headers || {}, Object.assign(_0x6735c3.headers, _0x557e66));
          $httpClient[_0x42b60e](_0x6735c3, (_0xd3329, _0x2430db, _0x2adca2) => {
            !_0xd3329 && _0x2430db && (_0x2430db.body = _0x2adca2, _0x2430db.statusCode = _0x2430db.status ? _0x2430db.status : _0x2430db.statusCode, _0x2430db.status = _0x2430db.statusCode);
            _0x410787(_0xd3329, _0x2430db, _0x2adca2);
          });
          break;
        case "Quantumult X":
          const _0x53b818 = {
            hints: !1
          };
          _0x6735c3.method = _0x42b60e;
          this.isNeedRewrite && (_0x6735c3.opts = _0x6735c3.opts || {}, Object.assign(_0x6735c3.opts, _0x53b818));
          $task.fetch(_0x6735c3).then(_0x299c96 => {
            const {
                statusCode: _0x460ff6,
                statusCode: _0x1a4859,
                headers: _0x417856,
                body: _0x426b74,
                bodyBytes: _0x217a73
              } = _0x299c96,
              _0x191fc5 = {
                status: _0x460ff6,
                statusCode: _0x1a4859,
                headers: _0x417856,
                body: _0x426b74,
                bodyBytes: _0x217a73
              };
            _0x410787(null, _0x191fc5, _0x426b74, _0x217a73);
          }, _0x364744 => _0x410787(_0x364744 && _0x364744.error || "UndefinedError"));
          break;
        case "Node.js":
          let _0x219bf8 = require("iconv-lite");
          this.initGotEnv(_0x6735c3);
          const {
            url: _0x341090,
            ..._0x44c5bc
          } = _0x6735c3;
          this.got[_0x42b60e](_0x341090, _0x44c5bc).then(_0x456fe6 => {
            const {
                statusCode: _0x4f4dbc,
                statusCode: _0x3d0a65,
                headers: _0x1cb842,
                rawBody: _0xb7965e
              } = _0x456fe6,
              _0x4e5973 = _0x219bf8.decode(_0xb7965e, this.encoding),
              _0x1f4a2f = {
                status: _0x4f4dbc,
                statusCode: _0x3d0a65,
                headers: _0x1cb842,
                rawBody: _0xb7965e,
                body: _0x4e5973
              };
            _0x410787(null, _0x1f4a2f, _0x4e5973);
          }, _0x2decd6 => {
            const {
              message: _0x417160,
              response: _0x2ce304
            } = _0x2decd6;
            _0x410787(_0x417160, _0x2ce304, _0x2ce304 && _0x219bf8.decode(_0x2ce304.rawBody, this.encoding));
          });
      }
    }
    time(_0xfbb14e, _0x2d5dc0 = null) {
      const _0x1df272 = _0x2d5dc0 ? new Date(_0x2d5dc0) : new Date();
      let _0x1d14df = {
        "M+": _0x1df272.getMonth() + 1,
        "d+": _0x1df272.getDate(),
        "H+": _0x1df272.getHours(),
        "m+": _0x1df272.getMinutes(),
        "s+": _0x1df272.getSeconds(),
        "q+": Math.floor((_0x1df272.getMonth() + 3) / 3),
        S: _0x1df272.getMilliseconds()
      };
      /(y+)/.test(_0xfbb14e) && (_0xfbb14e = _0xfbb14e.replace(RegExp.$1, (_0x1df272.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x2f40f5 in _0x1d14df) new RegExp("(" + _0x2f40f5 + ")").test(_0xfbb14e) && (_0xfbb14e = _0xfbb14e.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1d14df[_0x2f40f5] : ("00" + _0x1d14df[_0x2f40f5]).substr(("" + _0x1d14df[_0x2f40f5]).length)));
      return _0xfbb14e;
    }
    queryStr(_0x49bd66) {
      let _0x2979c0 = "";
      for (const _0x2caced in _0x49bd66) {
        let _0x11c1c8 = _0x49bd66[_0x2caced];
        null != _0x11c1c8 && "" !== _0x11c1c8 && ("object" == typeof _0x11c1c8 && (_0x11c1c8 = JSON.stringify(_0x11c1c8)), _0x2979c0 += _0x2caced + "=" + _0x11c1c8 + "&");
      }
      _0x2979c0 = _0x2979c0.substring(0, _0x2979c0.length - 1);
      return _0x2979c0;
    }
    msg(_0x4345b1 = _0x53b44c, _0x29b1f3 = "", _0x517d12 = "", _0x22b325) {
      const _0x573df6 = _0x372735 => {
        switch (typeof _0x372735) {
          case void 0:
            return _0x372735;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                const _0x2c6c9c = {
                  url: _0x372735
                };
                return _0x2c6c9c;
              case "Loon":
              case "Shadowrocket":
                return _0x372735;
              case "Quantumult X":
                const _0x20bf27 = {
                  "open-url": _0x372735
                };
                return _0x20bf27;
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                {
                  let _0x2a1250 = _0x372735.url || _0x372735.openUrl || _0x372735["open-url"];
                  const _0x2dd66f = {
                    url: _0x2a1250
                  };
                  return _0x2dd66f;
                }
              case "Loon":
                {
                  let _0x4d819a = _0x372735.openUrl || _0x372735.url || _0x372735["open-url"],
                    _0x459952 = _0x372735.mediaUrl || _0x372735["media-url"];
                  const _0x15d908 = {
                    openUrl: _0x4d819a,
                    mediaUrl: _0x459952
                  };
                  return _0x15d908;
                }
              case "Quantumult X":
                {
                  let _0x3fe374 = _0x372735["open-url"] || _0x372735.url || _0x372735.openUrl,
                    _0x5b13da = _0x372735["media-url"] || _0x372735.mediaUrl,
                    _0x48b674 = _0x372735["update-pasteboard"] || _0x372735.updatePasteboard;
                  const _0x1c0a76 = {
                    "open-url": _0x3fe374,
                    "media-url": _0x5b13da,
                    "update-pasteboard": _0x48b674
                  };
                  return _0x1c0a76;
                }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(_0x4345b1, _0x29b1f3, _0x517d12, _0x573df6(_0x22b325));
            break;
          case "Quantumult X":
            $notify(_0x4345b1, _0x29b1f3, _0x517d12, _0x573df6(_0x22b325));
            break;
          case "Node.js":
        }
      }
      if (!this.isMuteLog) {
        let _0x192446 = ["", "==============📣系统通知📣=============="];
        _0x192446.push(_0x4345b1);
        _0x29b1f3 && _0x192446.push(_0x29b1f3);
        _0x517d12 && _0x192446.push(_0x517d12);
        console.log(_0x192446.join("\n"));
        this.logs = this.logs.concat(_0x192446);
      }
    }
    log(..._0x149e6a) {
      _0x149e6a.length > 0 && (this.logs = [...this.logs, ..._0x149e6a]);
      console.log(_0x149e6a.join(this.logSeparator));
    }
    logErr(_0x3f3374, _0x56cc5c) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", "❗️" + this.name + ",错误!", _0x3f3374);
          break;
        case "Node.js":
          this.log("", "❗️" + this.name + ",错误!", _0x3f3374.stack);
      }
    }
    wait(_0x31655e) {
      return new Promise(_0xe42f19 => setTimeout(_0xe42f19, _0x31655e));
    }
    DoubleLog(_0x234869) {
      this.isNode() ? _0x234869 && (console.log("" + _0x234869), _0x161dd4 += "\n " + _0x234869) : (console.log("" + _0x234869), _0x161dd4 += "\n " + _0x234869);
    }
    async SendMsg(_0x10bdda) {
      if (!_0x10bdda) {
        return;
      }
      if (this.isNode()) {
        var _0x5a5c51 = require("./sendNotify");
        await _0x5a5c51.sendNotify(this.name, _0x10bdda);
      } else {
        this.msg(this.name, "", _0x10bdda);
      }
    }
    done(_0x57a456 = {}) {
      const _0x325d41 = new Date().getTime(),
        _0x1516d0 = (_0x325d41 - this.startTime) / 1000;
      switch (this.log("", "🔔" + this.name + ",结束!🕛" + _0x1516d0 + "秒"), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(_0x57a456);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(_0x53b44c, _0x246803);
}