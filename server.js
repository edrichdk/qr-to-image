const express = require("express");
const QRCode = require("qrcode");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { qr: null });
});

app.post("/generate", async (req, res) => {
  try {
    const qr = await QRCode.toDataURL(req.body.text);
    res.render("index", { qr });
  } catch (err) {
    res.send("Error generating QR");
  }
});

app.listen(port, () => console.log(`App running on port ${port}`));
