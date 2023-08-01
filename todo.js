var conditions = {
  perPage: 3,
  currentPage: 1,
};

var Work = [
  { id: 1, name: "wake up" },
  { id: 2, name: "brush one's teeth" },
  { id: 3, name: "wash one's face" },
  { id: 4, name: "have breakfast" },
  { id: 5, name: "wear clothes" },
  { id: 6, name: "take the backpack" },
  { id: 7, name: "go to work" },
  { id: 8, name: "lunch break" },
  { id: 9, name: "having lunch" },
  { id: 10, name: "gaming" },
];

renderListWork();

function addWork() {
  var id = Date.now();
  var name = document.getElementById("name").value;
  var data = { id: id, name: name, status: false };
  var isValid = check(data);
  if (!isValid) {
    return;
  }
  Work.unshift(data);
  renderListWork();
  clear();
  getPage(1);
}

function check({ name }) {
  if (name !== "") {
    if (name.length > 20) {
      alert("work phải nhỏ hơn 20 ký tự");
      return false;
    }
  } else {
    alert("chưa nhập work");
    return false;
  }

  return true;
}

function clear() {
  id = "";
  document.getElementById("name").value = "";
}

function doneWork(id) {
  var work = Work.find((item) => item.id === id);
  work.id = work.id;
  work.name = work.name;
  work.status = true;

  renderListWork();
}

function condition() {
  let newWork = JSON.parse(JSON.stringify(Work));

  var totalItem = newWork.length;
  renderNumberPage(totalItem);
  document.getElementById("totalitem").innerHTML = `${totalItem} work`;

  newWork = newWork.slice(
    (conditions.currentPage - 1) * conditions.perPage,
    (conditions.currentPage - 1) * conditions.perPage + conditions.perPage
  );
  return newWork;
}

function renderListWork() {
  var array = condition();
  var data = array.map((item) => {
    data = `<tr>
                <td>${item.id}</td>
                <td>${
                  item.status === true ? 'style = "color:red"' : item.name
                }</td>
                <td>
                <button onclick="editWork(${item.id})">
                    Edit
                </button>
                </td>
                <td>
                <button onclick="doneWork(${item.id})">
                    Wait
                </button>
                </td>
            </tr>`;
    return data;
  });

  document.getElementById("tableWork").innerHTML = data.join("");
}

var idUPdate;
function editWork(id) {
  idUPdate = id;
  var work = Work.find((item) => item.id === id);
  document.getElementById("name").value = work.name;
}

function updateWork() {
  var work = Work.find((item) => item.name === idUPdate);
  work.id = work.id;
  work.name = document.getElementById("name").value;
  var pram = { id: work.id, name: work.name };
  var isValid = check(pram);
  if (!isValid) {
    return;
  }
  renderListWork();
  clear();
}

function renderNumberPage(length) {
  var totalPage = Math.ceil(length / conditions.perPage);
  let list = "";
  for (let i = 1; i <= totalPage; i++) {
    list += `<li ${
      i === conditions.currentPage ? 'style="color:red"' : ""
    } onclick="getPage(${i})">${i}</li>`;
  }
  document.getElementById("numberPage").innerHTML = list;
}

function getPage(i) {
  conditions.currentPage = i;
  renderListWork();
}
