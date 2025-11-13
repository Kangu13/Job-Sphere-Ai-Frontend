import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HomePage/HeroSection';
import Feature_1 from '../components/HomePage/Feature_1';
import Feature_2 from '../components/HomePage/Feature_2';
import Feature_3 from '../components/HomePage/Feature_3';
import Feature_4 from '../components/HomePage/Feature_4';
import Feature_5 from '../components/HomePage/Feature_5';
import ContactUs from '../components/HomePage/ContactUs';
import Footer from '../components/Footer/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Feature_1 />
      <Feature_2 />
      <Feature_3 />
      <Feature_4 />
      <Feature_5 />
      <ContactUs />
      <Footer />
    </>
  );
}

export default HomePage;

