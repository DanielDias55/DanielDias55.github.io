"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

// Add an event listener to the window that runs the initApp function when the page is loaded
window.addEventListener("load", initApp);

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects(); // Call the getProjects function and wait for the result

  // Sort the projects by date
  projects.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  console.log(projects); // Log the projects to the console

  // Call the displayProjectsGrid function to display the projects in a grid format
  displayProjectsGrid(projects);
}

// Function to fetch projects from the specified URL
async function getProjects() {
  const response = await fetch(
    "https://extracurricularexam.danieldias.dk//wp-json/wp/v2/projects?acf_format=standard"
  ); // Perform a fetch request to get the projects data

  const data = await response.json(); // Convert the response to JSON
  return data; // Return the JSON data
}

// Function to display the projects in a grid format
function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-grid"); // Get the projects grid element from the DOM

  for (const project of projects) {
    // Run through each project
    const reportUrl = project.acf["reportmethodology"] || "#"; // Check if there is a report URL, if not set it to "#"

    console.log("Report URL:", reportUrl); // Log the report URL to the console

    // Insert HTML for each project into the projects grid
    projectsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <article class="grid-item">
        <img src="${project.acf.image}" alt="${
        project.title.rendered
      }" /> <!-- Project image -->
        
        <h2>${project.title.rendered}</h2> <!-- Project title -->
        
        <p><b>Description:</b> ${
          project.acf.description
        }</p> <!-- Project description -->
        
        <p><b>Type:</b> ${project.acf.type}</p> <!-- Project type -->
        
        <p><b>Website URL:</b> <a href="${
          project.acf.website_url
        }" style="color: #000000;">${
        project.acf.website_url
      }</a></p> <!-- Project website URL -->
        
        <p><b>Figma URL:</b> <a href="${
          project.acf.figma_url
        }" style="color: #000000;">${
        project.acf.figma_url
      }</a></p> <!-- Project Figma URL -->
        
        <p><b>Report/Methodology:</b> <a target="Report/Methodology" href="${reportUrl}" style="color: #000000;">${
        reportUrl !== "#" ? "Download Report" : "No Report Available"
      }</a></p> <!-- Project report/methodology link -->
      </article>
      `
    );
  }
}
