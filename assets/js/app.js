$(document).ready(function () {
	$('.modal').modal();

	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year
		onStart: () => {
			$('.picker').appendTo('body');
		}
	});

	$('[data-publication]').on('click', function (event) {
		let container = document.getElementById('publicaciones');
		let type = $(event.currentTarget).data('publication');
		publish(container, type);
	});
});


//LIMPIAR MODALES
function cleanModal(id) {
	let inputs = document.querySelectorAll('#' + id + ' input');
	for (let input of inputs) {
		input.value = '';
	}
	inputs = document.querySelectorAll('#' + id + ' textarea');
	for (let input of inputs) {
		input.value = '';
	}
	$('#' + id).modal('close');
}

//TARJETA DE PUBLICACIONES
function Card(type){
    this.type = type;
    // crea el contenido de la tarjeta
    this.content = document.createElement("DIV");
    this.content.classList.add("card-panel", "hoverable");
    this.content.draggable = true;

    // agregar el título de la tarjeta
    this.addTitle = (type) => {
      let title = document.getElementById(this.type+"-titulo").value;
      let titleLabel = document.createElement("H3");
      titleLabel.appendChild(document.createTextNode(title));
      this.content.appendChild(titleLabel);
		  this.title = title;
    }

    /**
    *
    * @field : info to be deploy. Required
    * @element : html element, by defaul p
    * @clases: classes to be added, by defaul none
    */
    this.addField = (...arguments) => {
      if(arguments.length < 1) return null;


        console.log(arguments[0]);
        console.log(this.type+"-"+arguments[0].value);

      let text = (document.getElementById(this.type+"-"+arguments[0]) && document.getElementById(this.type+"-"+arguments[0]).value) || arguments[0];

      let element = document.createElement(arguments[1] || "P");
      element.appendChild(document.createTextNode(text));

      if(arguments.length >= 2) {
        for(let i = 2; i<arguments.length; i++ ){
          typeof arguments[i] === "string" && element.classList.add(arguments[i]);
        }
      }

      this.content.appendChild(element);
    }
}

//FUNCIÓN PUBLICACIONES
function publish(container, type) {
	switch (type) {
	case 'msj':
		{
			publicarMsj(container);
			break;
		}
	case 'img':
		{
			publicarImg(container);
			break;
		}
	case 'video':
		{
			publicarVideo(container);
			break;
		}
	default:
		break;
	}
}


//PUBLICAR MENSAJES
function publicarMsj(container) {
	var card = new Card('msj');
	card.addTitle();
	card.addField('archivo', 'P', 'flow-text')
	container.appendChild(card.content);
	cleanModal('msj_modal');
	return true;
}
