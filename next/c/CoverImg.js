import React from 'react'
import styled from "styled-components";

const Img = styled.img`
    width: 100%;
    height: 214px;
`;

class CoverImg extends React.Component {

    render() {
        return (<div>
            <Img src="/static/geneva-panorama.jpg" />

        </div>)
    }
}

export default CoverImg