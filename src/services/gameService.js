const axios = require('axios').default;

const lichessAPI = "https://lichess.org/api/games/user";
// Lichess API variants
// "ultraBullet" "bullet" "blitz" "rapid" "classical" "correspondence" "chess960" "crazyhouse" "antichess" "atomic" "horde" "kingOfTheHill" "racingKings" "threeCheck"

module.exports.fetchFromLichessUser = async (username) => {
    let response = await axios.get(`${lichessAPI}/${username}`, {
        headers: {
            'Accept': 'application/x-ndjson'
        },
        params: {
            'max': 20,
            'perfType': 'ultraBullet,bullet,blitz,rapid,classical',
            'pgnInJson': false,
            'rated': true,
        }
    });


    // Parse from ndjson to json
    let games = response.data.split('\n');
    games = games.filter((string) => {if (string != '') return string;}).map(JSON.parse);
    
    // Do some preprocessing
    games = games.map((game) => {
        game.moves = game.moves.split(' ');
        game.ownerUserName = username;

        if ( game.players.white.user.name == username )
            game.ownerColor = 'white';
        else
            game.ownerColor = 'black';
        
        if ( game.winner == game.ownerColor )
            game.winner = true; else game.winner = false;

        return game;
    });
    //console.log(games);
    

    return games;
}

//module.exports.fetchFromLichessUser('TooDoor');
