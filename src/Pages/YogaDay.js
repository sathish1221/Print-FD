import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, IconButton, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Element } from "react-scroll";
import Sidebar from "../component/Sidebar";
import Status from "../assets/ststus advertisment.png";
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import Axios from '../Axios'; // Make sure Axios is properly configured

const YogaDay = () => {
  const [imagesData, setImagesData] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useLocation().state || {};
  const [error, seterror] = useState();

  const slidesToShow = 3;
  const centerIndex = Math.floor(slidesToShow / 2);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(`event-designs/${id}`);
        console.log("API Response:", response.data);
      
      if (response.data.images && response.data.images.length > 0) {
          setImagesData(response.data.images); 
        } 
        else if(response.data.status==='failed'){
          alert("No Data Found");
          setImagesData([]);
          const error =()=>{
            seterror(response.data.message);
          }
        }
      else {
          alert("No Data Found");
          console.log("No image data found.");
        }
        setLoading(false);
      } catch (error) {
        console.log("No Data Found",error);
        setLoading(false);
      }
    };

    if (id) {
      fetchImages();
    }
  }, [id]);

  const handleNextSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex - 1 + imagesData.length) % imagesData.length);
  };

  const downloadImage = async () => {
    const element = document.getElementById('combined-image');
    const canvas = await html2canvas(element, { scale: 10 }); // Increase scale for better quality
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0); // Ensure the image quality is maxed out
    link.download = 'combined-image.png';
    link.click();
  };

  const shareOnWhatsApp = async () => {
    const canvas = await html2canvas(document.getElementById('combined-image'));
    const imageUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(imageUrl)).blob();
    const url = URL.createObjectURL(blob);

    const message = `Check out this image: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  const duplicatedImages = [...imagesData, ...imagesData];

  return (
    <>
      <Sidebar />
      <style>
        {`
          .yoga-section {
            padding-left: 0px;
            padding-top: -600px;
          }
          @media (min-width: 450px) {
            .yoga-section {
              padding-left: 240px;
            }
          }
        `}
      </style>

      <div className="yoga-section">
        <Element name="yoga-section">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: 3,
              flexDirection: 'column',
              backgroundColor: '#A6787A',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
              }}
            >
              <IconButton
                onClick={handlePrevSlide}
                sx={{ fontSize: 30 }}
              >
                <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 60 }} />
              </IconButton>
              <Box
                sx={{
                  display: 'flex',
                  overflow: 'hidden',
                  width: '100%',
                  justifyContent: 'center',
                  gap: 5, // Ensure equal gap between each image
                }}
              >
                {duplicatedImages.slice(sliderIndex, sliderIndex + slidesToShow).map((base64Image, index) => {
                  const isCenter = index === centerIndex;
                  return (
                    <Box key={index}>
                      <Card
                        id={ isCenter ? "combined-image" : "" }
                        sx={{
                          marginTop: '80px',
                          position: 'relative',
                          borderRadius: '16px',
                          transition: 'all 0.3s ease-in-out',
                          transform: isCenter ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt="main image"
                          src={`data:image/png;base64,${base64Image}`}
                          title="main image"
                          sx={{
                            width: '200px',
                            height: isCenter ? 400 : 350, // Conditional size based on center
                            objectFit: 'cover',
                            borderRadius: '16px',
                          }}
                        />
                        <CardMedia
                          component="img"
                          alt="status image"
                          image={Status}
                          title="status image"
                          sx={{
                            width: '100%',
                            height: '85%',
                            objectFit: 'contain',
                            position: 'absolute',
                            bottom: -2,
                          }}
                        />
                      </Card>
                      {isCenter && (
                        <CardContent
                          sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            gap: 2,
                            marginTop: 1,
                          }}
                        >
                          <IconButton sx={{ color: '#850000' }} aria-label="download" onClick={downloadImage}>
                            <DownloadIcon />
                          </IconButton>
                          {/* <IconButton sx={{ color: 'green' }} aria-label="share" onClick={shareOnWhatsApp}>
                            <WhatsAppIcon />
                          </IconButton> */}
                        </CardContent>
                      )}
                    </Box>
                  );
                })}
              </Box>
              <IconButton
                onClick={handleNextSlide}
                sx={{ fontSize: 30 }}
              >
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: 60 }} />
              </IconButton>
            </Box>
            {/* <div style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                sx={{
                  width: "70%",
                  background: "#fff",
                  borderRadius: "30px",
                }}
                startIcon={<GridViewIcon />}
                endIcon={<KeyboardDoubleArrowDownIcon
                  sx={{
                    textAlign: 'center',
                    alignItems: 'center'
                  }} />}
              > */}
                {/* <Link to='/viewmore' state={id}> */}
                  {/* More Designs */}
                {/* </Link> */}
              {/* </Button> */}
            {/* </div> */}
          </Box>
        </Element>
      </div>
    </>
  );
};

export default YogaDay;
