import Link from 'next/link';
import styled from "styled-components";

const linkStyle = {
    marginRight: 15,
    textDecoration: "none",
    color: "#000",
};

const Main = styled.div`
    background-color: #F7EAC8;
    display: flex;
    justify-content: center;
    user-select: none;
    align-items: center;
        height: 27px;
        border-bottom: 0.5px solid grey;
`;

const Header = (props) => (
    <Main>
        {props.items && props.items.map((item,i) => (
            <Link
                key={i}
                href={item.url.toLowerCase()}
            >
                <a style={linkStyle}>{item.name}</a>
            </Link>
        ))}
    </Main>
);

export default Header;