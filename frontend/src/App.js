import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom';

import './App.scss';
import './resources/fonts/Lato-Regular.ttf';
import './resources/fonts/Lato-Light.ttf';
import './resources/fonts/Lato-Bold.ttf';

import AboutUs from './pages/aboutUs/AboutUs';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy';
import TermsAndConditions from './pages/termsAndConditions/TermsAndConditions';
import PageNotFound from './pages/pageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/about-us' exact element={<AboutUs />} />
          <Route path='/privacy-policy' exact element={<PrivacyPolicy />} />
          <Route path='/terms-and-conditions' exact element={<TermsAndConditions />} />
          <Route path='*' exact element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
