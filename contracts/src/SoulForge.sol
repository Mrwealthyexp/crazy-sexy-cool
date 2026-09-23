// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SoulForge
 * @dev Canonical identity registry for souls owned by wallet addresses.
 */
contract SoulForge {
    enum WorldState {
        Crazy,
        Sexy,
        Cool
    }

    struct SoulIdentity {
        uint256 soulId;
        address owner;
        string displayName;
        string temperament;
        uint8 birthMonth;
        WorldState worldState;
        uint64 focus;
        bytes32 tokenBoundAccount;
        uint64 createdAt;
        bool combatLicensed;
        bool transcended;
    }

    address public owner;
    address public controller;
    uint256 public totalSouls;

    mapping(uint256 => SoulIdentity) private soulsById;
    mapping(address => uint256) private soulIdByOwner;

    event ControllerUpdated(address indexed controller);
    event SoulForged(uint256 indexed soulId, address indexed soulOwner, string displayName, string temperament);
    event WorldStateShifted(uint256 indexed soulId, WorldState worldState);
    event FocusAdjusted(uint256 indexed soulId, uint64 newFocus);
    event CombatLicenseUpdated(uint256 indexed soulId, bool licensed);
    event TranscendenceUpdated(uint256 indexed soulId, bool transcended);

    error NotOwner();
    error NotController();
    error InvalidBirthMonth();
    error SoulAlreadyExists();
    error SoulNotFound();
    error ZeroAddress();
    error FocusUnderflow();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyController() {
        if (msg.sender != controller) revert NotController();
        _;
    }

    constructor() {
        owner = msg.sender;
        controller = msg.sender;
    }

    function setController(address newController) external onlyOwner {
        if (newController == address(0)) revert ZeroAddress();
        controller = newController;
        emit ControllerUpdated(newController);
    }

    function forgeSoul(
        address soulOwner,
        string calldata displayName,
        string calldata temperament,
        uint8 birthMonth,
        bytes32 tokenBoundAccount
    ) external onlyController returns (uint256 soulId) {
        if (soulOwner == address(0)) revert ZeroAddress();
        if (soulIdByOwner[soulOwner] != 0) revert SoulAlreadyExists();
        if (birthMonth < 1 || birthMonth > 12) revert InvalidBirthMonth();

        soulId = ++totalSouls;
        soulsById[soulId] = SoulIdentity({
            soulId: soulId,
            owner: soulOwner,
            displayName: displayName,
            temperament: temperament,
            birthMonth: birthMonth,
            worldState: WorldState.Cool,
            focus: 0,
            tokenBoundAccount: tokenBoundAccount,
            createdAt: uint64(block.timestamp),
            combatLicensed: false,
            transcended: false
        });
        soulIdByOwner[soulOwner] = soulId;

        emit SoulForged(soulId, soulOwner, displayName, temperament);
    }

    function soulExists(address soulOwner) external view returns (bool) {
        return soulIdByOwner[soulOwner] != 0;
    }

    function soulIdOf(address soulOwner) external view returns (uint256) {
        uint256 soulId = soulIdByOwner[soulOwner];
        if (soulId == 0) revert SoulNotFound();
        return soulId;
    }

    function getSoul(uint256 soulId) external view returns (SoulIdentity memory) {
        SoulIdentity memory identity = soulsById[soulId];
        if (identity.owner == address(0)) revert SoulNotFound();
        return identity;
    }

    function getSoulByOwner(address soulOwner) external view returns (SoulIdentity memory) {
        uint256 soulId = soulIdByOwner[soulOwner];
        if (soulId == 0) revert SoulNotFound();
        return soulsById[soulId];
    }

    function shiftWorldState(uint256 soulId, WorldState worldState) external onlyController {
        SoulIdentity storage identity = _requireSoul(soulId);
        identity.worldState = worldState;
        emit WorldStateShifted(soulId, worldState);
    }

    function adjustFocus(uint256 soulId, int64 delta) external onlyController {
        SoulIdentity storage identity = _requireSoul(soulId);

        if (delta >= 0) {
            identity.focus += uint64(delta);
        } else {
            uint64 amount = uint64(-delta);
            if (identity.focus < amount) revert FocusUnderflow();
            identity.focus -= amount;
        }

        emit FocusAdjusted(soulId, identity.focus);
    }

    function setCombatLicense(uint256 soulId, bool licensed) external onlyController {
        SoulIdentity storage identity = _requireSoul(soulId);
        identity.combatLicensed = licensed;
        emit CombatLicenseUpdated(soulId, licensed);
    }

    function setTranscended(uint256 soulId, bool transcended) external onlyController {
        SoulIdentity storage identity = _requireSoul(soulId);
        identity.transcended = transcended;
        emit TranscendenceUpdated(soulId, transcended);
    }

    function _requireSoul(uint256 soulId) internal view returns (SoulIdentity storage identity) {
        identity = soulsById[soulId];
        if (identity.owner == address(0)) revert SoulNotFound();
    }
}
