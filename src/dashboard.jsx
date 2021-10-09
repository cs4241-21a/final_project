import React from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
// import Kabob from "./kabob";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// Make sure to run 'npm run build'

class Post extends React.Component {
  constructor(props) {
    super(props);

    // console.log("this.props.postID", this.props.postID)

    this.click = this.click.bind(this);
  }

  click(event) {
    // console.log("icon clicked")
    // console.log("creatorID: ", this.props.profileID)
    let request = {
      profileID: this.props.profileID,
      postID: this.props.postID,
    };

    fetch("/delete_post", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => this.props.app.setState({ posts: json }));
  }

  render() {
    return (
      <tr class="post_entry_container_outer">
        <td class="post_entry_container_inner">
          <div class="post_title">
            <h3>{this.props.header}</h3>
            {/* <Kabob profileID={this.props.profileID}></Kabob> */}
            <DeleteForeverIcon
              class="delete_post_icon"
              fontSize="small"
              onClick={this.click}
            />
          </div>
          <div class="post_data_container">
            <b>Post Author: </b>
            {`${this.props.firstName} ${this.props.lastName}`}
            <br></br>
            <b>Course: </b>{" "}
            {`${this.props.classDepartment} ${this.props.classNumber}`}
            <br></br>
            <b>Post Date: </b> {`${this.props.date}`}
            <br></br>
            <br></br>
            <b>Related Skills: </b>
            {`${this.props.skills.join(", ")}`}
            <br></br>
            <b>Related Languages: </b>
            {`${this.props.languages.join(", ")}`}
            <br></br>
            <br></br>
            {this.props.bodyContent}
            <br></br>
            <br></br>
          </div>
        </td>
      </tr>
    );
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
    this.load();
  }

  load() {
    fetch("/posts", { method: "get", "no-cors": true })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ posts: json });
        //   console.log("json: ", json)
      });
  }

  submit(e) {
    e.preventDefault();
    //getting todays date
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // 0 is January
    let day = d.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }
    const date = `${month}/${day}/${year}`,
      //getting all the input values from the form to send to the server
      skills = document.getElementById("list_skills"),
      selected_skills = [...skills.selectedOptions].map(
        (option) => option.value
      ),
      languages = document.getElementById("list_languages"),
      selected_languages = [...languages.selectedOptions].map(
        (option) => option.value
      ),
      postTitle = document.getElementById("post_title"),
      postClass = document.getElementById("class_name"),
      postDescription = document.getElementById("post_description"),
      json = {
        date: date,
        title: postTitle.value,
        class: postClass.value,
        skills: selected_skills,
        languages: selected_languages,
        description: postDescription.value,
      },
      body = JSON.stringify(json);

    fetch("/submit", {
      method: "post",
      body,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("form").reset();
        this.setState({ posts: data });
        document.getElementById("list_class_filter").selectedIndex = 0;
        document.getElementById("list_skills_filter").selectedIndex = -1;
        document.getElementById("list_languages_filter").selectedIndex = -1;
      });
  }

  filter(e) {
    const filterClass = document.getElementById("list_class_filter"),
      filterSkills = document.getElementById("list_skills_filter"),
      filterLanguages = document.getElementById("list_languages_filter"),
      selected_skills = [...filterSkills.selectedOptions].map(
        (option) => option.value
      ),
      selected_languages = [...filterLanguages.selectedOptions].map(
        (option) => option.value
      ),
      json = {
        course: filterClass.value,
        skills: selected_skills,
        languages: selected_languages,
      },
      body = JSON.stringify(json);
    fetch("/filter", {
      method: "post",
      body,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  resetFilter(e) {
    this.load();
    document.getElementById("list_class_filter").selectedIndex = 0;
    document.getElementById("list_skills_filter").selectedIndex = -1;
    document.getElementById("list_languages_filter").selectedIndex = -1;
  }

  render() {
    return (
      <>
        <div class="dashboard_grid_layout">
          <div class="header_bar_area">
            {/* <header class="header_area"> */}
            <h1 class="app_title">
              <b>Tech Teammate Tagup</b>
            </h1>
            <a href="/profile" type="button" class="profile_link">
              Profile
            </a>
            <a href="/logout" type="button" class="logout_link">
              Log Out
            </a>
          </div>
          <div class="input_fields_area">
            <h1 class="section_title">Dashboard</h1>
            <form class="input_area">
              <ul class="input_area_list">
                <li class="input_field_item">
                  <label for="post_title">
                    <b>Title:</b>
                  </label>
                  <input
                    type="text"
                    id="post_title"
                    placeholder="Title of Post"
                  />
                </li>
                <li class="input_field_item">
                  <label for="class_name">
                    <b>Class:</b>
                  </label>
                  <select name="classes" id="class_name" multiple="">
                    <option value="" disabled selected hidden>
                      Choose a class
                    </option>
                    <option value="personal">Personal Project</option>
                    <option value="1004">
                      CS 1004: Introduction to programming for non-majors
                    </option>
                    <option value="1101">
                      CS 1101: Introduction to program design
                    </option>
                    <option value="1102">
                      CS 1102: Accelerated introduction to program design
                    </option>
                    <option value="2011">
                      CS 2011: Introduction to machine organization and assembly
                      language
                    </option>
                    <option value="2022">CS 2022: Discrete mathematics</option>
                    <option value="2102">
                      CS 2102: Object-oriented design concepts
                    </option>
                    <option value="2103">
                      CS 2103: Accelerated object-oriented design concepts
                    </option>
                    <option value="2119">
                      CS 2119: Application building with object-oriented
                      concepts
                    </option>
                    <option value="2223">CS 2223: Algorithms</option>
                    <option value="2301">
                      CS 2301: Systems programming for non-majors
                    </option>
                    <option value="2303">
                      CS 2303: Systems programming concepts
                    </option>
                    <option value="3013">CS 3013: Operating Systems</option>
                    <option value="3041">
                      CS 3041: Human-computer interaction
                    </option>
                    <option value="3043">
                      CS 3043: Social implications of information processing
                    </option>
                    <option value="3133">
                      CS 3133: Foundations of computer science
                    </option>
                    <option value="3431">CS 3431: Database Systems I</option>
                    <option value="3516">CS 3516: Computer Networks</option>
                    <option value="3733">CS 3733: Software Engineering</option>
                    <option value="4032">
                      CS 4032: Numerical methods for linear and nonlinear
                      systems
                    </option>
                    <option value="4033">
                      CS 4033: Numerical methods for calculus and differential
                      equations
                    </option>
                    <option value="4100">
                      CS 4100: Artificial intelligence for interactive media and
                      games
                    </option>
                    <option value="4120">
                      CS 4120: Analysis of algorithms
                    </option>
                    <option value="4123">CS 4123: Theory of computation</option>
                    <option value="4233">
                      CS 4233: Object-oriented analysis and design
                    </option>
                    <option value="4241">
                      CS 4241: Webware - Computational technology for network
                      information systems
                    </option>
                    <option value="4341">CS 4341: Introduction to AI</option>
                    <option value="4342">CS 4342: Machine Learning</option>
                    <option value="4401">
                      CS 4401: Software security engineering
                    </option>
                    <option value="4404">
                      CS 4404: Tools and techinques in computer network security
                    </option>
                    <option value="4432">CS 4432: Database systems II</option>
                    <option value="4445">
                      CS 4445: Data mining and knowledge discovery in databases
                    </option>
                    <option value="4513">
                      CS 4513: Distributed computing systems
                    </option>
                    <option value="4515">CS 4515: Computer architecture</option>
                    <option value="4516">
                      CS 4516: Advanced computer networks
                    </option>
                    <option value="4518">
                      CS 4518: Mobile and ubiquitous computing
                    </option>
                    <option value="4533">
                      CS 4533: Techniques of programming language translation
                    </option>
                    <option value="4536">CS 4536: Programming languages</option>
                    <option value="4731">CS 4731: Computer graphics</option>
                    <option value="4801">
                      CS 4801: Introduction to cryptography and communication
                      security
                    </option>
                    <option value="4802">CS 4802: Biovisualization</option>
                    <option value="4803">
                      CS 4803: Biological and biomedical database mining
                    </option>
                  </select>
                </li>
                <li class="input_field_item">
                  <label for="list_skills">
                    <b>Skills:</b>
                  </label>
                  <select
                    name="skills"
                    id="list_skills"
                    class="selectpicker"
                    multiple
                    data-live-search="true"
                  >
                    <option>Debugging</option>
                    <option>User Design</option>
                    <option>Front-end Development</option>
                    <option>Back-end Development</option>
                    <option>Full-stack Development</option>
                    <option>Web Development</option>
                    <option>QA Testing</option>
                    <option>Algorithms</option>
                    <option>Databases</option>
                    <option>Functional Testing</option>
                    <option>Unit Testing</option>
                    <option>Load/Performance Testing</option>
                    <option>GitHub</option>
                    <option>Linux</option>
                    <option>Operating Systems</option>
                    <option>Scripting</option>
                    <option>Natural Language Processing</option>
                    <option>Cybersecurity</option>
                    <option>Cloud</option>
                    <option>Project Management</option>
                  </select>
                </li>

                <li class="input_field_item">
                  <label for="list_languages">
                    <b>Programming Languages:</b>
                  </label>
                  <select
                    name="skills"
                    id="list_languages"
                    class="selectpicker"
                    multiple
                    data-live-search="true"
                  >
                    <option>Java</option>
                    <option>C</option>
                    <option>C++</option>
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>C#</option>
                    <option>PHP</option>
                    <option>SQL</option>
                    <option>Objective-C</option>
                    <option>R</option>
                    <option>Perl</option>
                    <option>Assembly Language</option>
                    <option>Swift</option>
                    <option>Go</option>
                    <option>Ruby</option>
                    <option>MATLAB</option>
                    <option>Kotlin</option>
                    <option>Racket</option>
                  </select>
                </li>

                <li class="input_field_item">
                  <label for="post_description">
                    <b>Description:</b>
                  </label>
                  <textarea
                    id="post_description"
                    class="input_table_item"
                    placeholder="Enter a description here"
                  ></textarea>
                </li>
                <button class="submit_button" onClick={(e) => this.submit(e)}>
                  Publish Post
                </button>
              </ul>
            </form>
          </div>
          <div class="post_headers_area">
            <table class="post_entry_table">
              <h1 class="section_title">Posts</h1>

              <div class="filter_area">
                <label for="list_class_filter">
                  <b>Filter by course:</b>
                </label>
                <select id="list_class_filter">
                  <option value="" selected disabled hidden>
                    Choose a course
                  </option>
                  <option>Personal Project</option>
                  <option>CS 1004</option>
                  <option>CS 1101</option>
                  <option>CS 1102</option>
                  <option>CS 2011</option>
                  <option>CS 2022</option>
                  <option>CS 2102</option>
                  <option>CS 2103</option>
                  <option>CS 2119</option>
                  <option>CS 2223</option>
                  <option>CS 2301</option>
                  <option>CS 2303</option>
                  <option>CS 3013</option>
                  <option>CS 3041</option>
                  <option>CS 3043</option>
                  <option>CS 3133</option>
                  <option>CS 3431</option>
                  <option>CS 3516</option>
                  <option>CS 3733</option>
                  <option>CS 4032</option>
                  <option>CS 4033</option>
                  <option>CS 4100</option>
                  <option>CS 4120</option>
                  <option>CS 4123</option>
                  <option>CS 4233</option>
                  <option>CS 4241</option>
                  <option>CS 4341</option>
                  <option>CS 4342</option>
                  <option>CS 4401</option>
                  <option>CS 4404</option>
                  <option>CS 4432</option>
                  <option>CS 4445</option>
                  <option>CS 4513</option>
                  <option>CS 4515</option>
                  <option>CS 4516</option>
                  <option>CS 4518</option>
                  <option>CS 4533</option>
                  <option>CS 4536</option>
                  <option>CS 4731</option>
                  <option>CS 4801</option>
                  <option>CS 4802</option>
                  <option>CS 4803</option>
                </select>

                <label for="list_skills_filter">
                  <b>Filter by skills:</b>
                </label>
                <select
                  id="list_skills_filter"
                  class="selectpicker"
                  multiple
                  data-live-search="true"
                >
                  <option>Debugging</option>
                  <option>User Design</option>
                  <option>Front-end Development</option>
                  <option>Back-end Development</option>
                  <option>Full-stack Development</option>
                  <option>Web Development</option>
                  <option>QA Testing</option>
                  <option>Algorithms</option>
                  <option>Databases</option>
                  <option>Functional Testing</option>
                  <option>Unit Testing</option>
                  <option>Load/Performance Testing</option>
                  <option>GitHub</option>
                  <option>Linux</option>
                  <option>Operating Systems</option>
                  <option>Scripting</option>
                  <option>Natural Language Processing</option>
                  <option>Cybersecurity</option>
                  <option>Cloud</option>
                  <option>Project Management</option>
                </select>

                <label for="list_languages_filter">
                  <b>Filter by languages:</b>
                </label>
                <select
                  id="list_languages_filter"
                  class="selectpicker"
                  multiple
                  data-live-search="true"
                >
                  <option>Java</option>
                  <option>C</option>
                  <option>C++</option>
                  <option>Python</option>
                  <option>JavaScript</option>
                  <option>C#</option>
                  <option>PHP</option>
                  <option>SQL</option>
                  <option>Objective-C</option>
                  <option>R</option>
                  <option>Perl</option>
                  <option>Assembly Language</option>
                  <option>Swift</option>
                  <option>Go</option>
                  <option>Ruby</option>
                  <option>MATLAB</option>
                  <option>Kotlin</option>
                  <option>Racket</option>
                </select>

                <button class="filter_button" onClick={(e) => this.filter(e)}>
                  Filter
                </button>
                <button
                  class="reset_filter_button"
                  onClick={(e) => this.resetFilter(e)}
                >
                  Reset Filters
                </button>
              </div>
              {/* <tbody> */}
              {this.state.posts.map((post, i) => (
                <Post
                  key={i}
                  app={this}
                  postID={post._id}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  profilePic={post.linkToProfilePic}
                  bodyContent={post.bodyContent}
                  header={post.header}
                  skills={post.skills}
                  languages={post.languages}
                  date={post.date}
                  profileID={post.postedByProfile}
                  classNumber={post.forClassNumber}
                  classDepartment={post.forClassDepartment}
                />
              ))}
              {/* </tbody> */}
            </table>
          </div>
        </div>
      </>
    );
  }
}

var mountNode = document.getElementById("dashboard");
ReactDOM.render(<Dashboard />, mountNode);
