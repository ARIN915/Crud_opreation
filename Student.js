const addBtn = document.getElementById("add-btn");
const registerForm = document.getElementById("register-form");
const modal = document.querySelector(".modal");
var allInput = registerForm.querySelectorAll("input");
const closeBtn = document.querySelector(".close-icon");
var studentData = [];
const idEl = document.getElementById("id");
const nameEl = document.getElementById("name");
const ageEl = document.getElementById("age");
const mobileEl = document.getElementById("mobile");
const schoolEl = document.getElementById("school");
const statusEl = document.getElementById("status");

const registerBtn = document.querySelector("#register-btn");
const updateBtn = document.querySelector("#update-btn");
const searchEl = document.getElementById("search-id");
const searchBtn = document.getElementById("search-btn");
closeBtn.addEventListener("click", () => {

    modal.className = "modal";
    registerForm.reset('');

    registerBtn.id = "register-btn";
    updateBtn.id = "update-btn";
    registerBtn.disabled = false;
    updateBtn.disabled = true;

})

addBtn.addEventListener("click", (e) => {
    modal.className = "modal active";
});


//Register button 
registerBtn.onclick = function (e) {
    e.preventDefault();
    registrationData();
    getDataFromLocal();
}


if (localStorage.getItem("studentData") != null) {
    studentData = JSON.parse(localStorage.getItem("studentData"));
}


function registrationData() {

    if (idEl.value == "" || nameEl.value == "" || ageEl.value == "" || mobileEl.value == "" || schoolEl.value == "" || statusEl.value == "select") {
        (idEl.value == "") ? swal("Id field is empty enter id!", "field cannot be empty!", "error") :
            (nameEl.value == "") ? swal("Please enter name", "Field cannot be empty!", "error") :
                (ageEl.value == "") ? swal("Please enter Age", "Field cannot be empty!", "error") :
                    (mobileEl.value == "") ? swal("Please enter mobile no.", "Field cannot be empty!", "error") :
                        (schoolEl.value == "") ? swal("Please enter school name", "Field cannot be empty!", "error") :
                            (statusEl.value == "select") ? swal("Please select student status", "Select valid Status!", "error") :
                                swal("Field Cannot be Empty", "Enter Some Data!", "error");

    }
    else if (isNaN(idEl.value)) {
        swal("Enter only number!", "Id field can't have charecters!", "error");
    }
    else {

        studentData.push({
            id: idEl.value,
            name: nameEl.value,
            age: ageEl.value,
            mobile: mobileEl.value,
            school: schoolEl.value,
            status: statusEl.value
        });

        var userString = JSON.stringify(studentData);
        localStorage.setItem("studentData", userString);//key value pair
        swal("Good job!", "Your Data has been inserted successfully!", "success");
        registerForm.reset('');
        closeBtn.click();
    }
}

//Returning Data on page from local storage
var tableData = document.getElementById("table-data");
var getDataFromLocal = () => {
    tableData.innerHTML = "";
    studentData.forEach((data, index) => {
        tableData.innerHTML += `
    <tr index='${index}'>
    <td>${index + 1}</td>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.age}</td>
    <td>${data.mobile}</td>
    <td>${data.school}</td>
    <td>${data.status}</td>
    <td>
        <button class ="edit-btn" id ="edit-btn" style="color: #2eb774"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="del-btn" id= "del-btn" style="color: #e4eaec"><i class="fa fa-trash"></i></button>
    </td>
  </tr>
  `;
    });


    // DELETE CODE STARTING;
    var i;
    var allDelBtn = document.getElementsByClassName("del-btn");

    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this Data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    studentData.splice(id, 1);
                    localStorage.setItem("studentData", JSON.stringify(studentData));
                    tr.remove();
                    swal("Success!! Student data has been deleted!", { icon: "success" });
                } else {
                    swal("Your Student data is safe!");
                }
            });


        }
    }
    // UPDATE CODE STARTING
    const allEdit = document.getElementsByClassName("edit-btn");
    for (i = 0; i < allEdit.length; i++) {
        allEdit[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("td");
            var index = tr.getAttribute("index");

            var id = td[1].innerHTML;
            var name = td[2].innerHTML;
            var age = td[3].innerHTML;
            var mobile = td[4].innerHTML;
            var school = td[5].innerHTML;
            var status = td[6].innerHTML;

            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            registerBtn.id = "register-btn2";
            updateBtn.id = "update-btn2";
            idEl.value = id; //Updating the value 
            nameEl.value = name;
            ageEl.value = age;
            mobileEl.value = mobile;
            schoolEl.value = school;
            mobileEl.value = mobile;
            statusEl.value = status;


            updateBtn.onclick = function () {

                studentData[index] = {
                    id: idEl.value,
                    name: nameEl.value,
                    age: ageEl.value,
                    mobile: mobileEl.value,
                    school: schoolEl.value,
                    status: statusEl.value
                }
                localStorage.setItem("studentData", JSON.stringify(studentData));

            }

        }
    }
}
getDataFromLocal();


//search Input
searchBtn.onclick = function () {
    searchFunc();

}
function searchFunc() {
    var tr = tableData.querySelectorAll("tr");
    var filter = searchEl.value;
    var i
    for (i = 0; i < tr.length; i++) {
        var status = tr[i].getElementsByTagName("td")[6].innerHTML;
        if (status.indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {

            tr[i].style.display = "none";
        }
    }
}