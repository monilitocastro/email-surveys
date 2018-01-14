import React from 'react';

const LandingPageWolf = () => {
    return(
        <div  style={{position:'relative'}}>
            <div style={{position:'absolute',bottom:'-70px', display:'flex'}} >
                <div>
                    <img src='https://upload.wikimedia.org/wikipedia/en/6/6c/Vulpes_littoralis_transparent_background.png' alt='Lithograph of wolf'/>  
                </div>
                <div className="col s12 m5">
                    <div className="card-panel teal" style={{minWidth:'440px'}}>
                        
                        <span className="white-text" style={{fontSize:'24px'}}>
                        SurveyBlast is an app created my Monilito Castro. To create an account, simply click on the top right link 'Create Account/Sign In'. To add credits to your account, just enter 4242 4242 4242 4242 as credit card information. Make sure that it has an expiration date in the near future. You can create surveys by click on the SurveyBlast logo on the top left corner once logged in.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPageWolf;