// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IERC6551Registry.sol";

contract SoulForge is ERC721, ERC721Enumerable, Ownable, ReentrancyGuard {
    struct SoulBlueprint {
        uint8 sex;
        uint8 birthMonth;
        uint8 rulingPlanet;
        uint8 moonPhase;
        uint8 temperament;
        bytes32 mitochondrialSeed;
        uint256 karmicDebt;
        uint256 birthTimestamp;
    }

    mapping(uint256 => SoulBlueprint) public souls;
    mapping(uint256 => address) public tokenBoundAccounts;
    mapping(address => uint256) public walletToSoul;

    IERC6551Registry public registry;
    address public accountImplementation;

    uint256 private _tokenIdCounter;
    uint256 public constant MINT_COST = 0.01 ether;

    event SoulForged(uint256 indexed soulId, address indexed owner, uint8 rulingPlanet);
    event TokenBoundAccountCreated(uint256 indexed soulId, address indexed account);

    constructor(address _registry, address _accountImplementation)
        ERC721("CrazySexyCool Soul", "CSCSOUL")
        Ownable(msg.sender)
    {
        registry = IERC6551Registry(_registry);
        accountImplementation = _accountImplementation;
    }

    function forgeSoul(
        uint8 _sex,
        uint8 _birthMonth,
        uint8 _moonPhase,
        uint8 _temperament
    ) external payable nonReentrant returns (uint256 soulId) {
        require(msg.value >= MINT_COST, "Insufficient payment");
        require(_sex <= 2, "Invalid sex");
        require(_birthMonth >= 1 && _birthMonth <= 12, "Invalid month");
        require(_moonPhase <= 4, "Invalid moon phase");
        require(_temperament <= 3, "Invalid temperament");
        require(walletToSoul[msg.sender] == 0, "Wallet already has soul");

        uint256 entropy = uint256(keccak256(abi.encodePacked(
            msg.sender,
            block.timestamp,
            block.prevrandao,
            _tokenIdCounter
        )));

        uint8 rulingPlanet = uint8(entropy % 10);
        bytes32 mitoSeed = keccak256(abi.encodePacked(entropy, block.number));
        uint256 karmicDebt = calculateKarmicDebt(msg.sender);

        soulId = ++_tokenIdCounter;

        souls[soulId] = SoulBlueprint({
            sex: _sex,
            birthMonth: _birthMonth,
            rulingPlanet: rulingPlanet,
            moonPhase: _moonPhase,
            temperament: _temperament,
            mitochondrialSeed: mitoSeed,
            karmicDebt: karmicDebt,
            birthTimestamp: block.timestamp
        });

        _safeMint(msg.sender, soulId);
        walletToSoul[msg.sender] = soulId;

        createTokenBoundAccount(soulId);

        emit SoulForged(soulId, msg.sender, rulingPlanet);
    }

    function createTokenBoundAccount(uint256 soulId) internal {
        bytes32 salt = keccak256(abi.encodePacked(soulId));
        address tba = registry.createAccount(
            accountImplementation,
            block.chainid,
            address(this),
            soulId,
            uint256(salt),
            ""
        );

        tokenBoundAccounts[soulId] = tba;
        emit TokenBoundAccountCreated(soulId, tba);
    }

    function getTokenBoundAccount(uint256 soulId) external view returns (address) {
        return tokenBoundAccounts[soulId];
    }

    function calculateKarmicDebt(address wallet) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(wallet))) % 10000;
    }

    function getSoulBlueprint(uint256 soulId) external view returns (SoulBlueprint memory) {
        require(_ownerOf(soulId) != address(0), "Soul does not exist");
        return souls[soulId];
    }

    function getSoulByWallet(address wallet) external view returns (uint256) {
        return walletToSoul[wallet];
    }

    function getTotalSouls() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
