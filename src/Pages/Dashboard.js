import React, { useState } from 'react';
import { Card, CardMedia, CardContent, IconButton, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ForwardIcon from '@mui/icons-material/Forward';
import diwaliImage from '../assets/img8.jpg';
import smallImage1 from '../assets/img10.jpg';
import smallImage2 from '../assets/img11.jpg';
import smallImage3 from '../assets/img12.jpg';
import smallImage4 from '../assets/img13.jpg';
import pongalImage from "../assets/pongal ststus 1.png"
import pongalImage1 from '../assets/pongal ststus 2.png';
import pongalImage2 from '../assets/pongal ststus 3.png';
import pongalImage3 from '../assets/pongal ststus 4.png';
import pongalImage5 from '../assets/pongal ststus 5.png';
import pongalImage6 from '../assets/pongal ststus 6.png';
import Sidebar from '../component/Sidebar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Element, scroller } from 'react-scroll';
import Status from "../assets/ststus advertisment.png";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Dashbaord = () => {
  const [mainImage, setMainImage] = useState(diwaliImage);
  const [mainImage2, setMainImage2] = useState(pongalImage);
  // const [showTextImage, setShowTextImage] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);


  const handleImageClick = (newImage) => {
    setMainImage(newImage);
    // setShowTextImage(false);
  };

  const handleImageClick2 = (newImage2) => {
    setMainImage2(newImage2);
    // setShowTextImage(true);
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };



  const handleNextSlide = () => {
    if (sliderIndex < smallImages2.length - 4) {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const smallImages = [smallImage1, smallImage2, smallImage3, smallImage4];
  const smallImages2 = [pongalImage1, pongalImage2, pongalImage3, pongalImage5, pongalImage6];

  return (
    <>
      <Sidebar scrollToSection={scrollToSection} />
     
    </>
  );
};

export default Dashbaord;
