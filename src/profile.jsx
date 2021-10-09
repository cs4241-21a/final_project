import React from "react";
import ReactDOM from "react-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import ProfileImage from "./profileIMG";
import "./css/styles.css";

class Profile extends React.Component {
  first_name = "";
  last_name = "";
  phone_number = "";
  grade = "";
  ph;
  courses_taken = [];
  skills = [];
  programming_languages = [];
  bio = "";

  constructor(props) {
    super(props);

    fetch("/get_profile", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        // console.log(profile);

        this.first_name = profile.firstName;
        this.last_name = profile.lastName;
        this.phone_number = profile.phoneNum;
        this.grade = profile.grade;
        this.courses_taken = profile.courses;
        this.skills = profile.skills;
        this.programming_languages = profile.languages;
        this.bio = profile.bio;

        // console.log(this);

        this.setState({});

        if (this.grade !== undefined) {
          document.getElementById("grade_select").value = this.grade;
        }

        if (this.phone_number !== undefined) {
          document.getElementById("phone_number_input").value =
            this.phone_number;
        }

        if (this.courses_taken !== undefined && this.skills !== undefined && this.programming_languages !== undefined) {
          if (this.courses_taken.length > 0) {
            let coursesTakenElement = document.getElementById("class_name");
            for (let i = 0; i < coursesTakenElement.options.length; i++) {
              let currentOption = coursesTakenElement.options[i];

              for (let j = 0; j < this.courses_taken.length; j++) {
                if (currentOption.value === this.courses_taken[j]) {
                  currentOption.selected = true;
                  break;
                }
              }
            }
          }
          if (this.skills.length > 0) {
            let skillsElement = document.getElementById("list_skills");
            for (let i = 0; i < skillsElement.options.length; i++) {
              let currentOption = skillsElement.options[i];

              for (let j = 0; j < this.skills.length; j++) {
                if (currentOption.value === this.skills[j]) {
                  currentOption.selected = true;
                  break;
                }
              }
            }
          }

          if (this.programming_languages.length > 0) {
            let languagesElement = document.getElementById("list_languages");

            for (let i = 0; i < languagesElement.options.length; i++) {
              let currentOption = languagesElement.options[i];

              for (let j = 0; j < this.programming_languages.length; j++) {
                if (currentOption.value === this.programming_languages[j]) {
                  currentOption.selected = true;
                  break;
                }
              }
            }
          }
        }
        
      });

    console.log("this.first_name", this.first_name);

    this.submit = this.submit.bind(this);
    this.update_selected_courses = this.update_selected_courses.bind(this);
    this.update_selected_skills = this.update_selected_skills.bind(this);
    this.update_selected_programming_languages =
      this.update_selected_programming_languages.bind(this);
  }

  submit() {
    let json = {
      firstName: this.first_name,
      lastName: this.last_name,
      phoneNum: this.phone_number,
      grade: this.grade,
      courses: this.courses_taken,
      skills: this.skills,
      languages: this.programming_languages,
      bio: this.bio,
    };

    fetch("/create_profile", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log);

    console.log("submitting json: ", json);
  }

  update_selected_courses(e) {
    let coursesDropdown = e.currentTarget;
    let selected_courses = [...coursesDropdown.selectedOptions].map(
      (option) => option.value
    );
    this.courses_taken = selected_courses;
  }

  update_selected_skills(e) {
    let skillsDropdown = e.currentTarget;
    let selected_skills = [...skillsDropdown.selectedOptions].map(
      (option) => option.value
    );
    this.skills = selected_skills;
  }

  update_selected_programming_languages(e) {
    let languagesDropdown = e.currentTarget;
    let selected_languages = [...languagesDropdown.selectedOptions].map(
      (option) => option.value
    );
    this.programming_languages = selected_languages;
  }

  render() {
    return (
      <div class="dashboard_grid_layout">
        <div class="header_bar_area">
          {/* <header class="header_area"> */}
          <h1 class="app_title">
            <b>Tech Teammate Tagup</b>
          </h1>
          <a href="/dashboard.html" type="button" class="profile_link">
            Dashboard
          </a>
          <a href="/logout" type="button" class="logout_link">
            Log Out
          </a>
        </div>
        <div class="input_fields_area">
          <h1 class="section_title">Profile</h1>
          <form class="input_area">
            <ul class="input_area_list">
              <li class="input_field_item">
                <label for="profile_image">
                  <b>Profile Image:</b>
                </label>
                <ProfileImage />
              </li>
              <li class="input_field_item">
                <label for="profile_first_name">
                  <b>First Name:</b>
                </label>
                <input
                  type="text"
                  id="profile_first_name"
                  placeholder="First Name"
                  defaultValue={this.first_name}
                  onKeyUp={(e) => (this.first_name = e.target.value)}
                />
              </li>

              <li class="input_field_item">
                <label for="profile_last_name">
                  <b>Last Name:</b>
                </label>
                <input
                  type="text"
                  id="profile_last_name"
                  placeholder="Last Name"
                  defaultValue={this.last_name}
                  onKeyUp={(e) => (this.last_name = e.target.value)}
                />
              </li>

              <li class="input_field_item">
                <label for="profile_phone_number">
                  <b>Phone Number:</b>
                </label>
                <div style={{ backgroundColor: "white" }}>
                  <MuiPhoneNumber
                    defaultCountry={"us"}
                    id="phone_number_input"
                    defaultValue={this.phone_number}
                    onChange={(e) => {
                      this.phone_number = e.toString();
                      this.setState({ number: e });
                    }}
                  />
                </div>
              </li>

              <li class="input_field_item">
                <label for="grade_select">
                  <b>Grade:</b>
                </label>
                <select
                  name="grade_select"
                  id="grade_select"
                  multiple=""
                  //   defaultValue={this.grade}
                  onChange={(e) => (this.grade = e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Choose your year
                  </option>
                  <option value="Freshman">Freshman</option>
                  <option value="Junior">Junior</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Senior">Senior</option>
                  <option value="Grad Student">Grad Student</option>
                  <option value="Other">Other</option>
                </select>
              </li>

              <li class="input_field_item">
                <label for="class_name">
                  <b>Courses Taken:</b>
                </label>
                <select
                  name="classes"
                  id="class_name"
                  class="selectpicker"
                  multiple
                  data-live-search="true"
                  onChange={this.update_selected_courses}
                >
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
                    CS 2119: Application building with object-oriented concepts
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
                    CS 4032: Numerical methods for linear and nonlinear systems
                  </option>
                  <option value="4033">
                    CS 4033: Numerical methods for calculus and differential
                    equations
                  </option>
                  <option value="4100">
                    CS 4100: Artificial intelligence for interactive media
                    andgames
                  </option>
                  <option value="4120">CS 4120: Analysis of algorithms</option>
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
                  onChange={this.update_selected_skills}
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
                  onChange={this.update_selected_programming_languages}
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
                <label for="profile_bio">
                  <b>Profile Bio:</b>
                </label>
                <textarea
                  id="profile_bio"
                  class="input_table_item"
                  placeholder="Enter relevant info about yourself that you want others to see"
                  defaultValue={this.bio}
                  onKeyUp={(e) => (this.bio = e.target.value)}
                ></textarea>
              </li>
              <button class="submit_button" onClick={(e) => this.submit(e)}>
                Save Profile
              </button>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

// fetch('/get_profile', {
//     method:'POST',
//     body: JSON.stringify({}),
//     headers:{
//         "Content-Type": "application/json"
//     }
// })

var mountNode = document.getElementById("profile");
ReactDOM.render(<Profile />, mountNode);
