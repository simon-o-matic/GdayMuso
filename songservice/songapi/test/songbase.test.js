// Note: this is an integration test (not unit) and uses a database inside the dev songbase.
//       which should be seaprated out in a real environment

import Songbase from '../src/songbase.js'

const TEST_DB_NAME = 'TEST_songbase'
const songbase = new Songbase(TEST_DB_NAME)

beforeAll(async () => {
    console.log('Connecting to the songbase test database')
    await songbase.connect()
})

afterAll(async () => {
    console.log('Finishing with the songbase test database')
    await songbase.close()
})

describe('when adding a song', () => {
    beforeEach(async () => {
        await songbase.clear()
    })

    it('a valid should be added', async () => {
        await songbase.addSong({ a: 1, b: 2 })
        const allSongs = await songbase.getAllSongs()
        expect(allSongs.length).toEqual(1)
    })

    it('that already exists it should be added twice', async () => {
        await songbase.addSong({ a: 1, b: 2 })
        await songbase.addSong({ a: 1, b: 2 })
        const allSongs = await songbase.getAllSongs()
        expect(allSongs.length).toEqual(2)
    })
})

describe('when getting no songs', () => {
    beforeEach(async () => {
        await songbase.clear()
    })

    it('before any songs have been added there are none', async () => {
        const allSongs = await songbase.getAllSongs()
        expect(allSongs.length).toEqual(0)
    })
})
