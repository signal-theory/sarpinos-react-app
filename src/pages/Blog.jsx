import React, { useEffect, useState } from 'react'
import axios from "axios"
import BlogPost from '../components/BlogPost';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    axios
      .get("https://sarpinos.mysites.io/wp-json/wp/v2/posts")
      .then((res) => {
        setPosts(res.data);
      });
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((item) => (
        <BlogPost
          key={item.id}
          post={item}
        />
      ))}
    </div>
  )
}