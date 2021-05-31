const { MongoClient } = require('mongodb');

const dbUri = "mongodb://admin:fopz.bopz.9999.HMM@127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb";
const client = MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function setUpConnection() {
    try {
        await client.connect();
    }
    catch ( e ) {
        console.log(e);
    }
}

setUpConnection().catch(console.dir);

module.exports = client;
