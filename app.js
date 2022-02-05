(() => {
	const hoursWrapper = document.querySelector(".hours");
	const minutesWrapper = document.querySelector(".minutes");
	const secondsWrapper = document.querySelector(".seconds");
	const timeWrapper = document.querySelector("h1.time");
	const form = document.forms[0];
	const startPauseBtn = document.querySelector(".stop-continue");
	const terminate = document.querySelector(".terminate");
	let timeToContinueFrom;
	let timeInterval;
	const timeObj = {
		hours: 3600,
		minutes: 60,
		seconds: 1,
	};
	let timeSumInSeconds = 0;

	const createCustomNumberForm = (num) => {
		return num > 9 ? num : `0${num}`;
	};

	const getReadableTimeFromSeconds = (ms) => {
		const date = new Date(ms * 1000);
		const hours = date.toString().slice(16, 18) - 2;
		return ms >= 3600
			? `${createCustomNumberForm(hours)}:${date.toString().slice(19, 24)}`
			: `00:${date.toString().slice(19, 24)}`;
	};

	const createSelectInput = (selectionName, numOfIterations) => {
		const selectInput = document.createElement("select");
		selectInput.name = selectionName;
		selectInput.id = selectionName;
		for (let i = 0; i <= numOfIterations; i++) {
			const number = createCustomNumberForm(i);
			const option = document.createElement("option");
			option.value = number;
			option.textContent = number;
			selectInput.append(option);
		}
		return selectInput;
	};

	// Create select inputs for each time category
	hoursWrapper.prepend(createSelectInput("hours", 60));
	minutesWrapper.prepend(createSelectInput("minutes", 60));
	secondsWrapper.prepend(createSelectInput("seconds", 60));

	const selectInputs = document.querySelectorAll("select");
	selectInputs.forEach((select) => {
		select.onchange = (e) => {
			const seconds = +form.seconds.value;
			const minutes = +form.minutes.value;
			const hours = +form.hours.value;
			timeSumInSeconds =
				seconds * timeObj.seconds +
				minutes * timeObj.minutes +
				hours * timeObj.hours;
		};
	});

	startPauseBtn.onclick = (e) => {
		if (e.target.textContent === "Start") {
			timeWrapper.textContent = getReadableTimeFromSeconds(timeSumInSeconds);
			let counter = 1;
			timeInterval = setInterval(() => {
				let newTimeValue = getReadableTimeFromSeconds(
					timeSumInSeconds - counter
				);
				counter++;
				timeToContinueFrom = timeSumInSeconds - counter;
				if (timeSumInSeconds - counter < 1) {
					clearInterval(timeInterval);
				} else {
					timeWrapper.textContent = newTimeValue;
				}
			}, 1000);
			startPauseBtn.textContent = "Pause";
		}
	};

	terminate.onclick = () => {
		clearInterval(timeInterval);
		timeWrapper.textContent = "00:00:00";
		startPauseBtn.textContent = "Start";
	};
})();
