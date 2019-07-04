import { LibraClient, LibraWallet } from 'libra-web'

describe('LibraClient.query*()', () => {
  describe('queryBalance()', () => {
    it('should query balance', async () => {
      try {
        const client = new LibraClient()
        const wallet = new LibraWallet(
          'upgrade salt toy stable drop paddle service supply display enhance spin polar rice convince exile laundry bounce reopen believe elevator craft display genre pink',
        )

        // TEST ACCOUNT CREATION
        const account1 = wallet.getAccount(0)
        const account1Address = account1.getAddress().toHex()
        console.log('User 1 address is', account1Address)
        let account1State = await client.getAccountState(account1Address)

        const account2 = wallet.getAccount(0)
        const account2Address = account2.getAddress().toHex()
        console.log('User 2 address is', account2Address)
        let account2State = await client.getAccountState(account2Address)

        // TEST MINITNG xAmount
        const xAmount = 20e6
        await client.mintWithFaucetService(account1Address, xAmount)
        const newAccount1State = await client.getAccountState(account1Address)
        // ensure its balance is +xAmount
        expect(newAccount1State.balance.toString(10)).toEqual(account1State.balance.plus(xAmount).toString(10))

        // TEST TRANSFER TRANSACTION OF yAmount
        // transfer y amount to new account
        // const yAmount = 1e6;
        // await client.transfer()
        // ensure new account balance is y
      } catch (e) {
        console.error('========>', e)
      }
    }, 30000)
  })

  describe('transferCoins()', () => {
    it('should query balance', async () => {
      try {
        const client = new LibraClient()
        const wallet = new LibraWallet(
          'silk rural awake receive timber bronze mutual message squeeze rug result shoot settle guide wheat believe dune fall share syrup picture true offer slow',
        )

        // TEST ACCOUNT CREATION
        const account1 = wallet.getAccount(0)
        const account1Address = account1.getAddress().toHex()
        console.log('User 1 address is', account1Address)

        const yAmount = 1e6
        const transferResult = await client.transferCoins(
          account1,
          '1dc70740d8ef845095db2cc1af5be777ff1fbfe4361cff36ff4c6952072b9296',
          yAmount,
        )

        console.log(transferResult)
      } catch (e) {
        console.error('========>', e)
      }
    }, 30000)
  })
})
