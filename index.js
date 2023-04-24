// Function to delete the note form localStorage
function deleteNote(index) {
    let isConfirm = confirm("Do you really want to delete this note?");
    if (isConfirm) {
        console.log("I am deleting ")
        console.log(index)
        notes = localStorage.getItem('notes');
        notesObj = JSON.parse(notes);
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        show();
    } else {
        show();
    }

}

// Function to Edit the node from the lcoalStorage
function editNotes(index) {
    console.log("I am editing")
    id = index;
    console.log(id);
    notes = localStorage.getItem('notes');
    notesObj = JSON.parse(notes)
    console.log(notesObj[id])
    oldTitle = notesObj[id].title;
    oldDesc = notesObj[id].desc;
    newTitle = prompt("Edit your title", oldTitle);
    newDesc = prompt('Edit your description', oldDesc);
    console.log(newTitle, newDesc)
    confirmation = confirm("Do you really want to save these changes");
    if (confirmation) {
        notesObj[id].title = newTitle;
        notesObj[id].desc = newDesc;
        localStorage.setItem('notes', JSON.stringify(notesObj));
    } else {

    }
    show();

}


// Function to show the notes from localStorage
function show() {
    notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    let html = "";
    notesObj.forEach((element, index) => {
        html += ` 
        <div  class="items">
            <div>
                <div class=" title"> ${element['title']} </div>
                <div class="desc">${element['desc']}</div>
            </div>
            <div>
                <button id=${index} onclick="deleteNote(this.id)" class="btn" class="delete">Delete</button>
                <button id=${index} onclick="editNotes(this.id)" class="btn" class="edit">Edit</button>
            </div>
        </div>`;
    });
    if (notesObj.length != 0) {
        itemsElem = document.getElementById('itemsElem');
        itemsElem.innerHTML = html;
    }
    else {
        itemsElem = document.getElementById('itemsElem');
        itemsElem.innerHTML = `<h1> Nothing to show Add a note to see here </h1>`;
    }

}


btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
    let addTitle = document.getElementById('forTit');
    let addDesc = document.getElementById('forDesc');

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        desc: addDesc.value,
    }
    if (myObj.title.length == 0 && myObj.desc.length==0) {
        alert("Enter a valid title or valid description.")
    } else {
        notesObj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTitle.value = "";
        addDesc.value = "";
    }

    show();

})

show();