import React from 'react';

const LandingPageWolf = () => {
    return(
        <div  style={{position:'relative'}}>
            <div style={{position:'absolute',bottom:'-70px', display:'flex'}} >
                <div>
                    <img src='https://upload.wikimedia.org/wikipedia/en/6/6c/Vulpes_littoralis_transparent_background.png'/>  
                </div>
                <div className="col s12 m5">
                    <div className="card-panel teal">
                        
                    <span className="white-text" style={{fontSize:'35px'}}>
                    SurveyBlast offers a tremendous set of free tools for designing your survey, sharing your survey online, and reviewing your survey's results. We've got a fantastic user experience and tons of great features.
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPageWolf;