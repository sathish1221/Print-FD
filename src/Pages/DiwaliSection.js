// DiwaliSection.js
import React, { useState } from 'react';
import { Card, CardMedia, CardContent, IconButton, Box, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import diwaliImage from '../assets/img8.jpg';
import smallImage1 from '../assets/img10.jpg';
import smallImage2 from '../assets/img11.jpg';
import smallImage3 from '../assets/img12.jpg';
import smallImage4 from '../assets/img13.jpg';

const DiwaliSection = () => {
  const [mainImage, setMainImage] = useState(diwaliImage);

  const handleImageClick = (newImage) => {
    setMainImage(newImage);
  };

  const smallImages = [smallImage1, smallImage2, smallImage3, smallImage4];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3, flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 600, marginTop: '-20px' }}>
        <CardMedia
          component="img"
          alt="Diwali"
          image={mainImage}
          title="Diwali"
          sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
      <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
        {smallImages.map((smallImage, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card sx={{ width: '100%', cursor: 'pointer' }}>
              <CardMedia
                component="img"
                alt={`small-image-${index}`}
                image={smallImage}
                title={`small-image-${index}`}
                sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                onClick={() => handleImageClick(smallImage)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiwaliSection;
