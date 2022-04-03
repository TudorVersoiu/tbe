# Universal Chess Interface

### Interface for communicating to chess engine(stockfish)

### Move format
The move format is in long algebraic notation.
A nullmove from the Engine to the GUI should be sent as 0000.
Examples:  e2e4, e7e5, e1g1 (white short castling), e7e8q (for promotion)

### Starting commands
- uci -> start the engine and print out the settings
- isready -> check if the engine is ready(response should be "readyok")
- ucinewgame -> set up the engine for a new chess game, or when a certain position is analyzed
- position [fen \<fenstring\> | startpos] moves \<move1\> .... \<movei\> -> set up position
- go -> start calculating
    - searchmoves \<move1\> ... \<movei\> -> restrict search to these moves
    - depth x -> search depth
