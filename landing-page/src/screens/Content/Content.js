import React from "react";
import "./Content.scss";
import Card from "../../components/Card/Card";
const projectsData = [
  {
    id: 1,
    title: "Prompt search website",
    description: "Read and create intersting prompts",
    image:
      "https://cdn-images-1.medium.com/max/2000/1*HFAEJvVOq4AwFuBivNu_OQ.png",
    tag: ["All", "Web"],
    gitUrl:
      "https://github.com/LokeshSunhare1999/NextJS-Project/tree/main/prmoptSite",
    previewUrl: "https://prompt-site-ruby.vercel.app/",
  },
  {
    id: 2,
    title: "Team Members Allocation",
    description: "Allocate the team members according to need",
    image:
      "https://blog.webix.com/wp-content/uploads/2017/06/20170621-CSS-Grid-Layout-710x355-tiny.png",
    tag: ["All", "Web"],
    gitUrl: "https://replit.com/@lokeshsunhare/TeamMemberAllocation",
    previewUrl: "https://team-member-allocation-black.vercel.app/",
  },
  {
    id: 3,
    title: "Movie Land",
    description: "Search favorite Movies",
    image:
      "https://www.graycelltech.com/wp-content/uploads/2015/06/GCT-HTML5.jpg",
    tag: ["All", "Web"],
    gitUrl:
      "https://github.com/LokeshSunhare1999/React_Projects/tree/main/movie-land",
    previewUrl: "https://movie-land-lyart.vercel.app/",
  },
];

function Content() {
  return (
    <div className="page-wrapper">
      <div className="nav-wrapper">
        <div className="grad-bar"></div>
        <nav className="navbar">
          <h2 className="mb-0">Client Serve</h2>
          <div className="menu-toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="nav no-search">
            <li className="nav-item">
              <a href="#">Service</a>
            </li>
            <li className="nav-item">
              <a href="#">Account Management</a>
            </li>
            <li className="nav-item">
              <a href="#">blogs</a>
            </li>
            <li className="nav-item">
              <a href="#">Calculator</a>
            </li>
            <li className="nav-item">
              <a href="#">Contact Us</a>
            </li>
            <i className="fas fa-search" id="search-icon"></i>
            <input
              className="search-input"
              type="text"
              placeholder="Search.."
            />
          </ul>
        </nav>
      </div>
      <section className="headline">
        <h1 className="text-light">Client Serve Ecommerce</h1>
        <p className="text-light">Full Seller Account Management Services!</p>
      </section>
      <div className="m-2">
        <h1>What We Do</h1>
        <p className="pr-5 pl-5">
          Client Serve Solutions empowers you to list your products crosswise
          over real in major Market Places in India giving a conclusion to-end
          answer for internet offering – be it customer services, promotion,
          Product Listing, etc. on India’s top marketplaces.
        </p>

        <section className="features">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="col d-flex justify-content-center"
                initial="initial"
                // transition={{ duration: 0.3, delay: index * 0.4 }}
              >
                <Card
                  className="p-3"
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  previewUrl={project.previewUrl}
                  gitUrl={project.gitUrl}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Content;
