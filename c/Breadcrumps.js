import styled from "styled-components";

export const Main = styled.div`
    background: #EEE;
    margin-top:2px;
    margin-bottom:2px;
    padding: 3px;
`;

const Breadcrumps = (props) => {
    if (!props.pageTitle) {
        return(
            <div>
                <Main>Api does not work!</Main>
            </div>
        )
    }
    return(
        <div>
            <Main>Geneva > {props.breadcrumps} > {props.pageTitle}</Main>
        </div>
    )
};

export default Breadcrumps