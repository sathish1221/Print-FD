import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, IconButton, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Element, scroller } from "react-scroll";
import Sidebar from "../component/Sidebar";
import cycleImage from "../assets/cycle day 001.jpg";
import cycleImage1 from "../assets/cycle day 001.jpg";
import cycleImage2 from "../assets/cycle day 002.jpg";
import cycleImage3 from "../assets/cycle day 003.jpg";
import cycleImage4 from "../assets/cycle day 004.jpg";
import cycleImage5 from "../assets/cycle day 005.jpg";
import cycleImage6 from "../assets/cycle day 006.jpg";
import cycleImage7 from "../assets/cycle day 007.jpg";
import cycleImage8 from "../assets/cycle day 008.jpg";
import cycleImage9 from "../assets/cycle day 009.jpg";
import cycleImage10 from "../assets/cycle day 010.jpg";
import yohaImage from "../assets/yoha day 001.jpg";
import yohaImage1 from "../assets/yoha day 001.jpg";
import yohaImage2 from "../assets/yoha day 002.jpg";
import yohaImage3 from "../assets/yoha day 003.jpg";
import yohaImage4 from "../assets/yoha day 004.jpg";
import yohaImage5 from "../assets/yoha day 005.jpg";
import yohaImage6 from "../assets/yoha day 006.jpg";
import yohaImage7 from "../assets/yoha day 007.jpg";
import yohaImage8 from "../assets/yoha day 008.jpg";
import yohaImage9 from "../assets/yoha day 009.jpg";
import yohaImage10 from "../assets/yoha day 010.jpg";
import Status from "../assets/ststus advertisment.png";
import html2canvas from 'html2canvas';


const WorldBicycleDay = () => {
  const [mainImage, setMainImage] = useState(cycleImage);
  const [mainImage2, setMainImage2] = useState(yohaImage);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const handleResize = () => {
    setSlidesToShow(window.innerWidth < 600 ? 1 : 4);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = (newImage) => {
    setMainImage(newImage);
  };

  const handleImageClick2 = (newImage2) => {
    setMainImage2(newImage2);
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const handleNextSlide = () => {
    if (sliderIndex < smallImages.length - slidesToShow) {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };
  const downloadImage = async () => {
    const canvas = await html2canvas(document.getElementById('combined-image'));
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
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


  const smallImages = [
    cycleImage1,
    cycleImage2,
    cycleImage3,
    cycleImage4,
    cycleImage5,
    cycleImage6,
    cycleImage7,
    cycleImage8,
    cycleImage9,
    cycleImage10,
  ];

  const smallImages2 = [
    yohaImage1,
    yohaImage2,
    yohaImage3,
    yohaImage4,
    yohaImage5,
    yohaImage6,
    yohaImage7,
    yohaImage8,
    yohaImage9,
    yohaImage10,
  ];

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
              padding-left: 250px;
            }
          }
        `}
      </style>

      <div className="yoga-section">
        <Element name="cycle-section">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 3,
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#A6787A",
            }}
          >
             <Card
              id="combined-image"
              sx={{
                width: { xs: '100%', sm: 300 },
                height: { xs: 300, sm: 550 },
                marginTop: '-20px',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                alt="pongal"
                image={mainImage}
                title="yoha"
                sx={{
                  width: '100%',
                  height: {
                    xs: 300,
                    sm: 400,
                    md: 500,
                    lg: 550,
                    xl: 600,
                  },
                  objectFit: 'cover',
                }}
              />
              <CardMedia
                component="img"
                alt="Kantha Jewellers"
                image={Status}
                title="Kantha Jewellers"
                sx={{
                  width: '100%',
                  height: '75%',
                  objectFit: 'contain',
                  position: 'absolute',
                  bottom: -5,
                }}
              />
            </Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: { xs: "100%", sm: 300 },
              }}
            >
             <IconButton sx={{ color: 'black' }} aria-label="download" onClick={downloadImage}>
                <DownloadIcon />
              </IconButton>
              <IconButton sx={{ color: 'green' }} aria-label="share" onClick={shareOnWhatsApp}>
                <WhatsAppIcon />
              </IconButton>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 2,
              }}
            >
              <IconButton
                onClick={handlePrevSlide}
                disabled={sliderIndex === 0}
                sx={{ fontSize: 30 }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 60 }} />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  width: "80%",
                  justifyContent: "center",
                }}
              >
                {smallImages
                  .slice(sliderIndex, sliderIndex + slidesToShow)
                  .map((smallImage, index) => (
                    <Card
                      key={index}
                      sx={{
                        width: 200,
                        height: 270,
                        margin: 1,
                        cursor: "pointer",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={`small-image-${index}`}
                        image={smallImage}
                        title={`small-image-${index}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onClick={() => handleImageClick(smallImage)}
                      />
                    </Card>
                  ))}
              </Box>
              <IconButton
                onClick={handleNextSlide}
                disabled={sliderIndex >= smallImages.length - slidesToShow}
                sx={{ fontSize: 30 }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
              </IconButton>
            </Box>
          </Box>
        </Element>
      </div>
    </>
  );
};

export default WorldBicycleDay;
