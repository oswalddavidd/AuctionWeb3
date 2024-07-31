import React, { useEffect, useState } from 'react'
import './Navbar.css'
import metamaskLogo from '../../assets/MetamaskLogo.png'
import logo from '../../assets/BLOCKBIDDERLANDSCAPE.png'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom';

const NAV__LINKS = [
{
    display: 'Home',
    url: '/home'
},
{
    display: 'Market',
    url: '/market'
},
]


const Navbar = () => {

    const [sticky, setSticky] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [isRequestPending, setIsRequestPending] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 500 ? setSticky(true) : setSticky(false);
        })
    }, [])

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            if (isRequestPending) {
                console.log("Please wait for the current request to complete.");
                return;
            }

            setIsRequestPending(true);
            try {
                // Metamask is installed
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                if(window.ethereum){
                    console.log(await window.ethereum.enable());
                }
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    console.log(accounts[0]);
                }
                else {
                    console.log("Connect to Metamask using the Connect button")
                }
            } catch (err) {
                console.error(err.message);
            }
            finally {
                setIsRequestPending(false);
            }
        } else {
            // Metamask is not installed
            console.log("Please install Metamask");
        }
    };

    return (
        <nav className={`containerNavBar ${sticky ? 'dark-nav' : ''}`}>
            <img src={logo} alt="" className='logo' />
            <ul>
                <li><Link to='hero' smooth={true} offset={0} duration={500}> Home </Link></li>
                <li><Link to='product' smooth={true} offset={0} duration={500}> Market </Link></li>
                <li><Link to='contact' smooth={true} offset={0} duration={500}> Contact Us </Link></li>
                <li><button onClick={connectWallet} className='btn btn-light'>
                        <span className='is-link has-text-weight-bold'>
                            {walletAddress.length > 0 ? `Connected: ${walletAddress.substring(
                                0,
                                6)}...${walletAddress.substring(38)}`
                                : "Connect Wallet"}
                        </span>
                    </button>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar
