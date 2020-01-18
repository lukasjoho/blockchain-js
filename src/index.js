import React from "react"
import ReactDOM from "react-dom"
const SHA256 = require("crypto-js/sha256");
class Block extends React.Component{
    constructor(props, timestamp, data, previousHash = ''){
         super(props);
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    

    mineBlock(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
            let hashvar = this.hash;
            console.log(hashvar);
        }
        
        console.log("BLOCK MINED: " + this.hash);
    }
    
}

class Blockchain extends React.Component{
    constructor(props){
        super(props);
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }
    createGenesisBlock(){
        return new Block ("01/01/2017", "Genesis block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1 ];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        // newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        if(this.chain[0] !== this.createGenesisBlock()){
            return true;
        }

        return true;
    }
    render(){
        return(
            <div>
                <p>{JSON.stringify(johoCoin, null, 4)}</p>
                <h1>{johoCoin.isChainValid()}</h1>
            </div>
        );    
    }
}

let johoCoin = new Blockchain();
console.log("Mining block 1...");
johoCoin.addBlock(new Block(1, "01/02/2020", { amount: 4 }));
console.log("Mining block 2...");
johoCoin.addBlock(new Block(2, "01/02/2020", { amount: 4 }));
console.log("Mining block 3...");
johoCoin.addBlock(new Block(3, "01/02/2020", { amount: 4 }));


console.log(JSON.stringify(johoCoin, null, 4));
console.log("Blockhain valid?: " + johoCoin.isChainValid());
