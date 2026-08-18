// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();
        
        // Deploy contracts here
        
        vm.stopBroadcast();
    }
}
