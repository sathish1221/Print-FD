import React, { useState } from "react";
import { Element } from 'react-scroll';
import {
  Box,
  Card,
  CardMedia,
  TextField,
  IconButton,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
// import yohaImage11 from "../assets/yoga day 011.jpg";
// // import yohaImage12 from "../assets/yoga day 012.jpg";
// import yohaImage13 from "../assets/yoga day 013.jpg";

const YogaDay = () => {
  const [mainImage, setMainImage] = useState(cycleImage);
  const [mainImage2, setMainImage2] = useState(yohaImage);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);

  const handleImageClick = (newImage) => {
    setMainImage(newImage);
  };

  const handleImageClick2 = (newImage2) => {
    setMainImage2(newImage2);
  };

  const location = useLocation();
  const id = location.state.id;
  console.log("dfssdfsdf", id);

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
    // yohaImage11,
    yohaImage10,
    yohaImage9,
    // yohaImage12,
    // yohaImage13,
  ];

  const imagesPerPage = 10; // 4 images per row, 2 rows per page

  const filteredImages = smallImages2.filter((image, index) =>
    `yoha day ${String(index + 1).padStart(3, '0')}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if ((page + 1) * imagesPerPage < filteredImages.length) setPage(page + 1);
  };

  const displayImages = filteredImages.slice(page * imagesPerPage, (page + 1) * imagesPerPage);

  return (
    <>
      <Sidebar />
      <style>
        {`
          .yoga-section {
            padding-left: 100px;
            padding-top: -600px;
          }
          @media (min-width: 450px) {
            .yoga-section {
              padding-left: 230px;
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
               padding: 1,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#A6787A',
            }}
          >
           <TextField
  variant="outlined"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search"
  InputLabelProps={{
    shrink: false,
  }}
  sx={{
    marginBottom: 1,
    width: '500px',
    borderRadius: '25px',  // Rounded corners
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow
    marginTop: '5px', // Adjusted marginTop value
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',  // Default border color
      },
      '&:hover fieldset': {
        borderColor: '#aaa',  // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#007BFF',  // Border color when focused
      },
      backgroundColor: '#fff',  // Background color
      borderRadius: '25px',  // Rounded corners for the input
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Arial, sans-serif',  // Custom font
      fontSize: '16px',  // Font size
      color: '#333',  // Text color
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#aaa',  // Placeholder text color
      opacity: 1,  // Ensures custom color is applied
    },
  }}
/>


            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: 0,
              }}
            >
              <IconButton onClick={handlePrevPage} disabled={page === 0} sx={{ marginRight: '20px' }}> {/* Increase the margin bottom */}
                <ArrowBackIosNewIcon />
            </IconButton>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, minmax(10px, 1fr))', 
                  gap: '15px',  // Adjusted gap between images
                  justifyContent: 'center',
                  alignItems: 'center',
                  height :'60%',
                  width: '60%',
                }}
              >
                {displayImages.map((smallImage2, index2) => (
                  <Card
                  key={index2}
                  sx={{
                    width: '100%',  // Set a fixed width
                    height: '100%', // Set a fixed height to maintain aspect ratio
                    cursor: 'pointer',
                    display: 'flex',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft:'10px',
                  }}
                  onClick={() => handleImageClick2(smallImage2)}
                >
                  <CardMedia
                    component="img"
                    alt={`small-images-${index2}`}
                    image={smallImage2}
                    title={`small-images-${index2}`}
                    sx={{
                      maxWidth: '100%', // Ensure image fits within the card
                      maxHeight: '100%', // Ensure image fits within the card
                      objectFit: 'cover', // Maintain aspect ratio and cover the card
                    }}
                  />
                </Card>
                
                ))}
              </Box>
              <IconButton onClick={handleNextPage} disabled={(page + 1) * imagesPerPage >= filteredImages.length} sx={{ marginLeft: '30px' }}> {/* Increase the margin bottom */}
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
          </Box>
        </Element>
      </div>
    </>
  );
};

export default YogaDay;
