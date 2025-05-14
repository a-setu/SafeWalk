// SpeakUp Community Module Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample resources data
    const resources = [
        {
            name: "Women's Legal Center",
            type: "legal",
            description: "Free legal aid for women facing harassment or discrimination",
            location: "Nationwide",
            contact: "1-800-555-HELP",
            link: "#"
        },
        {
            name: "Mental Health Support Line",
            type: "mental",
            description: "24/7 counseling for trauma and stress",
            location: "National",
            contact: "1-800-555-TALK",
            link: "#"
        },
        {
            name: "Local Women's Shelter",
            type: "ngo",
            description: "Safe housing and support services",
            location: "Your City",
            contact: "555-123-4567",
            link: "#"
        }
    ];

    // Filter and display resources
    function displayResources(filterType = 'all', locationFilter = '') {
        const resourceList = document.querySelector('.resource-list');
        resourceList.innerHTML = '';
        
        const filtered = resources.filter(resource => {
            return (filterType === 'all' || resource.type === filterType) &&
                   (locationFilter === '' || resource.location.toLowerCase().includes(locationFilter.toLowerCase()));
        });
        
        if (filtered.length === 0) {
            resourceList.innerHTML = '<p>No resources match your filters</p>';
            return;
        }
        
        filtered.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            
            card.innerHTML = `
                <h3>${resource.name}</h3>
                <p class="resource-type"><i class="fas fa-${resource.type === 'legal' ? 'gavel' : resource.type === 'mental' ? 'heart' : 'hands-helping'}"></i> ${resource.type === 'legal' ? 'Legal Aid' : resource.type === 'mental' ? 'Mental Health' : 'NGO'}</p>
                <p class="resource-description">${resource.description}</p>
                <p class="resource-location"><i class="fas fa-map-marker-alt"></i> ${resource.location}</p>
                <p class="resource-contact"><i class="fas fa-phone"></i> ${resource.contact}</p>
                <a href="${resource.link}" class="resource-link">Visit Website</a>
            `;
            
            resourceList.appendChild(card);
        });
    }
    
    // Set up resource filters
    document.getElementById('resource-type').addEventListener('change', function() {
        const locationFilter = document.getElementById('resource-location').value;
        displayResources(this.value, locationFilter);
    });
    
    document.getElementById('resource-location').addEventListener('input', function() {
        const typeFilter = document.getElementById('resource-type').value;
        displayResources(typeFilter, this.value);
    });
    
    // Initial display
    displayResources();

    // Sample forum posts data
    const forumPosts = [
        {
            author: "Anonymous User",
            date: "2 days ago",
            title: "Dealing with street harassment",
            content: "What strategies have worked for others when dealing with persistent street harassers in downtown areas?",
            upvotes: 24,
            downvotes: 2,
            comments: 8
        },
        {
            author: "Community Moderator",
            date: "1 week ago",
            title: "Safety tips for public transport",
            content: "Remember to always be aware of your surroundings and trust your instincts. Here are some additional tips...",
            upvotes: 56,
            downvotes: 1,
            comments: 12
        }
    ];

    // Display forum posts
    function displayForumPosts(filter = 'recent') {
        const forumContainer = document.querySelector('.forum-posts');
        forumContainer.innerHTML = '';
        
        // In a real app, this would sort differently based on filter
        const sortedPosts = [...forumPosts];
        if (filter === 'popular') {
            sortedPosts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        }
        
        sortedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'forum-post';
            
            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-date">${post.date}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-content">${post.content}</p>
                <div class="post-footer">
                    <button class="vote-btn upvote"><i class="fas fa-thumbs-up"></i> ${post.upvotes}</button>
                    <button class="vote-btn downvote"><i class="fas fa-thumbs-down"></i> ${post.downvotes}</button>
                    <button class="comment-btn"><i class="fas fa-comment"></i> ${post.comments}</button>
                </div>
            `;
            
            forumContainer.appendChild(postElement);
        });
    }
    
    // Set up forum filters
    document.getElementById('forum-filter').addEventListener('change', function() {
        displayForumPosts(this.value);
    });
    
    // Initial display
    displayForumPosts();

    // New post form
    document.getElementById('post-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const anonymous = document.getElementById('post-anonymous').checked;
        
        if (!title || !content) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real app, this would send to your backend
        alert(`Post "${title}" submitted ${anonymous ? 'anonymously' : ''}`);
        
        // Close modal and reset form
        document.getElementById('new-post-modal').classList.add('hidden');
        this.reset();
    });

    // Workplace report form
    document.getElementById('workplace-report').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const org = document.getElementById('workplace-org').value;
        const type = document.getElementById('workplace-type').value;
        const details = document.getElementById('workplace-details').value;
        
        if (!type || !details) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would send to your backend
        alert(`Workplace report submitted${org ? ' regarding ' + org : ''}. Thank you for speaking up.`);
        this.reset();
    });

    // Check if user is admin (in a real app, this would check authentication)
    const isAdmin = false; // Change to true to see admin dashboard
    
    if (isAdmin) {
        document.getElementById('admin-dashboard').classList.remove('hidden');
        
        // Set up data export
        document.getElementById('export-data').addEventListener('click', function() {
            alert("In a real app, this would export report data as CSV");
        });
    }
});