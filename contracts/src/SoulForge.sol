// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableLite} from "./utils/OwnableLite.sol";

/**
 * @title SoulForge
 * @dev Mints one immutable soul blueprint per wallet.
 */
contract SoulForge is OwnableLite {
    error SoulAlreadyForged(address wallet);
    error SoulNotFound(uint256 soulId);
    error ZeroAddress();
    error Soulbound();
    error UnauthorizedForge(address account);

    struct SoulBlueprint {
        uint8 sex;
        uint8 birthMonth;
        uint8 rulingPlanet;
        uint8 moonPhase;
        uint8 temperament;
        uint64 signatureTimestamp;
        bytes32 blueprintHash;
    }

    string public constant name = "Crazy Sexy Cool Soul";
    string public constant symbol = "SOUL";

    uint256 private _nextSoulId = 1;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) public walletToSoul;
    mapping(uint256 => SoulBlueprint) private _blueprints;
    mapping(address => bool) public forgers;

    event SoulForged(uint256 indexed soulId, address indexed recipient, bytes32 blueprintHash);
    event ForgerUpdated(address indexed account, bool isForger);

    constructor(address initialOwner) OwnableLite(initialOwner) {}

    modifier onlyForger() {
        if (!forgers[msg.sender] && msg.sender != owner) {
            revert UnauthorizedForge(msg.sender);
        }
        _;
    }

    function setForger(address account, bool isForger) external onlyOwner {
        if (account == address(0)) {
            revert ZeroAddress();
        }

        forgers[account] = isForger;
        emit ForgerUpdated(account, isForger);
    }

    function forgeSoul(address recipient, SoulBlueprint calldata blueprint) external onlyForger returns (uint256 soulId) {
        if (recipient == address(0)) {
            revert ZeroAddress();
        }
        if (walletToSoul[recipient] != 0) {
            revert SoulAlreadyForged(recipient);
        }

        soulId = _nextSoulId++;
        bytes32 blueprintHash = keccak256(
            abi.encode(
                blueprint.sex,
                blueprint.birthMonth,
                blueprint.rulingPlanet,
                blueprint.moonPhase,
                blueprint.temperament,
                blueprint.signatureTimestamp,
                recipient
            )
        );

        _owners[soulId] = recipient;
        walletToSoul[recipient] = soulId;
        _blueprints[soulId] = SoulBlueprint({
            sex: blueprint.sex,
            birthMonth: blueprint.birthMonth,
            rulingPlanet: blueprint.rulingPlanet,
            moonPhase: blueprint.moonPhase,
            temperament: blueprint.temperament,
            signatureTimestamp: blueprint.signatureTimestamp,
            blueprintHash: blueprintHash
        });

        emit SoulForged(soulId, recipient, blueprintHash);
    }

    function totalSouls() external view returns (uint256) {
        return _nextSoulId - 1;
    }

    function exists(uint256 soulId) public view returns (bool) {
        return _owners[soulId] != address(0);
    }

    function ownerOf(uint256 soulId) public view returns (address) {
        address soulOwner = _owners[soulId];
        if (soulOwner == address(0)) {
            revert SoulNotFound(soulId);
        }
        return soulOwner;
    }

    function blueprintOf(uint256 soulId) external view returns (SoulBlueprint memory) {
        if (!exists(soulId)) {
            revert SoulNotFound(soulId);
        }

        return _blueprints[soulId];
    }

    function transferFrom(address, address, uint256) external pure {
        revert Soulbound();
    }

    function safeTransferFrom(address, address, uint256) external pure {
        revert Soulbound();
    }

    function safeTransferFrom(address, address, uint256, bytes calldata) external pure {
        revert Soulbound();
    }

    function approve(address, uint256) external pure {
        revert Soulbound();
    }

    function setApprovalForAll(address, bool) external pure {
        revert Soulbound();
    }
}
