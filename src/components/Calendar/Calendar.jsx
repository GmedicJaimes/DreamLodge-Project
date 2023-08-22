import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Card, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import Person2Icon from "@mui/icons-material/Person2";
import BedIcon from "@mui/icons-material/Bed";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { DateContext } from "../../Contex/DateContex";
import {

  isPropertyAvailable,
  fetchAvailablePropertiesInRange 
} from "../../config/handlers";
import { US_STATE_CITIES } from "../../views/Post/infoLocation";

const Calendar = ({
  propertyTypeFilter,
  guest,
  rooms,
  onGuestChange,
  onRoomsChange,
  onStartChange, 
  onEndChange,
  onPropertyTypeFilterChange,
  onStateChange,
  onCityChange,
  stateFilter,
  cityFilter,
  sortByPrice,
  ascending
}) => {
  // Obtener las fechas seleccionadas del contexto
  const { startDate, endDate, setDateRange } = useContext(DateContext);
  // const [selectedTypes, setSelectedTypes] = useState([]); // Estado para tipos seleccionado

  
  const handlePropertyStateFilterChange=(event)=>{
    onStateChange(event.target.value)
  };
  const handlePropertyCityFilterchange=(event)=>{
    onCityChange(event.target.value)
  };

  const handlePropertyTypeFilterChange = (event) => {
    onPropertyTypeFilterChange(event.target.value)
  };

  // const handlePropertyTypeFilterChange = (event) => {
  //   setSelectedTypes(event.target.value);
  // };
  

  const today = dayjs();


  const handleGuestChange = (event) => {
    const { value } = event.target;
    if (value === "" || (Number(value) >= 0 && !value.includes("-"))) {
      onGuestChange(value);
    }

  };


  const handleRoomsChange = (inputValue) => {
    if (inputValue === " " || (Number(inputValue) >= 0 && !inputValue.includes("-"))) {
      onRoomsChange(inputValue);
    }
  };

  // Calcula la fecha mínima para el segundo selector de fecha
  const secondDateMin = startDate ? startDate.add(1, "day") : null;
  const isSecondPickerDisabled = !startDate;


  
  const handleResetFilters = () => {
    onGuestChange(0);
    onRoomsChange(0);
    onStartChange(null);
    onEndChange(null);
    onPropertyTypeFilterChange(null);
    onStateChange(null);
    onCityChange(null);
  };
  


  // Función para contar la cantidad de días seleccionados
  const countSelectedDays = () => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const diff = end.diff(start, "day");
      return diff;
    }
    return 0;
  };

  return (
    <div>
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#CD5A3E",
          alignContent: "center",
          padding: "15px",
          margin: "20px",
          marginBottom: "-22px",
          width: "300px",
          borderRadius: '4px 4px 0px 0px'
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
          width: "300px",
          boxShadow: "1px 4px 5px 1px #B8B8B8",
          borderRadius: '0px 0px 4px 4px'
        }}
      >
        <Grid container justifyContent="start" marginTop={0} marginBottom={2}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#CD5A3E",
              marginLeft: "12px",
              display: "flex",
            }}
          >
            <CalendarMonthIcon
              sx={{
                fontSize: "20px",
                color: "#CD5A3E",
                marginRight: "2px",
              }}
            />
            ({" "}
            {startDate && endDate
              ? `${startDate.format("YYYY-MM-DD")} to ${endDate.format(
                  "YYYY-MM-DD"
                )}`
              : "No dates selected"}{" "}
            )
          </Typography>
        </Grid>

        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={3} sm={3}>
            <Typography
              sx={{
                fontSize: "15px",
                color: "#C2C2C2",
                marginLeft: "15px",
                display: "flex",
              }}
            >
              <Person2Icon
                sx={{
                  fontSize: "20px",
                  color: "#CD5A3E",
                  marginRight: "2px",
                }}
              />
              {guest}
            </Typography>
          </Grid>
       
          <Grid item xs={3} sm={3}>
            <Typography
              sx={{
                fontSize: "15px",
                color: "#C2C2C2",
                marginLeft: "4px",
                display: "flex",
              }}
            >
              <BedIcon
                sx={{
                  fontSize: "24px",
                  color: "#CD5A3E",
                  marginRight: "2px",
                }}
              />
              {rooms}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography
              sx={{
                fontSize: "15px",
                color: "#C2C2C2",
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <NightlightRoundIcon
                sx={{
                  fontSize: "20px",
                  color: "#CD5A3E",
                  marginRight: "2px",
                }}
              />
              {countSelectedDays()}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={0} marginBottom={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ width: "90%", marginTop: "20px" }}
            >
              <DatePicker
                label="Check In"
                value={startDate}
                minDate={today}
                onChange={onStartChange}
              />
            </DemoContainer>
            <DemoContainer components={["DatePicker"]} sx={{ width: "90%" }}>
              <DatePicker
                label="Check Out"
                value={endDate}
                minDate={secondDateMin}
                onChange={onEndChange}
                disabled={isSecondPickerDisabled}

              />
            </DemoContainer>
            <Grid
              container
              justifyContent="center"
              spacing={1}
              marginTop={1}
              marginBottom={3}
            >
              <Grid item xs={6} sm={3}>
                <TextField
                  id="valueAdult"
                  label="Guest"
                  type="number"
                  value={guest}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => handleGuestChange(e)}
                  inputProps={{
                    style: { textAlign: "center" },
                    max:10
                  }}
                />
              </Grid>
              
              <Grid item xs={3} sm={3}>
                <TextField
                  id="value-Rooms"
                  label="Rooms "
                  type="number"
                  value={rooms}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => handleRoomsChange(e.target.value)} // Pasa el valor en lugar del evento
                  inputProps={{
                    style: { textAlign: "center" }, // Centra el texto dentro del TextField
                    max: 6 
                  }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
                  value={propertyTypeFilter}
                  onChange={handlePropertyTypeFilterChange}
                  label="Type"
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value="Cabins">Cabins</MenuItem>
              <MenuItem value="Beachfront">Beachfront</MenuItem>
              <MenuItem value="Mansion">Mansion</MenuItem>
              <MenuItem value="Countryside">Countryside</MenuItem>
              <MenuItem value="Room">Room</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120, width: "45%", marginRight: "3px" }}>
            <InputLabel>State</InputLabel>
            <Select
              value={stateFilter}
              onChange={handlePropertyStateFilterChange}
              label="State"
            >
              <MenuItem value={""}>All</MenuItem>
              {Object.keys(US_STATE_CITIES).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ minWidth: 120, width: "45%"}}>
            <InputLabel>City</InputLabel>
            <Select
              value={cityFilter}
              onChange={handlePropertyCityFilterchange}
              label="City"
            >
              <MenuItem value={""}>All</MenuItem>
              {stateFilter &&
                US_STATE_CITIES[stateFilter].map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
            </Select>
            <MenuItem onClick={sortByPrice}>Sort by price {ascending ? 'ascending' : 'descending'} </MenuItem>
           <button onClick={handleResetFilters}>Clean filtered</button>
          </FormControl>
          <MenuItem onClick={sortByPrice}
             style={{
              border:"1px solid #AFAFB3",
              color:"#616163",
              borderRadius: "5px",
              minWidth: 119,
              width: "45%",
              marginRight: "4px"

            }}
            >Sort by price 
              
              
               </MenuItem>
        </Grid>
      </Card>
    </div>
  );
};

export default Calendar;
