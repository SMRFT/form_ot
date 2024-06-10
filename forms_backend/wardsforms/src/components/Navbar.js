import React from 'react';
import styled from 'styled-components';
import Logo from '../images/shanmuga-hospital-logo.jpg';

const Container = styled.div`
  display: flex;
  height: 100vh; /* Set the height of the parent container to 100% of the viewport height */
`;

const SidebarContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  position: fixed; /* Set the position to fixed */
  @media (max-width: 767px) {
    width: 100%; /* For mobile view, set the width to 100% */
    height: auto; /* For mobile view, set the height to auto */
    padding: 10px; /* Adjust padding for mobile view */
  }
`;

const LogoImage = styled.img`
  width: 180px; /* Set the width to auto to maintain aspect ratio */
  height: 80px; /* Adjust the height of the logo image */
  margin-top: -20px;
  margin-left: -12px;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <div className="nav flex-column">
        <div>
          <LogoImage src={Logo} alt="shanmuga-hospital-logo" />
        </div>
        <li className="nav-item">
          <a className="nav-link" href="#">Report</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Availability</a>
        </li>
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;