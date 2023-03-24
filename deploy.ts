import { ethers } from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

async function main() {
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!)
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
	const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
	// let wallet = new ethers.Wallet.fromEncryptedJsonSync(
	// 	encryptedJson,
	// 	process.env.PRIVATE_KEY_PASSWORD
	// )
	// wallet = await wallet.connect(provider)
	const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8")
	const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8")
	const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
	console.log("Deploying ...")
	const contract = await contractFactory.deploy()
	console.log(`Contract Address ---> ${contract.address}`)
	// console.log(contract)
	// const transactionReceipt = await contract.deployTransaction.wait(1)
	// console.log(`Contract deployed to ${contract.address}`)

	// const nonce = await wallet.getTransactionCount()
	// const tx = {
	// 	nonce: nonce,
	// 	gasPrice: 20000000000,
	// 	gasLimit: 1000000,
	// 	to: null,
	// 	value: 0,
	// 	data: '0x',
	// 	chainId: 1337,
	// }

	// let resp = await wallet.signTransaction(tx)
	// const signedTxResponse = await wallet.signTransaction(tx);
	// const sentTxResponse = await wallet.sendTransaction(tx)
	// console.log(sentTxResponse)

	let currentFavoriteNumber = await contract.retrieve()
	console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)
	console.log("Updating favorite number...")
	let transactionResponse = await contract.store(7)
	let transactionReceipt = await transactionResponse.wait(1)
	currentFavoriteNumber = await contract.retrieve()
	console.log(`New Favorite Number: ${currentFavoriteNumber}`)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
