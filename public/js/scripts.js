window.onload = function () {
	const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString("en-CA");
	const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleDateString("en-CA");

	// Change input dates
	document.getElementById("firstDayInput").value = firstDayOfMonth;
	document.getElementById("lastDayInput").value = lastDayOfMonth;

	pageLoad(firstDayOfMonth, lastDayOfMonth);
}

function pageLoad(firstDay, lastDay) {
	// Remove old stats
	if (!!document.getElementById("incomeCard")) document.getElementById("statsGrid").removeChild(document.getElementById("incomeCard"))
	if (!!document.getElementById("expensesCard")) document.getElementById("statsGrid").removeChild(document.getElementById("expensesCard"))

	// Remove old data
	document.getElementById("cards").innerHTML = "";

	// Add loader
	const loader = document.createElement('div')
	loader.id = "loader"
	loader.innerHTML = `
<!-- Custom Loader -->
<div style="height: 60vh" class="flex">
	<!-- Heroicon name: outline/refresh -->
	<svg xmlns="http://www.w3.org/2000/svg" class="m-auto animate-spin-reverse h-10 w-10 text-gray-400"
	     viewBox="0 0 20 20"
	     fill="currentColor">
		<path fill-rule="evenodd" clip-rule="evenodd"
		      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
	</svg>
</div>`
	document.body.insertBefore(loader, document.getElementById('cards'))

	// Fetch data from server to create cards on load
	fetch("/read", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"firstDay": firstDay,
			"lastDay": lastDay
		})
	})
		.then(res => {
			return res.json();
		})
		.then(res => {
			// Handle empty form
			if (res.length === 0) {
				document.getElementById(
					"loader"
				).innerHTML = `
<div style="height: 60vh" class="flex flex-col justify-center m-auto text-center">
	<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
	     aria-hidden="true">
		<path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
		      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
	</svg>
	<h3 class="mt-2 text-sm font-medium text-gray-900">No items for current filter</h3>
	<p class="mt-1 text-sm text-gray-500">
		But you can always create a new one.
	</p>
	<div class="mt-6">
		<button onclick="addItem()"
		        class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-theme-600 hover:bg-theme-700">
			<!-- Heroicon name: solid/plus -->
			<svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
			     aria-hidden="true">
				<path fill-rule="evenodd" clip-rule="evenodd"
				      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
			</svg>
			Add Item
		</button>
	</div>
</div>`;
				return;
			}

			// Sort data
			res.sort((a, b) => b.date.localeCompare(a.date));

			// Group data into days
			let jsons = [];

			// Process first transaction
			jsons[0] = {
				date: res[0].date,
				I: 0,
				O: 0,
				transactions: []
			};
			if (res[0].isIn) jsons[0].I += res[0].amount;
			else jsons[0].O += res[0].amount;
			jsons[0].transactions.push({
				id: res[0]._id,
				date: res[0].date,
				isIn: res[0].isIn,
				amount: res[0].amount,
				note: res[0].note
			});

			// Repeat for all transactions and add to previous date when possible
			for (let i = 1; i < res.length; i++) {
				if (res[i].date !== jsons[jsons.length - 1].date) {
					jsons.push({
						date: res[i].date,
						I: 0,
						O: 0,
						transactions: []
					});
				}
				if (res[i].isIn) jsons[jsons.length - 1].I += res[i].amount;
				else jsons[jsons.length - 1].O += res[i].amount;
				jsons[jsons.length - 1].transactions.push({
					id: res[i]._id,
					date: res[i].date,
					isIn: res[i].isIn,
					amount: res[i].amount,
					note: res[i].note
				});
			}

			// Add statistics
			let I = 0;
			let O = 0;

			jsons.forEach(day => {
				I += day.I;
				O += day.O;
			});

			// TODO: get last iteration's data for comparison
			let prevI = 23945;
			let prevO = 83456;

			let incomeCard = document.createElement("div");
			incomeCard.id = "incomeCard"
			incomeCard.setAttribute("class", "relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden");
			incomeCard.innerHTML = `
<dt>
	<div class="absolute bg-yellow-500 rounded-md pl-3.5 pr-2.5 py-3">
		<!-- Heroicon name: outline/login -->
		<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
		     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
			      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
		</svg>
	</div>
	<p class="ml-16 text-sm font-medium text-gray-500 truncate">Income</p>
</dt>
<dd class="ml-16 pb-6 flex justify-between items-baseline">
	<div class="flex items-baseline text-2xl font-semibold text-gray-900">
		$${(I / 100).toFixed(0)}
		<span class="ml-2 text-sm font-medium text-gray-500">
			from $${(prevI / 100).toFixed(0)}
		</span>
	</div>
	<div class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-theme-100 text-theme-600 md:mt-2 lg:mt-0">
		<!-- Heroicon name: solid/${(I < prevI) ? "arrow-sm-down" : "arrow-sm-up"} -->
		<svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-theme-500"
		     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
		     aria-hidden="true">
			${(I < prevI)
				? '<path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>'
				: '<path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>'}
		</svg>
		$${Math.abs(((I - prevI) / 100).toFixed(0))}
	</div>
	<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
		<div class="text-sm">
			<a href="#" class="font-medium text-theme-600 hover:text-theme-500"> View Top
				<span class="sr-only"> Top </span></a>
		</div>
	</div>
</dd>`;

			let expensesCard = document.createElement("div");
			expensesCard.id = "expensesCard"
			expensesCard.setAttribute("class", "relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden");
			expensesCard.innerHTML = `
<dt>
	<div class="absolute bg-green-500 rounded-md pl-3.5 pr-2.5 py-3">
		<!-- Heroicon name: outline/logout -->
		<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
		     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
			      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
		</svg>
	</div>
	<p class="ml-16 text-sm font-medium text-gray-500 truncate">Expenses</p>
</dt>
<dd class="ml-16 pb-6 flex justify-between items-baseline">
	<div class="flex items-baseline text-2xl font-semibold text-gray-900">
		$${(O / 100).toFixed(0)}
		<span class="ml-2 text-sm font-medium text-gray-500">
			from $${(prevO / 100).toFixed(0)}
		</span>
	</div>
	<div class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-theme-100 text-theme-600 md:mt-2 lg:mt-0">
		<!-- Heroicon name: solid/${(O < prevO) ? "arrow-sm-down" : "arrow-sm-up"} -->
		<svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-theme-500"
		     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
		     aria-hidden="true">
			${(O < prevO)
				? '<path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>'
				: '<path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>'}
		</svg>
		$${Math.abs(((O - prevO) / 100).toFixed(0))}
	</div>
	<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
		<div class="text-sm">
			<a href="#" class="font-medium text-theme-600 hover:text-theme-500"> View Top
				<span class="sr-only"> Top </span></a>
		</div>
	</div>
</dd>`;

			document.getElementById("statsGrid").insertBefore(incomeCard, document.getElementById("dateRangePickerId"))
			document.getElementById("statsGrid").insertBefore(expensesCard, document.getElementById("dateRangePickerId"))

			// Add cards
			jsons.forEach(day => createCard(day));

			// Remove spinner
			document.body.removeChild(document.getElementById("loader"));
		});
}

function updateDate() {
	const firstDay = document.getElementById('firstDayInput').value;
	const lastDay = document.getElementById('lastDayInput').value;
	if (firstDay !== null && lastDay !== null && firstDay !== "" && lastDay !== "") pageLoad(firstDay, lastDay)
}

function viewAllTimes() {
	pageLoad("0000-00-00", "9999-99-99")
}

function addItem() {
	let div = document.createElement("div");
	div.setAttribute("id", "overlayAdd");
	div.setAttribute("class", "fixed z-10 inset-0 overflow-y-auto");
	div.setAttribute("aria-labelledby", "modal-title");
	div.setAttribute("role", "dialog");
	div.setAttribute("aria-modal", "true");
	div.innerHTML = `
<div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
	<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
	<form action="/create" method="post"
	      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
		<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div>
				<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-theme-100">
					<!-- Heroicon name: outline/plus-circle -->
					<svg class="h-6 w-6 text-theme-600" xmlns="http://www.w3.org/2000/svg" fill="none"
					     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</div>
				<div class="mt-3 text-center sm:mt-5">
					<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
						Add Item</h3>
					<div class="mt-2">
						<!-- Amount and Type -->
						<div>
							<label for="amount"
							       class="block text-sm sm:text-left font-medium text-gray-700">Amount</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span class="text-gray-500 sm:text-sm"> $ </span></div>
								<input type="number" id="amount" name="amount" min="0.01" step="0.01"
								       placeholder="0.00" required
								       class="focus:ring-theme-500 focus:border-theme-500 block w-full pl-7 pr-12 text-gray-500 sm:text-sm border-gray-300 rounded-md">
								<div class="absolute inset-y-0 right-0 flex items-center">
									<label for="type" class="sr-only">Type</label>
									<select id="type" name="type"
									        class="focus:ring-theme-500 focus:border-theme-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
										<option value="expense" selected>Expense</option>
										<option value="income">Income</option>
									</select>
								</div>
							</div>
						</div>
						<br>
						<!-- Date -->
						<div>
							<label for="date" class="block text-sm sm:text-left font-medium text-gray-700">Date</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="date" id="date" name="date" value='${new Date().toLocaleDateString("en-CA")}' required
								       class="focus:ring-theme-500 focus:border-theme-500 block w-full text-gray-500 sm:text-sm border-gray-300 rounded-md">
							</div>
						</div>
						<br>
						<!-- Note -->
						<div>
							<label for="note" class="block text-sm sm:text-left font-medium text-gray-700">Note</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" id="note" name="note" placeholder="optional"
								       class="focus:ring-theme-500 focus:border-theme-500 block w-full text-gray-500 sm:text-sm border-gray-300 rounded-md">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
			<button type="submit"
			        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-theme-600 text-base font-medium text-white hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500 sm:ml-3 sm:w-auto sm:text-sm">
				Add Item
			</button>
			<button type="button" onclick="document.body.removeChild(document.getElementById('overlayAdd'))"
			        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
				Cancel
			</button>
		</div>
	</form>
</div>`;
	document.body.appendChild(div);
}

function editItem(id, date, isIn, amount, note) {
	let div = document.createElement("div");
	div.setAttribute("id", "overlayEdit");
	div.setAttribute("class", "fixed z-10 inset-0 overflow-y-auto");
	div.setAttribute("aria-labelledby", "modal-title");
	div.setAttribute("role", "dialog");
	div.setAttribute("aria-modal", "true");
	div.innerHTML = `
<div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
	<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
	<form action="/update" method="post"
	      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
		<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div>
				<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
					<!-- Heroicon name: outline/pencil-alt -->
					<svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none"
					     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
					</svg>
				</div>
				<div class="mt-3 text-center sm:mt-5">
					<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
						Edit Item</h3>
					<div class="mt-2">
						<!-- Hidden ID for POST -->
						<input type='text' value='${id}' name='id' required class='hidden'>
						<!-- Amount and Type -->
						<div>
							<label for="amount"
							       class="block text-sm sm:text-left font-medium text-gray-700">Amount</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span class="text-gray-500 sm:text-sm"> $ </span></div>
								<input type="number" id="amount" name="amount" min="0.01" step="0.01"
								       placeholder="0.00" value='${amount / 100}' required
								       class="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-7 pr-12 text-gray-500 sm:text-sm border-gray-300 rounded-md">
								<div class="absolute inset-y-0 right-0 flex items-center">
									<label for="type" class="sr-only">Type</label>
									<select id="type" name="type"
									        class="focus:ring-yellow-500 focus:border-yellow-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
										<option value="expense" ${isIn ? "" : " selected"}>Expense</option>
										<option value="income" ${isIn ? " selected" : ""}>Income</option>
									</select>
								</div>
							</div>
						</div>
						<br>
						<!-- Date -->
						<div>
							<label for="date" class="block text-sm sm:text-left font-medium text-gray-700">Date</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="date" id="date" name="date" value='${date}' required
								       class="focus:ring-yellow-500 focus:border-yellow-500 block w-full text-gray-500 sm:text-sm border-gray-300 rounded-md">
							</div>
						</div>
						<br>
						<!-- Note -->
						<div>
							<label for="note" class="block text-sm sm:text-left font-medium text-gray-700">Note</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" id="note" name="note" value='${note}' placeholder="optional"
								       class="focus:ring-yellow-500 focus:border-yellow-500 block w-full text-gray-500 sm:text-sm border-gray-300 rounded-md">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
			<button type="submit"
			        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm">
				Edit Item
			</button>
			<button type="button" onclick="document.body.removeChild(document.getElementById('overlayEdit'))"
			        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
				Cancel
			</button>
			<button type="button" onclick='deleteItem("${id}")'
			        class="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:mr-auto sm:w-auto sm:text-sm">
				Delete
			</button>
		</div>
	</form>
</div>`;
	document.body.appendChild(div);
}

async function deleteItem(id) {
	await fetch("/delete", {
		method: "Post",
		body: JSON.stringify({id: id}),
		headers: {
			"Content-Type": "application/json"
		}
	}).then((window.location.href = "/"));
}

function createCard(json) {
	let div = document.createElement("div");
	div.setAttribute("class", "max-w-7xl mx-auto pt-12 sm:px-6 lg:px-8");
	let list = "";
	let color = false;

	// Insert list items
	json.transactions.forEach(transaction => {
		// Change color for alternating rows
		if (color) list += "<div class='bg-white";
		else list += "<div class='bg-gray-50";
		color = !color;

		list +=
			" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'> <dt class='text-base font-medium ";
		// Change color for type
		if (transaction.isIn) list += "text-green-600'> ";
		else list += "text-yellow-500'> ";
		list +=
			"<div class='w-0 flex-1 flex items-center'> " +
			"<svg class='flex-shrink-0 h-4 w-4 ";
		// Change color for type
		if (transaction.isIn) list += "text-green-600' ";
		else list += "text-yellow-500' ";
		list +=
			"xmlns='http://www.w3.org/2000/svg' fill='currentColor' " +
			"aria-hidden='true' viewBox='0 0 18 18' x-description='Heroicon name: solid/";

		// Change svg for type
		if (transaction.isIn) {
			list +=
				"plus-sm'> " +
				"<path fill-rule='evenodd' " +
				"d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' " +
				"clip-rule='evenodd'/> </svg> ";
		} else {
			list +=
				"minus-sm'> " +
				"<path fill-rule='evenodd' " +
				"d='M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z' " +
				"clip-rule='evenodd'/> </svg> ";
		}

		// Insert amount
		list +=
			"<div> $" +
			transaction.amount / 100 +
			" </div> </div> </dt> " +
			"<dd class='mt -1 ";
		// Change color for type
		if (transaction.isIn) list += "text-green-600";
		else list += "text-yellow-500";
		list +=
			" sm:mt-0 sm:col-span-2'> " +
			"<div class='flex items-center justify-between'> " +
			"<div class='w-0 flex-1 flex items-center'> " +
			"<span class='flex-1 w-0'>";

		// Insert Note
		list += transaction.note;

		list += `</span> </div> <div class='ml-4 flex-shrink-0'>
			<button class='font-medium `;
		// Change color for type
		if (transaction.isIn) list += `text-green-600 hover:text-green-700' `;
		else list += `text-yellow-500 hover:text-yellow-600' `;
		list += `onclick="editItem('${transaction.id}', '${transaction.date}', ${transaction.isIn}, ${transaction.amount}, '${transaction.note}')"> Edit </button> </div> </div> </dd> </div>`;
	});

	div.innerHTML =
		"<div class='max-w-4xl mx-auto'> " +
		"<div class='bg-white shadow overflow-hidden sm:rounded-lg'> " +
		"<div class='px-4 py-5 sm:px-6'> " +
		"<h3 class='text-lg leading-6 font-medium text-gray-900'> " +
		new Date(Date.parse(json.date)).toDateString() +
		" </h3> <p class='mt-1 max-w-2xl text-sm text-gray-500'> Income: $" +
		(json.I / 100).toFixed(2) +
		", Expenses: $" +
		(json.O / 100).toFixed(2) +
		" </p> </div> <div class='border-t border-gray-200'> <dl> " +
		list +
		"</dl> </div> </div> </div>";
	document.getElementById('cards').appendChild(div);
}
