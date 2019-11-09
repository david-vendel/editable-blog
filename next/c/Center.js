import styled from "styled-components";
import Breadcrumps from "./Breadcrumps";
import Page from "./Page"
import React from "react";

export const Wrapper = styled.div`
    background: white;
    display: flex;
    flex: 1000 1 auto;
        flex-direction: column;
    background: #FFF;
    padding-left: 15px;
    padding-right: 15px;
`;

const Center = (props) => {

    return(
        <Wrapper>
            <Breadcrumps
                breadcrumps={props.breadcrumps}
                pageTitle={props.pageTitle}
            />
            <Page
                pageUrl={props.pageUrl}
                pageTitle={props.pageTitle}
                paragraphs={props.paragraphs}
            />
        </Wrapper>
    )
};

export default Center