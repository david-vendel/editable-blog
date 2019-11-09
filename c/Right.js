import styled from "styled-components";
import AccBox from "./AccBox.js";

export const Wrapper = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
        width: 190px;
    padding-left: 5px;
    padding-top: 2px;
`;

export const Welcome = styled.div`
    border-radius:4px; 
    border:3px solid white;
    box-shadow: 0px 0px 5px 1px #ccc; 
    margin-bottom:0px;
    padding-bottom:1px;
    font-size: 14px;
    font: 100%/1.4 Arial, Helvetica, sans-serif;
`;

const Right = () => {

    return(
        <Wrapper>
            <Welcome>
                    Welcome to Geneva.info -  free independent online travel guide for Geneva, Switzerland
            </Welcome>
            <AccBox/>
        </Wrapper>
    )
};

export default Right