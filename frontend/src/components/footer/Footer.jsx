import React from 'react'
import {useNavigate} from 'react-router-dom';
import "./footer.scss"
import fbIcon from "../../resources/images/fbIcon.svg";
import igIcon from "../../resources/images/igIcon.svg";
import twIcon from "../../resources/images/twIcon.svg";
import IconButton from '../iconButton/IconButton';

const Footer = () => {
  let navigate = useNavigate();

  return (
    <div className='footer'>
        <div className='inner-footer'>
                <ul title='AUCTION'>
                    <li className='clicked' onClick={ () => {navigate(`/about-us`)}}>About Us</li>
                    <li className='clicked' onClick={ () => {navigate(`/terms-and-conditions`)}}>Terms and Conditions</li>
                    <li className='clicked' onClick={ () => {navigate(`/privacy-policy`)}}>Privacy and Policy</li>
                </ul>
                <ul title='GET IN TOUCH'>
                    <li>Call us at +123 797-567-2535</li>
                    <li>support@auction.com</li>
                    <li>
                        <IconButton imageUrl={fbIcon} websiteUrl={"https://www.facebook.com/"}/>
                        <IconButton imageUrl={igIcon} websiteUrl={"https://www.instagram.com/"}/>
                        <IconButton imageUrl={twIcon} websiteUrl={"https://www.twitter.com/"}/>
                    </li>
                </ul>
        </div>
    </div>
  )
}

export default Footer