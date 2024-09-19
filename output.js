//Thu Sep 19 2024 17:50:55 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
/**
 * 饿了么 - 我要当总裁
 */

const $ = new Env("\u997F\u4E86\u4E48-\u6211\u8981\u5F53\u603B\u88C1");
const {
  cookiesToMap,
  elmRequestByApi,
  elmRequestByH5
} = require("./common_xxx");
class Task {
  constructor(cookie, index) {
    this.cookie = cookie;
    this.cookieObject = cookiesToMap(cookie);
    this.uid = this.cookieObject.get("USERID");
    this.index = index + 1;
    this.instanceid = "";
    this.missionXId = "";
    this.itemId = "";
    this.count = "";
    this.phone = "";
    this.receiveStatus = ""; //判断是否没看过广告，"TORECEIVE"为没看过，"HAVERECEIVED"为看过
  }
  // 获取手机号
  async getPhone() {
    const api = "mtop.alsc.interaction.sns.user.login.info.query";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizParam: "{\"gameId\":\"\"}",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    // console.log(res)
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      this.phone = res.data.data.mobilePhone;
      return true;
    }
    console.log("[" + this.phone + "] \u83B7\u53D6 phone \u51FA\u9519----", res.ret);
    return false;
  }

  // 获取token
  async getToken() {
    const api = "mtop.alsc.playgame.mini.game.dispatch";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizMethod: "login",
      bizParam: "{\"gameId\":\"\"}",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    // console.log(res)
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      let jsonData = JSON.parse(res.data.data);
      this.token = jsonData.data.token;
      this.gameId = jsonData.data.gameId;
      //   console.log('获取游戏token，',this.token)
      //   console.log('获取游戏gameId，',this.gameId)
      return true;
    }
    console.log("[" + this.phone + "] \u83B7\u53D6 token/gameid \u51FA\u9519----", res.ret);
    return false;
  }

  // 开始游戏
  async startGame() {
    const api = "mtop.alsc.playgame.mini.game.dispatch";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizMethod: "startGame",
      bizParam: "{\"gameId\":\"" + this.gameId + "\",\"token\":\"" + this.token + "\"}",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      let jsonData = JSON.parse(res.data.data);
      if (jsonData.bizErrorMsg == "success") {
        this.gameCode = jsonData.data.gameMatch.gameCode;
        console.log("[" + this.phone + "] \u5F00\u59CB\u6E38\u620F\uFF0C\u6E38\u620F\u7801----");
        return true;
      }
      console.log("[" + this.phone + "] \u6CA1\u6709\u6E38\u620F\u6B21\u6570\u4E86----", jsonData.bizErrorMsg);
      return false;
    }
    console.log("[" + this.phone + "] \u5F00\u59CB\u6E38\u620F\u51FA\u9519----", res.ret);
    return false;
  }

  // 结束游戏
  async endGame() {
    const api = "mtop.alsc.playgame.mini.game.dispatch";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizMethod: "endGame",
      bizParam: "{\"gameId\":\"" + this.gameId + "\",\"gameCode\":\"" + this.gameCode + "\",\"operationQueue\":[[4,6],[9,1],[6,4],[9,1],[1,9],[8,2],[5,5],[8,2],[2,8],[5,5],[1,9],[8,2],[5,5],[1,9],[8,2],[5,5],[8,2],[2,8],[5,5],[1,9],[8,2],[5,5],[8,2],[2,8],[5,5],[1,9],[8,2],[5,5],[8,2],[2,8],[5,5],[8,2],[2,8],[5,5],[5,5],[6,4],[3,7],[1,9],[9,1],[6,4],[3,7],[6,4],[1,9],[8,2],[5,5],[8,2],[2,8],[5,5],[1,9],[8,2],[5,5],[8,2],[2,8],[5,5],[6,4]],\"token\":\"" + this.token + "\"}",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      console.log("[" + this.phone + "] \u7ED3\u675F\u6E38\u620F----");
      return true;
    }
    console.log("[" + this.phone + "] \u7ED3\u675F\u6E38\u620F\u51FA\u9519----", res.ret);
    return false;
  }

  // 看广告
  async getPageview() {
    const api = "mtop.ele.biz.growth.task.event.pageview";
    const data = JSON.stringify({
      // "collectionId": "1477",
      // "missionId": "25380001",
      // "actionCode": "PAGEVIEW",
      // "bizScene": "FOOD_ELIMINATE",
      // "accountPlan": "KB_ORCHARD",
      // "locationInfos": "[\"{\\\"lng\\\":\\\"-360\\\",\\\"lat\\\":\\\"-360\\\"}\"]"
      collectionId: "1477",
      missionId: "25380001",
      actionCode: "PAGEVIEW",
      pageFrom: "a2ogi.bx1197340",
      viewTime: "15",
      bizScene: "FOOD_ELIMINATE",
      accountPlan: "KB_ORCHARD",
      sync: "false"
    });
    let res = await elmRequestByApi(api, data, this.cookie);
    // console.log(res)
    if (res.ret[0] == "SUCCESS::\u63A5\u53E3\u8C03\u7528\u6210\u529F") {
      console.log("\u5F00\u59CB\u770B\u5E7F\u544A----");
      //   $.log('等待15秒')
      //   await $.wait(15000)
      return true;
    }
    console.log("\u770B\u5E7F\u544A\u51FA\u9519----", res ? res.ret : "res\u672A\u5B9A\u4E49");
    return false;
  }

  //获得广告展示页面,拿到instanceid,missionXId,count
  async viewtask() {
    const api = "mtop.ele.biz.growth.task.core.querytask";
    const data = JSON.stringify({
      missionCollectionId: "1477",
      missionId: "25380001",
      locationInfos: "[\"{\\\"lng\\\":104.09800574183464,\\\"lat\\\":30.22990694269538,\\\"city\\\":\\\"511400\\\"}\"]",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByApi(api, data, this.cookie);
    // console.log(res)
    if (res.ret[0] == "SUCCESS::\u63A5\u53E3\u8C03\u7528\u6210\u529F") {
      console.log("\u5E7F\u544A\u9875\u9762\u5C55\u793A");
      //   $.log('等待15秒')
      //   await $.wait(15000)
      // const instanceid1=res["data"]["mlist"][0]
      // console.log(instanceid1)
      this.receiveStatus = res["data"]["mlist"][0]["receiveStatus"];
      // console.log(this.receiveStatus)
      this.instanceid = res["data"]["mlist"][0]["id"];
      // console.log(this.instanceid)
      this.missionXId = res["data"]["mlist"][0]["missionXId"];
      // console.log(this.missionXId)
      this.count = res["data"]["mlist"][0]["nextStageCount"] - 1;
      if (this.count == 0) {
        this.count = 1;
      }
      // console.log('count:'+this.count)
      $.log("\u7B49\u5F852\u79D2\u5E7F\u544A\u5C55\u793A");
      await $.wait(2000);
      return true;
    }
    console.log("\u5E7F\u544A\u9875\u9762\u5C55\u793A\u51FA\u9519----", res ? res.ret : "res\u672A\u5B9A\u4E49");
    return false;
  }
  // 初始化广告任务
  async adstart() {
    await $.wait(3000);
    const api = "mtop.ele.biz.growth.task.core.receivetask";
    const data = JSON.stringify({
      missionCollectionId: "1477",
      missionId: "25380001",
      locationInfos: "[\"{\\\"lng\\\":104.09800574183464,\\\"lat\\\":30.22990694269538,\\\"city\\\":\\\"511400\\\"}\"]",
      //   "locationInfos":"[\"{\\\"lng\\\":104.09800574183464,\\\"lat\\\":30.22990694269538,\\\"city\\\":\\\"511400\\\"}\"]",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByApi(api, data, this.cookie);
    // console.log(res)
    if (res.ret[0] == "SUCCESS::\u63A5\u53E3\u8C03\u7528\u6210\u529F") {
      console.log("[" + this.phone + "] \u521D\u59CB\u5316\u5E7F\u544A\u6210\u529F----");
      return true;
    }
    console.log("[" + this.phone + "] \u521D\u59CB\u5316\u5E7F\u544A\u51FA\u9519----", res.ret);
    return false;
  }

  // 领取广告收益，D003是进入游戏看广告编号，D004是进入无限玩看广告编号，D001是游戏内道具看广告编号
  async postPageview(itemId) {
    await $.wait(3000);
    const api = "mtop.ele.biz.growth.task.core.receiveprize";
    // console.log(this.gameId)
    let extInfo = JSON.stringify({
      count: this.count,
      gameId: this.gameId,
      type: "GameProp",
      costType: "Ads",
      itemId: itemId,
      token: this.token
    });
    const data = JSON.stringify({
      missionCollectionId: "1477",
      missionId: "25380001",
      count: this.count,
      extInfo: extInfo,
      missionXId: this.missionXId,
      instanceId: this.instanceid,
      umiToken: "1",
      ua: "1",
      locationInfos: "[\"{\\\"lng\\\":104.09800574183464,\\\"lat\\\":30.22990694269538,\\\"city\\\":\\\"511400\\\"}\"]",
      //   "locationInfos":"[\"{\\\"lng\\\":104.09800574183464,\\\"lat\\\":30.22990694269538,\\\"city\\\":\\\"511400\\\"}\"]",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByApi(api, data, this.cookie);
    // console.log(res)
    if (res.ret[0] == "SUCCESS::\u63A5\u53E3\u8C03\u7528\u6210\u529F") {
      console.log("[" + this.phone + "] \u5F00\u59CB\u9886\u53D6\u5E7F\u544A\u6536\u76CA----");
      this.itemId = res.data.rlist["type"];
      return true;
    }
    console.log("[" + this.phone + "] \u9886\u53D6\u5E7F\u544A\u6536\u76CA\u51FA\u9519----", res.ret);
    return false;
  }

  // 使用道具
  async usedGameProp() {
    const api = "mtop.alsc.playgame.mini.game.dispatch";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizMethod: "useGameProp",
      //   "bizParam": "{\"gameId\":\"" + this.gameId + "\",\"itemId\":\""+this.itemId+"\",\"token\":\"" + this.token + "\"}",
      bizParam: "{\"gameId\":\"" + this.gameId + "\",\"itemId\":\"I003\",\"token\":\"" + this.token + "\"}",
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      let jsonData = JSON.parse(res.data.data);
      if (jsonData.bizErrorMsg == "success") {
        console.log("[" + this.phone + "] \u4F7F\u7528\u9053\u5177\u6210\u529F");
        this.count++;
        return true;
      }
      console.log("[" + this.phone + "] \u4F7F\u7528\u9053\u5177\u51FA\u9519----", jsonData.bizErrorMsg);
      return false;
    }
    console.log("[" + this.phone + "] \u4F7F\u7528\u9053\u5177\u51FA\u9519----", res.ret);
    return false;
  }

  // 获取任务列表
  async getTaskList() {
    const api = "mtop.alsc.playgame.mini.game.dispatch";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizMethod: "getTasks",
      bizParam: JSON.stringify({
        gameId: this.gameId,
        token: this.token
      }),
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      let jsonData = JSON.parse(res.data.data);
      //   console.log(jsonData)
      if (jsonData.bizErrorMsg == "success") {
        this.taskList = jsonData.data.tasks;
        if (Object.keys(this.taskList).length > 0) {
          console.log("[" + this.phone + "] \u83B7\u53D6\u4EFB\u52A1\u5217\u8868\u6210\u529F----");
          return true;
        }
        console.log("[" + this.phone + "] \u8FD8\u6CA1\u6709\u5F85\u9886\u5956\u4EFB\u52A1");
        return false;
      }
      console.log("[" + this.phone + "] \u83B7\u53D6\u4EFB\u52A1\u5217\u8868\u51FA\u9519----", jsonData.bizErrorMsg);
      return false;
    }
    console.log("[" + this.phone + "] \u83B7\u53D6\u4EFB\u52A1\u5217\u8868\u51FA\u9519----", res.ret);
    return false;
  }

  // 校验任务是否完成
  async checkTask() {
    if (await this.getTaskList()) {
      // console.log(this.taskList)
      let a = 0; //控制返回值
      //   判断是否使用道具
      if ("T001" in this.taskList) {
        if (this.taskList["T001"]["isFinishe"] == true) {
          console.log("[" + this.phone + "] \u2705\u4EFB\u52A1T001\u5DF2\u5B8C\u6210");
        } else if (this.taskList["T001"]["progress"] == 4) {
          console.log("[" + this.phone + "] \u9886\u53D6T001\u5956\u52B1");
          this.postTask(this.taskList["T001"]["taskId"]);
        } else {
          console.log("T001\u4EFB\u52A1\u8FDB\u5EA6", this.taskList["T001"]["progress"] + "/4");
          console.log("[" + this.phone + "] \u7EE7\u7EEDT001\u4EFB\u52A1");
          return true;
        }
      } else {
        return true;
      }
      // 判断是否完成任务
      if ("T004" in this.taskList) {
        if (this.taskList["T004"]["isFinishe"] == true) {
          console.log("[" + this.phone + "] \u2705\u4EFB\u52A1T004\u5DF2\u5B8C\u6210");
          return false;
        } else if (this.taskList["T004"]["progress"] == 100) {
          console.log("[" + this.phone + "] \u9886\u53D6T004\u5956\u52B1");
          this.postTask(this.taskList["T004"]["taskId"]);
          return false;
        } else {
          console.log("[" + this.phone + "] T004\u4EFB\u52A1\u8FDB\u5EA6", this.taskList["T004"]["progress"] + "%");
          console.log("[" + this.phone + "] \u7EE7\u7EEDT004\u4EFB\u52A1");
          return true;
        }
      }
    }
    return true;
  }

  // 领取任务奖励
  async postTask(taskId) {
    const api = "mtop.alsc.playgame.mini.game.dispatch";
    const data = JSON.stringify({
      bizScene: "TOBECEO",
      bizMethod: "finisheTask",
      bizParam: JSON.stringify({
        taskId: taskId,
        gameId: this.gameId,
        token: this.token
      }),
      longitude: "104.09800574183464",
      latitude: "30.22990694269538"
    });
    let res = await elmRequestByH5(this.cookie, api, data);
    if (res.ret.indexOf("SUCCESS::\u8C03\u7528\u6210\u529F") > -1) {
      let jsonData = JSON.parse(res.data.data);
      if (jsonData.bizErrorMsg == "success") {
        console.log(`[${this.phone}] ✅完成任务获得乐园币--[${jsonData["data"]["rewardItems"][0]["num"]}]`);
      } else {
        console.log("[" + this.phone + "] \u5B8C\u6210\u4EFB\u52A1" + taskId + "\u51FA\u9519----", jsonData.bizErrorMsg);
      }
    }
  }
  async main(i) {
    // 获取 phone
    await this.getPhone();
    console.log("*****\u7B2C\u3010" + (i + 1) + "\u3011\u4E2A\u8D26\u53F7\u3010" + this.phone + "\u3011\u5F00\u59CB *****");
    //获取token
    if (await this.getToken()) if (await this.checkTask()) {
      // 获取任务列表
      await this.viewtask();
      if (this.receiveStatus == "TORECEIVE") {
        await this.adstart();
        await this.viewtask();
      }
      await this.getPageview();
      await this.postPageview("D003");
      if (await this.startGame()) {
        if (!("T001" in this.taskList) || this.taskList["T001"]["isFinishe"] != true) {
          if (!("T001" in this.taskList)) {
            var num = 1;
          } else {
            var num = this.taskList["T001"]["progress"];
          }
          for (let n = num; n <= 4; n++) {
            console.log("\u7B2C" + n + "\u6B21T001\u9053\u5177\u4EFB\u52A1");
            await this.getPageview();
            await this.viewtask();
            await this.postPageview("D001");
            await this.usedGameProp();
          }
        }
        await this.endGame();

        // 领取奖励
        await this.getTaskList();
        if ("T004" in this.taskList) {
          if (this.taskList["T004"]["isFinishe"] == true) {
            console.log("[" + this.phone + "] \u2705\u4EFB\u52A1T004\u5DF2\u5B8C\u6210");
          } else if (this.taskList["T004"]["progress"] == 100) {
            console.log("[" + this.phone + "] \u9886\u53D6T004\u5956\u52B1");
            await this.postTask(this.taskList["T004"]["taskId"]);
          } else {
            console.log("[" + this.phone + "] T004\u4EFB\u52A1\u8FDB\u5EA6", this.taskList["T004"]["progress"] + "/4");
            console.log("[" + this.phone + "] \u7EE7\u7EEDT004\u4EFB\u52A1");
          }
        }

        // 领取奖励  道具
        if ("T001" in this.taskList) {
          if (this.taskList["T001"]["isFinishe"] == true) {
            console.log("\u2705\u4EFB\u52A1T001\u5DF2\u5B8C\u6210");
          } else if (this.taskList["T001"]["progress"] == 4) {
            console.log("\u9886\u53D6T001\u5956\u52B1");
            await this.postTask(this.taskList["T001"]["taskId"]);
          } else {
            console.log("T001\u4EFB\u52A1\u8FDB\u5EA6", this.taskList["T001"]["progress"] + "/4");
          }
        }
      }
    }
    console.log("*****\u7B2C\u3010" + (i + 1) + "\u3011\u4E2A\u8D26\u53F7\u3010" + this.phone + "\u3011\u7ED3\u675F *****");
  }
}
async function start() {
  // 获取账号
  let cookies = [];
  if (process.env.elmck) {
    // 环境变量
    if (process.env.elmck.indexOf("&") > -1) {
      cookies = process.env.elmck.split("&");
    } else {
      cookies.push(process.env.elmck);
    }
    console.log(`执行账号个数：${cookies.length}`);
  } else {
    // 本地测试
    cookies = cookies.concat([""]);
    if (cookies.length < 1) {
      log("\u68C0\u6D4B\u5230\u73AF\u5883\u53D8\u91CF\u3001\u672C\u5730ck\u90FD\u4E3A\u7A7A");
      return;
    }
  }
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const task = new Task(cookie, i);
    await task.main(i);
    $.log("\u7B49\u5F853\u79D2");
    await $.wait(3000);
  }
}
start();

// prettier-ignore
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
      return "POST" === e && (s = this.post), new Promise((e, i) => {
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
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = new Date().getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`);
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
      if (i) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
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
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
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
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
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
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
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
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
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
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e;
        } catch (t) {
          e = "";
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
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i);
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar(), t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i);
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
            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar;
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
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i);
      });else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
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
      }, t => e(t));else if (this.isNode()) {
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
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
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
        let t = ["", "==============\uD83D\uDCE3\u7CFB\u7EDF\u901A\u77E5\uD83D\uDCE3=============="];
        t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator));
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
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}