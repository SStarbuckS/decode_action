//Thu Sep 19 2024 18:38:36 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const {
  sign,
  getToken,
  wait,
  checkCk,
  getCookies,
  getUserInfo,
  tryCatchPromise,
  validateCarmeWithType,
  checkCarmeCount,
  getCookieMap
} = require("./common.js");
const _0x536992 = require("request");
const _0x110670 = require("moment");
const _0x279a2b = 15;
const _0x19396c = process.env.ELE_CARME;
const {
  sendNotify
} = require("./sendNotify1.js");
function _0x11748d(_0xc78282) {
  return Object.values(_0xc78282).length === 0;
}
async function _0x5c4f16(_0x4359db, _0x170e45) {
  const _0x1c36b9 = getCookieMap(_0x4359db);
  if (!_0x1c36b9.has("wxUid")) {
    console.log("没有获取到推送 uid，不推送消息\n");
  } else {
    await sendNotify("饿了么中奖推送", _0x170e45, {
      uid: _0x1c36b9.get("wxUid")
    });
  }
}
function _0x11564f() {
  return _0x110670().subtract(1, "day").format("YYYY-MM-DD");
}
async function _0x266820(_0x3b4b00, _0x535255, _0x4aa660, _0x3491d9 = "1608030065155%40eleme_android_11.1.38") {
  const _0x5e4d9b = {
    "content-type": "application/x-www-form-urlencoded",
    cookie: _0x3b4b00,
    "x-miniapp-env": "{\"nbsn\":\"ONLINE\",\"nbsource\":\"online\"}",
    "x-miniapp-id-taobao": "2021002130656291",
    "x-miniapp-version": "1.20230322.162092",
    appid: "2021002130656291",
    "x-features": 27,
    "x-ua": "AOSP on blueline(Android/10) AliApp(ELMC/11.1.38) Ariver/1.0.13.6",
    "x-ele-ua": "Rajax%2F1+AOSP_on_blueline%2Faosp_blueline+Android%2F10+Display%2Faosp_blueline-userdebug_10_QP1A.190711.020_eng.king.20220503.195143_test-keys+Eleme%2F11.1.38+Channel%2F1608030065155+ID%2Ff8a8e783-cb2e-3fa6-876b-c0e840f800fb%3B+KERNEL_VERSION%3A4.9.165-gfff483291c07-ab5725533+API_Level%3A29+Hardware%3A97b9f9fe80f7b4b9bb7ee87f95df7477",
    "user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
  };
  const _0x43b017 = new Date().getTime();
  const _0xd4ab11 = 12574478;
  var _0xd90b88 = "data=" + encodeURIComponent(JSON.stringify(_0x4aa660));
  const _0x467bc9 = getToken(_0x3b4b00),
    _0x2e7358 = _0x467bc9.split("_")[0];
  const _0x1f2e2d = await sign(_0x2e7358 + "&" + _0x43b017 + "&" + _0xd4ab11 + "&" + JSON.stringify(_0x4aa660), _0x19396c);
  const _0x2f4a25 = {
    url: "https://guide-acs.m.taobao.com/h5/" + _0x535255 + "/1.0/?jsv=2.7.0&appKey=12574478&t=" + _0x43b017 + "&sign=" + _0x1f2e2d + "&api=" + _0x535255 + "&v=1.0&type=originaljson&dataType=json&ttid=" + _0x3491d9 + "&asac=2A21607NIIT1ND5C4YXJ6C&needLogin=true&LoginRequest=true",
    method: "POST",
    headers: _0x5e4d9b,
    body: _0xd90b88
  };
  return tryCatchPromise(_0x16c1a2 => {
    _0x536992(_0x2f4a25, async (_0x3d949a, _0x26fea7, _0x46e688) => {
      if (!_0x3d949a && _0x26fea7.statusCode == 200) {
        try {
          const _0x490c1b = JSON.parse(_0x46e688);
          let _0x29394b = _0x490c1b.data;
          if (_0x11748d(_0x29394b) && _0x490c1b.ret[0].indexOf("接口调用成功") === -1) {
            console.log(_0x490c1b.ret[0]);
            _0x16c1a2(null);
          } else {
            _0x16c1a2(_0x29394b);
          }
        } catch (_0x1bcc66) {
          console.log(_0x46e688);
          _0x16c1a2(null);
        }
      } else {
        _0x16c1a2(null);
      }
    });
  });
}
async function _0x2a49b1(_0x270b75, _0x7a4ea) {
  console.log("\n开始翻倍");
  const _0x562b43 = {
    missionCollectionId: _0x7a4ea,
    locationInfos: "[\"{\\\"lng\\\":120.21993197500706,\\\"lat\\\":30.178378857672215}\"]",
    accountPlan: "HAVANA_COMMON",
    remindInfo: "false"
  };
  let _0x465044 = await _0x266820(_0x270b75, "mtop.ele.biz.growth.task.core.querytask", _0x562b43);
  if (_0x465044) {
    const _0xb60e8f = _0x465044.mlist;
    for (let _0x4a3a6a = 0; _0x4a3a6a < _0xb60e8f.length; _0x4a3a6a++) {
      const _0x4ebed8 = _0xb60e8f[_0x4a3a6a];
      let _0x42a43f = _0x4ebed8.missionCollectionId;
      let _0x1db7e7 = _0x4ebed8.missionDefId;
      if (_0x4ebed8.receiveStatus === "TORECEIVE" && _0x4ebed8.status === "FINISH") {
        await _0x976dca(_0x270b75, _0x1db7e7, _0x42a43f, _0x4ebed8.missionXId);
      } else {
        if (_0x4ebed8.actionConfig.actionType === "PAGEVIEW" && _0x4ebed8.status === "RUNNING") {
          let _0xe62523 = "KB_ORCHARD";
          if (_0x4ebed8.showTitle.indexOf("去游乐园") !== -1) {
            _0xe62523 = "HAVANA_COMMON";
          }
          let _0xc8583a = await _0x2a57c6(_0x270b75, _0x42a43f, _0x1db7e7);
          if (_0xc8583a.status === "RUNNING") {
            await _0x2a6944(_0x270b75, _0x1db7e7, _0x42a43f, _0x4ebed8.actionConfig.actionValue.pageSpm, _0xe62523);
            await wait(3);
            let _0x176301 = await _0x191464(_0x270b75, _0x42a43f);
            for (let _0x18a8df = 0; _0x18a8df < _0x176301.length; _0x18a8df++) {
              let _0x24a663 = _0x176301[_0x18a8df];
              if (_0x24a663.receiveStatus === "TORECEIVE" && _0x24a663.status === "FINISH") {
                await _0x217425(_0x270b75, _0x1db7e7, _0x42a43f, _0x24a663.id);
              }
            }
          } else {
            await _0x217425(_0x270b75, _0x1db7e7, _0x42a43f, _0xc8583a.id);
          }
        }
      }
    }
  }
  console.log("\n翻倍任务完成");
}
async function _0x976dca(_0x18ee84, _0x181283, _0x357814) {
  const _0x5a6024 = {
    missionCollectionId: _0x357814,
    missionId: _0x181283,
    bizScene: "duobao_external",
    accountPlan: "HAVANA_COMMON",
    count: "1",
    asac: "2A233157IJYIGQ95WFIIFJ",
    umiToken: "1",
    ua: "1"
  };
  let _0x30f7c6 = await _0x266820(_0x18ee84, "mtop.ele.biz.growth.task.core.receiveprize", _0x5a6024, "h5%40chrome_android_87.0.4280.141");
  if (_0x30f7c6) {
    console.log("完成任务");
  }
}
async function _0x2a57c6(_0x28a08c, _0x49e9de, _0x4aafdb) {
  const _0x2ff31d = {
    missionCollectionId: _0x49e9de,
    missionId: _0x4aafdb,
    bizScene: "duobao_external",
    accountPlan: "KB_ORCHARD",
    locationInfos: "[\"{\\\"lng\\\":\\\"120.21993197500706\\\",\\\"lat\\\":\\\"30.178378857672215\\\"}\"]"
  };
  let _0x2f2eb5 = await _0x266820(_0x28a08c, "mtop.ele.biz.growth.task.core.querytask", _0x2ff31d);
  if (_0x2f2eb5) {
    return _0x2f2eb5.mlist[0];
  }
}
async function _0x191464(_0x1cfc94, _0x383c96) {
  const _0x57d6f1 = {
    missionCollectionId: _0x383c96,
    locationInfos: "[\"{\\\"lng\\\":120.21993197500706,\\\"lat\\\":30.178378857672215}\"]",
    accountPlan: "HAVANA_COMMON",
    remindInfo: "false"
  };
  let _0x4a89f1 = await _0x266820(_0x1cfc94, "mtop.ele.biz.growth.task.core.querytask", _0x57d6f1);
  if (_0x4a89f1) {
    return _0x4a89f1.mlist;
  }
}
async function _0x217425(_0x26e0bb, _0x4b5b7c, _0x20c6c4, _0x475c80) {
  const _0x17647e = {
    missionCollectionId: _0x20c6c4,
    missionId: _0x4b5b7c,
    bizScene: "duobao_external",
    accountPlan: "HAVANA_COMMON",
    instanceId: _0x475c80,
    count: "1",
    asac: "2A233157IJYIGQ95WFIIFJ",
    umiToken: "1",
    ua: "1"
  };
  let _0x22ea6 = await _0x266820(_0x26e0bb, "mtop.ele.biz.growth.task.core.receiveprize", _0x17647e, "h5%40chrome_android_87.0.4280.141");
  if (_0x22ea6) {
    _0x22ea6.rlist[0].value;
    console.log("完成任务");
  }
}
async function _0x3b6699(_0x460c16, _0x360658) {
  const _0x115f71 = {
    channel: "ELMC",
    blockList: "[\"luckyNumber\",\"participants\",\"property\",\"winnerList\",\"wonDetail\",\"noWonPrize\"]",
    rightId: _0x360658,
    bizScene: "duobao_external"
  };
  let _0x4437d6 = await _0x266820(_0x460c16, "mtop.koubei.interactioncenter.snatch.new.detail", _0x115f71);
  let _0x3043fe = _0x4437d6.data;
  if (_0x3043fe) {
    console.log(_0x3043fe.baseInfo.title, "中奖率，已翻" + _0x3043fe.properties.hasExchangeNum + "倍");
  }
}
async function _0x2a6944(_0x3d0874, _0x28eda4, _0xf4ae0a, _0x120a47, _0x587c1b) {
  const _0xc3d042 = {
    collectionId: _0xf4ae0a,
    missionId: _0x28eda4,
    actionCode: "PAGEVIEW",
    pageFrom: _0x120a47,
    viewTime: "15",
    bizScene: "duobao_external",
    accountPlan: _0x587c1b,
    sync: "false",
    asac: "2A21607NIIT1ND5C4YXJ6C",
    ua: "140#8sfoUmwqzzWN9zo23zNz4pN8s77Hm2h+EI+inHO/BHPbbnMvEbjjZnbtAu7j3ZwbaVM4K6hqzznJWaQR2DrxzXQziO/qlQzx2DD3VthqzFde2XU+llfzzPziVWS3xg8I1wba7X53xl82VUpji2Jpo20oiliCyZZMhx+aFhb3z6xBKJUo6ditqgVRx+/1bEZzHypEHzQH34OdXYSaAJiXbonqm7k+tZYMwJbCoPqP4iFlDCiXApJegThvPPLS0raxfEKv+Wy2oXC1unXAp+FV1UyGqwzLLC/QYji+VpSkP5+KoLrXGrueipk8pD9nWxWLn5QH4OJIlHtoTyF7uufK101GV7EbwX6fcMYJUPbEP6A9WhkqYULJ2Mg5KcHuyqMPi1zf8DxJWyBFhGh15Ve8kGzTeFiXX1cQoKTDwl/M6WpZwLRkRwlqRfn3Mtb/CU2DCrzxdkMt6V9TG9Erv9WORuL/W8/B6pcEHIZxlCc0m8ncGSQV7q/w36wa33tKA4moz1Xej5l7b4cwI7r9zSl+bo10SMnEQoDKwkx3eDIug6+JTuw22tn/j38tmwMjKlfKyTeZvrFUbOtm7XlJmgKUK8zuTBO4sQucdGRsZp2bfvYPBmBkLVo+R5yXvz4C5OzgZYjsRd36Cx/XVOy2NlTQvJf2kHABuUmlAUuivQ7ddlW8TXtmZOL+OpvHfhpiLZdZYSSCT46ZvkBxJdOdVRu702rAcxR/GuiQTMpnAQFYReARBKtvDFXklnTz0ticCP4dBWSWfK2/5+zvOF/JP9u0QRCgUCOo70XH+QgcuqifTyCrYJ2AQvR8lTgxGbMXHqajsNQyGEZxfRDSQJW+rjo/TwNFv/PuQFiajbUlj8pjdbwMGtuDa57nMKY9hLmFDLU1ns10Um9sNb1=",
    umidtoken: "T2gA__C3-r3sSTF7ZzBUS-C0RcKNSn8q17hKFBPM5pcplOQGdIK15W9ScohgOWU8PE0="
  };
  return await _0x266820(_0x3d0874, "mtop.ele.biz.growth.task.event.pageview", _0xc3d042);
}
async function _0x45cf6f(_0x348cdc, _0x576ed1) {
  const _0x14b06c = {
    actId: "20230321231044308175810899",
    asac: "",
    bizScene: "duobao_lucky",
    channel: "ELMC",
    hsf: "1",
    instance: "INNER",
    latitude: "30.178378857672215",
    locationInfos: "[\"{\\\"lng\\\":120.21993197500706,\\\"lat\\\":30.178378857672215}\"]",
    longitude: "120.21993197500706",
    rightId: _0x576ed1
  };
  return await _0x266820(_0x348cdc, "mtop.koubei.interactioncenter.snatch.exchange.exchangeproof", _0x14b06c);
}
async function _0x339f42(_0x55d726) {
  const _0x6728cf = {
    channel: "ELMC",
    blockList: "[\"participants\",\"wonDetail\",\"noWonPrize\"]",
    bizScene: "duobao_external"
  };
  console.log("\n开始查询最近的夺宝结果");
  let _0x357e1f = await _0x266820(_0x55d726, "mtop.koubei.interactioncenter.snatch.mine", _0x6728cf);
  if (_0x357e1f) {
    let _0x43b62f = _0x357e1f.data;
    if (_0x43b62f.length > 0) {
      for (let _0x16c631 = 0; _0x16c631 < _0x43b62f.length; _0x16c631++) {
        let _0x271b77 = _0x43b62f[_0x16c631];
        if (_0x271b77.awardStatus === "not_won_wait_accept") {
          await _0x342b06(_0x55d726, _0x271b77.baseInfo.id);
          await wait(1);
        }
      }
    } else {
      console.log("没有参与过夺宝");
    }
  }
}
async function _0x342b06(_0x21bd49, _0x333bec) {
  const _0x5ee272 = {
    rightId: _0x333bec,
    actId: "20210425163619036128611204",
    asac: "2A23725HM0AS2TZ458W1VX",
    bizScene: "duobao_external"
  };
  let _0x5b98d2 = await _0x266820(_0x21bd49, "mtop.koubei.interactioncenter.snatch.nowon.reviceprize", _0x5ee272);
  if (_0x5b98d2) {
    console.log("0 元夺宝获得：" + _0x5b98d2.data[0].title);
  }
}
async function _0x3bc7cb(_0x4b3299) {
  const _0x39710f = {
    channel: "ELMC",
    blockList: "[\"participants\",\"wonDetail\",\"noWonPrize\"]",
    longitude: "120.21993197500706",
    latitude: "30.178378857672215",
    actId: "20230811111144939171438583",
    cpnCode: "TIMING_RIGHT",
    cpnCollectionId: "20230811111144993902427153",
    statusSet: "[\"ONLINE\",\"PREPARE\"]",
    showStatusSet: "[\"ONLINE\",\"PREPARE\"]",
    bizScene: "duobao_external"
  };
  let _0x33ef5a = await _0x266820(_0x4b3299, "mtop.koubei.interactioncenter.snatch.homepage.query", _0x39710f);
  return _0x33ef5a.data;
}
async function _0xfb1dd8(_0x3fac6b) {
  let _0x12ab43 = await _0x3bc7cb(_0x3fac6b);
  if (_0x12ab43) {
    let _0x407e81 = _0x12ab43.groupSnatchList.EXCELLENT;
    console.log("\n开始夺宝");
    for (let _0x52a7bd = 0; _0x52a7bd < _0x407e81.length; _0x52a7bd++) {
      let _0x66250b = _0x407e81[_0x52a7bd];
      if (_0x66250b.status === "ONLINE" && !_0x66250b.properties.hasParticipated) {
        let _0x52068e = _0x66250b.baseInfo;
        let _0x474ca4 = await _0x45cf6f(_0x3fac6b, _0x52068e.rightId);
        if (_0x474ca4) {
          console.log("参与", _0x52068e.title, "夺宝成功，夺宝号码为", _0x474ca4.data.luckyNumber);
        }
        await wait(2);
      }
    }
  }
}
async function _0x560059(_0x15e7f8) {
  let _0x1622f6 = await _0x3bc7cb(_0x15e7f8);
  if (_0x1622f6) {
    let _0x116e1d = _0x1622f6.groupSnatchList.EXCELLENT;
    console.log("\n开始做翻倍任务");
    for (let _0x1d9f52 = 0; _0x1d9f52 < _0x116e1d.length; _0x1d9f52++) {
      let _0x141124 = _0x116e1d[_0x1d9f52];
      if (_0x141124.status === "ONLINE") {
        let _0x47c334 = _0x141124.properties.hasParticipated;
        if (_0x47c334) {
          let _0x4c7639 = _0x141124.properties.taskSetId;
          await _0x2a49b1(_0x15e7f8, _0x4c7639);
        }
        await _0x3b6699(_0x15e7f8, _0x141124.baseInfo.rightId);
        await wait(2);
      }
    }
  }
}
(async function () {
  await validateCarmeWithType(_0x19396c, 1);
  const _0x3b295a = getCookies();
  for (let _0x38b010 = 0; _0x38b010 < _0x3b295a.length; _0x38b010++) {
    const _0x1ec07d = _0x3b295a[_0x38b010];
    if (!_0x1ec07d) {
      console.log(" ❌无效用户信息, 请重新获取ck");
    } else {
      try {
        let _0x48000a = await checkCk(_0x1ec07d, _0x38b010);
        if (!_0x48000a) {
          continue;
        }
        let _0x3d13df = await getUserInfo(_0x48000a);
        if (!_0x3d13df.username) {
          console.log("第", _0x38b010 + 1, "账号失效！请重新登录！！！😭");
          continue;
        }
        const _0x4c564d = _0x3d13df.user_id;
        await checkCarmeCount(_0x19396c, _0x4c564d, _0x279a2b);
        console.log("******开始【饿了么账号", _0x38b010 + 1, "】", _0x3d13df.username, "*********");
        await _0x339f42(_0x48000a);
        await _0xfb1dd8(_0x48000a);
        await _0x560059(_0x48000a);
      } catch (_0x36e9dd) {
        console.log(_0x36e9dd);
      }
    }
  }
  process.exit(0);
})();
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}