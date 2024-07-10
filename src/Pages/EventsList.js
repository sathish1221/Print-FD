import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, IconButton, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Element } from "react-scroll";
import Sidebar from "../component/Sidebar";
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import Axios from '../Axios'; // Make sure Axios is properly configured

const EventList = () => {
  const [imagesData, setImagesData] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useLocation().state || {};
  const [error, setError] = useState(null);

  const slidesToShow = 3;
  const centerIndex = Math.floor(slidesToShow / 2);

  useEffect(() => {
    const fetchImages = async (eventId) => {
      try {
        setLoading(true);
        const response = await Axios.get(`event-designs/${eventId}`);
        console.log("API Response:", response.data);
        
        if (response.data.images && response.data.images.length > 0) {
          setImagesData(response.data.images);
        } else if(response.data.status === 'failed'){
          alert("No Data Found");
          setImagesData([]);
          setError(response.data.message);
        } else {
          alert("No Data Found");
          console.log("No image data found.");
        }
        setLoading(false);
      } catch (error) {
        console.log("No Data Found", error);
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const userResponse = await Axios.get('auth/me');
        setCompanyLogo(userResponse.data.company_logo);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    const fetchFirstEventAfterCurrentDate = async () => {
      try {
        const response = await Axios.get("/events");
        const currentDate = new Date();
        
        const upcomingEvents = response.data.events.filter(event => new Date(event.event_date) > currentDate);
    
        // Sort the upcoming events by date in ascending order
        upcomingEvents.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    
        console.log('Sorted upcoming events:', upcomingEvents);
    
        if (upcomingEvents.length > 0) {
          const firstUpcomingEventId = upcomingEvents[0].id;
          await fetchImages(firstUpcomingEventId);
        } else {
          console.log("No upcoming events found.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };


    if (id) {
      fetchImages(id);
    } else {
      fetchFirstEventAfterCurrentDate();
    }

    fetchUserData();
  }, [id]);

  const handleNextSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex - 1 + imagesData.length) % imagesData.length);
  };

  const downloadImage = async () => {
    const element = document.getElementById('combined-image');
    const canvas = await html2canvas(element, { scale: 15 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0);
    link.download = 'combined-image.png';
    link.click();
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
                  position: 'relative',
                  display: 'flex',
                  overflow: 'hidden',
                  width: '100%',
                  justifyContent: 'center',
                  gap: 7, 
                }}
              >
                {duplicatedImages.slice(sliderIndex, sliderIndex + slidesToShow).map((base64Image, index) => {
                  const isCenter = index === centerIndex;
                  return (
                    <Box key={index}>
                    <Card
                      id={isCenter ? "combined-image" : ""}
                      sx={{
                        marginTop: '80px',
                        position: 'relative',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease-in-out',
                        width: isCenter ? '252px' : '200px',
                        height: isCenter ? '450px' : '350px',
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="main image"
                        src={`data:image/png;base64,${base64Image}`}
                        title="main image"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '16px',
                        }}
                      />
                      {companyLogo && (
                        <CardMedia
                          component="img"
                          alt="status image"
                          src={`data:image/png;base64,${companyLogo}`}
                          title="status image"
                          sx={{
                            width: '100%',
                            height: '85%',
                            objectFit: 'contain',
                            position: 'absolute',
                            bottom: -2,
                          }}
                        />
                      )}
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
                          DOWNLOAD<DownloadIcon />
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

export default EventList;
