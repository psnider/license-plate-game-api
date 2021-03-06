import type {LicensePlateGameAPI} from "."


export namespace LicensePlateGameClient {

    // Has either status and statusText, or message
    export interface RequestFailed {
        message?: number
        status?: number
        statusText?: string
    }


    // url_parameters contains parameter names with their values.
    // - A value of null indicates that the parameter does not take a value, that is,
    // it is a valueless parameter, consisting of a token without a value assignment.
    // - A value of undefined means that the parameter should be ignored.
    // For example:
    //     createRequestURL("widgets", {json: null, size: "medium", date: undefined})
    //   returns:
    //     "/widgets?json&size=medium"
    function createRequestURL(service_url: string, url_parameters: {[key:string]: any}) {
        const keys = Object.keys(url_parameters)
        let url = service_url
        let query_args_count = 0
        keys.forEach((key) => {
            const value = url_parameters[key]
            if (value !== undefined) {
                const separator = (query_args_count == 0) ? "?" : "&"
                query_args_count++
                let parameter_tail = `${separator}${key}`
                if (value !== null) {
                    parameter_tail += `=${value}`
                }
                url += parameter_tail
            }
        })
        return url
    }

 
    export function requestNewGame(request: LicensePlateGameAPI.NewGameRequest) : Promise<LicensePlateGameAPI.NewGameResponse> {
        const {game_id, elapsed_seconds, user_selected_puzzle, previous_puzzle_grade_level} = request
        const url = createRequestURL("license_plate_game/new_game", {game_id, elapsed_seconds, user_selected_puzzle, previous_puzzle_grade_level})
        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json().then((new_game: LicensePlateGameAPI.NewGameResponse) => {
                    request.completion_callback?.(null, new_game)
                    return new_game
                })
            } else {
                const {status, statusText} = response
                const error: RequestFailed = {status, statusText}
                request.completion_callback?.(error)
                throw error
            }
        })
    }


    export function requestCheckAnswer(request: LicensePlateGameAPI.CheckAnswerRequest) : Promise<LicensePlateGameAPI.CheckAnswerResponse> {
        const {game_id, puzzle_seed, answer_text, elapsed_seconds} = request
        const url = createRequestURL("license_plate_game/check_answer", {game_id, puzzle_seed, answer_text, elapsed_seconds})
        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json().then((graded_answer: LicensePlateGameAPI.CheckAnswerResponse) => {
                    request.completion_callback?.(null, graded_answer)
                    return graded_answer
                })
            } else {
                const {status, statusText} = response
                const error: RequestFailed = {status, statusText}
                request.completion_callback?.(error)
                throw  error
            }
        })
    }


    export function requestHint(request: LicensePlateGameAPI.HintRequest) : Promise<LicensePlateGameAPI.HintResponse> {
        const {game_id, puzzle_seed, elapsed_seconds} = request
        const url = createRequestURL("license_plate_game/hint", {game_id, puzzle_seed, elapsed_seconds})
        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json().then((hint: LicensePlateGameAPI.HintResponse) => {
                    request.completion_callback?.(null, hint)
                    return hint
                })
            } else {
                const {status, statusText} = response
                const error: RequestFailed = {status, statusText}
                request.completion_callback?.(error)
                throw error
            }
        })
    }


    export function requestUpTime() : Promise<LicensePlateGameAPI.UptimeResponse> {
        const url = "license_plate_game/uptime"
        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json().then((status: LicensePlateGameAPI.UptimeResponse) => {
                    return status
                })
            } else {
                const {status, statusText} = response
                const error: RequestFailed = {status, statusText}
                console.error(`requestUpTime failed: ${JSON.stringify(error)}`)
                throw error
            }
        })
    }


    export function postFeedback(feedback: LicensePlateGameAPI.FeedBackPost) : Promise<void> {
        const url = "license_plate_game/feedback"
        const fetch_request = {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(feedback)
        }
        return fetch(url, fetch_request).then((response) => {
            if (response.ok) {
                return 
            } else {
                const {status, statusText} = response
                const error: RequestFailed = {status, statusText}
                console.error(`postFeedback failed: ${JSON.stringify(error)}`)
                throw error
            }
        })
    }


}
