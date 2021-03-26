let cafes = [
  {
    name: "HighLand",
    city: "Hà Nội",
  },
  {
    name: "Cộng",
    city: "Hồ Chí Minh",
  },
  {
    name: "Phúc Long",
    city: "Bắc Ninh",
  },
  {
    name: "Starbucks",
    city: "Vũng Tàu",
  },
  {
    name: "The Coffe House",
    city: "Hà Nội",
  },
];

function updateDataLocal(value) {
  localStorage.setItem(localStorage.length, JSON.stringify(value));
}

function isEqual(obj1, obj2) {
  return obj1.name === obj2.name && obj1.city === obj2.city;
}

function removeDataLocal(choose) {
  for (i in localStorage) {
    let data = JSON.parse(localStorage.getItem(i));
    if (data !== null && isEqual(choose, data)) {
      localStorage.removeItem(i);
    }
  }
}

function renderItem(doc) {
  let myForm = document.getElementById("cafe-list");
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  name.textContent = doc.name;
  city.textContent = doc.city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  myForm.appendChild(li);
  cross.addEventListener("click", () => {
    myForm.removeChild(li);
    removeDataLocal(doc);
  });
}

function communicateLocal() {
  if (localStorage.length === 0) {
    cafes.forEach((doc) => {
      updateDataLocal(doc);
    });
  }
  for (let i in localStorage) {
    let data = JSON.parse(localStorage.getItem(i));
    if (data !== null) renderItem(data);
  }
}

let inputForm = document.getElementById("add-cafe-form");

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = inputForm.name.value;
  let city = inputForm.city.value;
  let myObj = { name, city };
  renderItem(myObj);
  updateDataLocal(myObj);
  inputForm.city.value = "";
  inputForm.name.value = "";
});

communicateLocal();
