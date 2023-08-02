import React from "react";

interface Props {

}

export const Filters: React.FC<Props> = () => {
    return(
        <div>
            <select name="" id="">
                <option value="cab">Cabins</option>
                <option value="bfr">BeachFront</option>
                <option value="msn">Mansions</option>
                <option value="cts">Countryside</option>
                <option value="rms">Rooms</option>
            </select>
        </div>
    )
}