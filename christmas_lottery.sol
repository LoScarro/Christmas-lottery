// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract christmas_lottery {
    
    struct TicketOwner {
        string firstname;
        string lastname;
        string studentID;
    }
    
    struct Ticket {
        uint256 timestamp;
        uint256 identifier;
        TicketOwner ticketOwner;
    }

    Ticket[] soldTickets;   // list of sold tickets (by default mem in storage)
    TicketOwner[] winners;

    // the mapping of participants with the studentID as key. It's needed to check if a
    // participant is already in the list of participants without looping through the list
    mapping(string => bool) private participants;
    mapping(string => bool) private winnersMap;

    uint public participantsCount;
    address private immutable contractOwner;    // immutable because it never changes after its initialization
    uint256 private incr; // for random number generation

    event TicketAdded(uint256 _timestamp, string _studentID , string  _firstname, string _lastname);
    event WinnerDrawn(string  _firstname, string _lastname, string _studentID);

    // check if the caller is the contract owner
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can call this function");
        _; // Continue with the function execution if the modifier check passes
    }

    // check if the string is not empty
    modifier nonEmptyString(string memory _str) {
        require(bytes(_str).length > 0, "Empty string not allowed");
        _; // Continue with the function execution if the modifier check passes
    }

    // check if the number is not zero
    modifier positiveNum(uint256 _num) {
        require(_num > 0, "Zero value not allowed");
        _; // Continue with the function execution if the modifier check passes
    }

    // check if the caller is the contract owner
    function isOwner() public view returns (bool) {
        return msg.sender == contractOwner;
    }

    constructor() {
        // set the contract owner
        contractOwner = msg.sender;
    }

    // add a participant to the list of participants
    function addParticipant(string memory _studentID) private {
        // if the participant is not already in the list of participants
        if (!participants[_studentID]) {
            // add the participant to the mapping of participants with the studentID as key
            participants[_studentID] = true;
            participantsCount++;
        }
    }

    // sell a ticket
    function addTicket(string memory _firstname, string memory _lastname, string memory _studentID, uint256 _number) public 
        onlyOwner
        nonEmptyString(_firstname)
        nonEmptyString(_lastname)
        nonEmptyString(_studentID)
        positiveNum(_number)
    {
        // add the participant to the list of participants
        addParticipant(_studentID);

        // for the number of tickets to sell
        for (uint256 i = 0; i < _number; i++) {
            // generate a random identifier hashing block number and timestamp
            uint256 identifier = uint256(keccak256(abi.encodePacked(block.number, block.timestamp, incr)));
            incr++;
            Ticket memory ticket = Ticket(block.timestamp, identifier, TicketOwner(_firstname, _lastname, _studentID));
            // add the ticket to the list of sold tickets
            soldTickets.push(ticket);
            emit TicketAdded(ticket.timestamp, ticket.ticketOwner.studentID, ticket.ticketOwner.firstname, ticket.ticketOwner.lastname);
        }
    }

    // generate a random number between 0 and tickets.length
    function randomNumber() private returns (uint256) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.number, block.timestamp, incr)));
        incr++;
        return random % soldTickets.length;
    }

    function getAWinner() private returns (TicketOwner memory) {
        require(participantsCount > winners.length, "No more tickets to draw");

        uint256 attempts = 0;
        while (attempts < soldTickets.length) {
            uint256 randomIndex = randomNumber();

            // get the winner studentID from the list of sold tickets
            string memory winner = soldTickets[randomIndex].ticketOwner.studentID;

            // check if the winner is already in the list of winners
            if (!winnersMap[winner]) {
                // if not, add the winner to the list of winners
                winnersMap[winner] = true;
                return soldTickets[randomIndex].ticketOwner;
            }
            // if the winner is already in the list of winners, try again
            attempts++;
        }
        // this should never happen because the number of participants is always greater
        // than the number of winners so there should always be a possible winner
        revert("Failed to find a winner");
    }


    // take a random ticket from the list of sold tickets
    function drawTicket(uint256 _number) public
        onlyOwner
        positiveNum(_number)
    {
        require(soldTickets.length > 0, "No tickets sold yet");

        TicketOwner memory winner;
        // get n random winners
        for (uint256 i = 0; i < _number; i++) {
            // get a random ticket
            winner = getAWinner();
            emit WinnerDrawn(winner.firstname, winner.lastname, winner.studentID);
            // add the winner to the list of winners
            winners.push(winner);
        }
       
    }

    // show all winners
    function showWinners() public view returns (TicketOwner[] memory) {
        return winners;
    }

    // clear the partecipants
    function resetPartecipants() public onlyOwner {
        // Reset participants->winner mapping
        for (uint256 i = 0; i < soldTickets.length; i++) {
            delete participants[soldTickets[i].ticketOwner.studentID];
        }
        
        // Reset participants count
        participantsCount = 0;

        // reset also the winners
        resetWinners();

        // Clear soldTickets and winners arrays
        delete soldTickets;
    }

    function resetWinners() public onlyOwner {
        // Reset participants->winner mapping
        for (uint256 i = 0; i < soldTickets.length; i++) {
            delete winnersMap[soldTickets[i].ticketOwner.studentID];
        }
        
        // Clear soldTickets and winners arrays
        delete winners;
    }
}