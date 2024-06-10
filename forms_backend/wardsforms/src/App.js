import React from 'react';

import Sidebar from './components/Navbar';
import styled from 'styled-components';
import SICUForm from './components/SICU';
import RecoveryWardForm from './components/Recovery ward';
import NICUForm from './components/NICU';
import ChemoWardForm from './components/chemo ward';
import Physiotherapy from './components/Physiotherapy';
import Dialysis from './components/Dialysis';
import ER from './components/ER';
import FirstFloor from './components/FirstFloor';
import Lab from './components/Lab';
import Ct from './components/CT';
import MRI from './components/MRI';
import XRay from './components/X-RAY';
import SecondFloor from './components/Secondfloor';
import MICUForm from './components/MICU';
import Frontoffice from './components/Frontoffice';
import OTForm from './components/OT';
import Thirdfloor from './components/Thirdfloor';
// import MICUForm from './components/MICU';
// import OTForm from './components/OT';
import MRD from './components/MRD';
import Firstsuit from './components/1stsuit';
import Secondsuit from './components/2stsuit';
const ContentContainer = styled.div`
  flex: 1; /* Take up remaining space */
  padding: 20px;
`;

function App() {
  return (
    <div className="App">
      <Sidebar />
      <ContentContainer>
        {/* <SICUForm/> */}
        {/* <OTForm/> */}
        {/* <MICUForm/> */}
        <RecoveryWardForm/>
     {/* <MRD/> */}
     {/* <Firstsuit/> */}
     {/* <Secondsuit/> */}
        {/* <NICUForm/> */}
        {/* <ChemoWardForm/> */}
        {/* <Physiotherapy/> */}
        {/* <Dialysis/> */}
     {/* <ER/> */}
     {/* <FirstFloor/> */}
     {/* <Lab/> */}
     {/* <Ct/> */}
     {/* <MRI/> */}
     {/* <XRay/> */}
     {/* <SecondFloor/> */}
     {/* <Frontoffice/> */}
     {/* <Thirdfloor/> */}
      </ContentContainer>
    </div>
  );
}

export default App;
