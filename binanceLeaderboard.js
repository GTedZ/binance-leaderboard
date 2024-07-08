const api = "https://www.binance.com";

class BinanceLeaderboard {

    /**
     * @param {string | undefined} cookies 
     * @param {string | undefined} csrftoken 
     */
    constructor(cookies, csrftoken) {
        this.cookies = cookies;
        this.csrftoken = csrftoken;
    }

    search = {

        nickname: async (nickname = '') => {
            const payload = { nickname: nickname };

            const response = await request('/bapi/futures/v1/public/future/leaderboard/searchNickname', 'POST', payload, this.cookies, this.csrftoken);

            if (response.error) return response;
            return response.data;
        }

    }

    leaderboard = {
        /**
        * @param {true|false} isShared - true | false
        * @param {true|false} isTrader - true | false
        * @param {'PERPETUAL'} tradeType - "PERPETUAL"
        * @param {'ROI'|'PNL'} statisticsType - "ROI" || "PNL"
        * @param {"DAILY" | "WEEKLY" | "MONTHLY" | "ALL"} periodType - "DAILY" || "WEEKLY" || "MONTHLY" || "ALL"
        */
        highestRank: async (isShared = true, isTrader = true, tradeType = 'PERPETUAL', statisticsType = 'ROI', periodType = 'WEEKLY') => {
            const payload = {
                isShared,
                isTrader,
                periodType,
                statisticsType,
                tradeType
            }

            return request('/bapi/futures/v3/public/future/leaderboard/getLeaderboardRank', 'POST', payload, this.cookies, this.csrftoken);
        },

        /**
         * @param {'PERPETUAL'|'QUARTERLY'} tradeType
         */
        featuresUsers: async (tradeType) => {
            const payload = { tradeType };
            return request('/bapi/futures/v1/public/future/leaderboard/getFeaturedUserRank', 'POST', payload, this.cookies, this.csrftoken);
        }
    }

}

function updateCookie_dateStamp(cookieString) {
    const currentDate = new Date();
    const currentDatestamp = currentDate.toString();

    const updatedCookieString = cookieString.replace(/datestamp=[^&]*/, `datestamp=${encodeURIComponent(currentDatestamp)}`);

    return updatedCookieString;
}

/**
 * 
 * @param {string} path 
 * @param {'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'} method 
 * @param {object | undefined} payload 
 * @returns 
 */
async function request(path, method, payload, cookies, csrftoken) {
    /** @type {Response | string} */
    const response = await fetch(
        `https://www.binance.com${path}`,
        {
            method: 'POST',  // Hardcoded as per your headers
            body: payload ? JSON.stringify(payload) : undefined,
            headers: {
                'authority': 'www.binance.com',
                'path': path,  // Leave as variable
                'Clienttype': 'web',
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
                'Bnc-Uuid': 'e0884ed2-0414-461b-b85a-3b969f8bfd53',  // Leave as variable
                'Cache-Control': 'no-cache',
                'Csrftoken': csrftoken,  // Leave as variable
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'Cookie': cookies ? updateCookie_dateStamp(cookies) : undefined,  // Leave as variable
                'Device-Info': '{"screen_resolution":"1920,1080","available_screen_resolution":"1920,1040","system_version":"Windows 10","available_system_version":"Windows 10","brand_model":"unknown","system_lang":"en-US","theme":"dark"}',
                'Dnt': '1',
                'Fvideo-Id': '32225f4cec3ba2b2a45055d8e280cd394088cac8',
                'Fvideo-Token': 'nUQVgV1M+9xiVNe7g+AKEKrDokC08vmOSHRfP539bhfL0Pk5wt5oQIpC2PA1vScKN0ZrvyPfDwh4R1I9dQDBn1WZmw4pjQc4fFB+OOCSj7X8FL7Esz79EB5ySXQ7RtJ5ZlfMOqGxr7t3gadB1ARr+D/uee6kCnsmQx6ylNDFrjPMrdgIZn+BGIM+L1Kegap+Y=5b',
                'Lang': 'en',
                'Origin': 'https://www.binance.com',
                'Pragma': 'no-cache',
                'Priority': 'u=1, i',
                'Referer': 'https://www.binance.com/en/futures-activity/leaderboard',
                'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'X-Ui-Request-Trace': '60411e2a-3259-4c8b-850f-9312fc5f5f16'
            }
        }
    ).catch(err => { console.error(`[BINANCE_LEADERBOARD_LIBRARY][CONNECTION ERROR] ${err}`); return err.toString() });

    if (typeof response === 'string') throw { code: -1, msg: response };

    const body = await response.json();

    if (!response.ok) throw body;
    return body;

}

module.exports = BinanceLeaderboard;