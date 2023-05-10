import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { prettyPrintStat, sortData } from "./util";

import "../App.css";
import "leaflet/dist/leaflet.css";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

import Axios from "axios";

function Dashboard() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [warningOpen, setWarningOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:6105/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === false) {
        setWarningOpen(true);
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States, United Kingdom
            value: country.countryInfo.iso2, //UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  const handleWarningAccount = () => {
    window.location.href = "/signin";
  };

  const handleWarningClose = () => setWarningOpen(false);

  return (
    <>
      {isLogin ? (
        <div className="app">
          <div className="app__left">
            <div className="app__header">
              <Link to={"/account"}>
                <AccountCircleIcon sx={{ fontSize: 75, color: blue[500] }} />
              </Link>
              <h1>COVID-19 Tracker</h1>
              <FormControl className="app_dropdown">
                <Select
                  variant="outlined"
                  onChange={onCountryChange}
                  value={country}
                >
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="app__stats">
              <InfoBox
                active={casesType === "cases"}
                onClick={(e) => setCasesType("cases")}
                title="Cases"
                isRed
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={prettyPrintStat(countryInfo.cases)}
              />
              <InfoBox
                active={casesType === "recovered"}
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={prettyPrintStat(countryInfo.recovered)}
              />
              <InfoBox
                active={casesType === "deaths"}
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                isRed
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={prettyPrintStat(countryInfo.deaths)}
              />
            </div>

            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
          <Card className="app__right">
            <CardContent>
              <div className="app__information">
                <h3>Live Cases by Country</h3>
                <Table countries={tableData} />
                <h3>Worldwide new {casesType}</h3>
                <LineGraph casesType={casesType} />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Dialog open={warningOpen} onClose={handleWarningClose}>
          <DialogTitle>
            <b>Our application need user to login at first</b>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleWarningAccount} color="error">
              Redirect Me
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Dashboard;
