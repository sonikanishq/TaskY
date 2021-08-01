const taskContainer = document.querySelector(".task__container");
let globalStore = [];
console.log(taskContainer);

const generateNewCard = (taskData) => 
	 `
  <div class="col-sm-12 col-md-6 col-lg-4 mb-3 ${taskData.id}">
						<div class="card border-primary">
					<div class="card-header border-primary d-flex justify-content-end gap-2">
						<button type="button" class="btn btn-outline-primary"><i class="fas fa-pen"></i></button>

<button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
					</div>
					<div class="card-body">
						<img src=${taskData.imageUrl} class="img-thumbnail" alt="dark">
					  <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
					  <p class="card-text">${taskData.taskType}</p>
					  <a href="#" class="btn btn-primary">${taskData.taskDescription}</a>
					</div>
				  </div>
			</div>
  `;

const loadInitialCardData = () => {
    //localstorage to get tasky card data
	const getCardData = localStorage.getItem("tasky");

	//convert to normal object
	const {cards} = JSON.parse(getCardData);

	//loop over those array of task object to create HTML card, inject it to DOM
	cards.map((cardObject) => {
		taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
		//update our globalStore
		globalStore.push(cardObject);
	}
	
	)
};

//Delete function

const deleteCard = (event) => {
     event = window.event;
	 const targetID = event.target.id;
	 const tagname = event.target.tagName;

	 globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
	 localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
	 if(tagname === "BUTTON"){
       return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
	 }
	 else {
		return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
	 }
};
const saveChanges = () => {
  const taskData = {
      id: `${Date.now()}`,
      imageUrl: document.getElementById("imageurl").value,
      taskTitle: document.getElementById("tasktitle").value,
      taskType: document.getElementById("tasktype").value,
      taskDescription: document.getElementById("taskdescription").value
  };
  
   taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

   globalStore.push(taskData);
   localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

};




