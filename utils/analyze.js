import web3 from "./web3.js";

/**
 * Check if contract address is valid
 */
export function isValidContract(address) {
    return web3.utils.isAddress(address);
}

/**
 * Get contract details from blockchain
 */
export async function getContractDetails(address) {
    if (!isValidContract(address)) return "Invalid Contract Address!";

    try {
        const contractCode = await web3.eth.getCode(address);
        return contractCode !== "0x" ? "✅ Contract is Valid!" : "❌ Not a Smart Contract!";
    } catch (error) {
        return "❌ Error fetching contract details!";
    }
}
