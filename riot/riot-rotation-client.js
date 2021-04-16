const BaseRiotClient = require('./base-riot-client');
const {AxiosResponse} = require('axios');

/**
 * A typedef documentation to describe object return by Riot's API => autocompletion in our code.
 * @typedef {Object} RiotRotation
 * @property {number} maxNewPlayerLevel
 * @property {Object} freeChampionIdsForNewPlayers
 * @property {Object} freeChampionIds
 *
 * @see https://developer.riotgames.com/apis#champion-v3/GET_getChampionInfo
 * @see https://jsdoc.app/tags-typedef.html
 */

/**
 * Class to communicate with the Summoner group API of Riot.
 * @see https://developer.riotgames.com/apis#champion-v3
 */
class RiotRotationClient extends BaseRiotClient {
    /**
     * Call the by-name action on Riot's API and return a Promise with rotations.
     * @return {Promise<AxiosResponse<RiotRotation>>}
     *
     * @see https://developer.riotgames.com/apis#champion-v3/GET_getChampionInfo
     */
    all() {
        return this._axios.get(`/lol/platform/v3/champion-rotations`);
    }
}

// Return instance of the Client.
module.exports = new RiotRotationClient();
