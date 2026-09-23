// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import {CoolToken} from "../src/CoolToken.sol";

contract Deploy is Script {
    function run() public returns (CoolToken token) {
        uint256 deployerPrivateKey = vm.envOr("PRIVATE_KEY", uint256(0));
        address broadcaster = deployerPrivateKey != 0 ? vm.addr(deployerPrivateKey) : msg.sender;
        address owner = vm.envOr("COOL_OWNER", broadcaster);
        address treasury = vm.envOr("COOL_TREASURY", broadcaster);
        uint256 initialSupply = vm.envOr("COOL_INITIAL_SUPPLY", 100_000_000 ether);
        uint256 maxSupply = vm.envOr("COOL_MAX_SUPPLY", 1_000_000_000 ether);

        if (deployerPrivateKey != 0) {
            vm.startBroadcast(deployerPrivateKey);
        } else {
            vm.startBroadcast();
        }

        token = new CoolToken(owner, treasury, initialSupply, maxSupply);

        vm.stopBroadcast();

        console2.log("COOL token deployed at:", address(token));
        console2.log("owner:", owner);
        console2.log("treasury:", treasury);
        console2.log("initialSupply:", initialSupply);
        console2.log("maxSupply:", maxSupply);
    }
}
