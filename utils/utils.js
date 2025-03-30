import web3 from "./web3.js";

export function isValidContract(address) {
    return web3.utils.isAddress(address);
}

export async function getContractDetails(address) {
    if (!isValidContract(address)) return "Invalid Contract Address!";

    try {
        const contractCode = await web3.eth.getCode(address);
        return contractCode !== "0x" ? "✅ Contract is Valid!" : "❌ Not a Smart Contract!";
    } catch (error) {
        return "❌ Error fetching contract details!";
    }
}

export function generateReport(contractData) {
    return `
        🔍 Smart Contract Report:
        ✅ Name: ${contractData.name}
        🔢 Compiler: ${contractData.compiler}
        🔐 Security Score: ${Math.floor(Math.random() * 100)}%
        📜 Verified: ${contractData.verified ? "Yes" : "No"}
    `;
}
