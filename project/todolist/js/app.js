
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const darkModeToggle = document.getElementById('darkModeToggle');
const filterBtns = document.querySelectorAll('.filter-btn');

const allCount = document.getElementById('allCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');

let tasks = [];
let currentFilter = 'all';
const APP_VERSION = '1.0.0';

let draggedElement = null;
let draggedIndex = null;
let placeholder = null;

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadDarkMode();
    updateUI();
    attachEventListeners();
});

function attachEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            updateFilterButtons();
            renderTasks();
        });
    });
}

function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        taskInput.style.animation = 'shake 0.3s';
        setTimeout(() => {
            taskInput.style.animation = '';
        }, 300);
        return;
    }
    
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(task);
    
    taskInput.value = '';
    taskInput.focus();
    
    saveTasks();
    updateUI();
}



function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        updateUI();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    updateUI();
}

function updateUI() {
    renderTasks();
    updateCounts();
    updateEmptyState();
}

function renderTasks() {
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    
    taskList.innerHTML = '';
    
    filteredTasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    li.draggable = true;
    
    if (task.completed) {
        li.classList.add('completed');
    }
    
    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle';
    dragHandle.innerHTML = '⋮⋮';
    
    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('click', () => toggleTask(task.id));
    
    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;
    text.addEventListener('click', () => toggleTask(task.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '❌';
    deleteBtn.setAttribute('aria-label', 'Supprimer la tâche');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
    });
    
    setupDragAndDrop(li);
    
    li.appendChild(dragHandle);
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    
    return li;
}

function updateCounts() {
    const all = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    
    allCount.textContent = all;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

function updateEmptyState() {
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

function updateFilterButtons() {
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    console.log('Dark mode toggled:', isDark);
}

function loadDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            console.error('Erreur lors du chargement des tâches:', e);
            tasks = [];
        }
    }
}

function setupDragAndDrop(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
}

function handleDragStart(e) {
    draggedElement = this;
    draggedIndex = Array.from(taskList.children).indexOf(this);
    
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    draggedElement = null;
    draggedIndex = null;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const allItems = Array.from(taskList.children);
        const dropIndex = allItems.indexOf(this);
        
        reorderTasks(draggedIndex, dropIndex);
    }
    
    return false;
}

let touchStartY = 0;
let touchElement = null;

function handleTouchStart(e) {
    touchElement = this;
    touchStartY = e.touches[0].clientY;
    draggedElement = this;
    draggedIndex = Array.from(taskList.children).indexOf(this);
    
    setTimeout(() => {
        if (draggedElement === this) {
            this.classList.add('dragging');
        }
    }, 200);
}

function handleTouchMove(e) {
    if (!draggedElement) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const currentY = touch.clientY;
    
    const elementBelow = document.elementFromPoint(touch.clientX, currentY);
    const taskItemBelow = elementBelow?.closest('.task-item');
    
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    if (taskItemBelow && taskItemBelow !== draggedElement) {
        taskItemBelow.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    if (!draggedElement) return;
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const taskItemBelow = elementBelow?.closest('.task-item');
    
    if (taskItemBelow && taskItemBelow !== draggedElement) {
        const allItems = Array.from(taskList.children);
        const dropIndex = allItems.indexOf(taskItemBelow);
        reorderTasks(draggedIndex, dropIndex);
    }
    
    draggedElement?.classList.remove('dragging');
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    draggedElement = null;
    draggedIndex = null;
    touchElement = null;
}

function reorderTasks(fromIndex, toIndex) {
    let visibleTasks = tasks;
    if (currentFilter === 'active') {
        visibleTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        visibleTasks = tasks.filter(t => t.completed);
    }
    
    const [movedTask] = visibleTasks.splice(fromIndex, 1);
    visibleTasks.splice(toIndex, 0, movedTask);
    
    if (currentFilter === 'all') {
        tasks = visibleTasks;
    } else {
        const completed = tasks.filter(t => t.completed && currentFilter !== 'completed');
        const active = tasks.filter(t => !t.completed && currentFilter !== 'active');
        
        if (currentFilter === 'active') {
            tasks = [...visibleTasks, ...completed];
        } else {
            tasks = [...active, ...visibleTasks];
        }
    }
    
    saveTasks();
    updateUI();
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
