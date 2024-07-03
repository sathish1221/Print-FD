// PongalSection.js
import React, { useState } from 'react';
import { Card, CardMedia, CardContent, IconButton, Box, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import pongalImage from "../assets/pongal ststus 1.png";
import pongalImage1 from '../assets/pongal ststus 2.png';
import pongalImage2 from '../assets/pongal ststus 3.png';
import pongalImage3 from '../assets/pongal ststus 4.png';
import pongalImage5 from '../assets/pongal ststus 5.png';
import pongalImage6 from '../assets/pongal ststus 6.png';
import Status from "../assets/ststus advertisment.png";

const PongalSection = () => {
  const [mainImage2, setMainImage2] = useState(pongalImage);
  const [sliderIndex, setSliderIndex] = useState(0);

  const handleImageClick2 = (newImage2) => {
    setMainImage2(newImage2);
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

  const smallImages2 = [pongalImage1, pongalImage2, pongalImage3, pongalImage5, pongalImage6];

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', padding: 3, flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
      <Card sx={{ width: '100%', maxWidth: 600, position: 'relative', marginTop: '-20px' }}>
        <CardMedia
          component="img"
          alt="pongal"
          image={mainImage2}
          title="pongal"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
        <CardMedia
          component="img"
          alt="Kantha Jewellers"
          image={Status}
          title="Kantha Jewellers"
          sx={{ width: '100%', height: '50%', objectFit: 'contain', position: 'absolute', bottom: 0 }}
        />
      </Card>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
        <IconButton sx={{ color: "black" }} aria-label="download">
          <DownloadIcon />
        </IconButton>
        <IconButton sx={{ color: "green" }} aria-label="share">
          <WhatsAppIcon />
        </IconButton>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, width: '100%', maxWidth: 600 }}>
        <IconButton onClick={handlePrevSlide} disabled={sliderIndex === 0}>
          <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Grid container spacing={2} sx={{ overflowX: 'hidden' }}>
          {smallImages2.slice(sliderIndex, sliderIndex + 4).map((smallImage2, index2) => (
            <Grid item xs={6} sm={4} md={3} key={index2}>
              <Card sx={{ width: '100%', cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  alt={`small-images-${index2}`}
                  image={smallImage2}
                  title={`small-images-${index2}`}
                  sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  onClick={() => handleImageClick2(smallImage2)}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <IconButton onClick={handleNextSlide} disabled={sliderIndex >= smallImages2.length - 4}>
          <ArrowForwardIosIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PongalSection;
