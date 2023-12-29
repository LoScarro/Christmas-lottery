import Web3 from 'web3';

const infuraKey = process.env.REACT_APP_INFURA_API_KEY
const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey));

// abi from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractABI = require("../contract-abi.json");
// address from https://sepolia.etherscan.io/address/0xd65CB661a096004B733066b8B14117C86CB0C5d0#code
const contractAddress = "0xd65CB661a096004B733066b8B14117C86CB0C5d0";

export const christmas_lottery_contract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const getParticipantsCount = async (walletAddress) => {
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
    try {
        console.log('Sending transaction...');
        const accounts = await web3.eth.getAccounts();
        const result = await christmas_lottery_contract.methods
            .addTicket(firstname, lastname, studentID, number)
            .send({ from: walletAddress });

        console.log('Transaction successful:', result);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
};

