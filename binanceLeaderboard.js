const axios = require('axios');

const api = function everything() {
    if (!new.target) return new api();

    const api = "https://www.binance.com";

    this.search = {
        nickname: async function (nickname = '') {
            const params = {
                baseURL: api,
                path: '/bapi/futures/v1/public/future/leaderboard/searchNickname',
                method: 'post',
                payload: { nickname: nickname }
            }

            const response = await request(params);

            if (response.error) return response;
            return response.data;
        },

        leaderboard: {
            /**
             * @param {Boolean} isShared - true | false
             * @param {Boolean} isTrader - true | false
             * @param {String} tradeType - "PERPETUAL"
             * @param {String} statisticsType - "ROI" || "PNL"
             * @param {String} periodType - "DAILY" || "WEEKLY" || "MONTHLY" || "ALL"
             */
            top: async function (isShared = true, isTrader = true, tradeType = 'PERPETUAL', statisticsType = 'ROI', periodType = 'WEEKLY') {
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

                const response = await request(params);
                if (response.error) return response;
                return response;
            },

            featuresUsers: async function() {
                // /bapi/futures/v1/public/future/leaderboard/getFeaturedUserRank
            },

            highestRank: async function() {
                // /bapi/futures/v3/public/future/leaderboard/getLeaderboardRank
            },

            topStrategies: async function() {
                //
            }
        }
    }


    const request = async function (params) {
        try {
            const response = await await axios({
                method: params.method,
                url: params.baseURL + params.path,
                // headers: params.headers,
                data: params.payload || ""
            });
            return response.data;
        } catch (err) {
            console.log({ err });
            return {
                error: err
            }
        }

    }
}

module.exports = api;