const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // Enable CORS for all requests

// Route to get addresses by postcode
app.get("/getAddresses", async (req, res) => {
    const postcode = req.query.postcode;
    const url = `https://servicelayer3c.azure-api.net/wastecalendar/address/search?postcode=${postcode}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Route to get bin collection data by UPRN
app.get("/getCollections", async (req, res) => {
    const uprn = req.query.uprn;
    const num = req.query.num || 5;
    const url = `https://servicelayer3c.azure-api.net/wastecalendar/collection/search/${uprn}?numberOfCollections=${num}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start server on port 3000
app.listen(3000, () => console.log("Proxy server running on port 3000"));
