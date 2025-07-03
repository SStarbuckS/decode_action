/**
 * 福田E家单线程版
 * 
 * 1. 改为单线程顺序执行
 * 2. 各任务间隔延时执行，默认3-10s随机延时
 * 3. 优化运行逻辑，避免因某个号报错停止脚本
 * 4. 支持多变量，可处理Base64编码后的账密
 * 5. 皮卡生活签到默认开启，每月3452积分，开启后拉满4424积分
 * 6. 积分转盘抽奖默认关闭，赌狗可开启，运气爆棚单车变摩托
 * 7. 新增春日活动，默认关闭，在31行修改
 * 8. 新增皮卡生活登录缓存，防止频繁发送短信
 * 9. 签到加入重试功能
 * 10.在每次发帖重试时获取新的随机文本内容进行发帖
 * 11.保客分享暂时默认关闭
 * 
 * 使用说明：
 * cron: 30 12 * * * (建议根据实际情况调整)
 * 变量：export FTEJ="账号1&密码1（空格或换行）账号2&密码2"
 * export FTEJ_PK="1" // 皮卡生活签到 开启=1，关闭=0
 * export FTEJ_Lottery="0" // 积分转盘抽奖 开启=1，关闭=0
 * export FTEJ_SpringSign="0" // 春日活动 开启=1，关闭=0
 * export FTEJ_Share="1" // 保客分享 开启=1，关闭=0
 * 
 * 原作者：@xzxxn777
 * 二改:羽化
 * 修复:山河
 * 三改:Reverie
 * 
 * 频道：https://t.me/xzxxn777
 * 群组：https://t.me/xzxxn7777
 */



const $ = new Env('福田e家');
const CACHE_FILE = 'FTEJ_Cache.json'; // 皮卡生活缓存文件
const FTEJ = ($.isNode() ? process.env.FTEJ : $.getdata("FTEJ")) || '';
const FTEJ_PK = ($.isNode() ? process.env.FTEJ_PK : $.getdata("FTEJ_PK")) || '1'; // 皮卡生活签到 开启=1，关闭=0
const FTEJ_Share = ($.isNode() ? process.env.FTEJ_Share : $.getdata("FTEJ_Share")) || '0'; // 保客分享 开启=1，关闭=0
const FTEJ_Lottery = ($.isNode() ? process.env.FTEJ_Lottery : $.getdata("FTEJ_Lottery")) || '0'; // 积分转盘抽奖 开启=1，关闭=0
const FTEJ_SpringSign = ($.isNode() ? process.env.FTEJ_SpringSign : $.getdata("FTEJ_SpringSign")) || '0'; //春日活动 开启=1，关闭=0
let notice = '';

async function main() {
    if (!FTEJ) {
        console.log("⚠️ 未配置账号信息，请添加环境变量");
        return;
    }

    const accounts = FTEJ.split(/\s+/);
    let results = [];

    for (let i = 0; i < accounts.length; i++) {
        console.log(`\n\n🚀 开始处理第 ${i + 1} 个账号 (共 ${accounts.length} 个)`);
        
        try {
            const result = await processAccount(accounts[i], i + 1);
            results.push(result);
        } catch (error) {
            console.error(`❌ 账号处理失败: ${error.message}`);
            results.push(`❌ 账号处理失败: ${error.message}`);
        }
        
        console.log('──────────────');
        
        // 账号间延迟
        if (i < accounts.length - 1) {
            await randomDelay(5, 10);
        }
    }

    const finalNotice = results.join('\n');
    if (finalNotice) {
        console.log('\n📢 最终结果汇总:\n' + finalNotice);
        await sendMsg(finalNotice);
    }
}

!(async () => {
    await main();
})()
.catch((e) => {
    console.error(`❗ 主流程异常: ${e.stack}`);
    $.logErr(e);
})
.finally(() => $.done());

/* ========== 工具函数 ========== */
const randomDelay = (min, max) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`⏳ 随机延迟 ${delay} 秒...`);
    return new Promise(resolve => setTimeout(resolve, delay * 1000));
};

async function retryTask(taskFn, maxRetries = 3, initialDelay = 1000) {
    let lastError = null;
    let delay = initialDelay;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await taskFn();
            if (attempt > 1) {
                console.log(`✅ 第 ${attempt} 次重试成功`);
            }
            return result;
        } catch (error) {
            lastError = error;
            console.warn(`🔄 第 ${attempt} 次尝试失败: ${error.message}`);
            if (attempt < maxRetries) {
                console.log(`⏸️ ${delay/1000}秒后重试...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // 指数退避
            }
        }
    }
    
    throw lastError || new Error('任务执行失败');
}

function readCache() {
    try {
        let cacheData = {};
        if ($.isNode()) {
            const fs = require('fs');
            const path = require('path');
            const cachePath = path.resolve(__dirname, CACHE_FILE);
            if (fs.existsSync(cachePath)) {
                const content = fs.readFileSync(cachePath, 'utf8');
                cacheData = content ? JSON.parse(content) : {};
                console.log('📖 从文件读取缓存成功');
            }
        } else {
            const content = $.getdata(CACHE_FILE);
            cacheData = content ? JSON.parse(content) : {};
            console.log('📖 从存储读取缓存成功');
        }
        return cacheData;
    } catch (e) {
        console.error('❌ 读取缓存失败:', e);
        return {};
    }
}

function writeCache(data) {
    try {
        const cacheData = JSON.stringify(data, null, 2);
        if ($.isNode()) {
            const fs = require('fs');
            const path = require('path');
            const cachePath = path.resolve(__dirname, CACHE_FILE);
            fs.writeFileSync(cachePath, cacheData);
            console.log('💾 缓存写入文件成功');
        } else {
            $.setdata(cacheData, CACHE_FILE);
            console.log('💾 缓存写入存储成功');
        }
        return true;
    } catch (e) {
        console.error('❌ 写入缓存失败:', e);
        return false;
    }
}

function extractCookieValue(cookie) {
    if (!cookie) return '';
    try {
        return cookie.split(';')[0].split('=')[1] || '';
    } catch (e) {
        console.error('❌ 解析Cookie失败:', e);
        return '';
    }
}

/* ========== 核心功能 ========== */
async function processAccount(account, index) {
    let phone, password;
    const startTime = Date.now();
    
    try {
        // 解析账号
        if (account.includes("&")) {
            [phone, password] = account.split("&");
        } else {
            let decodedItem = atob(account);
            [phone, password] = decodedItem.split("&");
        }
        
        const maskedPhone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        console.log(`\n[${index}] 🔍 开始处理账号 ${maskedPhone}`);
        
        // 登录
        const login = await retryTask(async () => {
            console.log(`[${index}] 🔐 尝试登录...`);
            return await loginPost('/ehomes-new/homeManager/getLoginMember', {
                version_name: "7.4.9",
                deviceSystem: "17.1",
                version_auth: "Sj/N8jkW7TY/reqEwTLsEg==",
                device_type: "0",
                password,
                ip: "",
                device_id: "3691E11D-ECD9-4944-B812-3D633A1A9D26",
                version_code: "582",
                name: phone,
                device_model: "iPhone14,5"
            });
        }, 3, 2000);
        
        if (login.code !== 200) {
            throw new Error(`登录失败: ${login.msg || '未知错误'}`);
        }
        
        console.log(`[${index}] ✅ 登录成功`);
        const { uid, memberComplexCode, memberID, memberId, signIn } = login.data;
        
        // 获取昵称
        const nickName = await getMemberNickname(memberComplexCode, uid, phone, index);
        
        // 基础任务
        await Promise.all([
            corsToActivity(memberID, uid, phone, nickName, index),
            saveUserDeviceInfo(memberID, uid, phone, index)
        ]);
        
        // 获取任务列表
        const taskList = await retryTask(async () => {
            console.log(`[${index}] 📋 获取任务列表...`);
            return await commonPost('/ehomes-new/homeManager/api/Member/getTaskList', {
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                userId: uid,
                memberId: memberID,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                tel: phone,
                brandName: "",
                businessId: 1
            });
        });
        
        // 处理任务
        if (taskList?.data?.length > 0) {
            console.log(`[${index}] 🔎 发现 ${taskList.data.length} 个任务`);
            for (const task of taskList.data) {
                await processTask(task, {
                    index,
                    phone,
                    uid,
                    memberID,
                    memberComplexCode,
                    signIn
                });
                await randomDelay(3, 8);
            }
        } else {
            console.log(`[${index}] ⚠️ 未获取到任务列表`);
        }
        
        // 皮卡生活签到
        if (FTEJ_PK === '1') {
            const pkResult = await processPikaLife(phone, password, index);
            console.log(`[${index}] ${pkResult}`);
        } else {
            console.log(`[${index}] ⛔️ 皮卡签到已关闭，跳过`);
        } 
        
        // 春日抽奖
        if (FTEJ_SpringSign === '1') {
            await springDayLottery(memberID, memberComplexCode, phone, login.data.ticketValue, index);
        } else {
            console.log(`[${index}] ⛔️ 春日抽奖已关闭，跳过`);
        } 
        
        // 积分抽奖
        if (FTEJ_Lottery === '1') {
            await lotteryDraw(memberID, memberComplexCode, phone, login.data.ticketValue, index);
        } else {
            console.log(`[${index}] ⛔️ 积分转盘已关闭，跳过`);
        }
        
        // 查询积分
        const pointsInfo = await commonPost('/ehomes-new/homeManager/api/Member/findMemberPointsInfo', {
            seriesName: "",
            uid,
            userType: "61",
            mobile: phone,
            phone,
            safeEnc: Date.now() - 61363200,
            userId: uid,
            memberId: memberID,
            token: "ebf76685e48d4e14a9de6fccc76483e3",
            tel: phone,
            brandName: "",
            businessId: 1
        });
        
        const costTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const pointsValue = pointsInfo?.data?.pointValue ?? '未知';
        return `[${index}] ${maskedPhone} 处理完成 (耗时${costTime}s) ▶ 积分: ${pointsValue}`;
        
    } catch (error) {
        const errMsg = error.message.includes('JSON.parse') ? '接口响应异常' : error.message;
        console.error(`[${index}] ❌ 处理失败: ${errMsg}`);
        return `[${index}] ❌ 处理失败: ${errMsg}`;
    }
}

async function processTask(task, context) {
    const { index, phone, uid, memberID, memberComplexCode, signIn } = context;
    
    console.log(`[${index}] 🛠️ 任务处理: ${task.ruleName} (状态: ${task.isComplete === "1" ? "已完成" : "未完成"})`);
    
    if (task.isComplete === "1") {
        console.log(`[${index}] ⏩ 跳过已完成任务`);
        return;
    }
    
    try {
        switch (task.ruleName) {
            case '签到':
                if (signIn === "未签到") {
                    await handleSign(index, phone, uid, memberComplexCode);
                } else {
                    console.log(`[${index}] ⏩ 今日已签到: ${signIn}`);
                }
                break;
                
            case '保客分享':
                if (FTEJ_Share === '1') {
                    await handleShare(index, phone, memberComplexCode);
                } else {
                    console.log(`[${index}] ⛔️ 保客分享已关闭，跳过`);
                }
                break;
                
            case '关注':
                await handleFollow(index, phone, uid, memberID, memberComplexCode);
                break;
                
            case '发帖':
                await handlePost(index, phone, uid, memberID, memberComplexCode);
                break;
                
            default:
                console.log(`[${index}] ⚠️ 未处理的任务类型: ${task.ruleName}`);
        }
    } catch (taskError) {
        console.error(`[${index}] ❌ 任务[${task.ruleName}]处理失败: ${taskError.message}`);
    }
}

/* ========== 任务处理函数 ========== */
async function handleSign(index, phone, uid, memberComplexCode) {
    const maxRetries = 1;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
        try {
            console.log(`[${index}] 🖊️ 开始签到${retryCount > 0 ? `(第 ${retryCount + 1} 次重试)` : ''}...`);
            await randomDelay(20, 30);
            
            const sign = await commonPost('/ehomes-new/homeManager/api/bonus/signActivity2nd', {
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                userId: uid,
                memberId: memberComplexCode,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                tel: phone,
                brandName: "",
                businessId: 1
            });
            
            if (sign?.data?.integral) {
                console.log(`[${index}] ✅ 签到成功，获得 ${sign.data.integral} 积分`);
                return; // 成功则退出函数
            } else {
                const errorMsg = sign?.data?.msg || JSON.stringify(sign);
                throw new Error(errorMsg);
            }
        } catch (error) {
            retryCount++;
            if (retryCount >= maxRetries) {
                console.log(`[${index}] ❌ 签到失败（已达最大重试次数）: ${error.message}`);
            } else {
                console.log(`[${index}] ⚠️ 签到失败，${maxRetries - retryCount}次后重试: ${error.message}`);
                await randomDelay(45, 90); // 失败后延迟45-90秒再重试
            }
        }
    }
}

async function handleShare(index, phone, memberComplexCode) {
    console.log(`[${index}] 📤 处理分享任务...`);
    await randomDelay(5, 10);
    
    const share = await loginPost('/ehomes-new/homeManager/api/bonus/addIntegralForShare', {
        safeEnc: Date.now() - 84940200,
        activity: "",
        tel: phone,
        id: "33",
        source: "APP",
        memberId: memberComplexCode
    });
    
    console.log(`[${index}] 💌 分享结果: ${share?.data?.integral ? `获得${share.data.integral}积分` : share?.msg || '未知'}`);
}

async function handleFollow(index, phone, uid, memberID, memberComplexCode) {
    console.log(`[${index}] 👥 处理关注任务...`);
    
    try {
        // 获取推荐帖子（带重试）
        const posts = await retryTask(async () => {
            return await commonPost('/ehomes-new/ehomesCommunity/api/post/recommendPostList', {
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                position: "1",
                pageNumber: "1",
                userId: uid,
                memberId: memberID,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                tel: phone,
                brandName: "",
                businessId: 1,
                pageSize: 9
            });
        }, 3, 2000);
        
        if (!posts?.data?.length) {
            console.log(`[${index}] ⚠️ 未获取到推荐帖子`);
            return;
        }
        
        // 过滤无效用户ID
        const validPosts = posts.data.filter(post => post.memberId && post.memberId !== 'null');
        if (validPosts.length === 0) {
            console.log(`[${index}] ⚠️ 未找到有效用户`);
            return;
        }
        
        const targetMemberId = validPosts[Math.floor(Math.random() * validPosts.length)].memberId;
        console.log(`[${index}] 随机选择用户: ${targetMemberId}`);
        
        // 关注（带重试）
        await retryTask(async () => {
            await commonPost('/ehomes-new/ehomesCommunity/api/post/follow2nd', {
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                behavior: "1",
                userId: uid,
                memberId: memberComplexCode,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                memberIdeds: targetMemberId,
                tel: phone,
                brandName: "",
                businessId: 1,
                navyId: "null"
            });
            console.log(`[${index}] ✅ 关注成功`);
        }, 3, 2000);
        
        // 延时后取关
        await randomDelay(2, 5);
        
        await retryTask(async () => {
            await commonPost('/ehomes-new/ehomesCommunity/api/post/follow2nd', {
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                behavior: "2",
                userId: uid,
                memberId: memberComplexCode,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                memberIdeds: targetMemberId,
                tel: phone,
                brandName: "",
                businessId: 1,
                navyId: "null"
            });
            console.log(`[${index}] ✅ 取关成功`);
        }, 3, 2000);
        
    } catch (error) {
        console.error(`[${index}] ❌ 关注任务失败: ${error.message}`);
    }
}

async function handlePost(index, phone, uid, memberID, memberComplexCode) {
    console.log(`[${index}] 📝 处理发帖任务...`);
    
    try {
        // 获取话题列表（带重试）
        const topics = await retryTask(async () => {
            return await loginPost('/ehomes-new/ehomesCommunity/api/post/topicList', {
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                userId: uid,
                memberId: memberID,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                tel: phone,
                brandName: "",
                businessId: 1
            });
        }, 3, 2000);
        
        if (!topics?.data?.top?.length) {
            console.log(`[${index}] ⚠️ 未获取到话题列表`);
            return;
        }
        
        const topicId = topics.data.top[Math.floor(Math.random() * topics.data.top.length)].topicId;
        
        // 重试任务函数（每次重试获取新内容）
        const postWithRetry = async (attempt) => {
            const text = await textGet() || "追求得到之日即其终止之日，寻觅的过程亦即失去的过程。";
            console.log(`[${index}] 选择话题: ${topicId}, 内容(第${attempt}次): ${text.slice(0, 20)}...`);
            
            await randomDelay(10, 15);
            
            return await commonPost('/ehomes-new/ehomesCommunity/api/post/addJson2nd', {
                urlList: [],
                seriesName: "",
                uid,
                userType: "61",
                mobile: phone,
                phone,
                safeEnc: Date.now() - 84940200,
                postType: 1,
                topicIdList: [topicId],
                userId: uid,
                memberId: memberComplexCode,
                token: "ebf76685e48d4e14a9de6fccc76483e3",
                title: "",
                tel: phone,
                brandName: "",
                businessId: 1,
                uploadFlag: 3,
                content: text
            });
        };
        
        // 执行带重试的发帖
        const postResult = await retryTask(async () => {
            const attempt = arguments[1] || 1; // 获取当前重试次数
            return await postWithRetry(attempt);
        }, 3, 2000);
        
        console.log(`[${index}] 发帖结果: ${postResult?.code === 200 ? '✅ 成功' : '❌ 失败'}`);
        
    } catch (error) {
        console.error(`[${index}] ❌ 发帖任务失败: ${error.message}`);
    }
}

/* ========== 其他功能函数 ========== */
async function getMemberNickname(memberComplexCode, uid, phone, index) {
    try {
        const response = await commonPost('/ehomes-new/homeManager/api/Member/findMemberInfo2', {
            seriesName: "",
            uid,
            userType: "61",
            mobile: phone,
            phone,
            safeEnc: Date.now() - 84940200,
            userId: uid,
            memberId: memberComplexCode,
            token: "ebf76685e48d4e14a9de6fccc76483e3",
            tel: phone,
            brandName: "",
            businessId: 1
        });

        if (response.code === 200 && response.data?.nickName) {
            return response.data.nickName;
        }
        return phone; // 返回手机号作为后备
    } catch (e) {
        console.error(`[${index}] ❌ 获取昵称失败: ${e.message}`);
        return phone;
    }
}

async function corsToActivity(memberID, uid, phone, nickName, index) {
    try {
        await commonPost('/ehomes-new/homeManager/api/share/corsToActicity', {
            seriesName: "",
            uid,
            userType: "61",
            mobile: phone,
            phone,
            safeEnc: Date.now() - 84940200,
            channel: "2",
            activityNumber: "open",
            type: "5",
            userId: uid,
            memberId: memberID,
            token: "ebf76685e48d4e14a9de6fccc76483e3",
            requestType: "0",
            remark: "打开APP",
            tel: phone,
            brandName: "",
            businessId: 1,
            userNumber: memberID,
            name: nickName
        });
        console.log(`[${index}] ✅ 模拟打开APP成功`);
    } catch (e) {
        console.error(`[${index}] ❌ 模拟打开APP失败: ${e.message}`);
    }
}

async function saveUserDeviceInfo(memberID, uid, phone, index) {
    try {
        await commonPost('/ehomes-new/homeManager/api/message/saveUserDeviceInfo', {
            seriesName: "",
            uid,
            userType: "61",
            mobile: phone,
            phone,
            safeEnc: Date.now() - 84940200,
            deviceToken: "548b602152c365d5053c3f27e68d288bde056ab2b00b6e11c84d694e7477a046",
            userId: uid,
            memberId: memberID,
            token: "ebf76685e48d4e14a9de6fccc76483e3",
            tel: phone,
            brandName: "",
            businessId: 1,
            device: "IOS"
        });
        console.log(`[${index}] ✅ 保存设备信息成功`);
    } catch (e) {
        console.error(`[${index}] ❌ 保存设备信息失败: ${e.message}`);
    }
}

async function processPikaLife(phone, password, index) {
    try {
        const cache = readCache();
        const cacheKey = `pk_${phone}`;
        let cachedData = cache[cacheKey];
        
        // 尝试使用缓存签到（带重试）
        if (cachedData?.token) {
            try {
                const signResponse = await retryTask(async () => {
                    return await pkPost(
                        "/ehomes-new/pkHome/api/bonus/signActivity2nd",
                        {
                            memberId: cachedData.memberComplexCode,
                            memberID: cachedData.memberID,
                            mobile: phone,
                            token: cachedData.token,
                            vin: "",
                            safeEnc: Date.now() - 61363200,
                        },
                        cachedData.token
                    );
                }, 3, 2000);
                
                if (signResponse.code === 200) {
                    if (signResponse.data?.integral) {
                    return `皮卡生活(缓存)签到成功，获得${signResponse.data.integral}积分`;
                    }
                    return `皮卡生活(缓存)签到: ${signResponse.data?.msg || '未知结果'}`;
                }
            } catch (cacheError) {
                console.warn(`[${index}] 缓存签到失败: ${cacheError.message}`);
            }
        }
        
        // 重新登录（带重试）
        const pkLogin = await retryTask(async () => {
            return await pkLoginPost("/ehomes-new/pkHome/api/user/getLoginMember2nd", {
                memberId: "",
                memberID: "",
                mobile: "",
                token: "7fe186bb15ff4426ae84f300f05d9c8d",
                vin: "",
                safeEnc: Date.now() - 61363200,
                name: phone,
                password: password,
                position: "",
                deviceId: "3691E11D-ECD9-4944-B812-3D633A1A9D26",
                deviceBrand: "iPhone",
                brandName: "iPhone",
                deviceType: "1",
                versionCode: "29",
                versionName: "V1.1.15",
            });
        }, 3, 2000);
        
        if (pkLogin.code !== 200) {
            throw new Error(`登录失败: ${pkLogin.msg || '未知错误'}`);
        }
        
        // 更新缓存
        cache[cacheKey] = {
            token: pkLogin.data.token,
            memberID: pkLogin.data.memberID,
            memberComplexCode: pkLogin.data.memberComplexCode,
            timestamp: Date.now()
        };
        writeCache(cache);
        
        // 使用新token签到（带重试）
        const signResponse = await retryTask(async () => {
            return await pkPost(
                "/ehomes-new/pkHome/api/bonus/signActivity2nd",
                {
                    memberId: pkLogin.data.memberComplexCode,
                    memberID: pkLogin.data.memberID,
                    mobile: phone,
                    token: pkLogin.data.token,
                    vin: "",
                    safeEnc: Date.now() - 61363200,
                },
                pkLogin.data.token
            );
        }, 3, 2000);
        
        if (signResponse.data?.integral) {
            return `皮卡生活(登录)签到成功，获得${signResponse.data.integral}积分`;
        }
        throw new Error(signResponse.data?.msg || "签到失败");
        
    } catch (error) {
        return `皮卡生活: ${error.message}`;
    }
}

async function lotteryDraw(memberID, memberComplexCode, phone, ticketValue, index) {
    try {
        console.log(`[${index}] 🎡 开始积分转盘抽奖...`);
        
        const validateResponse = await request('/shareCars/validateToken.action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': `https://czyl.foton.com.cn/shareCars/activity/luckDraw/index.html?ftejMemberId=${memberID}&encryptedMemberId=${memberComplexCode}&channel=app`,
                'Cookie': `FOTONTGT=${ticketValue}`
            },
            body: `ticketName=FOTONTGT&ticketValue=${ticketValue.trim()}`
        });

        if (!validateResponse.headers?.['set-cookie']) {
            throw new Error(`获取HWWAFSESID失败`);
        }

        const cookies = validateResponse.headers['set-cookie'];
        const session = extractCookieValue(cookies.find(c => c.startsWith('SESSION=')));
        const hwwafsesid = extractCookieValue(cookies.find(c => c.startsWith('HWWAFSESID=')));
        const hwwafsestime = extractCookieValue(cookies.find(c => c.startsWith('HWWAFSESTIME=')));

        for (let i = 1; i <= 5; i++) {
            await randomDelay(3, 6);
            
            const lotteryResponse = await request('/shareCars/turnTable/turnTableLottery2nd.action', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) ftejIOS',
                    'Referer': `https://czyl.foton.com.cn/shareCars/activity/luckDraw/index.html?ftejMemberId=${memberID}&encryptedMemberId=${memberComplexCode}&channel=app`,
                    'Cookie': `SESSION=${session}; FOTONTGT=${ticketValue}; HWWAFSESID=${hwwafsesid}; HWWAFSESTIME=${hwwafsestime}`
                },
                body: {}
            });
            
            console.log(`[${index}] 第${i}次抽奖: ${lotteryResponse.data?.msg || '未知结果'}`);
            
            if (lotteryResponse.data?.msg?.includes('每天最多参加5次')) {
                break;
            }
        }
    } catch (error) {
        console.error(`[${index}] ❌ 抽奖失败: ${error.message}`);
    }
}

async function springDayLottery(memberID, memberComplexCode, phone, ticketValue, index) {
    try {
        console.log(`[${index}] 🌸 开始春日抽奖...`);
        
        const validateResponse = await request('/shareCars/validateToken.action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': `https://czyl.foton.com.cn/shareCars/activity/interactCenter250401/index.html?ftejMemberId=${memberID}&encryptedMemberId=${memberComplexCode}&channel=app`,
                'Cookie': `FOTONTGT=${ticketValue}`
            },
            body: `ticketName=FOTONTGT&ticketValue=${ticketValue.trim()}`
        });

        if (!validateResponse.headers?.['set-cookie']) {
            throw new Error(`获取COOKIE失败`);
        }

        const cookies = validateResponse.headers['set-cookie'];
        const session = extractCookieValue(cookies.find(c => c.startsWith('SESSION=')));
        const hwwafsesid = extractCookieValue(cookies.find(c => c.startsWith('HWWAFSESID=')));
        const hwwafsestime = extractCookieValue(cookies.find(c => c.startsWith('HWWAFSESTIME=')));

        for (let i = 1; i <= 5; i++) {
            await randomDelay(3, 6);
            
            const lotteryResponse = await request('/shareCars/c250401/luckyDraw.action', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) ftejIOS',
                    'Referer': `https://czyl.foton.com.cn/shareCars/activity/interactCenter250401/index.html?ftejMemberId=${memberID}&encryptedMemberId=${memberComplexCode}&channel=app`,
                    'Cookie': `SESSION=${session}; FOTONTGT=${ticketValue}; HWWAFSESID=${hwwafsesid}; HWWAFSESTIME=${hwwafsestime}`
                },
                body: `encryptMemberId=${memberComplexCode}&activityNum=250401`
            });
            
            console.log(`[${index}] 春日第${i}抽: ${lotteryResponse.data?.msg || '未知结果'}`);
            
            if (lotteryResponse.data?.msg?.includes('没有抽奖次数')) {
                break;
            }
        }
    } catch (error) {
        console.error(`[${index}] ❌ 春日抽奖失败: ${error.message}`);
    }
}

/* ========== 网络请求函数 ========== */
async function loginPost(url, body) {
    return new Promise(resolve => {
        const options = {
            url: `https://czyl.foton.com.cn${url}`,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Connection': 'Keep-Alive',
                'user-agent': 'okhttp/3.14.9',
                'Accept-Encoding': 'gzip',
            },
            body: JSON.stringify(body),
            timeout: 10000
        };
        
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.error(`❌ 登录请求失败: ${JSON.stringify(err)}`);
                    return resolve({ code: 500, msg: err.message });
                }
                resolve(JSON.parse(data));
            } catch (e) {
                console.error(`❌ 登录响应解析失败: ${e.message}`);
                resolve({ code: 500, msg: '响应解析失败' });
            }
        });
    });
}

async function pkLoginPost(url, body) {
    return new Promise(resolve => {
        const options = {
            url: `https://czyl.foton.com.cn${url}`,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'channel': '1',
                'Accept-Encoding': 'gzip',
            },
            body: JSON.stringify(body),
            timeout: 10000
        };
        
        $.post(options, (err, resp, data) => {
            try {
                if (err) throw err;
                resolve(JSON.parse(data));
            } catch (e) {
                console.error(`❌ 皮卡登录失败: ${e.message}`);
                resolve({ code: 500, msg: e.message });
            }
        });
    });
}

async function commonPost(url, body, retries = 3, delay = 1000) {
    let lastError = null;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await pkPost(url, body, $.getdata('foton_token'));
            
            if (response.code === 200) {
                return response;
            } else {
                lastError = new Error(`请求失败: ${response.msg || '未知错误'}`);
            }
        } catch (e) {
            lastError = e;
            console.error(`❌ 第 ${attempt} 次请求失败: ${e.message}`);
        }
        
        // 不是最后一次尝试则延迟
        if (attempt < retries) {
            const waitTime = delay * attempt; // 指数退避
            console.log(`⏳ 等待 ${waitTime}ms 后重试...`);
            await $.wait(waitTime);
        }
    }
    
    throw lastError || new Error('未知错误');
}



async function pkPost(url, body, token) {
    return new Promise(resolve => {
        const options = {
            url: `https://czyl.foton.com.cn${url}`,
            headers: {
                "content-type": "application/json;charset=utf-8",
                "channel": "1",
                "token": token,
                "Accept-Encoding": "gzip",
            },
            body: JSON.stringify(body),
            timeout: 10000
        };
        
        $.post(options, (err, resp, data) => {
            try {
                if (err) throw err;
                resolve(JSON.parse(data));
            } catch (e) {
                console.error(`❌ 皮卡请求失败: ${e.message}`);
                resolve({ code: 500, msg: e.message });
            }
        });
    });
}

async function request(url, options) {
    return new Promise(resolve => {
        const fullUrl = `https://czyl.foton.com.cn${url}`;
        const reqOptions = {
            url: fullUrl,
            ...options,
            timeout: 10000
        };
        
        if (options.body && typeof options.body === 'object') {
            reqOptions.body = JSON.stringify(options.body);
        }
        
        $.post(reqOptions, (err, resp, data) => {
            try {
                if (err) {
                    console.error(`❌ 特殊请求失败: ${JSON.stringify(err)}`);
                    return resolve({ code: 500, msg: err.message });
                }
                
                resolve({
                    code: resp.statusCode,
                    headers: resp.headers,
                    data: data ? JSON.parse(data) : null
                });
            } catch (e) {
                console.error(`❌ 特殊请求解析失败: ${e.message}`);
                resolve({ code: 500, msg: e.message });
            }
        });
    });
}

async function textGet() {
    return new Promise(resolve => {
        const options = {
            url: `https://v1.hitokoto.cn/?c=d&encode=text`,
            headers: {},
            timeout: 5000
        };
        
        $.get(options, (err, resp, data) => {
            if (err || !data) {
                console.log('⚠️ 获取随机文本失败，使用默认文本');
                resolve('生活就像一杯茶，不会苦一辈子，但要学会等待她的甘甜。');
            } else {
                resolve(data);
            }
        });
    });
}

async function sendMsg(message) {
    if ($.isNode()) {
        let notify = '';
        try {
            notify = require('./sendNotify');
        } catch (e) {
            notify = require("../sendNotify");
        }
        await notify.sendNotify($.name, message);
    } else {
        $.msg($.name, '', message);
    }
}

// 环境兼容代码（保持原样）


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise(((e,i)=>{s.call(this,t,((t,s,o)=>{t?i(t):e(s)}))}))}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...s){try{return JSON.stringify(t,...s)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,i)=>e(i)))}))}runScript(t,e){return new Promise((s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,((t,e,i)=>s(i)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))}));break}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then((t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))}));break}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o={}){const r=t=>{const{$open:e,$copy:s,$media:i,$mediaMime:o}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||e;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||s;if(n&&Object.assign(r,{action:"clipboard",text:n}),i){let t,e,s;if(i.startsWith("http"))t=i;else if(i.startsWith("data:")){const[t]=i.split(";"),[,o]=i.split(",");e=o,s=t.replace("data:","")}else{e=i,s=(t=>{const e={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in e)if(0===t.indexOf(s))return e[s];return null})(i)}Object.assign(r,{"media-url":t,"media-base64":e,"media-base64-mime":o??s})}return Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound}),r}case"Loon":{const s={};let o=t.openUrl||t.url||t["open-url"]||e;o&&Object.assign(s,{openUrl:o});let r=t.mediaUrl||t["media-url"];return i?.startsWith("http")&&(r=i),r&&Object.assign(s,{mediaUrl:r}),console.log(JSON.stringify(s)),s}case"Quantumult X":{const o={};let r=t["open-url"]||t.url||t.openUrl||e;r&&Object.assign(o,{"open-url":r});let a=t["media-url"]||t.mediaUrl;i?.startsWith("http")&&(a=i),a&&Object.assign(o,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard||s;return n&&Object.assign(o,{"update-pasteboard":n}),console.log(JSON.stringify(o)),o}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,i,r(o));break;case"Quantumult X":$notify(e,s,i,r(o));break;case"Node.js":break}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.debug}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.info}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.warn}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.error}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.map((t=>t??String(t))).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e,void 0!==t.message?t.message:t,t.stack);break}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
