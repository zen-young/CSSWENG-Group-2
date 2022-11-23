import 'jest'
import * as functions from 'firebase-functions-test'
import * as admin from 'firebase-admin'

const testEnv = functions({
    databaseURL: 'insertdblinkherewhenyoucanrunsimulation',
    projectId: 'insertprojectid'

}, './service-account.json');

describe('Testing db', () => {
    beforeAll(() => {

    })

    test('Add product', async () => {

        const thing = 'make and retrieve somethin in db!'
        expect(thing).toBe(true)
    })
})