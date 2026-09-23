// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableLite} from "./utils/OwnableLite.sol";

/**
 * @title CoolToken
 * @dev Lightweight ERC20 used to represent $COOL before it is transmuted into $SOUL.
 */
contract CoolToken is OwnableLite {
    error ERC20InsufficientBalance(address account, uint256 balance, uint256 needed);
    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);
    error ZeroAddress();
    error UnauthorizedMinter(address account);

    string public constant name = "Crazy Sexy Cool";
    string public constant symbol = "COOL";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public minters;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event MinterUpdated(address indexed account, bool isMinter);

    constructor(address initialOwner) OwnableLite(initialOwner) {}

    modifier onlyMinter() {
        if (!minters[msg.sender] && msg.sender != owner) {
            revert UnauthorizedMinter(msg.sender);
        }
        _;
    }

    function setMinter(address account, bool isMinter) external onlyOwner {
        if (account == address(0)) {
            revert ZeroAddress();
        }

        minters[account] = isMinter;
        emit MinterUpdated(account, isMinter);
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        uint256 currentAllowance = allowance[from][msg.sender];
        if (currentAllowance < value) {
            revert ERC20InsufficientAllowance(msg.sender, currentAllowance, value);
        }

        unchecked {
            allowance[from][msg.sender] = currentAllowance - value;
        }

        emit Approval(from, msg.sender, allowance[from][msg.sender]);
        _transfer(from, to, value);
        return true;
    }

    function mint(address to, uint256 value) external onlyMinter returns (bool) {
        if (to == address(0)) {
            revert ZeroAddress();
        }

        totalSupply += value;
        balanceOf[to] += value;

        emit Transfer(address(0), to, value);
        return true;
    }

    function burn(uint256 value) external returns (bool) {
        _burn(msg.sender, value);
        return true;
    }

    function burnFrom(address from, uint256 value) external returns (bool) {
        if (msg.sender != from) {
            uint256 currentAllowance = allowance[from][msg.sender];
            if (currentAllowance < value) {
                revert ERC20InsufficientAllowance(msg.sender, currentAllowance, value);
            }

            unchecked {
                allowance[from][msg.sender] = currentAllowance - value;
            }

            emit Approval(from, msg.sender, allowance[from][msg.sender]);
        }

        _burn(from, value);
        return true;
    }

    function burnFromAuthorized(address from, uint256 value) external onlyMinter returns (bool) {
        _burn(from, value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        if (to == address(0)) {
            revert ZeroAddress();
        }

        uint256 fromBalance = balanceOf[from];
        if (fromBalance < value) {
            revert ERC20InsufficientBalance(from, fromBalance, value);
        }

        unchecked {
            balanceOf[from] = fromBalance - value;
        }
        balanceOf[to] += value;

        emit Transfer(from, to, value);
    }

    function _burn(address from, uint256 value) internal {
        uint256 fromBalance = balanceOf[from];
        if (fromBalance < value) {
            revert ERC20InsufficientBalance(from, fromBalance, value);
        }

        unchecked {
            balanceOf[from] = fromBalance - value;
        }
        totalSupply -= value;

        emit Transfer(from, address(0), value);
    }
}
