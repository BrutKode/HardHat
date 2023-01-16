require('@chugsplash/plugins')

const { chugsplash } = require('hardhat')
const { expect } = require('chai')

describe('HelloChugSplash', () => {
  let MyFirstContract
  beforeEach(async () => {
    // You must reset your ChugSplash deployments to their initial state here
    await chugsplash.reset()

    MyFirstContract = await chugsplash.getContract('MyFirstContract')
  })

  it('initializes correctly', async () => {
    expect(await MyFirstContract.number()).equals(1)
    expect(await MyFirstContract.stored()).equals(true)
    expect(await MyFirstContract.storageName()).equals('First')
    expect(await MyFirstContract.otherStorage()).equals(
      '0x1111111111111111111111111111111111111111'
    )
  })
})