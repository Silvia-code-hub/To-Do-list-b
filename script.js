// DOM Elements
let taskInput = document.getElementById('myInput');
let taskList = document.getElementById('list-container');
let completedCounter = document.getElementById('completed-counter');
let uncompletedCounter = document.getElementById('uncompleted-counter');

// Initialize counters
let completedCount = 0;
let uncompletedCount = 0;

// Save tasks to localStorage
function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll('#list-container li').forEach(li => {
        tasks.push({
            text: li.textContent.replace('x', '').trim(),
            completed: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('counters', JSON.stringify({
        completed: completedCount,
        uncompleted: uncompletedCount
    }));
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('tasks');
    const savedCounters = localStorage.getItem('counters');
    
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            let li = document.createElement('li');
            li.textContent = task.text;
            
            if (task.completed) {
                li.classList.add('checked');
                completedCount++;
            } else {
                uncompletedCount++;
            }

            let span = document.createElement('span');
            span.className = 'close';
            span.textContent = 'x';
            span.onclick = function() {
                removeTask(li);
            };
            
            li.appendChild(span);
            li.onclick = function() {
                toggleTaskStatus(li);
            };
            
            taskList.appendChild(li);
        });
    }
    
    if (savedCounters) {
        const counters = JSON.parse(savedCounters);
        completedCount = counters.completed;
        uncompletedCount = counters.uncompleted;
    }
    
    updateCounters();
}

// Add new task
function newElement() {
    if (taskInput.value === '') {
        alert('Please enter a task!');
        return;
    }

    // Create new list item
    let li = document.createElement('li');
    li.textContent = taskInput.value;
    
    // Create close button
    let span = document.createElement('span');
    span.className = 'close';
    span.textContent = 'x';
    span.onclick = function() {
        removeTask(li);
    };
    
    li.appendChild(span);
    
    // Add click event to toggle completed status
    li.onclick = function() {
        toggleTaskStatus(li);
    };
    
    // Add to list
    taskList.appendChild(li);
    taskInput.value = '';
    
    // Update counters
    uncompletedCount++;
    updateCounters();
    saveTasksToStorage();
}

// Toggle task status (completed/uncompleted)
function toggleTaskStatus(task) {
    task.classList.toggle('checked');
    
    if (task.classList.contains('checked')) {
        completedCount++;
        uncompletedCount--;
    } else {
        completedCount--;
        uncompletedCount++;
    }
    
    updateCounters();
}

// Remove task
function removeTask(task) {
    if (task.classList.contains('checked')) {
        completedCount--;
    } else {
        uncompletedCount--;
    }
    
    task.remove();
    updateCounters();
    saveTasksToStorage();
}

// Update counters display
function updateCounters() {
    completedCounter.textContent = completedCount;
    uncompletedCounter.textContent = uncompletedCount;
}

// Initialize tasks
window.onload = function() {
    // First try to load saved tasks
    loadTasksFromStorage();
    
    // If no saved tasks, use sample tasks
    if (taskList.children.length === 0) {
        const sampleTasks = [
            { text: 'prepare coffee', completed: false },
            { text: 'clean the kitchen', completed: true },
            { text: 'Tidy the room', completed: false },
            { text: 'clean the house', completed: false },
            { text: 'Dust the carpets', completed: false }
        ];

        sampleTasks.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task.text;
            
            if (task.completed) {
                li.classList.add('checked');
                completedCount++;
            } else {
                uncompletedCount++;
            }

            let span = document.createElement('span');
            span.className = 'close';
            span.textContent = 'x';
            span.onclick = function() {
                removeTask(li);
            };
            
            li.appendChild(span);
            li.onclick = function() {
                toggleTaskStatus(li);
            };
            
            taskList.appendChild(li);
        });

        updateCounters();
    }
};
