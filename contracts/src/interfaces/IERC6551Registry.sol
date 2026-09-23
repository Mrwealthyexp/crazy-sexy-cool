// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IERC6551Registry
 * @dev ERC6551 Registry interface
 */
interface IERC6551Registry {
    /**
     * @notice Creates a token-bound account for the provided NFT and salt.
     * @param implementation ERC-6551 account implementation contract address.
     * @param chainId Chain where the bound NFT exists.
     * @param tokenContract NFT contract bound to the account.
     * @param tokenId NFT token id bound to the account.
     * @param salt Deterministic salt used to derive the account address.
     * @param initData Optional calldata forwarded to the account after deployment.
     * @return accountAddress The created or predicted token-bound account address.
     */
    function createAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt,
        bytes calldata initData
    ) external returns (address accountAddress);

    /**
     * @notice Computes the token-bound account address for the provided NFT and salt.
     * @param implementation ERC-6551 account implementation contract address.
     * @param chainId Chain where the bound NFT exists.
     * @param tokenContract NFT contract bound to the account.
     * @param tokenId NFT token id bound to the account.
     * @param salt Deterministic salt used to derive the account address.
     * @return accountAddress The deterministic token-bound account address.
     */
    function account(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    ) external view returns (address accountAddress);
}
