"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicensePlateGameClient = void 0;
var LicensePlateGameClient;
(function (LicensePlateGameClient) {
    function createRequestURL(service_url, url_parameters) {
        const keys = Object.keys(url_parameters);
        let url = service_url;
        let query_args_count = 0;
        keys.forEach((key) => {
            const value = url_parameters[key];
            if (value !== undefined) {
                const separator = (query_args_count == 0) ? "?" : "&";
                query_args_count++;
                let parameter_tail = `${separator}${key}`;
                if (value !== null) {
                    parameter_tail += `=${value}`;
                }
                url += parameter_tail;
            }
        });
        return url;
    }
    function requestNewGame(request) {
        const { game_id, elapsed_seconds, user_selected_puzzle, previous_puzzle_grade_level } = request;
        const url = createRequestURL("license_plate_game/new_game", { game_id, elapsed_seconds, user_selected_puzzle, previous_puzzle_grade_level });
        return fetch(url).then((response) => {
            var _a;
            if (response.ok) {
                return response.json().then((new_game) => {
                    var _a;
                    (_a = request.completion_callback) === null || _a === void 0 ? void 0 : _a.call(request, null, new_game);
                    return new_game;
                });
            }
            else {
                const { status, statusText } = response;
                const error = { status, statusText };
                (_a = request.completion_callback) === null || _a === void 0 ? void 0 : _a.call(request, error);
                throw error;
            }
        });
    }
    LicensePlateGameClient.requestNewGame = requestNewGame;
    function requestCheckAnswer(request) {
        const { game_id, puzzle_seed, answer_text, elapsed_seconds } = request;
        const url = createRequestURL("license_plate_game/check_answer", { game_id, puzzle_seed, answer_text, elapsed_seconds });
        return fetch(url).then((response) => {
            var _a;
            if (response.ok) {
                return response.json().then((graded_answer) => {
                    var _a;
                    (_a = request.completion_callback) === null || _a === void 0 ? void 0 : _a.call(request, null, graded_answer);
                    return graded_answer;
                });
            }
            else {
                const { status, statusText } = response;
                const error = { status, statusText };
                (_a = request.completion_callback) === null || _a === void 0 ? void 0 : _a.call(request, error);
                throw error;
            }
        });
    }
    LicensePlateGameClient.requestCheckAnswer = requestCheckAnswer;
    function requestHint(request) {
        const { game_id, puzzle_seed, elapsed_seconds } = request;
        const url = createRequestURL("license_plate_game/hint", { game_id, puzzle_seed, elapsed_seconds });
        return fetch(url).then((response) => {
            var _a;
            if (response.ok) {
                return response.json().then((hint) => {
                    var _a;
                    (_a = request.completion_callback) === null || _a === void 0 ? void 0 : _a.call(request, null, hint);
                    return hint;
                });
            }
            else {
                const { status, statusText } = response;
                const error = { status, statusText };
                (_a = request.completion_callback) === null || _a === void 0 ? void 0 : _a.call(request, error);
                throw error;
            }
        });
    }
    LicensePlateGameClient.requestHint = requestHint;
    function requestUpTime() {
        const url = "license_plate_game/uptime";
        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json().then((status) => {
                    return status;
                });
            }
            else {
                const { status, statusText } = response;
                const error = { status, statusText };
                console.error(`requestUpTime failed: ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
    LicensePlateGameClient.requestUpTime = requestUpTime;
    function postFeedback(feedback) {
        const url = "license_plate_game/feedback";
        const fetch_request = {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(feedback)
        };
        return fetch(url, fetch_request).then((response) => {
            if (response.ok) {
                return;
            }
            else {
                const { status, statusText } = response;
                const error = { status, statusText };
                console.error(`postFeedback failed: ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
    LicensePlateGameClient.postFeedback = postFeedback;
})(LicensePlateGameClient = exports.LicensePlateGameClient || (exports.LicensePlateGameClient = {}));
//# sourceMappingURL=license-plate-game-client.js.map