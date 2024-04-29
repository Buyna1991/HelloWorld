import Link from "next/link";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, MenuItem, Select } from "@mui/material";
import { NormalCssProperties } from "@mui/material/styles/createMixins";
import Image from "next/image";
interface Country {
  _id: String;
  name: { common: String };
  region: String;
  capital: String[];
  flag: String;
  landlocked: boolean;
  independent: boolean;
  population: Number;
  maps: { googleMaps: String };
  languages: { [key: string]: string };
}

export const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryData, setCountryData] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/world/countriesbyName/${selectedCountry}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCountryData(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, [selectedCountry]);

  const handleDropdownChange = async (event: any) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
  };

  return (
    <Box style={{ paddingLeft: "56px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        
        }}
      >
        <h1 style={{ color: "#10a37f", fontSize: "25px", paddingRight:"194px" }}>
          API:/world/countriesbyName/{selectedCountry}
        </h1>
      </div>
      <Select
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "520px",
        }}
        value={selectedCountry}
        onChange={handleDropdownChange}
        displayEmpty
        inputProps={{ "aria-label": "Select a filter" }}
      >
        <MenuItem value="">Choose a Country</MenuItem>
        <MenuItem value="Mongolia">Mongolia</MenuItem>
        <MenuItem value="China">China</MenuItem>
        <MenuItem value="Spain">Spain</MenuItem>
        <MenuItem value="Japan">Japan</MenuItem>
      </Select>

      <br></br>
      {countryData.map((country) => (
        <Box key={String(country._id)} sx={Boxstyle}>
          <h2
            style={{
              color: "Black",
              backgroundColor: "lightblue",
              borderRadius: "5px",
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            {country.name.common}
          </h2>
          <h2 style={{ color: "Black" }}>
            Population: {JSON.stringify(country.population)}
          </h2>
          <h2 style={{ color: "Black" }}>Continent: {country.region}</h2>
          <h2 style={{ color: "Black", display: "flex" }}>
            Capital:{" "}
            {Array.isArray(country.capital) ? (
              <p>
                {country.capital.map((capital, index) => (
                  <p key={index}>{capital}</p>
                ))}
              </p>
            ) : (
              <p></p>
            )}
          </h2>
          <h2 style={{ color: "Black", display: "flex" }}>
            Language:{" "}
            {country.languages && Object.keys(country.languages).length > 0 ? (
              <div>
                {Object.keys(country.languages).map(
                  (language, index) =>
                    index === 0 && (
                      <p key={index}>{country.languages[language]}</p>
                    )
                )}
              </div>
            ) : (
              <p>No languages available</p>
            )}
          </h2>
          <h2
            style={{
              color: "Black",
              fontSize: "200px",
              position: "absolute",
              top: "10px",
              right: "20px",
            }}
          >
            {country.flag}
          </h2>
          <h2 style={{ color: "Black" }}>
            Landlocked: {JSON.stringify(country.landlocked)}
          </h2>
          <h2 style={{ color: "Black" }}>
            Independent: {JSON.stringify(country.independent)}
          </h2>
          {country.maps && country.maps.googleMaps && (
            <h2 style={{ color: "#10a37f", display: "flex" }}>
              <Image src="/map.png" width={40} height={40} alt="Map icon" />
              <Link
                  target="_blank"
                  href={String(country.maps.googleMaps)}
                  passHref
                >
                  {country.maps.googleMaps}
                </Link>
            </h2>
          )}
          <h2 style={{ color: "Black" }}>Id : {country._id}</h2>
        </Box>
      ))}
    </Box>
  );
};
const Boxstyle: NormalCssProperties = {
  overflow: "hidden",
  position: "relative",
  justifyContent: "center",
  border: 2,
  borderRadius: 5,
  borderColor: "primary.main",
  padding: 2,
  marginBottom: 2,
  width: 520,
  fontSize: 20,
  boxShadow: "10",
};
