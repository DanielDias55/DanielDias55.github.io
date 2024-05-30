"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects(); // call the getProjects function
  projects.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  console.log(projects); //Log the projects to the console
  //displayProjects(projects); // Call displayProjects to display the fetched posts
  displayProjectsGrid(projects); //Call the displayProjects function with the posters as a grid
}

async function getProjects() {
  const response = await fetch(
    "https://extracurricularexam.danieldias.dk//wp-json/wp/v2/projects?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-grid");
  for (const project of projects) {
    const reportUrl = project.acf["reportmethodology"]
      ? project.acf["reportmethodology"]
      : "#";
    console.log("Report URL:", reportUrl);

    projectsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
  <article class="grid-item">
    <img src="${project.acf.image}" alt="${project.title.rendered}" />
    <h2>${project.title.rendered}</h2>
    <p><b>Description:</b> ${project.acf.description}</p>
    <p><b>Type:</b> ${project.acf.type}</p>
    <p><b>Website
    URL:  </b><a href="${project.acf.website_url}" style ="color: #000000; ">${
        project.acf.website_url
      }</a></p>
    <p><b>Figma URL:  </b><a href="${
      project.acf.figma_url
    }" style ="color: #000000; ">${project.acf.figma_url}</a></p>
    <p><b>Report/Methodology: </b><a target ="Report/Methodology:" href="${
      project.acf.reportmethodology
    }" style="color: #000000;">${
        reportUrl !== "#" ? "Download Report" : "No Report Available"
      }</a></p>
  </article>
`
    );
  }
}
