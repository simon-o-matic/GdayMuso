import { MongoClient, ObjectId } from 'mongodb'

const DB_URL = 'mongodb://songdatabase'
const SONG_COLLECTION = 'songcollection'

export default function (dbName) {
    const client = new MongoClient(DB_URL)
    let songCollection

    const addSong = async (song) => {
        let serverSong = {
            title: song.title || 'The Myster Song',
            artist: song.artist || 'Anonymous',
            year_released: song.year_released || 1963, // a great year for song writing
            created: new Date().getTime(),
        }

        console.log('About to insert song', serverSong)
        return songCollection.insertOne(serverSong)
    }

    const deleteSong = async (id) => {
        if (!id) return // better error handling here please!
        return songCollection.deleteOne({ _id: ObjectId(id) })
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

    return { connect, clear, addSong, getAllSongs, close, deleteSong }
}
