const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
	const task = taskInput.value;
	const priority = priorityInput.value;
	const deadline = deadlineInput.value;
	if (task.trim() === "" || deadline === "") {
		alert("Please select an upcoming date for the deadline.");
		return; // Don't add task if task or deadline is empty
	}

	const selectedDate = new Date(deadline);
	const currentDate = new Date();

	if (selectedDate <= currentDate) {
		alert("Please select an upcoming date for the deadline.");
		return; // Don't add task if deadline is not in the future
	}

	const taskItem = document.createElement("div");
	taskItem.classList.add("task");
	taskItem.innerHTML = `
    <p>${task}</p>
    <p>Priority: ${priority}</p>
    <p>Deadline: ${deadline}</p>
    <button class="mark-done">Mark Done</button>
  `;

	taskList.appendChild(taskItem);

	taskInput.value = "";
	priorityInput.value = "top";
	deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("mark-done")) {
		const taskItem = event.target.parentElement;
		taskItem.style.backgroundColor = "#f2f2f2";
		event.target.disabled = true;
	}
	const taskList = document.getElementById("task-list");
	const priorityFilter = document.getElementById("priority-filter");
	const searchInput = document.getElementById("task-search-input");

	let tasks = [];

	// Add event listener for priority filter change
	priorityFilter.addEventListener("change", filterTasksByPriority);

	// Add event listener for search input
	searchInput.addEventListener("input", filterTasksBySearchTerm);

	function filterTasksByPriority() {
		const selectedPriority = priorityFilter.value;
		let filteredTasks = tasks;

		if (selectedPriority !== "all") {
			filteredTasks = tasks.filter(
				(task) => task.priority === selectedPriority
			);
		}

		renderTaskList(filteredTasks);
	}

	function filterTasksBySearchTerm() {
		const searchTerm = searchInput.value.toLowerCase();
		let filteredTasks = tasks;

		if (searchTerm.trim()) {
			filteredTasks = tasks.filter((task) => {
				return (
					task.description.toLowerCase().includes(searchTerm) ||
					task.priority.toLowerCase().includes(searchTerm) ||
					task.deadline.toLowerCase().includes(searchTerm)
				);
			});
		}

		renderTaskList(filteredTasks);
	}

	function renderTaskList(filteredTasks) {
		taskList.innerHTML = "";

		for (const task of filteredTasks) {
			const taskItemHTML = createTaskItemHTML(task);
			taskList.appendChild(taskItemHTML);
		}
	}
});
