window.onload = function(){
	
	var button = document.querySelector("button"),
	    buttonAdd = document.querySelector(".buttonAdd"),
      buttMySalary = document.querySelector(".mySalary"),
	    calendar = document.querySelector("#calendar1"),
	    today = new Date(),
      functionCallCounter = 0;

      buttMySalary.disabled = true;

  //for creare next month
	function nexMonth(numberMonth){
		var D1 = new Date(new Date().getFullYear(),new Date().getMonth()+numberMonth,0),
		    D1last = new Date(D1.getFullYear(),D1.getMonth()+numberMonth,0).getDate(), // the last day of the month( 0 show the last day )
		    D1Nlast = new Date(D1.getFullYear(),D1.getMonth(),D1last).getDay(),  
		    D1Nfirst = new Date(D1.getFullYear(),D1.getMonth(),1).getDay(), 
		    month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]; // Create the array of months

    createCalendar(D1 ,D1Nfirst,D1last, nexMonth.calendar1);
    addNamesOfDays(D1, month, nexMonth.calendar1);
	}//nexMonth

  nexMonth.calendar1 = '<tr>';
	nexMonth(1);
  //fot creat calendar
  function createCalendar(firstDayOfMonth, firstDay, lastDay, idOfEltment){
    nexMonth.calendar1 = '<tr>';
      // the empty cells to the first day of the current month
    if (firstDay != 0) {
      for (var  i = 1; i < firstDay; i++){
        idOfEltment += '<th>';
      }
    }else{ //  if the first day is a sunday we create a empty cells
      for (var i = 0; i < 6; i++){
        idOfEltment += '<th>';
      }
    }
    // the days of month
    for (var i = 1; i <= lastDay; i++) {
      if (i != today.getDate()) {
        idOfEltment += '<td>' + i;
      }else{
        idOfEltment += '<td id="today">' + i;
        calendar1 = idOfEltment; 
       }
      if (new Date(firstDayOfMonth.getFullYear(),firstDayOfMonth.getMonth(),i).getDay() === 0) {  // If the day falls on a Sunday, then the line feed
        idOfEltment += '<tr>';
      }
    }
    //  the empty cells of the last day of the  month
    if (lastDay != 0) {
      for (var i = lastDay; i < 7; i++) {
        idOfEltment += '<th>';
      }
    }

    nexMonth.calendar1 = idOfEltment;
  }
  //add Names Of Days
  function addNamesOfDays(firstDayOfMonth,month, ItemToAdd){
      nexMonth.calendar1 = '<tr>';

    var tbody = document.createElement("tbody");
        
    document.querySelector('#calendar1').appendChild(tbody);
    tbody.classList.add('tbody1');
    tbody.innerHTML = ItemToAdd,
    nexMonth.calendar1 = '<tr>';
    document.querySelector('#calendar1 thead td:last-child').innerHTML = firstDayOfMonth.getFullYear();
    document.querySelector('#calendar1 thead td:first-child').innerHTML = "По " + month[firstDayOfMonth.getMonth()];
    var td =  document.querySelectorAll("#calendar1 tbody td");

      for (var todayi = 0; todayi <= today.getDate(); todayi++) {
        if (todayi ===  today.getDate()){
          td[todayi - 1].className ='today';
        }
      }
  }
	
	buttonAdd.addEventListener('click', AddMonth);
	// for add month
	function AddMonth(){
		var countTbody = calendar.querySelectorAll('tbody'),
        lengthTbody = countTbody.length +1;
      
		nexMonth(lengthTbody);
	
    functionCallCounter >= 1 ? scheduleFun() : false ;
		
	}//AddMonth

	button.addEventListener('click', scheduleFun);// create event for calculate the chart
	//common function for Building schedule
  function scheduleFun(){
		
		var TDinPage = document.querySelectorAll('#calendar1 tbody td'); 
        
		if (functionCallCounter === 0) {
			questionOne = prompt("Вы работаете сегодня?да или нет?");
			questionTwo =  prompt("Вы работаете завтра?да или нет?");
		}
		
    addWorkSpendDays(questionOne, TDinPage, questionTwo);
		
		functionCallCounter++;

    document.querySelectorAll('.spentTheDay').length >= 1 ? buttMySalary.disabled = false : false;
	}//scheduleFun
  //function for add work or spend days 
  function addWorkSpendDays(qOne, TDinP, qTwo){

    switch (qOne) {
      case 'да':
        workToday(TDinP, qTwo);
        break;
      case 'нет':
        doNotWorkToday(TDinP, qTwo);
        break;
      default:
        alert('что-то не то ввели');
    }
  }
  // if work today
  function workToday(TDinP, qTwo){

    if (questionTwo === "да") {
      for (var i = today.getDate()+1; i <= TDinP.length; i += 4) {
        if (TDinP[i]) {
          TDinP[i].classList.add('bord');
          if (TDinP[i + 1]) {
            TDinP[i + 1].classList.add('bord');
          }
        }
      }//The end of the cycle
          
      for (var i = today.getDate() - 1; i >= 0; i -= 4) {//the spent days   
        if (i -3 >= 0 ) {
          TDinP[i -3].classList.add('spentTheDay');
        }
        if (i -4 >= 0 ) {
          TDinP[i -4].classList.add('spentTheDay');
        }    
      }// the end cycle of the spent days
    }// the end of the second yes
        
    if (qTwo === "нет") {
      for (var i = today.getDate(); i <= TDinP.length ; i += 4){
        if (TDinP[i]) {
          TDinP[i].classList.add('bord');
          if (TDinP[i + 1]) {
            TDinP[i + 1].classList.add('bord');
          }
        }
      }// the end of the second cycle
          
    for (var i = today.getDate() - 1; i >= 0; i -=4 ){//the spent days
        if (i >= 0  && i != today.getDate() - 1  ) {
          TDinP[i].classList.add('spentTheDay');
        }  
        if (i - 1 >= 0  ) {
          TDinP[i -1].classList.add('spentTheDay');
        }
      }//the end cycle of the spent days
    }//the end of stipulation NO
  }
  //if do not work today
  function doNotWorkToday(TDinPage, questionTwo){

    if (questionTwo === "да"){
      for (var i = today.getDate() + 2; i <= TDinPage.length; i += 4) {
        if (TDinPage[i]) {
          TDinPage[i].classList.add('bord');
        if (TDinPage[i + 1]) {
          TDinPage[i + 1].classList.add('bord');
              }
            }
          }//The end of the cycle
      for (var i = today.getDate() - 1; i >= 0; i -=4 ) {//the spent days
        if (i - 2 >= 0) {
          TDinPage[i -2].classList.add('spentTheDay');
        }
        if (i - 3 >= 0 ) {
          TDinPage[i -3].classList.add('spentTheDay');
        }
      }//the end cycle of the spent days
    }//the end of second Yes

    if (questionTwo === "нет") {
      for (var i = today.getDate()-1 ; i <= TDinPage.length; i += 4) {
        if ( i != today.getDate()-1 && TDinPage[i] ) {
          TDinPage[i].classList.add('bord');
        }    
        if (TDinPage[i + 1]) {
            TDinPage[i + 1].classList.add('bord');
        }
      }
      for (var i = today.getDate() - 1; i >= 0; i -=4 ) {//the spent days
        if (i - 1 >= 0) {
          TDinPage[i -1].classList.add('spentTheDay');
        }
        if (i - 2 >= 0 ) {
          TDinPage[i -2].classList.add('spentTheDay');
        }
      }//The end of the cycle of days worked
    }//The end of the second NO
  }
  //event for calculate the salary
  buttMySalary.addEventListener('click', calculateSalary);

  function calculateSalary(){

    var oneWorkDay = prompt('Какая стоимость одной смены?'),
        allWorkDays = document.querySelectorAll('.spentTheDay').length;

    isNaN(oneWorkDay) ? alert('Введите число') : alert('Вы заработали ' + (+oneWorkDay) * allWorkDays);
  }
  
  }// onload

