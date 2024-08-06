//Tue Aug 06 2024 13:24:23 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const {
  "sign": sign,
  "getToken": getToken,
  "checkCk": checkCk,
  "getCookies": getCookies,
  "getUserInfo": getUserInfo,
  "validateCarmeWithType": validateCarmeWithType,
  "wait": wait,
  "checkCarmeCount": checkCarmeCount,
  "tryCatchPromise": tryCatchPromise
} = require("./common.js");
const request = require("request");
const GAME_TYEP = 3;
const kami = process["env"]["ELE_CARME"];
function isEmpty(_0xa5a90d) {
  return Object["values"](_0xa5a90d)["length"] === 0;
}
async function lottery(_0x49561f) {
  const _0x3ca203 = {
    "authority": "shopping.ele.me",
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://r.ele.me",
    "pragma": "no-cache",
    "referer": "https://r.ele.me/linkgame/index.html?navType=3&spm-pre=a2ogi.13162730.zebra-ele-login-module-9089118186&spm=a13.b_activity_kb_m71293.0.0",
    "cookie": _0x49561f,
    "x-ele-ua": "RenderWay/H5 AppName/wap Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
    "user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
  };
  const _0x4ba9fe = {
    "bizScene": "XIAODANGJIA",
    "actId": "20230117134129770153614517",
    "uniqueId": '',
    "latitude": "30.17862595617771",
    "longitude": "120.22057268768549",
    "cityId": '2',
    "bizCode": "XIAODANGJIA",
    "collectionId": "20230421102945045949799658",
    "componentId": "20230505143809276394718532",
    "extParams": "{\"actId\":\"20230117134129770153614517\",\"bizScene\":\"XIAODANGJIA\",\"desc\":\"玩特级厨师挑战赛\"}",
    'ua': "140#j5ux7ZvyzzWqwzo2+i+F4pN8s77dltkRQIO3QRil+Yn3wcq3bj90JrqHYHVu9Ajc4Qvzlp1zzqQUiL53Wzzx0Hw+93h/zzrb22U3lp1xzR2VV2EqlaOz2PD+VoS3xg8I1wba7X53xl82VUpji2Jpo20oiliCyZZMhx+aFhb3z6xBKJUo6ditqgIJzlXBvo3zHy952ETFQJJ4VtMblt1Rg5dK6cwi1gpgsO7bpU9tqcFbbrZp9GOwTNb6uzawxcYW4weLSQ7XJ4U/7LoSok/s/uEuOXtCCid22sUl01a8LcZBfGCH6TGTK9FPDON0BmAQHTTD+kOWs6V2AeXWJL+HZV2gXyt8W/N3T0xxs6+UHgah+Nthuf7mpQA0EEWZKpsQE4L+3F8co053zVawEqeNYdbiWEq9WRB+zTujE9bIpoJ4qA1MfJL091GI3KYCkeCxM9kuyjSpGexyNgSyYn57lvmiHroxcAuezPdEyElpAx4VHDwmWr0qKJHCt/YydEwWqyqoDhL394UXSjVCTBxEztWKF6wVtONnwT1T78KhjVKKmz/QHqzdCgyAGmhu+UY87Q3ah4C+yCkFLT/KS+i2gmBtA8k6cBYjjWEZvIXP+yYdk1w8zuJRP606RBHGrVkzJ3hv6g1G8rIJquUAWFE+v+eVlWJJUXTSv06yBe2jfe0Wu3cGnF==",
    "umidToken": "defaultToken3_init_callback_not_called@@https://r.ele.me/afun-chuka-ichiban/@@1687772010930",
    "asac": "2A22C0239QW1FOL3UUQY7U"
  };
  const _0x1ffd1a = new Date()["getTime"]();
  const _0x25ced9 = 12574478;
  var _0xb79160 = "data=" + encodeURIComponent(JSON["stringify"](_0x4ba9fe));
  const _0x49cff8 = getToken(_0x49561f);
  const _0x507372 = _0x49cff8["split"]('_')[0];
  const _0x1776c6 = await sign(_0x507372 + '&' + _0x1ffd1a + '&' + _0x25ced9 + '&' + JSON["stringify"](_0x4ba9fe), kami);
  const _0x4cdad7 = {
    "url": "https://shopping.ele.me/h5/mtop.koubei.interactioncenter.platform.right.lottery/1.0/?jsv=2.6.1&appKey=12574478&t=" + _0x1ffd1a + "&sign=" + _0x1776c6 + "&api=mtop.koubei.interactioncenter.platform.right.lottery&v=1.0&type=originaljson&dataType=json",
    "method": "POST",
    "headers": _0x3ca203,
    "body": _0xb79160
  };
  return tryCatchPromise(_0x1d0c9f => {
    request(_0x4cdad7, async (_0x233414, _0x5f2660, _0x1714f1) => {
      if (!_0x233414 && _0x5f2660["statusCode"] == 200) {
        try {
          const _0xca907a = JSON["parse"](_0x1714f1);
          if (isEmpty(_0xca907a["data"]["data"])) {
            console["log"](_0xca907a["ret"][0]);
            _0x1d0c9f(false);
          } else {
            const _0x1709f8 = _0xca907a["data"]["data"]["sendRightList"][0]["discountInfo"]["amount"];
            console["log"]("特级厨师闯关成功。获得：" + _0x1709f8, "乐园币");
            if (_0x1709f8 == 1) {
              _0x1d0c9f(false);
            } else {
              _0x1d0c9f(true);
            }
          }
        } catch (_0x3750a0) {
          _0x1d0c9f(false);
        }
      } else {
        _0x1d0c9f(false);
      }
    });
  });
}
async function start() {
  await validateCarmeWithType(kami, 1);
  const _0x3433f4 = getCookies();
  for (let _0x192829 = 0; _0x192829 < _0x3433f4["length"]; _0x192829++) {
    const _0x352a5f = _0x3433f4[_0x192829];
    if (!_0x352a5f) {
      console["log"](" ❌无效用户信息, 请重新获取ck");
    } else {
      try {
        let _0x14288b = await checkCk(_0x352a5f, _0x192829);
        if (!_0x14288b) {
          continue;
        }
        let _0x4d732e = await getUserInfo(_0x14288b);
        if (!_0x4d732e["username"]) {
          console["log"]('第', _0x192829 + 1, "账号失效！请重新登录！！！😭");
          continue;
        }
        const _0x39969d = _0x4d732e["user_id"];
        await checkCarmeCount(kami, _0x39969d, GAME_TYEP);
        console["log"]("******开始【饿了么账号", _0x192829 + 1, '】', _0x4d732e["username"], "*********");
        var _0x120fe1 = await lottery(_0x14288b);
        console["log"]("延时 5 秒");
        await wait(5);
      } catch (_0x2dcd3d) {
        console["log"](_0x2dcd3d);
      }
    }
  }
  process["exit"](0);
}
start();