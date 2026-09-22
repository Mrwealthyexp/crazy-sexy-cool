// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CoolToken {
    string public constant name = 'Crazy Sexy Cool';
    string public constant symbol = 'COOL';
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    address public immutable admin;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin');
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external onlyAdmin {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, 'Allowance exceeded');
        allowance[from][msg.sender] = allowed - amount;
        _transfer(from, to, amount);
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), 'Invalid recipient');
        require(balanceOf[from] >= amount, 'Balance too low');
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}
