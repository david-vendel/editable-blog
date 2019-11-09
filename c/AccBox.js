import React from 'react'
import styled from "styled-components";

const Img = styled.img`
    width: 100%;

`;


export const Main = styled.div`
    padding: 3px;
    background: white;
        box-shadow: 0px 0px 5px 1px #ccc;
    border-radius: 4px;
`;

export const Accommodation = styled.div`
    padding: 3px;
    font: 100%/1.4 Arial, Helvetica, sans-serif;
`;


const AccBox = () => {
    return(
        <div>
            <Accommodation>
            Accommodation
            </Accommodation>
            <Main>
                <Img key={1} src="/static/hotel-booking.jpg" />
            </Main>
        </div>

    )
};

export default AccBox