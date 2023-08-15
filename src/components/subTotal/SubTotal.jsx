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



 const SubTotal = () => {
  const { startDate, endDate, setDateRange } = useContext(DateContext);
  const [guest, setGuest] = useState(1);
  const [child, setChild] = useState(0);
  const [rooms, setRooms] = useState(1);
  const today = dayjs();

  const handleGuestChange = (value) => {
    if (value === "" || (Number(value) > 0 && !value.includes("-"))) {
      setGuest(value);
    }
  };

  const handleChildChange = (value) => {
    if (value === "" || (Number(value) >= 0 && !value.includes("-"))) {
      setChild(value);
    }
  };

  const handleRoomsChange = (value) => {
    if (value === "" || (Number(value) > 0 && !value.includes("-"))) {
      setRooms(value);
    }
  };

  const countSelectedDays = () => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const diff = end.diff(start, "day");
      return diff;
    }
    return 0;
  };

  const secondDateMin = startDate ? startDate.add(1, "day") : null;
  const isSecondPickerDisabled = !startDate;

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
                shouldDisableDate={(date) => shouldDisableDateIn(date)}
                // onChange={handleStartDateChange}
              />
            </DemoContainer>
            <DemoContainer components={["DatePicker"]} sx={{}}>
              <DatePicker
                label="Check Out"
                value={endDate}
                minDate={secondDateMin}
                shouldDisableDate={(date) => shouldDisableDateout(date)}
                // onChange={handleEndDateChange}
                disabled={isSecondPickerDisabled}
              />
            </DemoContainer>

            <Grid container
              justifyContent="center"
              spacing={2}
              marginTop={2}
              marginBottom={3}
            >
              <Grid item xs={3} sm={4}>
                <TextField
                  id="subAdult"
                  label="Adult"
                  type="number"
                //   value={adult}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                //   onChange={handleAdultChange}
                />
              </Grid>
              <Grid item xs={3} sm={4}>
                <TextField
                  id="subChild"
                  label="Child"
                  type="number"
                  value={child}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={handleChildChange}
                />
              </Grid>
              {/* <Grid item xs={3} sm={3}>
                <TextField
                  id="subRooms"
                  label="Rooms"
                  type="number"
                  value={numberooms}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={handleRoomsChange}
                />
              </Grid> */}
            </Grid>
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
              {/* SubTotal */}
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
              {/* {nights} Nights */}
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
              {/* ${subTotal} */}
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
              USD
            </Typography>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
            <Link to="/">
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
                // onClick={handleTotaLClik}
              >
                Reserve
              </Button>
            </Link>
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