import React from 'react'
import {useNavigate} from 'react-router-dom';
import "./pageNotFound.scss";
import appLogo from "../../resources/images/appLogo.svg";
import BlackNavbar from '../../components/blackNavbar/BlackNavbar';
import Footer from "../../components/footer/Footer";
import Button from '../../components/button/Button';

function PageNotFound() {
  let navigate = useNavigate();
  const onBtnClick = () => {
    navigate(-1);
  }

  return (
    <div className='page-not-found'>
        <BlackNavbar username={"John Doe"}/>
        <img className='logo' src={appLogo}/>
        <div className='error'>404</div>
        <div className='text'>Oops! Looks like the page is Not Found.</div>
        <div className='btn-go-back'>
          <Button type="secondary" text="GO BACK" onBtnClick={onBtnClick}/>
        </div>
        <Footer/>
    </div>
  )
}

export default PageNotFound