const first = document.querySelector(".first");
const second = document.querySelector(".second");
const search = document.getElementById("search");
let ip = "";
let dataIp = {};
let postOffices = [];
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    ip = data.ip;

    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data1 = await res.json();
    dataIp = data1;
    display(true);
    console.log(data1, dataIp);
  } catch (error) {
    console.error("Error fetching IP address:", error);
    document.getElementById("ip").textContent = "Error fetching IP address.";
    display(true);
  }
});
function display(i = true) {
  if (i) {
    firstDisplay();
  } else {
    secondDisplay();
  }
}
function firstDisplay() {
  first.innerHTML = ` <div class="left">
    <h2>Post Office Application.</h2>
    <p>
      This Application Allows you to extract information about the nearest
      Post Offices, based on your location.
    </p>
    <img src="./assests/undraw_messenger_re_8bky 1.svg" />
  </div>
  <div class="right">
    <p class="id-class">
      Your Current IP Address is <span id="ip">${ip}</span>
    </p>
    <button onClick="handleStart()">Get Started</button>
  </div>`;
}
function handleStart() {
  display(false);
}
async function secondDisplay() {
  if (ip) {
    console.log(dataIp);
    const { latitude, longitude, city, org, region, timezone, postal } = dataIp;
    let postalCodes = {};
    console.log("hi");
    let localTime = "";
    try {
      const res = await fetch(
        `https://worldtimeapi.org/api/timezone/${timezone}`
      );
      const time = await res.json();
      console.log(time);
      localTime = new Date(time.datetime).toLocaleString();
      const res1 = await fetch(
        `https://api.postalpincode.in/pincode/${postal}`
      );
      postalCodes = await res1.json();
      console.log(localTime, postalCodes);
    } catch (error) {
      console.log("erro in time");
    }
    first.style.display = "none";
    second.style.display = "flex";
    console.log(postalCodes);
    postOffices = postalCodes[0].PostOffice;
    console.log(postOffices);
    second.innerHTML = `<div class="header">
    <p class="ip-add">IP Address : <span class="ip2">${ip}</span></p>
    <div class="first-line">
      <p>Lat: ${latitude}</p>
      <p>City: ${city}</p>
      <p>Organisation: ${org}</p>
    </div>
    <div class="second-line">
      <p>Long: ${longitude}</p>
      <p>Region: ${region}</p>
      <p>Hostname: ${org}</p>
    </div>
  </div>
  <div class="map-section">
    <p>Your Current Location</p>
    <iframe
      src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed"
    ></iframe>
  </div>
  <div class="info-section">
    <h3>More Information About You</h3>
    <p>Time Zone: ${timezone}</p>
    <p>Date And Time: ${localTime}</p>
    <p>Pincode: ${postal}</p>
    <p>Message: ${postalCodes[0].Message}</p>
  </div>
  <div class="search-section">
    <h3>Post Offices Near You</h3>
    <div class="searchbar">
      <img src="./assests/search.svg" width="20" height="20" />
      <input id="search" type="text" placeholder="Search By Name" />
    </div>
  </div>
  <div class="post-section">
  ${postOffices
    .map(
      (o) => `
  <div class="card">
    <p>Name: ${o.Name}</p>
    <p>Branch Type: ${o.BranchType}</p>
    <p>Delivery Status: ${o.DeliveryStatus}</p>
    <p>District: ${o.District}</p>
    <p>Division: ${o.Division}</p>
  </div>
`
    )
    .join("")}
  </div>`;
  } else {
    console.log("error");
  }
}

