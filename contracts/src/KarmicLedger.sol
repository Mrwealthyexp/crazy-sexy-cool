// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableLite} from "./utils/OwnableLite.sol";

/**
 * @title KarmicLedger
 * @dev Tracks karmic balances and the soul-token delta attached to each moral action.
 */
contract KarmicLedger is OwnableLite {
    error UnauthorizedScribe(address account);
    error SoulNotFound(uint256 soulId);
    error ZeroAddress();
    error SoulAlreadyRegistered(uint256 soulId);

    enum KarmaType {
        White,
        Black,
        Gray
    }

    struct KarmaBalance {
        uint256 white;
        uint256 black;
        uint256 gray;
    }

    struct KarmaEntry {
        KarmaType karmaType;
        uint256 amount;
        int256 soulDelta;
        uint64 recordedAt;
        string reason;
    }

    mapping(uint256 => KarmaBalance) private _balances;
    mapping(uint256 => KarmaEntry[]) private _entries;
    mapping(uint256 => bool) public registeredSouls;
    mapping(address => bool) public scribes;

    event ScribeUpdated(address indexed account, bool isScribe);
    event SoulRegistered(uint256 indexed soulId);
    event KarmaRecorded(
        uint256 indexed soulId,
        KarmaType indexed karmaType,
        uint256 amount,
        int256 soulDelta,
        string reason
    );

    constructor(address initialOwner) OwnableLite(initialOwner) {}

    modifier onlyScribe() {
        if (!scribes[msg.sender] && msg.sender != owner) {
            revert UnauthorizedScribe(msg.sender);
        }
        _;
    }

    function setScribe(address account, bool isScribe) external onlyOwner {
        if (account == address(0)) {
            revert ZeroAddress();
        }

        scribes[account] = isScribe;
        emit ScribeUpdated(account, isScribe);
    }

    function recordKarma(
        uint256 soulId,
        KarmaType karmaType,
        uint256 amount,
        int256 soulDelta,
        string calldata reason
    ) external onlyScribe {
        if (soulId == 0 || !registeredSouls[soulId]) {
            revert SoulNotFound(soulId);
        }

        KarmaBalance storage balance = _balances[soulId];
        if (karmaType == KarmaType.White) {
            balance.white += amount;
        } else if (karmaType == KarmaType.Black) {
            balance.black += amount;
        } else {
            balance.gray += amount;
        }

        _entries[soulId].push(
            KarmaEntry({
                karmaType: karmaType,
                amount: amount,
                soulDelta: soulDelta,
                recordedAt: uint64(block.timestamp),
                reason: reason
            })
        );

        emit KarmaRecorded(soulId, karmaType, amount, soulDelta, reason);
    }

    function karmaOf(uint256 soulId) external view returns (KarmaBalance memory) {
        if (soulId == 0 || !registeredSouls[soulId]) {
            revert SoulNotFound(soulId);
        }

        return _balances[soulId];
    }

    function registerSoul(uint256 soulId) external onlyScribe {
        if (soulId == 0) {
            revert SoulNotFound(soulId);
        }
        if (registeredSouls[soulId]) {
            revert SoulAlreadyRegistered(soulId);
        }

        registeredSouls[soulId] = true;
        emit SoulRegistered(soulId);
    }

    function entryCount(uint256 soulId) external view returns (uint256) {
        return _entries[soulId].length;
    }

    function getEntry(uint256 soulId, uint256 index) external view returns (KarmaEntry memory) {
        return _entries[soulId][index];
    }
}
