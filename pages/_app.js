import '../styles/globals.css'
import '../styles/Home.module.css'
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import Image from "next/image";
import logo  from "../public/images/logo.png";
import React, { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Web3 Browswer Detection
    if (typeof window.ethereum !== "undefined") {
      console.log("Injected Web3 Wallet is installed!");
    }

    //Button ID
    const connectButton = document.getElementById("connect");

    //Click Event
    connectButton.addEventListener("click", () => {
      connectAccount();
    });

    //Connect Account Function
    async function connectAccount() {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      connectButton.innerHTML =
        account[0] +
        account[1] +
        account[2] +
        account[3] +
        account[4] +
        account[5] +
        "..." +
        account[38] +
        account[39] +
        account[40] +
        account[41];
    }
  }, []);
  return (
    <div style={{
      backgroundColor: 'gray'
      
    }}> 
      <nav className="border-b p-6">
        {/* <p className="text-4xl font-bold">Metaverse Marketplace</p> */}
        <div className="container flex flex-wrap items-right justify-between mx-auto">
        <a href="#" className="flex">
            <Image
              className="m-2 w-20 sm:w-40 self-center"
              src={logo}
              width="160"
              height="60"
            />
          </a>
        
        <div className="hidden w-full md:block md:w-auto">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">    
          <Link href="/">
            <a className="block py-2 pl-3 pr-4 text-2xl font-bold text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
              Home
            </a>
          </Link>
          <Link href="/mint">
            <a className="block py-2 pl-3 pr-4 text-2xl font-bold text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
              Mint
            </a>
          </Link>
          <Link href="/my-assets">
            <a className="block py-2 pl-3 pr-4 text-2xl font-bold text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
              Doc
            </a>
          </Link>
          {/* <Link href="/creator-dashboard">
            <a className="block py-2 pl-3 pr-4 text-2xl font-bold text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
              Wallet
            </a>
          </Link> */}
           
      
      <button className={styles.connect} id="connect">
        Connect Wallet
      </button>
   
         </ul>
         </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
