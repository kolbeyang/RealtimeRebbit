import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post, Comment } from './post.model';
import axios from 'axios';
import { BASE_URL } from '../App';
import { useNavigate } from 'react-router-dom';

export interface PostsState {
    posts: Post[];
    isLoading: boolean;
    errorMessage: string | null;
}

export const selectAllPosts = (state: PostsState) => state.posts;
export const selectIsLoading = (state: PostsState) => state.isLoading;
export const selectErrorMessage = (state: PostsState) => state.errorMessage;

export interface ErrorMessage {
    message: string;
}

export interface GetPostsFulfilledPayload {
   posts: Post[]
}

export interface DeletePostsFulfilledPayload {
    post: Post
}

export interface CreatePostFulfilledPayload {
    post: Post
}

export interface CommentPostFulfilledPayload {
    comment: Comment
}

const initialState: PostsState = {
    posts: [],
    isLoading: false,
    errorMessage: null
}

export const createPost = createAsyncThunk(
    "posts/create",
    async (post: {title: string, content: string}) => {
        const response = await axios.post(
            BASE_URL + "/posts",
            post
        );
        return {post: response.data.data};
    }
)

export const getPosts = createAsyncThunk(
    "posts/getAll",
    async () => {
        const response = await axios.get(
            BASE_URL + "/posts"
        );


        return {posts: response.data.data};
    }
)

export const deletePost = createAsyncThunk(
    "posts/delete",
    async (_id: string | null) => {
        const response = await axios.delete(
            BASE_URL + "/posts/" + _id
        );
        return {post: response.data.data};
    }
)

export const updatePost = createAsyncThunk(
    "posts/update",
    async (post: {_id: string | null, title: string, content: string}) => {
        const response = await axios.put(
            BASE_URL + "/posts/" + post._id,
            post
        );
        return {post: response.data.data};
    }
)

export const commentPost = createAsyncThunk(
    "posts/comment",
    async (comment: Comment) => {
        const response = await axios.post(
            BASE_URL + "/posts/" + comment._id + "/comments",
            {text: comment.text}
        );
        return {comment: comment};
    }
);


const postsSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GET cases

        builder.addCase(getPosts.pending.type, (state: PostsState) => {
            state.isLoading = true;
        });

        builder.addCase(
            getPosts.fulfilled.type, 
            (state: PostsState, action: PayloadAction<GetPostsFulfilledPayload>) => {
                const  posts  = action.payload.posts;
                state.isLoading = false;
                state.posts = posts;
            }
        );

        builder.addCase(getPosts.rejected.type, (state: PostsState, action: PayloadAction<ErrorMessage>) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.errorMessage = message
        });

        // DELETE cases

        builder.addCase(deletePost.pending.type, (state: PostsState) => {
            state.isLoading = true;
        });

        builder.addCase(
            deletePost.fulfilled.type, 
            (state: PostsState, action: PayloadAction<DeletePostsFulfilledPayload>) => {
                const { post } = action.payload;

                state.isLoading = false;
                state.posts = state.posts.filter( (checkPost: Post) => (checkPost && (checkPost._id != post._id)));
            }
        );

        builder.addCase(deletePost.rejected.type, (state: PostsState, action: PayloadAction<ErrorMessage>) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.errorMessage = message
        });

        // CREATE cases

        builder.addCase(createPost.pending.type, (state: PostsState) => {
            state.isLoading = true;
        });

        builder.addCase(
            createPost.fulfilled.type, 
            (state: PostsState, action: PayloadAction<CreatePostFulfilledPayload>) => {
                const { post } = action.payload;

                state.isLoading = false;
                state.posts.push(post);

            }
        );

        builder.addCase(createPost.rejected.type, (state: PostsState, action: PayloadAction<ErrorMessage>) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.errorMessage = message
        });

        // UPDATE cases

        builder.addCase(updatePost.pending.type, (state: PostsState) => {
            state.isLoading = true;
        });

        builder.addCase(
            updatePost.fulfilled.type, 
            (state: PostsState, action: PayloadAction<CreatePostFulfilledPayload>) => {
                const { post } = action.payload;

                state.isLoading = false;
                // remove the old post and add the updated post
                state.posts = state.posts.filter( (checkPost: Post) => (checkPost && post._id !== checkPost._id) );
                state.posts.push(post);
            }
        );
        
        builder.addCase(updatePost.rejected.type, (state: PostsState, action: PayloadAction<ErrorMessage>) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.errorMessage = message
        });
        
        // COMMENT cases

        builder.addCase(commentPost.pending.type, (state: PostsState) => {
            state.isLoading = true;
        });

        builder.addCase(
            commentPost.fulfilled.type, 
            (state: PostsState, action: PayloadAction<CommentPostFulfilledPayload>) => {
                const { comment } = action.payload;

                state.isLoading = false;

                // the post that was commented on
                let post: Post = state.posts.filter( (p: Post) => ( p && (p._id === comment._id) ) )[0]; 
                // the posts array with the commented post removed
                let posts: Post[] = state.posts.filter( (p: Post) => ( p && (p._id !== comment._id) ) ); 

                let updatedPost: Post = {...post};
                updatedPost.comments = [...post.comments];
                updatedPost.comments.push(comment)

                posts.push(updatedPost);

                state.posts = posts;
            }
        );
        
        builder.addCase(commentPost.rejected.type, (state: PostsState, action: PayloadAction<ErrorMessage>) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.errorMessage = message
        });
    }

})

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;