import React from 'react';

function Resume() {
  return (
    <div>
      <h1>Resume</h1>
      <p>This is where the resume details will go.</p>
      <h2>Certifications</h2>
      <ul>
        <li>
          <a href="/path/to/certification1.pdf" download>
            Certification 1 - Download
          </a>
        </li>
        <li>
          <a href="/path/to/certification2.pdf" target="_blank" rel="noopener noreferrer">
            Certification 2 - View
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Resume;
