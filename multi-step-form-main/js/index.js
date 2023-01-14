let parentRigthDiv = document.getElementById("right");
let loginDiv = document.getElementById("login").content;
let selectPlanDiv = document.getElementById("selectYourPlan").content;
let addonDiv = document.getElementById("pickaddons").content;
let finishupDiv = document.getElementById("finishup").content;
let finalDiv = document.getElementById("final").content;
parentRigthDiv.appendChild(loginDiv.cloneNode(true));

(() => {
  const userInfo = {
    name: "",
    email: "",
    phone: "",
  };
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  sessionStorage.setItem("plan", "monthly");
  sessionStorage.setItem("plansChoosen", JSON.stringify([]));
  loginStateManager();
})();

// State manager Functions

function loginStateManager() {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  document.getElementById("name").value = userInfo.name;
  document.getElementById("email").value = userInfo.email;
  document.getElementById("phone").value = userInfo.phone;
}

function selectplanstate() {
  let plansArray = Array.from(
    JSON.parse(sessionStorage.getItem("plansChoosen"))
  );
  let plans = document.querySelectorAll(".planBox");

  for (let i of plans) {
    if (plansArray.includes(i.attributes.planchoosen.value)) {
      i.checked = true;
    }
  }
}

function addonstate() {
  let plansArray = Array.from(
    JSON.parse(sessionStorage.getItem("addonChoosen"))
  );
  let plans = document.querySelectorAll("#addon");

  for (let i of plans) {
    if (plansArray.includes(i.attributes.planchoosen.value)) {
      i.checked = true;
    }
  }
}

//

function nextButtonNav() {
  let to = this.attributes.to.value;
  let from = this.attributes.from.value;
  let navApplay;
  try {
    navApplay = this.attributes.onNav.value;
  } catch {}

  switch (from) {
    case "login":
      loginProcess();
      break;
    case "selectplan":
      selectPlanProcess();
      break;
    case "addon":
      addonProcess();
      break;
  }

  switch (to) {
    case "selectplan":
      selectPlan(this);
      selectplanstate();
      break;
    case "addon":
      addons(this);
      addonstate();
      break;
    case "login":
      //  addNav("nav1");
      login(this);
      loginStateManager();
      break;
    case "finishup":
      finishup(this);
      finishupCreation();
      break;
    case "final":
      final(this);
  }
  addNav(navApplay);
}
// Render functions
function login(elem) {
  removeChildren();
  parentRigthDiv.appendChild(loginDiv.cloneNode(true));
}
function selectPlan(elem) {
  removeChildren();
  parentRigthDiv.appendChild(selectPlanDiv.cloneNode(true));

  function toogleEventPlan() {
    console.log("hi");
  }

  let monthly = document.querySelector(".inputMonthly");
  let yearly = document.querySelector(".inputYearly");

  let plan = sessionStorage.getItem("plan");

  if (plan == "monthly") {
    monthly.checked = true;
  } else {
    yearly.checked = true;
  }

  monthly.addEventListener("change", function (params) {
    let elms = document.querySelectorAll("#yearlyNote");
    let elms2 = document.querySelectorAll("#planrate");

    let rate = ["$9/mo", "$12/mo", "$15/mo"];

    for (let i = 0; i < elms2.length; i++) {
      elms2[i].innerText = rate[i];
    }

    for (let i of elms) {
      i.style.visibility = "hidden";
    }
    sessionStorage.setItem("plan", "monthly");
  });

  yearly.addEventListener("change", function (params) {
    let elms = document.querySelectorAll("#yearlyNote");
    let elms2 = document.querySelectorAll("#planrate");

    let rate = ["$90/mo", "$120/mo", "$150/mo"];

    for (let i = 0; i < elms2.length; i++) {
      elms2[i].innerText = rate[i];
    }

    for (let i of elms) {
      i.style.visibility = "visible";
    }
    sessionStorage.setItem("plan", "yearly");
  });
}
function addons(elem) {
  removeChildren();
  parentRigthDiv.appendChild(addonDiv.cloneNode(true));
}

function finishup(elem) {
  removeChildren();
  parentRigthDiv.appendChild(finishupDiv.cloneNode(true));
}

function final(elem) {
  removeChildren();
  parentRigthDiv.appendChild(finalDiv.cloneNode(true));
}

// process functions

function loginProcess() {
  const userInfo = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  loginStateManager();
}

function selectPlanProcess() {
  let plancheckBoxes = Array.from(document.querySelectorAll(".planBox"));
  let checkedPlans = plancheckBoxes.filter((elem) => elem.checked);
  checkedPlans = checkedPlans.map((elem) => elem.attributes.planchoosen.value);

  sessionStorage.setItem("plansChoosen", JSON.stringify(checkedPlans));
}

function addonProcess() {
  let addoncheckBoxes = Array.from(document.querySelectorAll("#addon"));
  let checkedaddon = addoncheckBoxes.filter((elem) => elem.checked);
  checkedaddon = checkedaddon.map((elem) => elem.attributes.planchoosen.value);

  sessionStorage.setItem("addonChoosen", JSON.stringify(checkedaddon));
}

function removeChildren() {
  let children = parentRigthDiv.children;

  for (let i of children) {
    parentRigthDiv.removeChild(i);
  }
}
function addNav(cur) {
  let navButton = document.querySelectorAll(".nav-button");
  for (let i of navButton) i.parentElement.classList.remove("isNavActive");

  document.querySelector(`.${cur}`).parentElement.classList.add("isNavActive");
}

// **********************Finish PageCreation***************************************

function finishupCreation() {
  let plantakenDiv = document.getElementById("plantakenDiv");
  let addontakenDiv = document.getElementById("addontakenDiv");
  let total = 0;

  let ptdiv = document.createElement("div");
  ptdiv.id = "ptdiv";
  let atdiv = document.createElement("div");
  atdiv.id = "atdiv";

  let ptPrice = {
    Pro: 15,
    Advanced: 12,
    Arcade: 9,
  };

  let atPrice = {
    onlineService: 1,
    largeStorage: 2,
    custProfile: 3,
  };

  let planChoosen = JSON.parse(sessionStorage.getItem("plansChoosen"));
  let pack = sessionStorage.getItem("plan");
  let addonChoosen = JSON.parse(sessionStorage.getItem("addonChoosen"));

  for (let i of planChoosen) {
    let pdW = document.createElement("div");
    pdW.id = "pdW";
    let pd1 = document.createElement("div");
    pd1.id = "pd1";
    let h2Txt = document.createElement("h2");
    h2Txt.innerText = `${i} (${pack})`;
    pd1.appendChild(h2Txt);
    pdW.appendChild(pd1);
    let pd2 = document.createElement("div");
    pd2.id = "pd2";
    let h2Prc = document.createElement("h2");
    if (sessionStorage.getItem("plan") === "yearly") {
      h2Prc.innerText = `$${ptPrice[i] * 10}/${
        pack === "monthly" ? "mo" : "yr"
      }`;
      total += ptPrice[i] * 10;
    } else {
      h2Prc.innerText = `$${ptPrice[i]}/${pack === "monthly" ? "mo" : "yr"}`;
      total += ptPrice[i];
    }
    pd2.appendChild(h2Prc);
    pdW.appendChild(pd2);

    ptdiv.appendChild(pdW);
  }
  plantakenDiv.appendChild(ptdiv);
  plantakenDiv.appendChild(document.createElement("hr"));

  for (let i of addonChoosen) {
    let adW = document.createElement("div");
    adW.id = "adW";
    let ad1 = document.createElement("div");
    ad1.id = "ad1";
    let h2Txt = document.createElement("h2");
    h2Txt.innerText = `${i}`;
    ad1.appendChild(h2Txt);
    adW.appendChild(ad1);
    let ad2 = document.createElement("div");
    ad2.id = "ad2";
    let h2Prc = document.createElement("h2");
    if (sessionStorage.getItem("plan") === "yearly") {
      h2Prc.innerText = `+$${atPrice[i] * 10}/${
        pack === "monthly" ? "mo" : "yr"
      }`;
      total += atPrice[i] * 10;
    } else {
      h2Prc.innerText = `+$${atPrice[i]}/${pack === "monthly" ? "mo" : "yr"}`;
      total += atPrice[i];
    }
    ad2.appendChild(h2Prc);
    adW.appendChild(ad2);

    atdiv.appendChild(adW);
  }
  addontakenDiv.appendChild(atdiv);

  let tot = document.createElement("div");
  tot.id = "tot";
  let tot1 = document.createElement("div");
  tot1.id = "tot1";
  let tot2 = document.createElement("div");
  tot2.id = "tot2";
  let h2t = document.createElement("h2");
  h2t.innerText = `Total (per ${pack})`;
  tot1.appendChild(h2t);
  let h2p = document.createElement("h2");
  h2p.innerHTML = `+$${total}/${pack === "monthly" ? "mo" : "yr"}`;
  tot2.appendChild(h2p);
  tot.appendChild(tot1);
  tot.appendChild(tot2);

  document.getElementById("totaldiv").appendChild(tot);
}
