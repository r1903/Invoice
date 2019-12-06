// selecting elements to add eventlistners
const addRow = document.querySelector(".addrow");
const hide =  document.querySelector(".logo");
const remove = document.querySelector(".table");
const element = document.querySelector(".savepdf");
const addname = document.querySelector(".addname");

//adding eventlistner
addRow.addEventListener('click',addTable);
hide.addEventListener('click',hideTable);
remove.addEventListener('click',removeRow);
element.addEventListener("click",onClick);
addname.addEventListener('click',addName);

//function to add new row in table 
function addTable(e) {
  
        const productName = document.getElementById("products").value;
        const price = document.getElementById("price").value;
        const quantity = document.getElementById("quantity").value;
        const shipp = document.getElementById("shipp").value;

 //calculating new row number       
        const tbody = document.querySelector(".table");
        const rowCount =tbody.rows.length;
        const row = document.querySelector(".table").insertRow(rowCount);
//adding cells to new row
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
// inserting value to the new cells        
        cell1.innerHTML = `<button class="remove">${rowCount}</button>`
        cell2.innerHTML = productName;
        cell3.innerHTML = quantity;
        cell4.innerHTML = price;
        cell5.innerHTML = shipp*quantity;
        cell6.innerHTML = (price*quantity).toFixed(2);
// calculating total value for  second table
        const totalVal = document.querySelector(".table2").querySelectorAll("td");
        totalVal[0].innerHTML = `£ ${(parseFloat((totalVal[0].innerHTML).match(/\d+?\.\d+/)[0]) + price*quantity).toFixed(2)}`;
        totalVal[1].innerHTML = `£ ${(parseFloat((totalVal[1].innerHTML).match(/\d+?\.\d+/)[0]) + shipp*quantity).toFixed(2)}`;
        totalVal[2].innerHTML = `£ ${(parseFloat((totalVal[0].innerHTML).match(/\d+?\.\d+/)[0])+ parseFloat((totalVal[1].innerHTML).match(/\d+?\.\d+/)[0])).toFixed(2)}`;
}

//add first name and last name to invoice
function addName(){
       const firstName = document.getElementById("fname").value;
       const lastName = document.getElementById("lname").value;
       document.querySelector(".coustmer").innerHTML = `${firstName} ${lastName}`
}

// function to hide value selecting row from invoice
function hideTable(){
            let x = document.querySelectorAll(".toggle");
            x.forEach((x)=>x.style.display= x.style.display === "none" ? "": "none")
    }

// function to remove row from table
function removeRow(e){
 //recalculating the total values before deleting row from table
        let rowNo= Number(e.target.innerHTML);
        const totalVal = document.querySelector(".table2").querySelectorAll("td") ;
        totalVal[0].innerHTML = `£ ${(parseFloat((totalVal[0].innerHTML).match(/\d+?\.\d+/)[0]) - parseFloat(document.querySelector(".table").rows[rowNo].cells[5].innerHTML)).toFixed(2)}`;
        totalVal[1].innerHTML= `£ ${(parseFloat((totalVal[1].innerHTML).match(/\d+?\.\d+/)[0]) - parseFloat(document.querySelector(".table").rows[rowNo].cells[4].innerHTML)).toFixed(2)}`;
        totalVal[2].innerHTML = `£ ${(parseFloat((totalVal[0].innerHTML).match(/\d+?\.\d+/)[0]) + parseFloat((totalVal[1].innerHTML).match(/\d+?\.\d+/)[0])).toFixed(2)}`;
    
//deleting the selected row from table       
        document.querySelector(".table").deleteRow(rowNo);
        rowNo =  document.querySelector(".table").rows.count;

//adjusting the items numbers of other rows after deletng the row from table        
        let nodeList =[];
        nodeList=[...document.querySelectorAll(".remove")];
        nodeList.forEach((nodelist,i)=>nodelist.innerHTML=i+1);

}


// function to generate webpage PDF

function onClick() {
       // code to store invoice number in localstorage to manage sequence
        let invoiceId= JSON.parse(localStorage.getItem('invoiceNo')) || '1000';
        document.querySelector(".invoiceno").innerHTML = Number(invoiceId)+1;
        invoiceId = Number(invoiceId)+1 ;
        localStorage.setItem('invoiceNo', JSON.stringify(invoiceId));
       //function to generate pdf
        html2canvas(document.body, {useCORS: true,
            onrendered: function (canvas) {
              let imgData = canvas.toDataURL('image/png');
            

               let doc = new jsPDF('p', 'pt', 'a4');
               doc.addImage(imgData, 'PNG', 10, 10,595.28, 592.28/canvas.width * canvas.height);
               const name = document.querySelector(".coustmer").innerHTML;
             doc.save(`${invoiceId}/${name}.pdf`);
              }
         });
};



  
  