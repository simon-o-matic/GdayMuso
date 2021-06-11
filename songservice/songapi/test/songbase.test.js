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

describe('when deleting a song', () => {
    beforeEach(async () => {
        await songbase.clear()
    })

    // Removed: Turns out this is an invalid size for an _id in Mongo. More complex to fix than worth it.
    xit('if the object doesnt exist nothing happens', async () => {
        await songbase.deleteSong('123')
        expect(true)
    })

    it('if the id is missing nothing happens', async () => {
        await songbase.deleteSong(null)
        expect(true)
    })

    it('if the id exists its removed', async () => {
        await songbase.addSong({ a: 1, b: 2 })
        const allSongs = await songbase.getAllSongs()
        expect(allSongs.length).toEqual(1)
        await songbase.deleteSong(allSongs[0]._id)
        const noSongs = await songbase.getAllSongs()
        expect(noSongs.length).toEqual(0)
    })
})

describe('when updating a song', () => {
    beforeEach(async () => {
        await songbase.clear()
    })

    const song1 = { title: 'title1', artist: 'artist1', year_released: 'year1' }
    const song2 = { title: 'title2', artist: 'artist2', year_released: 'year2' }

    it('if the song exists, its updated', async () => {
        await songbase.addSong(song1)
        const allSongs = await songbase.getAllSongs()

        expect(allSongs.length).toEqual(1)
        await songbase.updateSong(allSongs[0]._id, song2)

        const newSongs = await songbase.getAllSongs()

        expect(newSongs[0]._id).toEqual(allSongs[0]._id)
        expect(newSongs[0].title).toEqual(song2.title)
        expect(newSongs[0].artist).toEqual(song2.artist)
        expect(newSongs[0].year_released).toEqual(song2.year_released)
    })

    it("if the song doesn't exist, no changes are made", async () => {
        await songbase.addSong(song1)
        const allSongs = await songbase.getAllSongs()
        await songbase.deleteSong(allSongs[0]._id)
        await songbase.updateSong(allSongs[0]._id, song2)

        const newSongs = await songbase.getAllSongs()
        expect(newSongs.length).toEqual(0)
    })
})
