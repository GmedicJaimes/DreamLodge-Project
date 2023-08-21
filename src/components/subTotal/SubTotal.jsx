import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Card, TextField, Grid, Button } from "@mui/material"; // Importa Button aquí
import { StyledDivider } from "./SubTotalStyled";
import { DateContext } from "../../../src/Contex/DateContex";
import { Link } from "react-router-dom";
import {
  createBooking,
  isPropertyAvailable,
  getBookingsByPropertyId,
} from "../../config/handlers";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import styles from "./subTotal.module.css";

const SubTotal = ({
  handleStartDateChange,
  handleEndDateChange,
  property,
  formattedOccupiedDates,
  propertyId,
}) => {
  const { startDate, endDate, setDateRange } = useContext(DateContext);
  const deserializedDates = formattedOccupiedDates?.map(
    (dateString) => new Date(dateString)
  );
  const today = dayjs();

  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);



  //integracion mercado pago:
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff");
  const createPreference = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/createorder`, {
        description: `${property.name}`,
        price: `${subTotal}`,
        quantity: `${countSelectedDays()}`,
        currency_id: "ARS",
      });

      const { id } = response.data;

      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const bookingAndBuy = async () => {
    setIsLoading(true); // Inicia estado de "cargando"
    setIsDisabled(true)
    try {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
        setDataTicket({
          ...dataTicket,
          idTicket: id,
          totalTicket: subTotal,
        });
        try {
          const intervalPay = setInterval(async () => {
            const paymentStatus = await getPaymentStatus(id);
            if (paymentStatus === "approved") {
              updateAvaible(property.id, preferenceId);
              clearInterval(intervalPay);
            } else if (paymentStatus === "rejected") {
              clearInterval(intervalPay);
            }
          }, 10000);
        } catch (error) {
          console.error("Error in obtaining payment status", error);
        }

        if (!startDate || !endDate) {
          swal("Please select both start and end dates.");
          return;
        }

        if (startDate.isAfter(endDate)) {
          swal("Start date cannot be after end date.");
          return;
        }

        try {
          const hola = await isPropertyAvailable(
            propertyId,
            startDate,
            endDate
          );
          console.log(`IM AVAILABLE PROPERTY`, hola);
          await createBooking(propertyId, startDate, endDate);
        } catch (error) {
          console.log(error);
          swal("An error occurred while making the booking.");
        }
      }
    } catch (error) {
      console.error("ERROR SUBMIT AND BUY FUNCTION");
    }
    finally {
      setIsLoading(false); // Finaliza estado de "cargando"
    }
  };

  // ==========================================================

  const [dataTicket, setDataTicket] = React.useState({
    daysTicket: "",
    totalTicket: "",
    idTicket: "",
  });

  React.useEffect(() => {
    localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
  }, [property]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const diff = end.diff(start, "day");
      setDataTicket({
        ...dataTicket,
        daysTicket: diff,
      });
    }
  }, [startDate, endDate]);

  const countSelectedDays = () => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const diff = end.diff(start, "day");
      return diff;
    }
    return 0;
  };

  const subTotal = countSelectedDays() * property?.price;

  //   React.useEffect(() => {
  //     if (startDate && endDate) {
  //       const count = countSelectedDays();
  //       console.log(`counted days` , count);
  //     }
  //   }, [startDate, endDate]);

  const secondDateMin = startDate ? startDate.add(1, "day") : null;
  const isSecondPickerDisabled = !startDate;

  React.useEffect(() => {
    setDateRange(null, null);
  }, []);

  
  useEffect(() => {
    const fetchBookings = async () => {
      
      try {
        const fetchedBookings = await getBookingsByPropertyId(propertyId);
        const allBookedDates = [];

        fetchedBookings.forEach((booking) => {
          const start = dayjs(booking.startDate.toDate()); // Asumiendo que las fechas vienen en formato Timestamp
          const end = dayjs(booking.endDate.toDate());

          let current = start;

          while (current.isBefore(end) || current.isSame(end)) {
            allBookedDates.push(current.toISOString());
            current = current.add(1, "day");
          }
        });

        setBookedDates(allBookedDates);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [propertyId]);

  return (
    <div style={{ width: "500px", height: "380px", radius: "10px" }}>
      {/*      <Alert severity="warning">
          Selected dates are not available.
        </Alert> */}
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#CD5A3E",
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
            color: "white",
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
          backgroundColor: "#eadccf",
          height: "auto",
          padding: "15px",
          margin: "20px",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item sm={6}>
            {" "}
            {/* En dispositivos pequeños, ocupará toda la anchura */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ marginTop: "20px" }}
              >
                <DatePicker
                  label="Check In"
                  value={startDate}
                  minDate={today}
                  onChange={handleStartDateChange}
                  shouldDisableDate={(date) =>
                    bookedDates.includes(date.toISOString())
                  }
                />
              </DemoContainer>
              <DemoContainer components={["DatePicker"]} sx={{}}>
                <DatePicker
                  label="Check Out"
                  value={endDate}
                  minDate={secondDateMin}
                  onChange={handleEndDateChange}
                  disabled={isSecondPickerDisabled}
                  shouldDisableDate={(date) =>
                    bookedDates.includes(date.toISOString())
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <StyledDivider
        style={{
        margin: "2rem"
        }} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#CD5A3E",
                marginTop: "30px",
                marginLeft: "45PX",
              }}
            >
              SubTotal
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#CD5A3E",
                marginTop: "10px",
                marginLeft: "50px",
                display: "flex",
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
                color: "#CD5A3E",
                marginTop: "20px",
                marginLeft: "30px",
              }}
            >
              ${subTotal}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#CD5A3E",
                marginLeft: "80px",
              }}
            >
              {subTotal} USD
            </Typography>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
    backgroundColor: "#CD5A3E",
    "&:hover": {
      backgroundColor: "#E57951",
    },
  }}
  onClick={bookingAndBuy}
  disabled={isLoading || !startDate || !endDate || isDisabled} // Botón deshabilitado si isLoading, startDate o endDate son falsy
>
  {isLoading ? "Loading..." : "Reserve"}
</Button>

              {preferenceId && (
                <div >
                  <Wallet initialization={{ preferenceId: preferenceId }} />
                </div>
              )}
            </div>

            <Typography
              variant="h1"
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "#CD5A3E",
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
};

export default SubTotal;
