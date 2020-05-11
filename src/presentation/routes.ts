import express from "express";
import cors from "cors";
import { signupEndpoint } from "./endpoints/user/signup";
import { loginEndpoint } from "./endpoints/user/login";
import { makeFriendshipEndpoint } from "./endpoints/user/makeFriendship";
import { undoFriendshipEndpoint } from "./endpoints/user/undoFriendship";
import { creatPostEndpoint } from "./endpoints/post/createPost";
import { getFeedEndpoint } from "./endpoints/feed/getFeed";
import { getFeedByTypeEndpoint } from "./endpoints/feed/getFeedByType";
import { likePostEndpoint } from "./endpoints/post/likePost";
import { dislikePostEndpoint } from "./endpoints/post/dislikePost";

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.post("/signup", signupEndpoint);
app.post("/login", loginEndpoint);
app.post("/friendship/make", makeFriendshipEndpoint);
app.post("/friendship/undo", undoFriendshipEndpoint);

app.post("/post/create", creatPostEndpoint);
app.post("/post/like", likePostEndpoint);
app.post("/post/dislike", dislikePostEndpoint);

app.get("/feed", getFeedEndpoint);
app.get("/feed/type", getFeedByTypeEndpoint);

export default app;
