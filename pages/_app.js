import '../styles/globals.css'
import Link from 'next/link'
import Image from "next/image";
import logo  from "../public/images/logo.png";

function MyApp({ Component, pageProps }) {
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
          <Link href="/creator-dashboard">
            <a className="block py-2 pl-3 pr-4 text-2xl font-bold text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
              Wallet
            </a>
          </Link>
         </ul>
         </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
