import React from 'react'

const MobileDatasheetBar = (props:any) => {
    const { SetDatasheetAside } = props;
    return (
        <div>
            <div className="mobile-only mobile-padding">
                <i
                    className="ion-ios-menu text-2xl"
                    // className="ion-ios-arrow-round-forward text-2xl"
                    style={{color: '#3ab44a'}}
                    onClick={() => SetDatasheetAside(true)}
                ></i>
             </div>
        </div>
    )
}

export default MobileDatasheetBar