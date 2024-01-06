const INST_METAMASK = "You must install Metamask, a virtual Ethereum wallet, in your browser."

export const connectWallet = async () => {
    // checks if window.ethereum is installed in browser
    if (window.ethereum) {
        try {
            // try to connect to Metamask. Calling this function will open up Metamask in the browser
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
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
                            {INST_METAMASK}
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
            // if Metamask is connected then take the first address in the array of addresses
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0]
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
                            {INST_METAMASK}
                        </a>
                    </p>
                </span>
            ),
        };
    }
};