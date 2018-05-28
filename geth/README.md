# EthreumSample
## 概要
gethの起動からスマートコントラクト実行までのサンプル。
あらかじめgethとMist WalletがmacOSにインストールされていることを前提とする。

## 実行方法
### gethの起動
```
$ geth --dev --datadir . --rpc --rpcapi "eth,net,web3,personal"
```

### gethコンソールの起動
```
$ geth attach geth.ipc
```

### コンソール操作(web3.js)
```
// アカウント確認
> eth.accounts
["0x180e76aa3534e0087e496a65e512024264da4c72"]

// 新規アカウントを作成
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x302ac600037fceb9f9c591028c65d7caacc40a4d"

// 再度アカウント確認
> eth.accounts;
["0x180e76aa3534e0087e496a65e512024264da4c72", "0x302ac600037fceb9f9c591028c65d7caacc40a4d"]

// account0の残高確認
> web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")
1.15792089237316195423570985008687907853269984665640564039457584007913129639927e+59

// 送金を行うためのaccountロック解除
> personal.unlockAccount(eth.accounts[0])
Unlock account 0x180e76aa3534e0087e496a65e512024264da4c72
Passphrase:
true
> personal.unlockAccount(eth.accounts[1])
Unlock account 0x302ac600037fceb9f9c591028c65d7caacc40a4d
Passphrase:
true

// account0からaccount1へ3Etherの送金
> eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[1], value: web3.toWei(3, "ether")})
"0x00578c78fd45cd1413c3ae21cf7f40338f5aa546a3f116d47bcde893d21f59a0"

// account0の残高参照
// PRIVATE_NETのためマイニングが早い
> web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")
1.15792089237316195423570985008687907853269984665640564039454584007913129639927e+59

// account1の残高参照
// 3Etherの送金が完了している
> web3.fromWei(eth.getBalance(eth.accounts[1]), "ether")
3

// 送金のトランザクション確認
> eth.getTransaction('0x00578c78fd45cd1413c3ae21cf7f40338f5aa546a3f116d47bcde893d21f59a0');
{
  blockHash: "0x7d69499054e8cc2d10d0118644ba25e2451a877b809551659197a714236d16c9",
  blockNumber: 1,
  from: "0x180e76aa3534e0087e496a65e512024264da4c72",
  gas: 90000,
  gasPrice: 1,
  hash: "0x00578c78fd45cd1413c3ae21cf7f40338f5aa546a3f116d47bcde893d21f59a0",
  input: "0x",
  nonce: 0,
  r: "0x99016fcfc3237b53286e926af039bced9f9ff417b9ca1651168dc3ad3e215853",
  s: "0x709e0e9c96d1569a93e3a78d1e275f15a79fc59aa2900399d9fd633fad58c15e",
  to: "0x302ac600037fceb9f9c591028c65d7caacc40a4d",
  transactionIndex: 0,
  v: "0xa95",
  value: 3000000000000000000
}
```

### Mist Walletの起動
```
/Applications/Ethereum\ Wallet.app/Contents/MacOS/Ethereum\ Wallet --rpc http://localhost:8545
```

### スマートコントラクトのデプロイと実行
eth_privete/src/HelloEthreum.solのコードからコンストラクトを作成し、ブロックチェーンにデプロイする。
その後のスマートコントラクト動作確認は割愛。