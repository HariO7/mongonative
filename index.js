const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

connect();

async function connect() {
	try {
	    await client.connect();
        const db = client.db('cars');

        const sportsCars = db.collection('SportsCars');
        const cursorupdate = await sportsCars.updateOne(
            {company : "mercedes"},
            {"$set": {"status" : "sold"}}
        );

        console.log(cursorupdate.modifiedCount);
        //display
        const cursorFind = sportsCars.find();
        const data = await cursorFind.toArray();
        console.table(data);
	}
	catch (err) {
		console.error(`we encountered ${err}`);
	}
	finally {
		client.close();
	}
}
