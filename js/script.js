// функция перебора элементов из input 'Данные'. если значение по типу подходит, то оно записывается в массив
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//поиск в html блока с результатами и скрывание его
	hideAllResponseBlocks = () => {
		// в responseBlocksArray записывается новый массив из возможных исходов результатов 
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебор массива и присвоение каждому display = 'none'
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// функция показывания нужного исхода в блоке "Результаты"
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// запуск поиска и скрытия блока с результатами
		hideAllResponseBlocks();
		//показывать нужный блок с классом, который передали в blockSelector
		document.querySelector(blockSelector).style.display = 'block';
		console.log(spanSelector);
		//проверка - передан ли span( не undefined ли он)
		if (spanSelector) {
			// вывод на страницу результа, переданного в msgText. конец выполнения программы.
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// вывод на экран ошибки через ф-ю showResponseBlock
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// вывод на экран нужный результат через ф-ю showResponseBlock, в которуюю передается класс, текст сообщения и id span
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// перводачальный показ при отсутствии данных в инпут
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//функция фильтрации данных из input 'Данные'
	tryFilterByType = (type, values) => {
		try {
			// c помощью eval запускается filterByType, создается массив из данных типа type, и потом переводится в строку через ', '
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// проверка на наличие valuesArray. если в input нет данных с подходящим типом то valuesArray.lenghth будет 0
			const alertMsg = (valuesArray.length) ?
				//запишет в alertMsg перечень подходящих данных
				`Данные с типом ${type}: ${valuesArray}` :
				//запишет что таких нет
				`Отсутствуют данные типа ${type}`;
			// запуск ф-ии показа результатов и передача в неё сообщения выше
			showResults(alertMsg);
		} catch (e) {
			// в случае возникновения ошибки в правильности ввода в input, запустит showError и передаст ей ошибку
			showError(`Ошибка: ${e}`);
		}
	};

// кнопка "Фильтровать"
const filterButton = document.querySelector('#filter-btn');

//слушатель на кнопку 
filterButton.addEventListener('click', e => {
	//number, string и bulean в 'Типы данных'
	const typeInput = document.querySelector('#type');
	//input с "Данные"
	const dataInput = document.querySelector('#data');

	// проверка input на пустую строку
	if (dataInput.value === '') {
		// текст в всплывашке если поле будет пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// показывать в "Результаты": Пока что нечего показать.
		showNoResults();
	} else {
		// убрать всплывашку
		dataInput.setCustomValidity('');
		//чтобы страница не перезагружалась при нажатии кнопки
		e.preventDefault();
		//запуск функции фильтрации и передача в неё какой Тип данных нужен, и значение из input с обрезкой возможных пробелов по бокам
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

