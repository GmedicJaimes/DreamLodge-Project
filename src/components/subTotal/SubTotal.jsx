import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Card, TextField, Grid, Button } from "@mui/material"; // Importa Button aquí
import { StyledDivider } from "./SubTotalStyled";
import { DateContext } from "../../../src/Contex/DateContex";
import { Link } from "react-router-dom"
import { createBooking } from "../../config/handlers";



 const SubTotal = ({ handleStartDateChange, handleEndDateChange,property,formattedOccupiedDates,id }) => {

  const { startDate, endDate, setDateRange } = useContext(DateContext);
  const deserializedDates = formattedOccupiedDates?.map(dateString => new Date(dateString));
  const [occupiedDates, setOccupiedDates] = useState([]);
  const today = dayjs();
 

const validBookings = deserializedDates?.filter(booking => booking.startDate && booking.endDate);

const generateOccupiedDatesSet = (e) => {
  const deserializedDatesSet = new Set();

  e && e?.forEach(booking => {
    if (!booking.startDate || !booking.endDate) {
      console.warn('A booking has an undefined start or end date:', booking);
      return; // skip this iteration
    }

    const startDate = dayjs(booking.startDate, "YYYY-MM-DD");
    const endDate = dayjs(booking.endDate, "YYYY-MM-DD");

    console.log("Parsed startDate:", startDate);
    console.log("Parsed endDate:", endDate);

    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      deserializedDatesSet.add(currentDate.format("YYYY-MM-DD")); // Cambio realizado aquí
      currentDate = currentDate.add(1, 'day');
    }
  });

  return deserializedDatesSet;
}

  


  const generatedOccupiedDates = generateOccupiedDatesSet(validBookings);





  const countSelectedDays = () => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const diff = end.diff(start, "day")
      return diff;
    }
    return 0;
  };


  const subTotal = countSelectedDays() * property.price
 

//   React.useEffect(() => {
//     if (startDate && endDate) {
//       const count = countSelectedDays();
//       console.log(`counted days` , count);
//     }
//   }, [startDate, endDate]);

  const secondDateMin = startDate ? startDate.add(1, "day") : null;
  const isSecondPickerDisabled = !startDate;


  const submitBooking = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
  
    if (startDate.isAfter(endDate)) {
      alert('Start date cannot be after end date.');
      return;
    }
  
    try {
    
      await createBooking(id, startDate, endDate);
    } catch (error) {
      console.log(error);
      alert('An error occurred while making the booking.');
    }
  };
  





  return (
    <div style={{ width: "500px" }}>
      
   {/*      <Alert severity="warning">
          Selected dates are not available.
        </Alert> */}
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#9A98FE",
          alignContent: "center",
          padding: "15px",
          margin: "20px",
          marginBottom: "-22px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#FAFAFF",
            textAlign: "center",
          }}
        >
          {" "}
          Choose your Date
        </Typography>
      </Card>
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#F3F3F7",
          height: "auto",
          padding: "15px",
          margin: "20px",
        }}
      >
        <Grid container justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ marginTop: "20px"}}
            >
              <DatePicker
         label="Check In"
         value={startDate}
         minDate={today}
         onChange={handleStartDateChange}
         shouldDisableDate={date => generatedOccupiedDates.has(date.format("YYYY-MM-DD"))}
         renderDay={(date, _dateState) => {
           const isOccupied = generatedOccupiedDates.has(date.format("YYYY-MM-DD"));
           const isSelected = date.isSame(startDate, "day");
           const isDisabled = isOccupied || (!_dateState.isBeforeMaxDate && !_dateState.isAfterMinDate);
           return (
             <div
               style={{
                backgroundColor: isOccupied ? "grey" : isSelected ? "blue" : "white",
                color: isDisabled ? "gray" : "black",
                 pointerEvents: isDisabled ? "none" : "auto",
               }}
             >
               {date.format("D")}
             </div>
           );
         }}
      />

              
            </DemoContainer>
            <DemoContainer components={["DatePicker"]} sx={{}}>
            <DatePicker
     label="Check Out"
     value={endDate}
     minDate={secondDateMin}
     onChange={handleEndDateChange}
     disabled={isSecondPickerDisabled}
     shouldDisableDate={date => generatedOccupiedDates.has(date.format("YYYY-MM-DD"))}
     renderDay={(date, _dateState) => {
       const isOccupied = generatedOccupiedDates.has(date.format("YYYY-MM-DD"));
       const isSelected = date.isSame(endDate, "day");
       const isDisabled = isOccupied || (!_dateState.isBeforeMaxDate && !_dateState.isAfterMinDate);
       return (
         <div
           style={{
            backgroundColor: isOccupied ? "grey" : isSelected ? "blue" : "white",
            color: isDisabled ? "gray" : "black",
             pointerEvents: isDisabled ? "none" : "auto",
           }}
         >
           {date.format("D")}
         </div>
       );
     }}
      />
            </DemoContainer>

           
          </LocalizationProvider>
        </Grid>
        <StyledDivider />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#868688",
                marginTop: "30px",
                marginLeft: '45PX'
              }}
            >
              SubTotal 
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#C2C2C2",
                marginTop: "10px",
                marginLeft: "50px",
                display: 'flex'
              }}
            >
              {/* {numberooms} Rooms */}
              <br />
              {countSelectedDays()} Nights
              <br />
              {/* {adult} Adult */}
              <br />
              {/* {child} Child */}
              <br />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "35px",
                fontWeight: "bold",
                color: "#0400CB",
                marginTop: "20px",
                marginLeft: '30px'
              }}
            >
              ${subTotal} 
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#9A98FE",
                marginLeft: "80px",
              }}
            >
            {subTotal}  USD
            </Typography>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
            
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  marginTop: "30px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  fontSize: "17px",
                  width: "150px",
                }}
                sx={{
                  backgroundColor: "#9A98FE",
                  "&:hover": {
                    backgroundColor: "#c2c1fe",
                  },
                }}
                onClick={submitBooking}
             
              >
                Reserve
              </Button>
       
            <Typography
              variant="h1"
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "#9A98FE",
                margin: "20px",
              }}
            >
              Please read and understand our cancellation policy prior to
              booking.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}


export default SubTotal