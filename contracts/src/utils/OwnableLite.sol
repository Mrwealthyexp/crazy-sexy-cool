// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract OwnableLite {
    error OwnableUnauthorizedAccount(address account);
    error OwnableInvalidOwner(address owner_);

    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }

        owner = initialOwner;
        emit OwnershipTransferred(address(0), initialOwner);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OwnableUnauthorizedAccount(msg.sender);
        }
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }

        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
