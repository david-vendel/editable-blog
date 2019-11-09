import styled from "styled-components";
import React, {Component} from "react";
import fetch from "isomorphic-unfetch";
import {parse} from 'himalaya'
import Router from 'next/router';

export const Title = styled.h1`
    margin-top: 0;
    padding-right: 10px;
    padding-left: 0px;
    font: 100%/1.4 Verdana, Geneva, sans-serif, Arial, H
    font-size: 30px;
`;

export const Edit = styled.button`
    position: absolute;
    top:5px;
    right: 5px;
`;

export const ParagraphWrapper = styled.div`
    position: relative;
`;
export const Paragraph = styled.p`
    font: 100%/1.4 Verdana, Geneva, sans-serif, Arial, H;
    padding-left: 3px;
    padding-right: 3px;
    margin: 0px;
    min-height:22px;
`;
export const H1 = styled.h1`
    padding: 3px;
`;
export const H2 = styled.h2`
    padding: 3px;
`;
export const H3 = styled.h3`
    padding: 3px;

`;

export const EditParagraph = styled.div`
    contenteditable: true;
    font: 100%/1.4 Verdana, Geneva, sans-serif, Arial, H;
    width: calc(100% - 6px);
    height: ${props=>props.height}px;
    text-align: justify;
    padding-right: 10px;
    ${props => props.type === "h3" && 
    `font-size: 1.17em;
    font-weight: bold;`}     
    ${props => props.type === "h2" && 
    `font-size: 1.3em;
    font-weight: bold;`} 
`;


export const Wrapper = styled.div`
      text-align: justify;
`;

export const SaveCancel = styled.div`
    padding: 5px 5px 7px 5px;
    background: #F4F4F4;

`;
export const EditingTab = styled.div`
    position: absolute;
    top: -32px;
    right: 0px;
    display: flex;
`;
export const Type = styled.button`
    margin-right: 6px;
`;

export const Save = styled.button`
`;
export const Cancel = styled.button`
`;
export const Delete = styled.button`
`;

export const Plus = styled.button`
    background: white;
    border-radius: 20px;
    border: 1px solid grey;
    cursor: pointer;
    display: flex;
    margin: 0 auto;
        padding: 5px 8px;
`;

export const TextWrapper = styled.div`
    ${props => props.editing ? `background: #f6faf6` : ``}
`;

const PARAGRAPH_HEIGHT = 40;

class Page extends Component {

    constructor(props) {
        super(props);
        this.version = 0;
        this.state={
            editing: false,
            editedText: "",
            paragraphs: this.props.paragraphs ? this.props.paragraphs.map(p=>{
                return ({
                    ...p,
                 ref: React.createRef()
                })
            })
                :
                [],
            editingHeight: PARAGRAPH_HEIGHT,
            type: "p",
        };

    }

    componentDidMount() {
        document.execCommand("defaultParagraphSeparator", false, "div");
    }


    addParagraph = async () => {
        const res = await fetch(
            `http://localhost:8000/articles/save/${this.props.pageUrl}/newParagraph`,
            {method: 'POST',}
        );
        const paragraphs = this.state.paragraphs;
        paragraphs.push({
            text: '',
            type: 'p',
            ref: React.createRef()
        });
        this.setState({
            paragraphs,
        });
        this.edit(paragraphs.length-1)

        setTimeout(() => {
            console.log("paragraphs[paragraphs.length-1].ref",paragraphs[paragraphs.length-1].ref)
            paragraphs[paragraphs.length-1].ref.current.focus()
        },1)
    };

    changeType = async () => {
        const type = this.state.paragraphs[this.state.editing].type;
        let newType = "p";
        if (type === "p") {newType = "h1"}
        if (type === "h1") {newType = "h2"}
        if (type === "h2") {newType = "h3"}
        if (type === "h3") {newType = "p"}
        const paragraphs = this.state.paragraphs;
        paragraphs[this.state.editing].type = newType;
        this.setState({
            type: newType,
            paragraphs,
        });

        const res = await fetch(
            `http://localhost:8000/articles/changeType/${this.props.pageUrl}/paragraph/${this.state.editing}/${newType}`,
            {method: 'POST',}
        );

    };

    edit = (i) => {
        console.log("edit",i)
        console.log("paragraphs", this.state.paragraphs)
        this.setState({
            editing: i,
            editedText: this.state.paragraphs[i].text,
            editingHeight: Math.max(PARAGRAPH_HEIGHT, this.state.paragraphs[i].ref ? this.state.paragraphs[i].ref.current.clientHeight + 20 : PARAGRAPH_HEIGHT),
        });
    };

    save = async () => {
        console.log("ref",this.state.paragraphs[this.state.editing].ref)
        const htmlContent = this.state.paragraphs[this.state.editing].ref.current.innerHTML;
        let parsedHtml = parse(htmlContent)
        console.log("parsedHtml",parsedHtml)
        let url = "";
        let data = {};

        if (parsedHtml.length === 1) {
            const editedText = this.state.paragraphs[this.state.editing].ref.current.innerText;
            console.log("editedText", editedText);
            data = {
                page: this.props.pageUrl,
                paragraphId: this.state.editing,
                text: editedText,
            };
            url = `http://localhost:8000/articles/save/p`;
        } else { //sending more paragraphs - different api call
            data = {
                page: this.props.pageUrl,
                paragraphId: this.state.editing,
                parsedHtml: JSON.stringify(parsedHtml),
            };
            url = `http://localhost:8000/articles/save/ps`
        }
            const res = await fetch(
                url,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'content-type': 'application/json; charset=utf-8',
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
                    }),
                }
            );


            const paragraphs = this.state.paragraphs;
            //paragraphs[this.state.editing].text = editedText;
            this.setState({
                //paragraphs,
                editing: false,
            });

        // setTimeout(() => {
        //     Router.push(`/${this.props.pageUrl}`)
        // },500)
        this.updateContent()
    };

    updateContent = async() => {
        const res = await fetch(`http://localhost:8000/articles/${this.props.pageUrl}`);
        const data = await res.json();
        this.version = this.version + 1;
        this.setState({
            paragraphs: data.paragraphs,
        })
    };

    cancel = () => {
        this.setState({
            editing: false,
        })
    };

    delete = async () => {
        const res = await fetch(
            `http://localhost:8000/articles/delete/${this.props.pageUrl}/paragraph/${this.state.editing}`,
            {method: 'POST',}
        );
        const paragraphs = this.state.paragraphs;
        paragraphs.splice(this.state.editing, 1);
        this.setState({
            paragraphs,
            editing: false,
        })
    };

    // changeText = (e) => {
    //     console.log("e",e.target)
    //     this.setState({
    //         editedText: e.target.value,
    //     })
    // };

    onChange = (i, value) => {
        console.log("onchange", i, value)
    };

    render() {
        console.log("paragraphs",this.state.paragraphs)
        const props = this.props;
        return(
            <Wrapper>
                {/*<Title>*/}
                {/*    {props.pageTitle}*/}
                {/*</Title>*/}

                {this.state.paragraphs.map((par,i) => (
                        <ParagraphWrapper
                            key={`${this.version}-${i}`}
                        >
                            <div>
                                {this.state.editing === i ?
                                    <EditingTab>
                                        <div style={{paddingTop:5, paddingLeft: 5}} onClick={this.changeType}>
                                            <Type>
                                                {par.type}
                                            </Type>
                                        </div>
                                        <SaveCancel>
                                            <Save onClick={this.save}> Save</Save>
                                            <Delete onClick={this.delete}>Delete</Delete>
                                            <Cancel onClick={this.cancel}>Cancel</Cancel>
                                        </SaveCancel>
                                    </EditingTab>
                                    :
                                <Edit onClick={()=>this.edit(i)}>
                                    edit
                                </Edit>
                                }
                                <TextWrapper
                                    editing={this.state.editing === i}
                                    contentEditable={this.state.editing === i}
                                    suppressContentEditableWarning={"true"}
                                    ref={par.ref}
                                >
                                {par.type === "p" ?
                                    <Paragraph
                                        onChange={(e, value) => this.onChange(i, value)}
                                    >
                                        {par.text}
                                    </Paragraph>
                                    :
                                    par.type === "h2" ?
                                    <H2>
                                        {par.text}
                                    </H2>
                                    :
                                        par.type === "h1" ?
                                            <H1>
                                                {par.text}
                                            </H1>
                                            :
                                            <H3>
                                                {par.text}
                                            </H3>
                                }
                                </TextWrapper>
                            </div>
                        </ParagraphWrapper>
                    )
                )}
                <Plus onClick={this.addParagraph}>
                    +
                </Plus>
            </Wrapper>
        )
    }
};

export default Page