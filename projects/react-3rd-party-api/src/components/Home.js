import React from 'react';
import { withRouter, Link } from "react-router-dom";
import '../styles/home.css';
import { routes } from '../common/routes';

function Home() {
    return (
        <React.Fragment>
            <h1>
                Wellcome to my React App!
            </h1>
            <p>
                Here you can take a look at my apps that are using 3-rd party API.
            </p>
            <p><u>They are:</u></p>
            <p><strong>"YouViewer"</strong> and <strong>"Drag&#38;Drop Uploader"</strong><br />
            that use API of <strong>YouTube</strong> and <strong>Google Drive</strong> accordingly.</p>
            <div className="images">
                <Link to={routes.youViewer.path}>
                    <img src="you-viewer.png" alt="You Viewer" width="300" height="100"/>
                </Link>
                <Link to={routes.dragDrop.path}>
                    <img src="drag-drop.png" alt="Drag and Drop Uploader" width="200" />
                </Link>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Home);
