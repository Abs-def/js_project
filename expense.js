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
            id : Date.now()
        };

              //console.log(userDetails);
           
        if (expenseArr == null) expenseArr =[];
            expenseArr.push(expenseDetails); 
              //console.log(userArr);

        localStorage.setItem('allExpenses', JSON.stringify(expenseArr));

        displayDetails();

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

window.addEventListener('load', displayDetails);
        
function displayDetails(){
        expenseList.innerHTML = '';

        let temp = JSON.parse(localStorage.getItem('allExpenses'));
        expenseArr = temp;
        console.log(temp);

            
        temp ? temp.forEach((element) => {
            const li = document.createElement('li');
                
            li.appendChild(document.createTextNode(`amount: ${element.amount}, description: ${element.description}, category: ${element.category}`));
            li.setAttribute('id', element.id);

                
            let deleteBtn = document.createElement('button');
            let editBtn = document.createElement('button');

            deleteBtn.appendChild(document.createTextNode('Delete'));
            editBtn.appendChild(document.createTextNode('Edit'));

            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
    
            deleteBtn.addEventListener('click', () => deleteFunction(element.id));
            editBtn.addEventListener('click', () => editFunction(element.id));

            expenseList.appendChild(li);
        }) : '' ;
}

function editFunction(id){
          // console.log(id);
    let toEdit = expenseArr.filter(element => element.id == id);
          //console.log(toEdit);
          
    let newAmount = toEdit[0].amount;
    let newDescription = toEdit[0].description;
    let newCategory = toEdit[0].category;

          // console.log(newName);
          // console.log(newEmail);
          // console.log(userArr);
    let newArr = expenseArr.filter(element => element.id != id);
          //console.log(newArr);
    localStorage.setItem('allExpenses', JSON.stringify(newArr));
    displayDetails();

    amountInput.value = newAmount;
    descriptionInput.value = newDescription;
    categoryInput.value = newCategory;
}

function deleteFunction(id){
          //console.log(id);
    let newArr = expenseArr.filter(element => element.id != id);
          //console.log(newArr);
    localStorage.setItem('allExpenses', JSON.stringify(newArr));
    displayDetails();
}