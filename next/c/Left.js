import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled.div`
    background: white;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
`;

export const LeftMenu = styled.ul`
    background: #8A9B0F;
    width: 158px;
    margin-block-start: 0px;
    margin-block-end: 0px;
    padding-top: 2px;
    padding-bottom: 2px;
    overflow-x: auto;
    display: block;
    padding-left: 0px;
`;

export const Item = styled.li`
    padding-top:5px;
    padding-bottom:5px;
    padding-left: 10px;
    cursor: pointer;
    :hover{
        background: black;
        color: white;
    }
        list-style: none;
        display: block;
    text-decoration: none;
    background-color: #C6D580;
font-size: 17px;
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    line-height: 1.2em;
`;

export const Translate = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;

`;

const Left = (props) => {
console.log("items", props)

    return(
        <Wrapper>
            <LeftMenu>
                {props.leftMenu && props.leftMenu.map((item,i) => (
                    <Item
                        key={i}
                    >{item}
                    </Item>
                ))}

            </LeftMenu>
            <Translate>
                Translate:
            </Translate>
            <div>
                ads
            </div>
        </Wrapper>
    )
};

Left.getInitialProps = function() {
    return(
        {
            items: ['item 1', 'item 2', 'item 3']
        }
        )
};

export default Left