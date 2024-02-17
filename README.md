# Avax Frontend (WishBank)

## Contract Overview

This Contract is a simple secret contract that allows people make a wish and get it on the blockchain. It can also show the address of the whoever made it. People can help fulfil the last person's wish if they can, and then make theirs.

## Contract Details

### checkWisher()

This function returns th address of whoever made the last wish

### makeNewWish(string memory _secret)

Allows the user set any secret wish

### showWish()

A function that returns the last updated wish.

## Frontend Integration

A UI was built to display and interact with the contract using React.js and Ethers.

`To run the Frontend`

```zsh
   cd ui-frontend

   # Install dependencies
   yarn

   # Run Server
   yarn dev
```

After this, the project will be running on your localhost. Typically at http://localhost:5173/