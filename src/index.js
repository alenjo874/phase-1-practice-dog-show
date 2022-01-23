fetch("http://localhost:3000/dogs")
  .then((res) => res.json())
  .then((dogs) => displayDogs(dogs));

const tBody = document.querySelector("#table-body");
const dogNameBubble = document.querySelector("form > input[name=name] ");
const dogBreedBubble = document.querySelector("form > input[name=breed] ");
const dogSexBubble = document.querySelector("form > input[name=sex] ");
const dogSubmitBubble = document.querySelector("form > input[type=submit] ");
const dogEditForm = document.querySelector("#dog-form");

function displayDogs(dogs) {
  console.log(dogs);
  dogs.forEach((dog) => {
    tableRow = document.createElement("tr");
    tableDetName = document.createElement("td");

    tableDetBreed = document.createElement("td");
    tableDetSex = document.createElement("td");
    tableDetEdit = document.createElement("td");
    buttonTag = document.createElement("button");
    buttonTag.id = dog.id;

    tableDetName.textContent = dog.name;
    tableDetBreed.textContent = dog.breed;
    tableDetSex.textContent = dog.sex;
    buttonTag.textContent = "Edit";
    tableDetEdit.append(buttonTag);

    //click button to populate text bubbles
    //then edit bubbles to send PATH request

    buttonTag.addEventListener("click", (e) => {
      fetch(`http://localhost:3000/dogs/${e.target.id}`)
        .then((res) => res.json())
        .then((singleDog) => dogEditFunction(singleDog));

      function dogEditFunction(singleDog) {
        dogNameBubble.value = singleDog.name;
        dogBreedBubble.value = singleDog.breed;
        dogSexBubble.value = singleDog.sex;
        dogEditForm.id = e.target.id + "dog";
      }
    });

    tableRow.append(tableDetName, tableDetBreed, tableDetSex, tableDetEdit);
    tBody.append(tableRow);
  });
}

dogEditForm.addEventListener("submit", (e) => {
  let data = {
    name: dogNameBubble.value,
    breed: dogBreedBubble.value,
    sex: dogSexBubble.value,
  };

  fetch(`http://localhost:3000/dogs/${e.target.id[0]}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});
