import Web3 from "https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js";

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: "eth_requestAccounts" });
} else {
    alert("⚠️ Please install Metamask!");
}

export default web3;
