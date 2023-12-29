import Web3 from 'web3';

export const connectWallet = async () => {
    // checks if window.ethereum is enabled in browser
    if (window.ethereum) {
        try {
            // try to connect to Metamask. Calling this function will open up Metamask in the browser
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "Good Luck! 🤞🏻",
                // take the first address in the array of addresses and display it to the user in our Wallet
                address: addressArray[0],
            };
            return obj;
            // if user denies access to their Metamask account, .request() will throw an error.
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};
//check if an address is already connected to the dApp and update our UI accordingly
//returns an array containing the Metamask addresses currently connected to the dApp.
export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "Good Luck! 🤞🏻",
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};