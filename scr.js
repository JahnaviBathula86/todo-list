document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
    const importantTasksList = document.getElementById("important-tasks-list");
    const completedTasksList = document.getElementById("completed-tasks-list");

    const importantTasksBox = document.getElementById("important-tasks-box");
    const completedTasksBox = document.getElementById("completed-tasks-box");

    const importantTasksBtn = document.getElementById("important-tasks-btn");
    const completedTasksBtn = document.getElementById("completed-tasks-btn");

    const profileIcon = document.getElementById("profile-icon");
    const profileInfoBox = document.getElementById("profile-info-box");

    const moodTrackerBtn = document.getElementById("mood-tracker-btn");
    const moodTrackerModal = document.getElementById("mood-tracker-modal");
    const closeBtn = document.querySelector(".close-btn");

    const saveMoodBtn = document.getElementById("save-mood-btn");

    // Blur effect elements
    const mainContent = document.getElementById("main-content");

    // Mood selection buttons
    const moodBtns = document.querySelectorAll(".mood-btn");

    profileIcon.addEventListener("click", () => {
        profileInfoBox.style.display = profileInfoBox.style.display === "none" ? "block" : "none";
    });

    moodTrackerBtn.addEventListener("click", () => {
        moodTrackerModal.style.display = "block";
        mainContent.classList.add("blur-background");
    });

    closeBtn.addEventListener("click", () => {
        moodTrackerModal.style.display = "none";
        mainContent.classList.remove("blur-background");
    });

    window.addEventListener("click", (event) => {
        if (event.target === moodTrackerModal) {
            moodTrackerModal.style.display = "none";
            mainContent.classList.remove("blur-background");
        }
    });

    moodBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove 'selected' class from all mood buttons
            moodBtns.forEach(btn => btn.classList.remove("selected"));
            // Add 'selected' class to the clicked button
            btn.classList.add("selected");
        });
    });

    saveMoodBtn.addEventListener("click", () => {
        saveMoodBtn.textContent = "Saved!";
        // Optionally, you can add more logic here to handle saving the mood and notes
    });

    // Toggle visibility of important tasks box
    importantTasksBtn.addEventListener("click", () => {
        importantTasksBox.style.display = importantTasksBox.style.display === "none" || importantTasksBox.style.display === "" ? "block" : "none";
        completedTasksBox.style.display = "none"; // Hide completed tasks box if visible
    });

    // Toggle visibility of completed tasks box
    completedTasksBtn.addEventListener("click", () => {
        completedTasksBox.style.display = completedTasksBox.style.display === "none" || completedTasksBox.style.display === "" ? "block" : "none";
        importantTasksBox.style.display = "none"; // Hide important tasks box if visible
    });

    // Existing functionality to add tasks and manage them
    todoList.addEventListener("keypress", (e) => {
        if (e.target.classList.contains("task-input") && e.key === "Enter") {
            addTask(e.target);
        }
    });

    todoList.addEventListener("click", handleTaskClick);
    importantTasksList.addEventListener("click", handleTaskClick);
    completedTasksList.addEventListener("click", handleTaskClick);

    function handleTaskClick(e) {
        if (e.target.classList.contains("circle")) {
            toggleComplete(e.target);
        } else if (e.target.classList.contains("star")) {
            toggleImportant(e.target);
        }
    }

    function addTask(input) {
        if (input.value.trim() !== "") {
            const newTask = createTaskElement(input.value.trim());
            todoList.insertBefore(newTask, todoList.firstChild);
            input.value = "";
            updateTaskCounts();
        }
    }

    function createTaskElement(taskText) {
        const newTask = document.createElement("li");

        const circle = document.createElement("span");
        circle.className = "circle";

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.className = "task-input";
        newInput.value = taskText;
        newInput.setAttribute("readonly", "readonly");

        const star = document.createElement("span");
        star.className = "star";
        star.innerHTML = "&#9733;";

        newTask.appendChild(circle);
        newTask.appendChild(newInput);
        newTask.appendChild(star);

        return newTask;
    }

    function toggleComplete(circle) {
        const taskItem = circle.parentElement;
        const taskInput = circle.nextElementSibling;
        const taskText = taskInput.value.trim();
        const originalParent = taskItem.parentElement;

        if (taskInput) {
            taskInput.classList.toggle("completed");
            circle.classList.toggle("completed-circle");

            if (taskInput.classList.contains("completed")) {
                taskItem.setAttribute("data-origin", originalParent.id); // Store original parent ID
                completedTasksList.appendChild(taskItem);

                // Remove task from To-Do List and Important Tasks List if they exist there
                removeTaskFromList(todoList, taskText);
                removeTaskFromList(importantTasksList, taskText);
            } else {
                const origin = taskItem.getAttribute("data-origin");
                const star = taskItem.querySelector(".star");

                // Move task back to its original list(s) based on origin and star status
                if (origin === "todo-list") {
                    todoList.appendChild(taskItem);
                    if (star && star.classList.contains("active")) {
                        importantTasksList.appendChild(taskItem.cloneNode(true));
                    }
                } else if (origin === "important-tasks-list") {
                    importantTasksList.appendChild(taskItem);
                    if (star && star.classList.contains("active")) {
                        todoList.appendChild(taskItem.cloneNode(true));
                    }
                }
                taskItem.removeAttribute("data-origin"); // Clear origin attribute after moving back
            }

            updateTaskCounts();
        }
    }

    function toggleImportant(star) {
        const taskItem = star.parentElement;
        const taskInput = star.previousElementSibling;

        if (taskInput && taskInput.value.trim() !== "") {
            star.classList.toggle("active");

            if (taskInput.classList.contains("completed")) {
                completedTasksList.appendChild(taskItem);
            } else if (star.classList.contains("active")) {
                const clonedTask = taskItem.cloneNode(true);
                removeTaskFromList(importantTasksList, taskInput.value.trim()); // Remove any existing clone
                importantTasksList.appendChild(clonedTask); // Clone the task and add to Important Tasks list
            } else {
                // Remove from Important Tasks list if unstarred
                removeTaskFromList(importantTasksList, taskInput.value.trim());
            }

            updateTaskCounts();
        }
    }

    function removeTaskFromList(list, taskText) {
        const task = [...list.childNodes].find(item => item.querySelector('.task-input').value.trim() === taskText);
        if (task) {
            task.remove();
        }
    }

    function updateTaskCounts() {
        document.getElementById("total-tasks").textContent = todoList.childElementCount;
        document.getElementById("important-tasks").textContent = importantTasksList.childElementCount;
        document.getElementById("completed-tasks").textContent = completedTasksList.childElementCount;
    }

    // Initial count update
    updateTaskCounts();
});
// Add this to your existing JavaScript file

document.addEventListener("DOMContentLoaded", () => {
    const reflectionsBtn = document.getElementById("mood-history-btn");
    const reflectionsModal = document.getElementById("reflections-modal");
    const closeReflectionsBtn = document.querySelector(".close-reflections-btn");
    const mainContent = document.getElementById("main-content");
    const notesList = document.getElementById("notes-list");
    
    // Emojis for emotional levels
    const emojis = ['😢', '😞', '😐', '🙂', '😄'];

    // Dummy data for the chart
    const emotionsData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Emotions',
            data: [4, 2, 4, 5, 2, 3, 4], // Example data points
            borderColor: 'rgba(136, 96, 208, 1)',
            backgroundColor: 'rgba(136, 96, 208, 0.2)',
            fill: true
        }]
    };

    // Configuration for the chart
    const emotionsConfig = {
        type: 'line',
        data: emotionsData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        callback: function (value) {
                            return emojis[value - 1]; // Map value to emoji
                        },
                        stepSize: 1
                    }
                }
            }
        }
    };

    // Initialize the chart
    const emotionsChart = new Chart(
        document.getElementById('emotions-chart'),
        emotionsConfig
    );

    // Open Reflections Modal
    reflectionsBtn.addEventListener("click", () => {
        reflectionsModal.style.display = "flex";
        mainContent.classList.add("blur-background");
        loadNotes(); // Load notes when the modal is opened
    });

    // Close Reflections Modal when the close button or outside of the modal is clicked
    closeReflectionsBtn.addEventListener("click", () => {
        reflectionsModal.style.display = "none";
        mainContent.classList.remove("blur-background");
    });

    window.addEventListener("click", (event) => {
        if (event.target === reflectionsModal) {
            reflectionsModal.style.display = "none";
            mainContent.classList.remove("blur-background");
        }
    });

    // Function to load notes
    function loadNotes() {
        // Example notes data (you can replace this with dynamic data)
        const notes = [
            'Had a great day!',
            'Feeling a bit stressed.',
            'Really enjoyed my time with friends.'
        ];

        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('p');
            noteElement.textContent = note;
            notesList.appendChild(noteElement);
        });
    }
});
