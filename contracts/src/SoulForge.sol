// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SoulForge {
    struct AvatarProfile {
        address owner;
        string temperament;
        string archetype;
        uint64 mintedAt;
    }

    uint256 public nextAvatarId = 1;

    mapping(uint256 => AvatarProfile) private avatars;

    event AvatarMinted(uint256 indexed avatarId, address indexed owner, string temperament, string archetype);

    function mintAvatar(string calldata temperament, string calldata archetype) external returns (uint256 avatarId) {
        avatarId = nextAvatarId++;
        avatars[avatarId] = AvatarProfile({
            owner: msg.sender,
            temperament: temperament,
            archetype: archetype,
            mintedAt: uint64(block.timestamp)
        });

        emit AvatarMinted(avatarId, msg.sender, temperament, archetype);
    }

    function ownerOf(uint256 avatarId) external view returns (address) {
        return avatars[avatarId].owner;
    }

    function getAvatar(uint256 avatarId) external view returns (AvatarProfile memory) {
        return avatars[avatarId];
    }
}
