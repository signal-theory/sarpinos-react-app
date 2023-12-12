import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import BlogCard from '../../../components/BlogCard';

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
    <div className="page-container inner-hero cream-color">
      <h1>Blog</h1>
      {posts.map((item) => (
        <Link key={item.id} to={`/about/blog/${item.slug}`}>
          <BlogCard
            post={item}
          />
        </Link>
      ))}
    </div>
  )
}