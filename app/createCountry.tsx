import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface Country {
  name: {
    common: string;
  };
  population: number;
  capital: string;
  languages: string;
  independent: boolean;
  landlocked: boolean;
  region: string;
  flag: string;
  _id: number;
}

export default function CreateCountry() {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState<Number>(0);
  const [region, setRegion] = useState("");
  const [capital, setCapital] = useState("");
  const [languages, setLanguages] = useState("");
  const [landlocked, setLandlocked] = useState("");
  const [independent, setIndependent] = useState("");
  const [flag, setFlag] = useState("");
  const [createdCountry, setCreatedCountry] = useState<Country>();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSaveCountry = async () => {
    if (
      !name ||
      !languages ||
      !region ||
      !capital ||
      !population ||
      !landlocked ||
      !independent ||
      !flag
    ) {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 4000);
      return;
    }

    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);

    setErrorAlert(false);

    try {
      const response = await axios.post(
        "http://localhost:8000/world/countries/create",
        {
          name: {
            common: name,
          },
          languages: {
            "": languages,
          },
          region,
          capital: [capital],
          population,
          landlocked,
          independent,
          flag,
        },
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      const createdCountry = response.data.res;
      console.log(createdCountry);

      setCreatedCountry(createdCountry);
    } catch (error) {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 4000);
    }
  };
  const TrueFalse = [
    {
      value: "True",
      label: "true",
    },
    {
      value: "False",
      label: "false",
    },
  ];
  

  return (
    <Box sx={{ display: "flex", marginLeft: "310px" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "block",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
        }}
        noValidate
        autoComplete="off"
      >
        <h1 style={{ fontSize: "25px", marginLeft: "10px", color: "#10a37f" }}>
          Create a Country
        </h1>
        <div
          style={{
            display: "block",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
            id="outlined-required"
            label="Country Name"
            defaultValue=""
          />
          <TextField
            onChange={(event) => {
              setPopulation(event.target.value);
            }}
            required
            id="outlined-required"
            label="Population"
            defaultValue=""
          />
          <TextField
            onChange={(event) => {
              setRegion(event.target.value);
            }}
            required
            id="outlined-required"
            label="Continent"
            defaultValue=""
          />
          <TextField
            onChange={(event) => {
              setCapital(event.target.value);
            }}
            required
            id="outlined-required"
            label="Capital City "
            defaultValue=""
          />
          <TextField
            onChange={(event) => {
              setLanguages(event.target.value);
            }}
            required
            id="outlined-required"
            label="Language"
            defaultValue=""
          />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={(event) => {
                setLandlocked(event.target.value);
              }}
              id="outlined-select-currency"
              select
              label="Landlocked"
              defaultValue=""
            >
              {TrueFalse.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={(event) => {
                setIndependent(event.target.value);
              }}
              id="outlined-select-currency"
              select
              label="Independent"
              defaultValue=""
            >
              {TrueFalse.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={(event) => {
                setFlag(event.target.value);
              }}
              required
              id="outlined-required"
              label="Flag"
              defaultValue=""
            />

            <Button
              onClick={handleSaveCountry}
              style={{
                width: "222.46px",
                height: "56px",
                marginLeft: "8px",
                marginTop: "16px",
                backgroundColor: "#10a37f",
                color: "white",
              }}
              variant="outlined"
            >
              Save Country
            </Button>
            <br></br>
            <Stack
              sx={{ width: "224px", marginLeft: "8px", marginTop: "14px" }}
              spacing={2}
            >
              {errorAlert && (
                <Alert severity="error" onClose={() => setErrorAlert(false)}>
                  Country Missing a Field!
                </Alert>
              )}

              {successAlert && (
                <Alert
                  severity="success"
                  onClose={() => setSuccessAlert(false)}
                >
                  Country Created Successfully
                </Alert>
              )}
            </Stack>
          </Box>
        </div>

        {createdCountry && (
          <Box
            sx={{
              position: "absolute",
              top: "200px",
              right: "600px",
              justifyContent: "center",
              border: 2,
              borderRadius: 5,
              borderColor: "primary.main",
              p: 2,
              marginBottom: 2,
              width: 520,
              fontSize: 20,
              boxShadow: 10,
            }}
          >
            <h2
              style={{
                color: "Black",
                backgroundColor: "lightblue",
                borderRadius: "5px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Name: {createdCountry.name && createdCountry.name.common}
            </h2>
            <h2 style={{ color: "Black" }}>
              Population: {JSON.stringify(createdCountry.population)}
            </h2>
            <h2 style={{ color: "Black" }}>
              Continent: {createdCountry.region}
            </h2>
            <h2 style={{ color: "Black", display: "flex" }}>
              Capital:{" "}
              {Array.isArray(createdCountry.capital) ? (
                <p>
                  {createdCountry.capital.map((capital, index) => (
                    <p key={index}>{capital}</p>
                  ))}
                </p>
              ) : (
                <p></p>
              )}
            </h2>
            <h2 style={{ color: "Black", display: "flex" }}>
              Language: {Object.values(createdCountry.languages)[0]}
            </h2>
            <h2
              style={{
                color: "Black",
                fontSize: "200px",
                position: "absolute",
                top: "5px",
                right: "20px",
              }}
            >
              {createdCountry.flag}
            </h2>
            <h2 style={{ color: "Black" }}>
              Landlocked: {JSON.stringify(createdCountry.landlocked)}
            </h2>
            <h2 style={{ color: "Black" }}>
              Independent: {JSON.stringify(createdCountry.independent)}
            </h2>

            <h2 style={{ color: "Black" }}>Id : {createdCountry._id}</h2>
          </Box>
        )}
      </Box>
    </Box>
  );
}
