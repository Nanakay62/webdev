let apiStringInit = "https://swapi.dev/api/starships/";
let apiStringNext = " ";
let apiStringPrev = " ";
let firstRun = true;


function loadTable(ships, shipListElements) {	
	const list= shipListElements.children[1];
	list.innerHTML ="";

	ships.forEach(function(ship){

		let listItem = document.createElement("tr");
		listItem.innerHTML ='<td class="tableBorder">'+ship.name+'</td>' +
						'<td class="tableBorder">'+ship.length+'</td>'+
                        '<td class="tableBorder">'+ship.crew+'</td>';

                        
		listItem.addEventListener("click", function (event) {
      //when clicked the default link behavior should be stopped, and the ship details function should be called...passing the value of the href attribute in
      event.preventDefault();
      getShipDetails(ship.url);
    });

		list.appendChild(listItem);
})

	function renderShipDetails(shipData) {
  console.log(shipData);

  let Name = document.querySelector(".name");
  let Model = document.querySelector(".model");

  Name.innerHTML = shipData.name;
  Model.innerHTML = shipData.model;
}

	function getShipDetails(url) {
  //call getJSON functions for the provided url
  getShips(url).then(function (data) {
    renderShipDetails(data);
    //with the results populate the elements in the #detailsbox
  });
}


}
function getJSON(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getShips(url) {
	return getJSON(url);

}

function getInitial(url ="https://swapi.dev/api/starships/") {
	getShips(url).then(function(data) {
		console.log(data);

		const results = data.results;

    //get the list element
    const shipListElement = document.getElementById("characTable");
    loadTable(results, shipListElement);

    // enable the next and prev buttons.
    if (data.next) {
      const next = document.getElementById("nextBtn");
      // normally we would prefer the addEventListener method of adding a listener. Using something like 'element.onEvent = event_function' has the limitation of only being able to hold one listener of the type we choose. In this case that is a good thing however. Because we are not re-creating the buttons each time we load a new batch of data we could end up with several listeners attached to each button by the last page. We won't have that issue here.
      next.ontouchend = () => {
        // notice to show the next page we just re-call the showShips function with a new URL
        showShips(data.next);
      };
    }
    if (data.previous) {
      const prev = document.getElementById("prevBtn");

      prev.ontouchend = () => {
        showShips(data.previous);
      };
    }
  });
}

function getNext() {
	
}


function getPrev() {
	const response =  fetch(apiStringPrev);
	const jsonData =  response.json();

	loadTable(jsonData);
}

getInitial();



