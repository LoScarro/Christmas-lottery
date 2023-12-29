import Web3 from 'web3';

const infuraKey = process.env.REACT_APP_INFURA_API_KEY
const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey));

// abi from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractABI = require("../contract-abi.json");
// address from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractAddress = "0x028ad62f6F836C040B622D07bA39Bd396b188cE9";

export const christmas_lottery_contract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const checkConnection = async (walletAddress) => {
    return (!window.ethereum || !walletAddress)
}

export const getParticipantCount = async (walletAddress) => {
    try {
        const participantsNumber = await christmas_lottery_contract.methods.participantsCount().call({ from: walletAddress });
        // convert from BigNumber to String. The web3.js library often returns numbers as BigNumber objects.
        return participantsNumber.toString();
    }
    catch (error) {
        console.error('Error sending transaction:', error);
    }
};

export const addTicket = async (firstname, lastname, studentID, number, walletAddress) => {
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: walletAddress, // must match user's active address.
        data: christmas_lottery_contract.methods.addTicket(firstname, lastname, studentID, number).encodeABI(),
    };
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                        View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}

export const resetWinners = async (walletAddress) => {
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: walletAddress, // must match user's active address.
        data: christmas_lottery_contract.methods.resetWinners().encodeABI(),
    };
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                        View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}

export const resetParticipants = async (walletAddress) => {
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: walletAddress, // must match user's active address.
        data: christmas_lottery_contract.methods.resetPartecipants().encodeABI(),    // resetParticipants not resetPartecipants
    };
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                        View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}

export const drawTicket = async (number, walletAddress) => {
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: walletAddress, // must match user's active address.
        data: christmas_lottery_contract.methods.drawTicket(number).encodeABI(),
    };
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                        View the status of your transaction on Etherscan!
                    </a>
                    <br />
                    <a>
                        And the winner is...
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}