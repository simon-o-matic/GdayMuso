import { MongoClient } from 'mongodb'
import { exit } from 'process'

// Connection URL
const url = 'mongodb://songdatabase'

// Database Name

const dbName = 'myproject'
const client = new MongoClient(url)

export default function () {
    // Use connect method to connect to the server
    client.connect(async function (err) {
        if (err !== undefined) {
            console.log('Erorr connecting to the database')
            console.dir(err)
            exit(1)
        }

        console.log('Connected successfully to server')

        const db = client.db(dbName)

        const stuff = db.collection('AllTheStuff')
        const record = {
            type: 'ThisAndThat',
            lastUpdated: new Date().getTime(),
        }
        const query = { type: 'ThisAndThat' }
        const options = { upsert: true }
        const result = await stuff.replaceOne(query, record, options)
        console.log('RESULT', result)

        client.close()
    })
}
