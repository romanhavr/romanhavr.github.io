import React from 'react';
import '../styles/about.css';

function About() {
    return (
        <div>
            <p>This single page application was created by <strong>Roman Havryliv</strong> using <strong>React</strong>.</p>
            <p>In this app the author used his previously created apps
            <strong>"YouViewer"</strong> and <strong>"Drag&#38;Drop Uploader"</strong>.</p>
            <p>These apps use 3-rd party API of <strong>YouTube</strong> and <strong>Google Drive</strong> accordingly.</p>
            <p>You can also find these original apps on&nbsp;
            <a href="https://romanhavr.github.io" className="link"><strong>Roman's portfolio</strong></a> page
            <br />or directly at <a href="https://romanhavr.github.io/projects/youviewer/index.html" className="link"><strong>"YouViewer"</strong></a> and&nbsp;
            <a href="http://drag-and-drop-uploader.eu5.org" className="link"><strong>"Drag&#38;Drop Uploader"</strong></a> pages.</p>
        </div>
    );
}

export default About;
