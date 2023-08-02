import React from "react";

interface Props {

}

export const DetailPostPage: React.FC<Props> = () => {
    return(
        <div>
            <h1>Atelier House</h1>
            <p>$40 USD per night</p>
            <p>Ruiz Cruz Lima 30, Rio de Janeiro</p>
            <button>Reserve</button>
            <img src="" alt="" />
            <div>
                <h2>Overview</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate ad veritatis voluptates ea quas nesciunt. Tempora distinctio ut vitae nihil a sapiente quae? Aut, labore! Consequuntur quaerat cupiditate quibusdam aperiam.</p>
                <h2>Rating</h2>
                <div>
                    <p>4,20</p>
                </div>
            </div>
            <h2>Services</h2>
            <div>
                <ul>
                    <li>Restaurant</li>
                    <li>Cafeteria</li>
                    <li>Wifi</li>
                    <li>TV</li>
                    <li>Bathroom</li>
                    <li>Safety deposit box</li>
                    <li>Garage</li>
                    <li>Room service</li>
                    <li>Pets allowed</li>
                    <li>Heating</li>
                    <li>Washer</li>
                    <li>Kitchen</li>
                </ul>
            </div>
            <h2>Opinions</h2>
            <ul>
                <li>Buen lugar</li>
                <li>Malardo</li>
                <li>Malisimo</li>
                <li>God</li>
                <li>Son un asco</li>
            </ul>
        </div>
    )
}