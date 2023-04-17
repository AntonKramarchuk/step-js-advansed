function showRegestration() {
  const bthRegistration = document.querySelectorAll(
    ".header__nav__list__section__item"
  );

  bthRegistration.forEach((e) => {
    e.classList.toggle("header__nav__list__section__item--hidden");
  });
}

function showForm() {
  document
    .querySelector(".registration")
    .classList.remove("registration--hidden");
}
function getRegistration(email, password) {
  fetch("https://ajax.test-danit.com/api/v2/cards/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer b72e46eb-301f-4f31-a118-033e84b35ab6`,
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.text())
    .then((token) => {
      if (token === "b72e46eb-301f-4f31-a118-033e84b35ab6") {
        localStorage.setItem(
          "token",
          JSON.stringify({
            email: email,
            password: password,
          })
        );
        document
          .querySelector(".registration")
          .classList.add("registration--hidden");
        showRegestration();
        getCards();
      } else {
        document
          .querySelector(".form__not__found")
          .classList.remove("form__not__found--hidden");
      }
    });
}
showRegestration();
function dataVerification() {
  document.querySelector(".form__btn").addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.querySelector(".form__email");
    let password = document.querySelector(".form__password");
    getRegistration(email.value, password.value);
  });
}
dataVerification();

// -------------------------------exid-----------------------

function creatCards() {
  (document.querySelector(".cards__container").innerHTML = renderCards()),
    chaingeDoctor(),
    sendCards();
}

function deleteCads() {
  document.querySelectorAll(".cards__exid").forEach((e) => {
    e.addEventListener("click", (e) => {
      e.path[1].remove();
    });
  });
}
deleteCads();
function renderCards() {
  return `  <form  class="card_form">
  <div class="cards__exid" onclick="deleteCads(event)">X</div>
  <div class="cards">
    <select name="doctor" id="doctor">
    <option value="Стоматолог">Стоматолог</option>
      <option value="Кардіолог">Кардіолог</option>
      <option value="Терапевт">Терапевт</option>
    </select>
    <input type="text" required name="visit" placeholder="Мета візиту" />
    <input type="text" name="description" placeholder="Короткий опис візиту" />
    <select name="prioritet" id="">
      <option value="Звичайна">Звичайна</option>
      <option value="Пріоритетна">Пріоритетна</option>
      <option value="Невідкладна">Невідкладна</option>
    </select>
    <input type="text" required name="name" placeholder="П.І.Б." />
    <div class="cards__more">
    <div class="doctors_delete">
   <input type="text" required name="lastVisit"  placeholder="Дата останнього відвідуванняк" />
  </div></div>
  </div>
  <button type="submit" class="submiot_cards btn">Створити запис</button>
</form>`;
}

// -------------------------------renderCards--------------------------а

function missingCards() {
  if (document.querySelector(".visids_container").innerText === "") {
    document.querySelector(".missing__cards").classList.remove("hidden");
  } else {
    document.querySelector(".missing__cards").classList.add("hidden");
  }
}

function chaingeDoctor() {
  let doctor = document.querySelector("#doctor"),
    rednderDiv = document.querySelector(".cards__more");

  doctor.addEventListener("change", (item) => {
    if (item.target.value === "Кардіолог") {
      deletMore();
      rednderDiv.insertAdjacentHTML("afterEnd", renderCardiologist());
    } else if (item.target.value === "Стоматолог") {
      deletMore();
      rednderDiv.insertAdjacentHTML("afterEnd", renderDentist());
    } else if (item.target.value === "Терапевт") {
      deletMore();
      rednderDiv.insertAdjacentHTML("afterEnd", renderTherapist());
    } else {
    }
  });
}

function deletMore() {
  document.querySelector(".doctors_delete").remove();
}
function renderCardiologist() {
  return ` 
  <div class="doctors_delete">
   <input type="text" required name="pressure" placeholder="звичайний тиск" />
   <input type="text" required name="bodyWeight" placeholder="Індекс маси тіла" />
   <input type="text" required name="transferredDiseases" placeholder="Перенесені захворювання серцево-судинної системи" />
   <input type="text" required name="ageCardiol" placeholder="Вік" />
  </div>`;
}
function renderDentist() {
  return `
  <div class="doctors_delete">
   <input type="text" required name="data" placeholder="Дата останнього відвідуванняк" />
  </div>
  `;
}
function renderTherapist() {
  return `
  <div class="doctors_delete">
   <input type="text" required name="age" placeholder="Вік" />
  </div>
  `;
}
// ------------------------------------------------------cardsmore-------------------

const sentData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer b72e46eb-301f-4f31-a118-033e84b35ab6`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const sendCards = () => {
  const form = document.querySelector(".card_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const value = Object.fromEntries(formData.entries());

    sentData("https://ajax.test-danit.com/api/v2/cards", value);
    getCards();
    deleteCads();
    hiddenFormsCards();
  });
};

function hiddenFormsCards() {
  document.querySelector(".card_form").remove();
}

// ------------------------------------------fetch------------------
class Card {
  constructor(
    doctor = "-",
    name = "-",
    visit = "-",
    age = "-",
    description = "-",
    bodyWeight = "-",
    lastVisit = "-",
    prioritet = "-",
    data = "-",
    ageCardiol = "-",
    transferredDiseases = "-",
    pressure = "-",
    id
  ) {
    this.doctor = doctor;
    this.name = name;
    this.visit = visit;
    this.age = age;
    this.description = description;
    this.bodyWeight = bodyWeight;
    this.lastVisit = lastVisit;
    this.prioritet = prioritet;
    this.data = data;
    this.ageCardiol = ageCardiol;
    this.transferredDiseases = transferredDiseases;
    this.pressure = pressure;
    this.id = id;
  }

  renderDoctorsAppointment() {
    return ` 
    <div class="visid" id="${this.id}">
    <i class="fa-solid fa-x visid__icon" onclick="deleteVisids(${this.id})"></i>
   
      <form action="" class="visid__value">
       <input readonly type="text" name="id" value="Візит №: ${this.id}" class="visid__value__list" />
       <input readonly type="text" name="doctor" value="Доктор: ${this.doctor}"  class="visid__value__list" />
       <input readonly type="text" name="name"  value="П.І.Б: ${this.name}" class="visid__value__list" />
       <div data-tab="${this.id}" class="visids__more__inf hidden" >
       <input readonly type="text" 
       name="visit" value="Мета візиту: ${this.visit} " class="visid__value__list" />
       <input readonly type="text" name="age"  value="Вік: ${this.age}" class="visid__value__list" />
       <input readonly type="text" name="description" value="Короткий опис: ${this.description}" class="visid__value__list" />
       <input readonly type="text" name="bodyWeight" value="індекс тіла: ${this.bodyWeight}" class="visid__value__list" />
       <input readonly type="text" name="lastVisit" value="Останій візіт: ${this.lastVisit}" class="visid__value__list" />
       <input readonly type="text" name="prioritet" value="Пріоритетність: ${this.prioritet}" class="visid__value__list" />
       <input readonly type="text" name="data" value="Дата: ${this.data}" class="visid__value__list" />
       <input readonly type="text" name="ageCardiol" value="Вік: ${this.ageCardiol}" class="visid__value__list" />
       <input readonly type="text" name="transferredDiseases"  value="Cерцево-судинної: ${this.transferredDiseases}" class="visid__value__list" />
       <input readonly type="text" name="pressure"
        value="Тиск: ${this.pressure}" class="visid__value__list" />
    </div>
      <button class="visid__more btn" onclick="handleShowMore(event, '${this.id}')">Показати більше</button>
      <div class="visid__container__chaing">
      <button class="visid__edit btn" onclick="changeCard(event)" >Редагувати</button>
      <button class="visid__edit btn"onclick="seveCard(event,${this.id})" >Зберегти</button>
    </div>
      </form>
    </div>
     `;
  }
}

const changeCard = (e) => {
  e.preventDefault();
  document.querySelectorAll(".visid__value__list").forEach((e) => {
    e.readOnly = false;
  });
};
const seveCard = (e, id) => {
  e.preventDefault();
  console.log(editSeve(id));

  document.querySelectorAll(".visid__value__list").forEach((e) => {
    e.readOnly = true;
  });
};
const getCards = async () => {
  const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: "GET",
    headers: {
      Authorization: `Bearer b72e46eb-301f-4f31-a118-033e84b35ab6`,
    },
  });
  const cards = await response.json();

  document.querySelector(".visids_container").innerHTML = cards
    .map((e) => {
      const newCard = new Card(
        e.doctor,
        e.name,
        e.visit,
        e.age,
        e.description,
        e.bodyWeight,
        e.lastVisit,
        e.prioritet,
        e.data,
        e.ageCardiol,
        e.transferredDiseases,
        e.pressuree,
        e.id
      );

      return newCard.renderDoctorsAppointment();
    })
    .join("");
  missingCards();
};

function handleShowMore(event, id) {
  event.preventDefault();
  document.querySelector(`[data-tab="${id}"]`).classList.toggle("hidden");
}

const deleteVisids = async (id) => {
  const response = await fetch(
    `https://ajax.test-danit.com/api/v2/cards/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer b72e46eb-301f-4f31-a118-033e84b35ab6`,
      },
    }
  );
  if (response.status == 200) {
    document.getElementById(`${id}`).remove();
  }
  missingCards();
};
// -------------------------delete----------------------------------

document.querySelector("#search").oninput = function () {
  console.log(this.value.trim());
  let val = this.value.trim().toLowerCase();
  let searchItem = document.querySelectorAll(".visid__value__list");

  if (val != "") {
    searchItem.forEach((elem) => {
      console.log(elem.value.toLowerCase().search(val), elem);
      if (elem.value.toLowerCase().search(val) == -1) {
        elem.classList.add("hidden");
      } else {
        elem.classList.remove("hidden");
      }
    });
  } else {
    searchItem.forEach((elem) => {
      elem.classList.remove("hidden");
    });
  }
};
// ------------------------------------------------search----------------------

function editCards(id) {
  fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer b72e46eb-301f-4f31-a118-033e84b35ab6`,
    },
    body: JSON.stringify(editSeve()),
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
}

function editSeve() {
  const formData = new FormData(document.querySelector(".visid__value"));
  const value = Object.fromEntries(formData.entries());
  return value;
}
