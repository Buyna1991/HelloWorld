import Link from "next/link";
import { useEffect, useState } from "react";

import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { NormalCssProperties } from "@mui/material/styles/createMixins";
import Image from "next/image";
import copy from "@/public/clipboard.webp";
import google from "@/public/gmap.png";
import up from "@/public/up.png";
import down from "@/public/down.png";

interface Country {
  _id: string;
  name: { common: string };
  region: string;
  capital: string[];
  flag: string;
  landlocked: boolean;
  independent: boolean;
  population: number;
  maps: { googleMaps: string };
  languages: { [key: string]: string };
}

export const AllCountries = () => {
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiLoaded, setApiLoaded] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/world/countries`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setCountryData(data);
        setLoading(false);
        setApiLoaded(true);
        console.log(res.status);

        console.log(res.status);
      } catch (error) {
        router.push("/login");

        console.error("Error fetching country data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const copyIdToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <p>Loading Data....</p>
        </div>
      )}

      {apiLoaded && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{ fontSize: "25px", color: "#10a37f", marginBottom: "20px" }}
          >
            API: /world/countries
          </h1>
        </div>
      )}

      {apiLoaded && (
        <Button onClick={scrollToBottom}>
          <Image
            src={down}
            alt="Down"
            style={{
              height: "30px",
              width: "30px",
              position: "absolute",
              left: 1670,
              top: 16,
            }}
          />
        </Button>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!loading &&
          countryData.map((country) => (
            <Box key={country._id} sx={Boxstyle}>
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
                Population: {country.population}
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
                {country.languages &&
                Object.keys(country.languages).length > 0 ? (
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
                  fontSize: "160px",
                  position: "absolute",
                  top: "10px",
                  right: "60px",
                }}
              >
                {" "}
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
                  <Image src={google} width={50} height={50} alt="Map icon" />
                  <Link
                    target="_blank"
                    style={{ paddingTop: "20px", paddingLeft: "10px" }}
                    href={country.maps.googleMaps}
                  >
                    {country.maps.googleMaps}
                  </Link>
                </h2>
              )}

              <h2 style={{ color: "Black" }}>
                Id : {country._id}{" "}
                <button
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => copyIdToClipboard(country._id)}
                >
                  <Image
                    src={copy}
                    alt="Copy"
                    height={25}
                    style={{ paddingTop: "10px", marginLeft: "20px" }}
                  />
                </button>
              </h2>
            </Box>
          ))}
      </Box>
      {apiLoaded && (
        <Button onClick={scrollToTop}>
          <Image
            src={up}
            alt="Up"
            style={{
              height: "30px",
              width: "30px",
              position: "absolute",
              left: 1670,
              bottom: 34,
            }}
          />
        </Button>
      )}
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
