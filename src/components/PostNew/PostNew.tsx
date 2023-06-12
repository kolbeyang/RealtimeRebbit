import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createPost, selectIsLoading } from "../../Store/post.slice";
import { store } from "../../Store/store";
import OpenAI from "../../helpers/openai";
import { GENERATE_POST_CONFIG, GENERATE_TITLE_CONFIG } from "../../helpers/openaiConfig";

interface PostNewProps {}

const apiKey = process.env.REACT_APP_OPENAI;
const openAIApi = new OpenAI(apiKey!);

const PostNew: FC<PostNewProps> = () => {
  const isLoading = useSelector(selectIsLoading);
  const [state, setState] = useState({
    title: "",
    content: ""
  });
  const navigate = useNavigate();

  const generateTitleGivenContent = async (content: string) => {
    console.log("Generating title given content " + content);
    const config = {...GENERATE_TITLE_CONFIG};
    config.prompt = "Please generate a title for the following text in less than 20 words: \n";
    config.prompt += content;

    const result = await openAIApi.generateText(config.prompt, config.model, config.max_tokens, config.temperature);
    const newState = {...state};
    newState.content = content;
    newState.title = result!.trim();
    setState(newState);
  };

  const generateContentGivenTitle = async (title: string) => {
    console.log("Generating content given title " + title);
    const config = {...GENERATE_POST_CONFIG};
    config.prompt = "Please generate a paragraph for the following title in less than 250 words: \n";
    config.prompt += title;

    const result = await openAIApi.generateText(config.prompt, config.model, config.max_tokens, config.temperature);
    const newState = {...state};
    newState.title = title;
    newState.content = result!.trim();
    setState(newState);
  };
  
  const generateContentAndTitle = async () => {
    console.log("Generating a random title");
    let config = {...GENERATE_TITLE_CONFIG};
    config.prompt = "Please generate a random title for a blog post";
    
    let result = await openAIApi.generateText(config.prompt, config.model, config.max_tokens, config.temperature)
      .then((result) => {
        console.log("promise result is " + result);
        let newState = {...state};
        newState.title = result!.trim();
        generateContentGivenTitle(result!.trim());
        setState(newState);
      });
  }
  
  const handleAutoFill = () => {
    console.log("Auto-filling!");

    if (state.title !== "" && state.content !== "") {
      // do nothing, already filled
    } else if (state.title === "" && state.content !== "") {
      // we need a title
      generateTitleGivenContent(state.content);
    } else if (state.title !== "" && state.content === "") {
      // we need content
      generateContentGivenTitle(state.title);
    } else {
      // we need both
      generateContentAndTitle();
    }
    
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };
  
  const onSubmit = () => {

    let post = {
      title: state.title,
      content: state.content
    };
    navigate("/posts");
    store.dispatch(createPost(post));
  };

  return (
    <div className="bounding-box">
      <div className="sub-page-spacer"/>
      <Link className="back-button" to="/posts" >&lt; Back</Link>
      <h1 className="sub-page-title">New post</h1>

      <form onSubmit={onSubmit}>
        <div>
          {state.title === "" && (
            <p className="errorMsg">Title is required.</p>
          )}
          <input
            type="text"
            id="new-post-title-input"
            name="title"
            className="default-input title-input"
            placeholder="Title"
            value={state.title}
            onChange={handleInputChange}
            />
        </div>
        <div>
          {state.content === "" && (
            <p className="errorMsg">Content is required.</p>
          )}
          <textarea
            id="new-post-content-input"
            name="content"
            className="default-input content-input"
            placeholder="Write something interesting..."
            value={state.content}
            onChange={handleInputChange}
          />

        </div>
        <div className="sub-page-button-box">
          <div className="card-button standalone-button autofill-button" onClick={handleAutoFill}>Write for me</div> 
          <input type="submit" className="card-button standalone-button" id="new-post-submit-button" value="Create post"></input>
        </div>
      </form>

    </div>
  );
};

export default PostNew;
