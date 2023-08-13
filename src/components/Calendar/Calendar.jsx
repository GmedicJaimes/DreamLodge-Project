import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Card, TextField, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import Person2Icon from "@mui/icons-material/Person2";
import BedIcon from "@mui/icons-material/Bed";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { DateContext } from "../../Contex/DateContex";
import {

  isPropertyAvailable
} from "../../config/handlers";

const Calendar = ({
  adult,
  child,
  numberooms,
  onAdultChange,
  onChildChange,
  onRoomsChange,
}) => {
  // Obtener las fechas seleccionadas del contexto
  const { startDate, endDate, setDateRange } = useContext(DateContext);

  const today = dayjs();


  const handleAdultChange = (event) => {
    const { value } = event.target;
    if (value === "" || (Number(value) > 0 && !value.includes("-"))) {
      onAdultChange(value);
    }
  };

  const handleChildChange = (event) => {
    const { value } = event.target;
    if (value === "" || (Number(value) >= 0 && !value.includes("-"))) {
      onChildChange(value);
    }
  };

  const handleRoomsChange = (inputValue) => {
    if (inputValue === "" || (Number(inputValue) > 0 && !inputValue.includes("-"))) {
      onRoomsChange(inputValue);
    }
  };

  // Calcula la fecha mínima para el segundo selector de fecha
  const secondDateMin = startDate ? startDate.add(1, "day") : null;
  const isSecondPickerDisabled = !startDate;

  // Manejadores de cambio de fechas y cantidades
  const handleStartDateChange = (date) => {
    setDateRange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setDateRange(startDate, date);
  };

  useEffect(() => {
    async function checkAndAddBooking() {
      if (startDate && endDate) {
        const total = countSelectedDays();
  
        const available = await isPropertyAvailable(propertyId, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  
        if (available) {
          const bookingData = {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            totalNights: total,
          };
          
          // Aquí agregamos la reserva porque las fechas están disponibles
          firebase.firestore().collection('bookings').add(bookingData);
          alert('¡Reserva realizada!');
        } else {
          alert('La propiedad no está disponible en las fechas seleccionadas.');
        }
      }
    }
  
    checkAndAddBooking();
  }, [startDate, endDate]);
  

  
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
              {adult}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography
              sx={{
                fontSize: "15px",
                color: "#C2C2C2",
                marginLeft: "8px",
                display: "flex",
              }}
            >
              <ChildCareIcon
                sx={{
                  fontSize: "20px",
                  color: "#CD5A3E",
                  marginRight: "3px",
                }}
              />
              {child}
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
              {numberooms}
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
                onChange={handleStartDateChange}
              />
            </DemoContainer>
            <DemoContainer components={["DatePicker"]} sx={{ width: "90%" }}>
              <DatePicker
                label="Check Out"
                value={endDate}
                minDate={secondDateMin}
                onChange={handleEndDateChange}
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
                  label="Adult"
                  type="number"
                  value={adult}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => handleAdultChange(e)}
                  inputProps={{
                    style: { textAlign: "center" }, // Centra el texto dentro del TextField
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="ValueChild"
                  label="Child"
                  type="number"
                  value={child}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={handleChildChange}
                  inputProps={{
                    style: { textAlign: "center" }, // Centra el texto dentro del TextField
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  id="value-Rooms"
                  label="Rooms "
                  type="number"
                  value={numberooms}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => handleRoomsChange(e.target.value)} // Pasa el valor en lugar del evento
                  inputProps={{
                    style: { textAlign: "center" }, // Centra el texto dentro del TextField
                  }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Card>
    </div>
  );
};

export default Calendar;

// useEffect(() => {
//     if (startDate && endDate) {
//       const total = countSelectedDays();

//       // Aquí realizarías operaciones relacionadas con Firebase
//       // por ejemplo, guardar el total de noches en la base de datos

//       // Ejemplo hipotético:
//       const bookingData = {
//         startDate: startDate.format('YYYY-MM-DD'),
//         endDate: endDate.format('YYYY-MM-DD'),
//         totalNights: total,
//       };

//       // Suponiendo que tienes una referencia a tu colección en Firebase
//       // y utilizas el método para agregar un nuevo documento
//       firebase.firestore().collection('bookings').add(bookingData);
//     }
//   }, [startDate, endDate]);
//   //Este ejemplo es hipotético y puede variar dependiendo de cómo estés configurando y utilizando
//   // Firebase en tu proyecto. La idea es que dentro de ese useEffect, realices las operaciones
//   //necesarias en Firebase, como guardar la información de la reserva con las fechas y el total
//   //de noches en la base de datos.

//   import React, { useContext, useState ,useEffect } from "react";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Typography, Card, TextField, Grid } from "@mui/material";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import ChildCareIcon from '@mui/icons-material/ChildCare';
// import Person2Icon from '@mui/icons-material/Person2';
// import BedIcon from '@mui/icons-material/Bed';
// import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
// import { DateContext } from "../../Contex/DateContex";

// Importa el contexto de fechas (si lo estás utilizando)
// Importa cualquier otro módulo que necesites
// const Calendar = () => {

//     const { startDate, endDate, setDateRange } = useContext(DateContext);
//     const today = dayjs();
//     const [adult, setAdult] = useState(1);
//     const [child, setChild] = useState(0);
//     const [numberooms, setNumberRooms] = useState(1);

//     const secondDateMin = startDate ? startDate.add(1, 'day') : null;
//     const isSecondPickerDisabled = !startDate;

//     const handleStartDateChange = (date) => {
//       setDateRange(date, endDate);
//     };

//     const handleEndDateChange = (date) => {
//       setDateRange(startDate, date);
//     };

//     const handleAdultChange = (event) => {
//         const { value } = event.target;
//         if (value === '' || (Number(value) > 0 && !value.includes('-'))) {
//           setAdult(value);
//         }
//       };

//       const handleChildChange = (event) => {
//         const { value } = event.target;
//         if (value === '' || (Number(value) >= 0 && !value.includes('-'))) {
//           setChild(value);
//         }
//       };

// const handleRoomsChange = (event) => {
//   const { value } = event.target
//   if (value === '' || (Number(value) > 0 && !value.includes('-'))) {
//     dispatch(countRooms(value))
//   }
// };

// useEffect(() => {
//     if (startDate && endDate) {
//       const total = countSelectedDays();

//       // Aquí realizarías operaciones relacionadas con Firebase
//       // por ejemplo, guardar el total de noches en la base de datos

//       // Ejemplo hipotético:
//       const bookingData = {
//         startDate: startDate.format('YYYY-MM-DD'),
//         endDate: endDate.format('YYYY-MM-DD'),
//         totalNights: total,
//       };

//       // Suponiendo que tienes una referencia a tu colección en Firebase
//       // y utilizas el método para agregar un nuevo documento
//       firebase.firestore().collection('bookings').add(bookingData);
//     }
//   }, [startDate, endDate]);
//   //Este ejemplo es hipotético y puede variar dependiendo de cómo estés configurando y utilizando
//   // Firebase en tu proyecto. La idea es que dentro de ese useEffect, realices las operaciones
//   //necesarias en Firebase, como guardar la información de la reserva con las fechas y el total
//   //de noches en la base de datos.

// const countSelectedDays = () => {
//   if (startDate && endDate) {
//     const start = dayjs(startDate);
//     const end = dayjs(endDate);
//     const diff = end.diff(start, 'day');
//     return diff;
//   }
//   return 0;
// };
// return (
//   <div>
//     <Card elevation={0} sx={
//       {
//         backgroundColor: "#CD5A3E",
//         alignContent: 'center',
//         padding: '15px',
//         margin: '20px',
//         marginBottom: '-22px'
//       }
//     }>
//       <Typography variant="h1" sx={
//         {
//           fontSize: '20px',
//           fontWeight: 'bold',
//           color: '#FAFAFF',
//           textAlign: 'center',
//         }
//       }> Choose your Date

//       </Typography>
//     </Card>

//     <Card elevation={0} sx={
//       {
//         backgroundColor: "#F3F3F7",
//         height: 'auto',
//         padding: '15px',
//         margin: '20px'
//       }
//     }>
//       <Grid container  justifyContent="start" marginTop={0} marginBottom={2}>
//         <Typography sx={
//           {
//             fontSize: '14px',
//             color: "#CD5A3E",
//             marginLeft: '12px',
//             display: 'flex',
//           }
//         }>
//           <CalendarMonthIcon sx={
//             {
//               fontSize: '20px',
//               color: "#CD5A3E",
//               marginRight: '2px',

//             }
//           } />

//           ( {startDate && endDate ? (
//             `${startDate.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}`
//           ) : (
//             "No dates selected"
//           )} )
//         </Typography>
//       </Grid>

//       <Grid container spacing={0} justifyContent="center" >
//         <Grid item xs={3} sm={3}>
//           <Typography sx={
//             {
//               fontSize: '15px',
//               color: '#C2C2C2',
//               marginLeft: '15px',
//               display: 'flex',
//             }
//           }>
//             <Person2Icon sx={
//               {
//                 fontSize: '20px',
//                 color: "#CD5A3E",
//                 marginRight: '2px',
//               }
//             } />
//             {adult}
//           </Typography>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <Typography sx={
//             {
//               fontSize: '15px',
//               color: '#C2C2C2',
//               marginLeft: '8px',
//               display: 'flex',
//             }
//           }>
//             <ChildCareIcon sx={
//               {
//                 fontSize: '20px',
//                 color: "#CD5A3E",
//                 marginRight: '3px',
//               }
//             } />
//             {child}
//           </Typography>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <Typography sx={
//             {
//               fontSize: '15px',
//               color: '#C2C2C2',
//               marginLeft: '4px',
//               display: 'flex',
//             }
//           }>
//             <BedIcon sx={
//               {
//                 fontSize: '24px',
//                 color: "#CD5A3E",
//                 marginRight: '2px',
//               }
//             } />
//             {numberooms}
//           </Typography>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <Typography sx={
//             {
//               fontSize: '15px',
//               color: '#C2C2C2',
//               marginRight: '10px',
//               display: 'flex',
//               alignItems: 'center'
//             }
//           }>
//             <NightlightRoundIcon sx={
//               {
//                 fontSize: '20px',
//                 color: "#CD5A3E",
//                 marginRight: '2px',
//               }
//             } />
//             {countSelectedDays()}
//           </Typography>
//         </Grid>
//       </Grid>
//       <Grid container justifyContent="center" spacing={0} marginBottom={2}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>

//           <DemoContainer components={['DatePicker']} sx={{ width: '90%', marginTop: '20px' }}>

//             <DatePicker
//               label='Check In'
//               value={startDate}
//               minDate={today}
//               onChange={handleStartDateChange}
//             />

//           </DemoContainer>
//           <DemoContainer components={['DatePicker']} sx={{ width: '90%' }}>
//             <DatePicker
//               label="Check Out"
//               value={endDate}
//               minDate={secondDateMin}
//               onChange={handleEndDateChange}
//               disabled={isSecondPickerDisabled}
//             />
//           </DemoContainer>
//           <Grid container justifyContent="center" spacing={1} marginTop={1} marginBottom={3}>
//             <Grid item xs={6} sm={5}>
//               <TextField
//                 id="valueAdult"
//                 label="Adult"
//                 type="number"
//                 value={adult}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 variant="standard"
//                 onChange={handleAdultChange}
//               />
//             </Grid>
//             <Grid item xs={6} sm={5}>
//               <TextField
//                 id="ValueChild"
//                 label="Child"
//                 type="number"
//                 value={child}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 variant="standard"
//                 onChange={handleChildChange}
//               />
//             </Grid>
{
  /* <Grid item xs={3} sm={3}>
                  <TextField
                    id="value-Rooms"
                    label="Rooms "
                    type="number"
                    value={numberooms}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    readOnly={true}
                  />
                </Grid> */
}
{
  /* </Grid>
            </LocalizationProvider>
          </Grid>
        </Card>
      </div>
    );
  }

  export default Calendar */
}
