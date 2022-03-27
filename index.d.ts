
export namespace LicencePlateGameAPI {


    export type ClientCompletionCallback = (error: any | null, result?: any) => void


    // A mixin that is used only for client-side applications.
    export interface ClientCompletionCallbackMixin {
        // A callback available to a client app that notifies them when the request resolves.
        // Note that this callback is called immediately before the associate transaction promise resolves.
        completion_callback?: (error: any | null, result?: any) => void
    }

    
    export interface NewGameRequest extends ClientCompletionCallbackMixin {
        // The game ID of the game that was in progress when this request was made.
        // This is not set when the page is reloaded.
        game_id?: string
        // The amount of time that the game that was in progress when this request was made.
        // This is not set when the page is reloaded.
        elapsed_seconds?: number
        // The grade level of this puzzle.
        previous_puzzle_grade_level?: number
        user_selected_puzzle?: string
    }


    export interface NewGameResponse {
        // There is no game ID if there are no solutions.
        // This may happen only if the user requests a puzzle for which there are no solutions.
        game_id?: string
        puzzle_seed: string
        max_word_length: number
        solutions_count: number
        grade_level: number
        notes?:  string[]
    }


    export interface CheckAnswerRequest extends ClientCompletionCallbackMixin {
        game_id: string
        puzzle_seed: string
        answer_text: string
        elapsed_seconds: number
    }


    export interface CheckAnswerResponse {
        answer_text: string
        // an invalid word has scores of zero
        boggle_score: number
        scrabble_score: number
        grade_level?: number
        word_set_size?: number
        is_vulgar?: boolean
        notes?: string[]
    }
    

    export interface HintRequest extends ClientCompletionCallbackMixin {
        game_id: string
        puzzle_seed: string
        elapsed_seconds: number
    }


    export interface HintResponse {
        // A string representing a random known solution with question marks in positions of character to be guessed. 
        solution_pattern_text: string
        word_set_size?: number
    }


    export interface FeedBackPost {
        // The game ID of the game that was in progress when this request was made.
        // This is not set when the page is reloaded.
        game_id?: string
        // The amount of time that the game that was in progress when this request was made.
        // This is not set when the page is reloaded.
        elapsed_seconds?: number
        // Is empty if no game is in progress
        puzzle_seed?: string
        rating: "good" | "poor"
        comments: string
    }
    

    export interface UptimeResponse {
        uptime_seconds: number
    }

}


export namespace LicencePlateGameClient {

    // This is the data returned when a Promise is rejected.
    // This has either status and statusText, or message
    export interface RequestFailed {
        message?: number
        status?: number
        statusText?: string
    }

    export function requestNewGame(request: LicencePlateGameAPI.NewGameRequest) : Promise<LicencePlateGameAPI.NewGameResponse>
    export function requestCheckAnswer(request: LicencePlateGameAPI.CheckAnswerRequest) : Promise<LicencePlateGameAPI.CheckAnswerResponse>
    export function requestHint(request: LicencePlateGameAPI.HintRequest) : Promise<LicencePlateGameAPI.HintResponse>
    export function requestUpTime() : Promise<LicencePlateGameAPI.UptimeResponse>
    export function postFeedback(feedback: LicencePlateGameAPI.FeedBackPost) : Promise<void>

}
