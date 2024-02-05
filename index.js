const express = require("express");
const app = express();

const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.send(
        "Sorry, the website is only available during working hours (Monday to Friday, 9 to 17)."
    );
}
};

app.use(checkWorkingHours);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/services", (req, res) => {
    res.sendFile(__dirname + "/views/services.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
