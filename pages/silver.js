import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import Image from "next/image";
import silver from "../public/images/silver.png";


export default function Gold() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        
      <Grid container spacing={2} justify="center">
        <a className="block py-6 pl-3 pr-6 text-2xl font-bold">
            Click on MINT to generate your NFT
        </a>
        </Grid>
        <br></br>
        <Grid container spacing={2}>
        <Grid item xs={4}>
        <a href="#" className="flex" display="inline-block" width="25%">
          <Image 
              className="m-2 w-20 sm:w-40 self-center"
              src={silver}
              width="280"
              height="340"
              
            />
        
          </a>
          </Grid>
          <Grid item xs={6}>
          <a className="block py-6 pl-3 pr-6 font-bold">
            COLLECTION: BOOST GENESI
            <p>NAME: SILVER </p>
            <p>PRICE: 0,07BNB</p>
            <p>NUMERO MINT: 150 OF 300</p>
            <p>SELL : NO </p>
            <p>BURN : YES </p>
            <br></br>
            <p>FEATURES: </p>
            <p>THIS NFT GIVES A 10% BOOST ON EARNINGS </p>
            <p>FROM STAKING, FOLLOW THE DIRECTIONS AT </p>
            <p>www.StakeCollection.com/Stacking</p>
            <p>Usable on all offers that adhere to this Collection</p>
          </a>
          </Grid>
          </Grid>    
        <div className="w-1/2 flex flex-col pb-12">
        
        </div>
        <div className="flex flex-col pb-12">
        <a className="block pr-12 text-white">
        PLEASE BE CAREFUL THAT YOU ARE CONNECTED TO THE RIGHT NETWORK (BSC) AND HAVE ENOUGH BNB TO MAKE THE TRANSACTION.
WHEN THE TRANSACTION IS GENERATED A HASH CODE WILL BE SENT TO YOU, CHECK IT ON THE BSCSCAN TO BE ABLE TO ENTER IT IN YOUR WALLET.
IT IS POSSIBLE TO MINT A MAXIMUM OF 3 NFT OF THIS COLLECTION PER WALLET. THANK YOU FOR TRUSTING AND SUPPORTING US.
FOLLOW US ON OUR SOCIALS FOR NEWS AND FUTURE RELEASES.

        </a>
        </div>
      </div>
    </div>
  )
}