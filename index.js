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
        console.log(
    `Successfully connected to db ${db.databaseName}`);
  
        const sportsCars = db.collection('SportsCars');
      
        // Insertion
        const cursorInsertion = await sportsCars.insertMany([
            {
                'company': 'mercedes',
                'series': 'Black Series',
                'model': 'SLS AMG'
            },
            {
                'company': 'Audi',
                'series': 'A series',
                'model': 'A8'
            }]);
        console.log(cursorInsertion.insertedCount);
          
        // Display
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