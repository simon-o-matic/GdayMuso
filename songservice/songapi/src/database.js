import { MongoClient } from 'mongodb'

const DB_URL = 'mongodb://songdatabase'
const SONG_COLLECTION = 'songcollection'

export default function (dbName) {
    const client = new MongoClient(DB_URL)
    let songCollection

    const addSong = async (song) => {
        song.created = new Date().getTime()
        return songCollection.insertOne(song)
    }

    const getAllSongs = async () => {
        const cursor = songCollection.find()
        return await cursor.toArray()
    }

    const clear = async () => {
        return songCollection.remove({})
    }

    const close = async () => {
        return client.close()
    }

    const connect = async () => {
        // Use connect method to connect to the server
        try {
            await client.connect((err) => {
                if (err !== undefined) {
                    console.log('Erorr connecting to the database', err)
                    throw Error(err)
                }
            })

            console.log('Connected successfully to server')

            // create or get the new
            const db = await client.db(dbName) // Note To Self: can the same client have multiples db's???

            // Save the collection for later
            songCollection = await db.collection(SONG_COLLECTION)

            console.log('Database and song collection successfully attached')
        } catch (err) {
            return err
        }
    }

    return { connect, clear, addSong, getAllSongs, close }
}
