import Web3 from 'web3';

const infuraKey = process.env.REACT_APP_INFURA_API_KEY
const contractAddress = "0x272bea653c49a49170587BcfbDa5B120a8E608Df"
const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey));

// abi from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractABI = require("../contract-abi.json");
// address from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code

export const christmas_lottery_contract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const checkConnection = async (walletAddress) => {
    return (!window.ethereum || !walletAddress)
}

export const checkIsOwner = async (walletAddress) => {
    try {
        const owner = await christmas_lottery_contract.methods.isOwner().call({ from: walletAddress });
        
        var status = "☃️ Welcome to the Christmas Lottery!";
        // print a different message if the user is the owner
        if (owner) status= "👋🏻 Welcome back, owner!";  
        
        return {
            owner: owner,
            status: status,
        };
    }
    catch (error) {
        console.error('Error retrieving owner:', error);
        return {
            owner: false,
            status: "😥 Some error occurred while retrieving the ownership status"
        };
    }
};

export const getParticipantCount = async (walletAddress) => {
    try {
        const participantsNumber = await christmas_lottery_contract.methods.participantsCount().call({ from: walletAddress });
        
        // convert from BigNumber to String. The web3.js library often returns numbers as BigNumber objects.
        return {
            count: participantsNumber.toString(),
        };
    }
    catch (error) {
        console.error('Error retrieving participants:', error);
        return {
            count: "...",
            status: "😥 Some error occurred while retrieving the participants number"
        };
    }
};

export const getWinners = async (walletAddress) => {
    try {
        const winners = await christmas_lottery_contract.methods.showWinners().call({ from: walletAddress });
        // convert each tuple into an object with the fields firstname, lastname and studentID
        const winnersArray = winners.map(tuple => ({
            firstname: tuple[0],
            lastname: tuple[1],
            studentID: tuple[2]
        }));

        return {
            winners: winnersArray,
            status: "☝🏻 Here are the winners!",
        };
    } catch (error) {
        console.error('Error retrieving winners:', error);
        return {
            winners: [],
            status: "😥 " + error.message,
        };
    }
};

const sendTransaction = async (method, parameters, walletAddress) => {
    try {
        //set up transaction parameters
        const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: walletAddress, // must match user's active address.
            data: christmas_lottery_contract.methods[method](...parameters).encodeABI(),
        };
        //sign the transaction
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        // show a message to the user that the transaction has been sent
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
        // in case of an error, show a message to the user
        // a possible error is that the user rejected the transaction
        console.error(`Error during the transaction ${method}:`, error);
        return {
            status: "😥 " + error.message,
        };
    }
};

export const addTicket = async (firstname, lastname, studentID, number, walletAddress) => {
    return sendTransaction('addTicket', [firstname, lastname, studentID, number], walletAddress);
}

export const drawTicket = async (number, walletAddress) => {
    return sendTransaction('drawTicket', [number], walletAddress);
}

export const resetWinners = async (walletAddress) => {
    return sendTransaction('resetWinners', [], walletAddress);
}

export const resetParticipants = async (walletAddress) => {
    return sendTransaction('resetPartecipants', [], walletAddress);
}

