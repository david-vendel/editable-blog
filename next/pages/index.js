import React from 'react'
import styled from 'styled-components'
import Header from "./Header.js"
import CoverImg from "../c/CoverImg";
import Left from "../c/Left.js";
import Center from "../c/Center.js";
import Right from "../c/Right.js";
import { getPosts } from '../api/posts'

export const HEADER = [
    {name: 'Home', url: '/'},
    {name: 'Airport', url: 'airport'},
    {name: 'Parking', url: 'parking'},
];

const Wrapper = styled.div`
  max-width: 1050px;
  margin: 0 auto;
`;

const IndexPage = (props) => {
    // console.log("props", props)
    return (
        <React.Fragment>
            <Header items={props.header}/>
            <Wrapper>
                <CoverImg />
                <div style={{display: "flex", width: "100%"}}>
                    <Left leftMenu = {props.leftMenu}/>
                    <Center paragraphs={props.paragraphs}/>
                    <Right/>
                </div>
            </Wrapper>
        </React.Fragment>
    )
};

IndexPage.getInitialProps = async ({req}) => {
    if (req) {
        console.log("req", req.url)
    }
    // const res = await getPosts();
    // const json = await res.json();
    return {
        leftMenu: ['Transport', 'Hotels', 'Museums', 'Facts', 'Sights', 'Activities', 'Entertainment'],
        paragraphs: [
            {type: "p", text:'Bienvenue à Genève! Welcome to Geneva! Situated along the banks of Lake Geneva at the foot of the Alps, Geneva sparkles as one of Europe\'s most beautiful cities. Home to the European headquarters of the United Nations, Geneva has a long history of diversity and tolerance dating back to the Protestant Reformation. Today, the city of Geneva is a cultural center second to none featuring world class entertainment, top rated restaurants and unlimited opportunities for recreation.'},
            {type: "p", text: 'Geneva\'s most famous monument, Jet d\'Eau, is the world\'s tallest water fountain and provides a constant landmark for exploring the city. Geneva\'s ancient Old Town offers a living glimpse of the past while Geneva\'s more than thirty museums and art galleries capture the rich and vibrant history of the city including the International Red Cross and Red Crescent Museum and the Museum of Modern and Contemporary Art (MAMCO). For a change of pace take a cruise on the lake or relax in one of Geneva\'s main waterfront parks.'},
        ],
        header: HEADER,
    }
};

export default IndexPage