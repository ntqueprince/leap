// Links Data
const LINKS = [
  { name: "PB DNA", url: "https://ntqueprince.github.io/pbdna/" },
  { name: "All ABPB", url: "https://ntqueprince.github.io/allabpb/" },
  { name: "Operational Excellence", url: "https://ntqueprince.github.io/Operational-Excellence/" },
  { name: "Define-Analyze", url: "https://ntqueprince.github.io/Define-Analyze/" }
];

// State
let links = [...LINKS];

// Get initials from name
function getInitials(name) {
  const words = name.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Get gradient class
function getGradient(index) {
  const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6'];
  return gradients[index % gradients.length];
}

// Create card HTML
function createCard(link, index) {
  return `
    <div class="card">
      <button class="delete-btn" onclick="deleteLink(${index})" title="Delete link">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
        </svg>
      </button>
      
      <div class="avatar ${getGradient(index)}">
        <span class="avatar-text">${getInitials(link.name)}</span>
      </div>
      
      <h3 class="card-title">${link.name}</h3>
      <p class="card-url">${link.url}</p>
      
      <div class="card-actions">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"></path>
          </svg>
          Open
        </a>
        <button class="btn btn-secondary" onclick="copyLink(${index}, this)">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
          <span class="copy-text">Copy</span>
        </button>
      </div>
    </div>
  `;
}

// Render all cards
function renderCards() {
  const grid = document.getElementById('linksGrid');
  const emptyState = document.getElementById('emptyState');
  const totalLinks = document.getElementById('totalLinks');
  
  totalLinks.textContent = links.length;
  
  if (links.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    grid.innerHTML = links.map((link, index) => createCard(link, index)).join('');
  }
}

// Copy link to clipboard
function copyLink(index, button) {
  const url = links[index].url;
  
  navigator.clipboard.writeText(url).then(() => {
    const copyText = button.querySelector('.copy-text');
    const originalText = copyText.textContent;
    
    button.classList.add('copied');
    copyText.textContent = 'Copied!';
    
    setTimeout(() => {
      button.classList.remove('copied');
      copyText.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy link');
  });
}

// Delete link
function deleteLink(index) {
  if (confirm(`Delete "${links[index].name}"?`)) {
    links.splice(index, 1);
    renderCards();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Render initial cards
  renderCards();
});
