# My Token Contract

- **Name:** Bolu Token
- **Symbol:** BTK

## Contract Overview

This is an ERC-20 called `BoluToken` with symbol `BTK`. The Contract inherits OpenZeppelin ERC20 standard, with extra implementation to mint, burn and transfer.

## Contract Details

### Constructor

During Constructor time, The ERC-20 token name and symbol is set. Also the deployer become the owner of the contract.

### mint

The mint function allows new tokens to be generated and sent to a specified address. This function can only be called by the contract owner.

### transfer

Allows holders of the token to transfer an amount of the token to another address provided that their balance is greater than that amount.

### burn

This function allows the holders to burn a specified amount, hence erasing it from the total supply. Holders must have sufficient amount to burn