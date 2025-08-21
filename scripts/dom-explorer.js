// dom-explorer.js - Basic DOM exploration functionality

document.addEventListener('DOMContentLoaded', function () {
  function exploreDOM(element = document.body, depth = 0) {
    const indent = '  '.repeat(depth);
    const tagName = element.tagName
      ? element.tagName.toLowerCase()
      : element.nodeName;
    const id = element.id ? `#${element.id}` : '';
    const classes = element.className
      ? `.${element.className.split(' ').join('.')}`
      : '';

    console.log(`${indent}${tagName}${id}${classes}`);

    // Explore child elements
    if (element.children) {
      Array.from(element.children).forEach((child) => {
        exploreDOM(child, depth + 1);
      });
    }
  }

  // Set up DOM inspector buttons
  const inspectPageBtn = document.getElementById('inspect-page');
  const inspectFormBtn = document.getElementById('inspect-form');
  const inspectNavBtn = document.getElementById('inspect-nav');
  const highlightModeBtn = document.getElementById('highlight-mode');

  if (inspectPageBtn) {
    inspectPageBtn.addEventListener('click', function () {
      console.log('Inspecting entire page DOM structure:');
      console.log('==========================================');
      exploreDOM(document.body);
    });
  }

  if (inspectFormBtn) {
    inspectFormBtn.addEventListener('click', function () {
      const form = document.getElementById('main-form');
      if (form) {
        console.log('Inspecting form DOM structure:');
        console.log('=================================');
        exploreDOM(form);
      } else {
        console.log('Form not found');
      }
    });
  }

  if (inspectNavBtn) {
    inspectNavBtn.addEventListener('click', function () {
      const nav = document.getElementById('main-navbar');
      if (nav) {
        console.log('Inspecting navbar DOM structure:');
        console.log('===================================');
        exploreDOM(nav);
      } else {
        console.log('Navbar not found');
      }
    });
  }

  if (highlightModeBtn) {
    let highlightMode = false;

    highlightModeBtn.addEventListener('click', function () {
      highlightMode = !highlightMode;

      if (highlightMode) {
        enableHighlightMode();
        highlightModeBtn.textContent = 'Disable Element Highlight';
        highlightModeBtn.style.background = '#ef4444';
        console.log(
          'Highlight mode ENABLED - click any element to inspect it'
        );
      } else {
        disableHighlightMode();
        highlightModeBtn.textContent = 'Toggle Element Highlight';
        highlightModeBtn.style.background = '';
        console.log('Highlight mode DISABLED');
      }
    });
  }

  function enableHighlightMode() {
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mouseover', handleHighlightHover);
    document.addEventListener('click', handleHighlightClick);
  }

  function disableHighlightMode() {
    document.body.style.cursor = 'default';
    document.removeEventListener('mouseover', handleHighlightHover);
    document.removeEventListener('click', handleHighlightClick);

    // Clear any existing highlights
    document.querySelectorAll('.temp-highlight').forEach((el) => {
      el.classList.remove('temp-highlight');
    });
  }

  function handleHighlightHover(event) {
    // Clear previous hover highlights
    document.querySelectorAll('.temp-highlight').forEach((el) => {
      el.classList.remove('temp-highlight');
    });

    // Add hover highlight
    event.target.classList.add('temp-highlight');
  }

  function handleHighlightClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;
    console.log('Element clicked:', {
      tagName: element.tagName,
      id: element.id || 'none',
      classes: element.className || 'none',
      textContent: element.textContent.trim().substring(0, 50) + '...',
      attributes: Array.from(element.attributes).map(
        (attr) => `${attr.name}="${attr.value}"`
      ),
      parent: element.parentElement ? element.parentElement.tagName : 'none',
      children: element.children.length,
    });
  }

  // Add CSS for highlighting
  const style = document.createElement('style');
  style.textContent = `
        .temp-highlight {
            outline: 2px solid #06b6d4 !important;
            outline-offset: 2px;
            background-color: rgba(6, 182, 212, 0.1) !important;
        }
    `;
  document.head.appendChild(style);

  console.log(
    'DOM Explorer ready! Use the buttons in the DOM Inspector section.'
  );
});
