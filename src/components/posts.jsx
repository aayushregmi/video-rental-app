import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config.json";
import Table from "./common/table";

class Posts extends Component {
  state = {
    posts: [],
    columns: [
      { path: "title", label: "Title" },
      {
        key: "update",
        label: "Update",
        content: (post) => (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => this.handleUpdate(post)}
          >
            Update
          </button>
        ),
      },
      {
        key: "delete",
        label: "Delete",
        content: (post) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleDelete(post)}
          >
            Delete
          </button>
        ),
      },
    ],
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoints.posts);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "New Title", body: "New Body" };
    const { data: post } = await http.post(config.apiEndpoints.posts, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "Updated Title";
    await http.put(config.apiEndpoints.posts + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete("S" + config.apiEndpoints.posts + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted!!!");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    const { columns, posts, sortColumn } = this.state;
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <Table columns={columns} data={posts} sortColumn={sortColumn} />
      </React.Fragment>
    );
  }
}

export default Posts;
