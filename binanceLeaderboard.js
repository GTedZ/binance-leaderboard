const axios = require('axios');

const api = "https://www.binance.com";

class BinanceLeaderboard {

    search = {

        nickname: async (nickname = '') => {
            const params = {
                baseURL: api,
                path: '/bapi/futures/v1/public/future/leaderboard/searchNickname',
                method: 'post',
                payload: { nickname: nickname }
            }

            const response = await request(params);

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
            const params = {
                baseURL: api,
                path: '/bapi/futures/v3/public/future/leaderboard/getLeaderboardRank',
                method: 'post',
                payload: {
                    isShared,
                    isTrader,
                    periodType,
                    statisticsType,
                    tradeType
                }
            }

            return await request(params);
        },

        /**
         * @param {'PERPETUAL'|'QUARTERLY'} tradeType
         */
        featuresUsers: async (tradeType) => {
            const params = {
                baseURL: api,
                path: '/bapi/futures/v1/public/future/leaderboard/getFeaturedUserRank',
                method: 'post',
                payload: {
                    tradeType
                }
            }

            return request(params);
        }
    }

}

async function request(params) {
    try {
        const response = await await axios({
            method: params.method,
            url: params.baseURL + params.path,
            // headers: params.headers,
            data: params.payload || ""
        });
        // console.log(response);
        return response.data;
    } catch (err) {
        console.log({ err });
        return {
            error: err
        }
    }

}

module.exports = BinanceLeaderboard;