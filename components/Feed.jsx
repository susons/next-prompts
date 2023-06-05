"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

export const PromptCardList = ({
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {console.log(data)}
      {data.map((post) => (
        <PromptCard
          key={`${post._id}_${Math.random()}`}
          post={post}
          handleDelete={() => handleDelete && handleDelete(post)}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/prompt");

      const data = await resp.json();
      setPosts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for tag or suername or prompt"
          onChange={({ currentTarget: { value } }) => setSearch(value)}
          value={search}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};
export default Feed;
