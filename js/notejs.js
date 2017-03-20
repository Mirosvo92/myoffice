window.onload = function(){

	var input = document.querySelector(".inOne"),
		button = document.querySelector(".save"),
		ul = document.querySelector(".ulOne"),
		list = [],
		tasks = localStorage.getItem('tasks');

	 	if (tasks) {
	 		list = JSON.parse(tasks);
	 	}

	 	update();

	function update(){
		ul.innerHTML = " ";
	 	
	 	for (var i = 0; i < list.length; i++) {
	 	 	var li = document.createElement("li");
	 	 	li.innerHTML = list[i];
	 	 	ul.appendChild(li);
	 		createBut = document.createElement("button");
	 		createBut.classList.add('del');
	 		li.appendChild(createBut);

	 		createBut.innerHTML = "Удалить";
	 		createButEdit = document.createElement("button");
	 		createButEdit.classList.add('edit');
	 		li.appendChild(createButEdit);
	 		createButEdit.innerHTML = "Редактировать";
		 }

	  	function child(id, tag) {//create array  of child elements
			var children = ul.childNodes,
				i, length = children.length, array = [];
				tag = tag.toUpperCase();

			for(i = 0; i < length; i++) {
				if(children[i].tagName == tag) {
  				 	array.push(children[i]);
				}
			}
				  return array;
		}

	  	var delLi = ul.querySelectorAll(".del");

		for (var i = 0; i < delLi.length; i++) {
  			delLi[i].addEventListener('click', function() {
  		    var areYouShure = confirm("Удалить?");

  		    if (areYouShure === true) {
				var childArray = child('test', 'li');
				var prov = this.parentNode.parentNode.removeChild(this.parentNode);			
				list.splice(childArray.indexOf(prov),1);
				localStorage.setItem('tasks', JSON.stringify(list));
				}
    		});
		}

		var editLi = ul.querySelectorAll(".edit");
		
		for (var i = 0; i < editLi.length; i++) {
  		    editLi[i].addEventListener('click', function() {
       		var prov = this.parentElement;
			var childArray = child('test', 'li'),
			editAnswer = prompt("Окно редактирования",list[childArray.indexOf(prov)]);
			list[childArray.indexOf(prov)] = editAnswer;
			localStorage.setItem('tasks', JSON.stringify(list));
			update();
    		});
		}
	}	//The end of function update

	button.addEventListener('click', addInfo);

	function addInfo(){
		var liInfo = input.value;

		if (liInfo === "") {
			alert("Не ввели данные");
		}else{
			list.push(liInfo);
		}
		
		update();

		input.value = "";
		localStorage.setItem('tasks', JSON.stringify(list));
	}

	document.onkeydown = function(event){
		event = event || window.event;
    	
		

		event.keyCode === 13 ? button.click() : false;
	}

	var deleteAll = document.querySelector(".deleteAll");

	deleteAll.addEventListener('click', deleteAllLi);
	function deleteAllLi(){
		var areYouShure = confirm("Удалить?");

		if (areYouShure === true) {
		localStorage.removeItem('tasks');
		var count = list.length ;
	
			for (var i = 0; i <= count; i++) {
			ul.removeChild(ul.firstChild);
			list.shift();
			
			}
		}
	}
		
}
