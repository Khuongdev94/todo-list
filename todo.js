var conditions = {
  perPage: 6,
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
  { id: 11, name: "sleep" },
  { id: 12, name: "read a book" },
  { id: 13, name: "drink water" },
  { id: 14, name: "work" },
  { id: 15, name: "go home" },
];

renderListWork();

function addWork() {
  var arr = Work.map((item) => item.id);
  var id = Math.max(...arr) + 1;
  var name = document.getElementById("name").value;
  var data = { id: id, name: name, status: false };
  var isValid = check(data);
  if (!isValid) {
    return;
  }
  Work.push(data);
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
    data = `<tr ${
      item.status === true ? 'style="background-color: #888;color:white"' : ""
    }>
                <td>${item.id}</td>
                <td ${
                  item.status === true
                    ? 'style="text-decoration: line-through"'
                    : ""
                }>${item.name}</td>
                <td>
                <button ${
                  item.status === true ? 'style = "display : none"' : ""
                } onclick="editWork(${item.id})">
                    Edit
                </button>
                </td>
                <td>
                <button onclick="doneWork(${item.id})">
                    ${item.status === true ? "Done" : "Wait"}
                </button>
                </td>
            </tr>`;
    return data;
  });

  document.getElementById("tableWork").innerHTML = data.join("");
}

function doneWork(id) {
  var work = Work.find((item) => item.id === id);
  work.id = work.id;
  work.name = work.name;
  work.status = !work.status;
  renderListWork();
}

var idUPdate;
function editWork(id) {
  idUPdate = id;
  console.log(idUPdate);
  var work = Work.find((item) => item.id === id);
  document.getElementById("edit").value = work.name;
  document.getElementById("modalEdit").style.display = "block";
}

function updateWork() {
  console.log(idUPdate);
  var works = Work.find((item) => item.id === idUPdate);
  works.id = works.id;
  works.name = document.getElementById("edit").value;
  var pram = { id: works.id, name: works.name };
  var isValid = check(pram);
  if (!isValid) {
    return;
  }
  renderListWork();
  id = "";
  document.getElementById("edit").value = "";
  document.getElementById("modalEdit").style.display = "none";
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
function closeModal() {
  document.getElementById("modalEdit").style.display = "none";
}
