## Idea

The process of participating in the lottery begins when a user wants to purchase one or more tickets. The user contacts the contract owner, providing personal information such as name, surname, and student ID, along with the amount of money required to purchase the ticket.

Subsequently, the contract owner uses the `addParticipant` function to register the user, generating a ticket associated with the information provided by the user. This ticket contains the owner's name, surname, and student ID plus an identifier and a timestamp.

On the day of the draw, the contract owner presses the `getWinner` button, specifying the number *n* of desired winners. At this point, the contract randomly selects *n* winners from all registered participants on the blockchain. Each participant is eligible to win only one prize; the more tickets you purchase, the higher your chances of winning the first prize.

Once the draw is completed, the winner's data becomes available to the owner through the `showWinners` button, who can then announce the lucky winners of the lottery.

Additionally, the owner can also reset the participants and the winners with the `resetParticipants` and `resetWinners` functionalities, allowing the lottery to be used multiple times.

### Installation
- `npm install`
- To use the App, ensure MetaMask is installed in your browser and have a wallet ready for interaction.

### Start the project
- `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Smart contract implementation

Address: *0x5d33AD128Cf17c49DFeB711cBB006395026A5b27*

The smart contract has been implemented in Solidity using Remix IDE.

It provides three read methods:

1. `isOwner`: returns true if the caller's wallet address corresponds to the owner address, otherwise returns false.
2. `participantsCount`: returns the number of lottery participants.
3. `showWinners`: returns a list of tuples containing *firstname*, *lastname*, and *studentID* of the winners drawn from the last reset of the winners/participants.

And four write methods:

1. `addTicket` (`onlyOwner`): takes input from the owner for *firstname*, *lastname,* *studentID,* and *number*, and inserts [*number]* tickets associated with the person's details into the lottery.
2. `drawTicket` (`onlyOwner`): takes input a number and randomly extracts [number] tickets from the lottery.
3. `resetParticipants` (`onlyOwner`): resets the participants (and also the winners) in the lottery to 0.
4. `resetWinners` (`onlyOwner`): reset only the winners to 0.

## Front-end

I implemented the front-end using ReactJS, using the Web3 library to handle communication with the smart contract and Infura as a provider.

It offers two different interfaces based on whether the connected wallet is that of the owner or not.

If the wallet belongs to the owner, the site will display all components:

1. The number of participants (refreshed on each page reload)
2. The button to connect/view the wallet
3. The form to add new tickets to the lottery
4. The form to draw winners
5. The button to reset participants
6. The button to reset winners
7. The button to view the winners drawn from the last reset
8. The status bar

If the connected wallet does not belong to the owner, the site will only show components 1, 2, 6, and 8.

### Project Structure Overview

The `App()` function, inside the */App.js* file, is the root component of the application.

Here all the components are rendered and is checked if the connected wallet belongs to the contract owner, adjusting the displayed components accordingly.

To determine ownership, the `isOwner` method within the smart contract is invoked through the `checkIsOwner` function. This check occurs on each page reload or whenever the connected wallet changes, leveraging the `useEffect` hook.

Moreover, within `App.js`, there's an attempt to implement an event listener for the smart contract event `WinnerDrawn` but I encountered difficulties in getting it to work as intended.

Every component rendered by the `App()` function is located in the */components* directory. Each component has its own folder, including a JavaScript file for its logic and a CSS file for its specific styles. The components' logic is straightforward, typically involving the HTML, a call to the corresponding contract methods, an update of the status bar, and a return of the data provided by the smart contract method. Therefore, I won't delve into the details of each component in this report.

All interactions with the methods exposed by the contract are encapsulated within the */utils/contract.js* file. Meanwhile, the */utils/wallet.js* file encompasses all the logic for connecting a wallet to the website.

## Issues Encountered

I observed that if the condition of a `require()` is not met, Metamask notifies the user that there might be an error in the contract and prevents the transaction from being accepted.

This occurred when attempting to draw a number of tickets greater than the possible winners. I resolved the issue by implementing a JavaScript check that prevents the user from drawing an excessively high number of winners.

As mentioned earlier, I encountered challenges while working on the event listener intended to capture WinnerDrawn events. Despite attempting various implementations, the event listener appears to ignore the events emitted by the smart contract.

```jsx
function eventListener() {
  christmas_lottery_contract.events["WinnerDrawn"]({}, (error, event) => {
    if (!error) {
      // Handle the event data
      const eventData = event.returnValues;
      setStatus(
        `🎉 Congratulations to the winner: ${eventData.firstname} ${eventData.lastname}!`
      );
    } else {
      console.error('Error listening to the event:', error);
      setStatus("😥 Some error occurred while listening to the event");
    }
  });
}
```
