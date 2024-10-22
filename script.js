// Sample course data
const courses = [
    { id: 1, title: "Introduction to Web Development", instructor: "John Doe", description: "Learn the basics of HTML, CSS, and JavaScript.", image: "https://via.placeholder.com/300x200?text=Web+Dev", category: "Web Development", level: "Beginner" },
    { id: 2, title: "Advanced JavaScript", instructor: "Jane Smith", description: "Master advanced JavaScript concepts and patterns.", image: "https://via.placeholder.com/300x200?text=Adv+JS", category: "Web Development", level: "Advanced" },
    { id: 3, title: "Data Science Fundamentals", instructor: "Bob Johnson", description: "Introduction to data analysis and machine learning.", image: "https://via.placeholder.com/300x200?text=Data+Science", category: "Data Science", level: "Intermediate" },
    { id: 4, title: "UI/UX Design Principles", instructor: "Alice Brown", description: "Learn the fundamentals of user interface and user experience design.", image: "https://via.placeholder.com/300x200?text=UI/UX", category: "Design", level: "Beginner" },
    { id: 5, title: "Mobile App Development with React Native", instructor: "Charlie Wilson", description: "Build cross-platform mobile apps using React Native.", image: "https://via.placeholder.com/300x200?text=React+Native", category: "Mobile Development", level: "Intermediate" },
    { id: 6, title: "Machine Learning with Python", instructor: "Diana Martinez", description: "Implement machine learning algorithms using Python.", image: "https://via.placeholder.com/300x200?text=ML+Python", category: "Data Science", level: "Advanced" },
];

// Filter options
const categories = [...new Set(courses.map(course => course.category))];
const levels = [...new Set(courses.map(course => course.level))];

// Function to create filter options
function createFilterOptions(containerId, filterType, options) {
    const container = document.getElementById(containerId);
    const filterHTML = `
        <div class="mb-3">
            <label for="${filterType}-select" class="form-label">${filterType}</label>
            <select class="form-select" id="${filterType}-select">
                <option value="">All ${filterType}s</option>
                ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
        </div>
    `;
    container.innerHTML += filterHTML;
}

// Function to render course cards
function renderCourses(coursesToRender) {
    const courseGrid = document.getElementById('course-grid');
    courseGrid.innerHTML = '';
    const template = document.getElementById('course-card-template');

    coursesToRender.forEach(course => {
        const courseCard = template.content.cloneNode(true);
        courseCard.querySelector('.card-img-top').src = course.image;
        courseCard.querySelector('.card-img-top').alt = course.title;
        courseCard.querySelector('.card-title').textContent = course.title;
        courseCard.querySelector('.card-text').textContent = course.description;
        courseCard.querySelector('.text-muted').textContent = `Instructor: ${course.instructor}`;
        courseGrid.appendChild(courseCard);
    });
}

// Function to filter courses
function filterCourses() {
    const categoryFilter = document.getElementById('category-select').value;
    const levelFilter = document.getElementById('level-select').value;

    const filteredCourses = courses.filter(course => 
        (categoryFilter === '' || course.category === categoryFilter) &&
        (levelFilter === '' || course.level === levelFilter)
    );

    renderCourses(filteredCourses);
}

// Initialize the page
function init() {
    createFilterOptions('desktop-filters', 'category', categories);
    createFilterOptions('desktop-filters', 'level', levels);
    createFilterOptions('mobile-filters', 'category', categories);
    createFilterOptions('mobile-filters', 'level', levels);

    document.getElementById('desktop-filters').addEventListener('change', filterCourses);
    document.getElementById('mobile-filters').addEventListener('change', filterCourses);

    renderCourses(courses);
}

// Run initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);