import fetch from 'isomorphic-unfetch';
import React from 'react'
import styled from 'styled-components'
import Header from "./Header.js"
import CoverImg from "../c/CoverImg";
import Left from "../c/Left.js";
import Center from "../c/Center.js";
import Right from "../c/Right.js";
import { getPosts } from '../api/posts'
import { HEADER } from "./index.js"

const Wrapper = styled.div`
  max-width: 1050px;
  margin: 0 auto;
`;

let globalData = [];

const Post = (props) => {
    // console.log("props", props)
    return (
        <React.Fragment>
            <Header items={props.header}/>
            <Wrapper>
                <CoverImg />
                <div style={{display: "flex", width: "100%"}}>
                    <Left leftMenu = {props.leftMenu}/>
                    <Center
                        pageUrl={props.pageUrl}
                        breadcrumps={props.breadcrumps}
                        pageTitle={props.pageTitle}
                        blocks={props.blocks}
                    />
                    <Right/>
                </div>
            </Wrapper>
        </React.Fragment>
    )
};

Post.getInitialProps = async function(context) {
    const { id } = context.query;
    if (id === "favicon.ico") {
        return null
    }
    console.log("id", id);

    let data;
    let foundPage = globalData.find(gd => {
        return gd.page === id
    });
    if (foundPage) {
        data = foundPage;
        // console.log("cachec",data)
    } else {
        console.log("else",);
        try{
            const res = await fetch(`http://localhost:8000/articles/${id}`);
            // console.log("res",res)
            data = await res.json();
        } catch(e) {
            console.log("api is fucked", e.code)
            return {}
        }
        console.log("queried ", data)
        // globalData.push(data);

    }
    // console.log("globalData", globalData)
    // console.log(`Fetched show: ${show.name}`);

    return {
        pageUrl: id,
        pageTitle: data.page,
        breadcrumps: data.breadcrumps,
        leftMenu: ['Transport', 'Hotels', 'Museums', 'Facts', 'Sights', 'Activities', 'Entertainment'],
        blocks:data.blocks,
        header: HEADER
    };
};

export default Post;