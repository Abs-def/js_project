const myForm = document.querySelector('#my-form');
let amountInput = document.querySelector('#amount');
let descriptionInput = document.querySelector('#description');
let categoryInput = document.querySelector('#category');
console.log(categoryInput.value);
//const msg = document.querySelector('.msg');
let expenseList = document.querySelector('#expenses');

let expenseArr = [];
        

myForm.addEventListener('submit', onSubmit);

        
function onSubmit(e){
    e.preventDefault();
            
    if(amountInput.value == '' || descriptionInput.value == '' || categoryInput == ''){
        window.alert('please fill all the fields');
    }else{
                   
        let expenseDetails = {
            amount : amountInput.value,
            description : descriptionInput.value,
            category : categoryInput.value,
            // id : Date.now()
        };

              //console.log(userDetails);
           
        axios
            .post("https://crudcrud.com/api/c91e30a8c8384064806758874bc248bd/expenseData", expenseDetails)
            .then((res) => {
                console.log('response data: ', res.data);
                displayDetails();
            })
            .catch((err) => console.log(err));

        amountInput.value = '';
        descriptionInput.value = '';
        categoryInput.value = '';
    }
}
        
        

// function removeFromScreen(mail){
//     let childNodeToBeDeleted = document.getElementById(mail);
//           if(childNodeToBeDeleted){
//             userList.removeChild(childNodeToBeDeleted);
//           }
// }

window.addEventListener('DOMContentLoaded', displayDetails);
        
async function displayDetails(){
    expenseList.innerHTML = '';

    let temp = await axios.get("https://crudcrud.com/api/c91e30a8c8384064806758874bc248bd/expenseData");

    temp.data ? temp.data.forEach((element) => {
        const li = document.createElement('li');
            
        li.appendChild(document.createTextNode(`amount: ${element.amount}, description: ${element.description}, category: ${element.category}`));
        li.setAttribute('id', element._id);

            
        let deleteBtn = document.createElement('button');
        let editBtn = document.createElement('button');

        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.appendChild(document.createTextNode('Edit'));

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        deleteBtn.addEventListener('click', () => deleteFunction(deleteBtn.parentElement.id));
        editBtn.addEventListener('click', () => editFunction(editBtn.parentElement.id));

        expenseList.appendChild(li);
    }) : '' ;
}

async function editFunction(id){
          // console.log(id);
    let toEditURL = `https://crudcrud.com/api/c91e30a8c8384064806758874bc248bd/expenseData/${id}`;
          //console.log(toEdit);
          
    let newAmount;
    let newDescription;
    let newCategory;
    let res = await axios.get(`${toEditURL}`);

    newAmount = res.data.amount;
    newDescription = res.data.description;
    newCategory = res.data.category;

    axios.delete(`${toEditURL}`)
        .then(() => {
            displayDetails();

            amountInput.value = newAmount;
            descriptionInput.value = newDescription;
            categoryInput.value = newCategory;
        })
        .catch(err => console.log(err));
}

function deleteFunction(id){
    let toDeleteURL = `https://crudcrud.com/api/c91e30a8c8384064806758874bc248bd/expenseData/${id}`;
    //console.log(toDeleteURL);

    axios.delete(`${toDeleteURL}`)
        .then(() => {
            displayDetails();
        })
        .catch(err => console.log(err));
}