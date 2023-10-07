import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';


export default function ItemDetails() {
    const location = useLocation();
    const receivedData = location.state?.data || "Default Data";

    const [showContactDetails, setShowContactDetails] = useState(false);

    const toggleContactDetails = () => {
        setShowContactDetails(!showContactDetails);
    };

    console.log(receivedData, "items array in ItemDetails component");


    if (receivedData.length === 0) {
        return <p>No items data available.</p>;
    }

    // Render each item from the itemsArray

    return (
        <>
            <Navbar />
            <div className="item-details">
                <div className="ImgItemDetails">
                    <img src={receivedData.path} alt={receivedData.title} style={{ width: "100%" }} />
                </div>
                <div className="textItem">
                    <h1>{receivedData.title.slice(0, 30)}</h1>
                    <h2>Price: ₹ {receivedData.price}</h2>
                    <p>{receivedData.description}</p>
                    <button onClick={toggleContactDetails} className='contactBut'>Contact</button>
                </div>
            </div>
            {showContactDetails && (
                <div className="contactDetiles">
                    <div className='butClose'>
                    <button onClick={toggleContactDetails}>✘</button>
                    </div>
                    <h1 style={{textAlign:"center"}}>Contact Details</h1>
                    <div className='detalisCont'>                    <h3>
                        Name: <span style={{ fontSize: "1.3rem", fontWeight: "400" }}>{receivedData.name}</span>
                    </h3>
                    <h3>
                        Contact: <span style={{ fontSize: "1.3rem", fontWeight: "400" }}>{receivedData.contact}</span>
                    </h3>
                    </div>

                </div>
            )}

        </>
    );
}
