//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract MultiSigWallet {
    event Deposit(address indexed sender, uint amount);    
    event Submit(uint indexed txId);
    event Approve(address indexed owner, uint indexed txId);
    event Revoke(address indexed owner, uint indexed txId);
    event Execute(uint indexed txId);

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public required;

    modifier onlyOwner() {
        require(isOwner[msg.sender] == true, "Not Authorised!");
        _;
    }

    modifier txExists(uint _txId) {
        require(_txId < transactions.length, "Not existing TXN!");
        _;
    }

    modifier notApproved(uint _txId) {
        require(!approved[_txId][msg.sender], "Approved TXN!");
        _;
    }

    modifier notExecuted(uint _txId) {
        require(transactions[_txId].executed == false, "Executed TXN!");
        _;
    }


    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public approved;

    constructor() {
        owners.push(msg.sender);
        isOwner[msg.sender] = true;
        required = 1;
    }

    function addOwner(address _owner, uint _required) public onlyOwner {
        require(_required > 0 && _required <= owners.length, "Invalid required authorizers");
        require(!isOwner[_owner], "Already Assigned Owner!");
        isOwner[_owner] = true;
        owners.push(_owner);
        required = _required;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submit(address _to, uint _value, bytes calldata _data) external onlyOwner {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false
        }));
        emit Submit(transactions.length - 1);
    }

    function approve(uint _txId) external onlyOwner txExists(_txId) notApproved(_txId) notExecuted(_txId) {
        approved[_txId][msg.sender] = true;
        emit Approve(msg.sender, _txId);
    }

    function _getApprovalCount(uint _txId) private view returns (uint count) {
        for (uint i; i < owners.length; i++) {
            if (approved[_txId][owners[i]]) {
                count += 1;
            }
        }
        return count;
    }

    function execute(uint _txId) external txExists(_txId) notExecuted(_txId) {
        require(_getApprovalCount(_txId) >= required, "Not enough approvals!");
        Transaction storage transaction = transactions[_txId];

        transaction.executed = true;

        (bool success , ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "TXN Failure!");

        emit Execute(_txId);
    }

    function revoke(uint _txId) external onlyOwner txExists(_txId) notExecuted(_txId) {
        require(approved[_txId][msg.sender], "TXN Not Approved!");
        approved[_txId][msg.sender] = false;
        emit Revoke(msg.sender, _txId);
    }

}
