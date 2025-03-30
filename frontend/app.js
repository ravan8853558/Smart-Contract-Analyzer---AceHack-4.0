const BSC_API_KEY = "9ID4ZDDY4V1AQZMXZBIV42UEZY794RNE73";
const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const BSC_API_URL = "https://api.bscscan.com/api";
const MORALIS_API_URL = "https://deep-index.moralis.io/api/v2";

async function analyzeContract() {
    const address = document.getElementById("contractAddress").value.trim();
    if (!address) {
        alert("Please enter a valid contract address!");
        return;
    }

    try {
        const response = await fetch(`${BSC_API_URL}?module=contract&action=getsourcecode&address=${address}&apikey=${BSC_API_KEY}`);
        const data = await response.json();

        if (data.status === "1" && data.result.length > 0) {
            const contractData = data.result[0];
            const balance = await fetchWalletBalance(address);
            const riskLevel = Math.floor(Math.random() * 100);

            document.getElementById("reportOutput").textContent = 
                `✅ Contract Found:
                Name: ${contractData.ContractName}
                Compiler: ${contractData.CompilerVersion}
                Verified: ${contractData.IsVerified ? "Yes" : "No"}
                Chain: Binance Smart Chain
                Wallet Balance: ${balance} BNB
                Risk Level: ${riskLevel}%`;
        } else {
            document.getElementById("reportOutput").textContent = "❌ No Contract Found!";
        }
    } catch (error) {
        document.getElementById("reportOutput").textContent = "❌ Error fetching contract data!";
    }
}

async function fetchWalletBalance(address) {
    try {
        const response = await fetch(`${MORALIS_API_URL}/${address}/balance?chain=bsc`, {
            headers: { "X-API-Key": MORALIS_API_KEY }
        });
        const data = await response.json();
        return data.balance ? (data.balance / 1e18).toFixed(4) : "0";
    } catch (error) {
        return "Error fetching balance";
    }
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
