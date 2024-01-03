import Web3 from 'web3';

const infuraKey = process.env.REACT_APP_INFURA_API_KEY
const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey));

// abi from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractABI = require("../contract-abi.json");
// address from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractAddress = "0x272bea653c49a49170587BcfbDa5B120a8E608Df";

export const christmas_lottery_contract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const checkConnection = async (walletAddress) => {
    return (!window.ethereum || !walletAddress)
}

export const isOwner = async (walletAddress) => {
    try {
        const isOwner = await christmas_lottery_contract.methods.isOwner().call({ from: walletAddress });
        // convert from BigNumber to String. The web3.js library often returns numbers as BigNumber objects.
        return isOwner;
    }
    catch (error) {
        console.error('Error sending transaction:', error);
    }
};

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

export const getWinners = async (walletAddress) => {
    try {
        const winners = await christmas_lottery_contract.methods.showWinners().call({ from: walletAddress });
        console.log(winners);
        // Convertire ogni tupla in un oggetto con i campi firstname, lastname e studentID
        const winnersArray = winners.map(tuple => ({
            firstname: tuple[0],
            lastname: tuple[1],
            studentID: tuple[2]
        }));

        return winnersArray;
    } catch (error) {
        console.error('Error retrieving winners:', error);
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
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}