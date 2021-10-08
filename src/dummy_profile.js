document.getElementById("save_profile").onclick = (e) => {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("I am getting pressed");

  const json = getProfileFromFields(),
    body = JSON.stringify(json);

  // Submit the POST request
  fetch("/create_profile", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    });
};

function getProfileFromFields() {
  // TODO
  return {
    linkToProfile: "LinkToProfile",
    bio: "Bio",
    firstName: "FirstName",
    lastName: "LastName",
    grade: "Grade",
    phoneNum: "PhoneNum",
  };
}
