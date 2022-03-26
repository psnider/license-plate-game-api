This page has links for a server running on your local machine.

# GET /license_plate_game/new_game

Fields are compatible with type [NewGameRequest](./index.d.ts#L16)


- [/license_plate_game/new_game](http://localhost:3002/license_plate_game/new_game)
- [/license_plate_game/new_game?user_selected_puzzle=ABC&previous_puzzle_grade_level=4](http://localhost:3002/license_plate_game/new_game?user_selected_puzzle=ABC&previous_puzzle_grade_level=4)
- [/license_plate_game/new_game?game_id=091234024&elapsed_seconds=15](http://localhost:3002/license_plate_game/new_game?game_id=091234024&elapsed_seconds=15)

 
## Response:

See [NewGameResponse](./index.d.ts#L29)


# GET /license_plate_game/check_answer

Fields are compatible with type [HintRequest](./index.d.ts#L41).

- [/license_plate_game/check_answer?game_id=123498&puzzle_seed=ABC&answer_text=abacus&elapsed_seconds=22](http://localhost:3002/license_plate_game/check_answer?game_id=123498&puzzle_seed=ABC&answer_text=abacus&elapsed_seconds=22)


## Response:

See [HintResponse](./index.d.ts#L49)


# GET  /license_plate_game/hint

Fields are compatible with type [HintRequest](./index.d.ts#L61).

- [/license_plate_game/hint?game_id=1874269&puzzle_seed=ABC&elapsed_seconds=45](http://localhost:3002/license_plate_game/hint?game_id=1874269&puzzle_seed=ABC&elapsed_seconds=45)


## Response:

See [HintResponse](./index.d.ts#L68)


# POST  /license_plate_game/feedback

Fields are compatible with type [FeedBackPost](./index.d.ts#L75).



# GET  /license_plate_game/uptime

Fields are compatible with type [FeedBackPost](./index.d.ts#L89).


