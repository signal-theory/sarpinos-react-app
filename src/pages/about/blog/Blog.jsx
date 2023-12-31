import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import BlogCard from '../../../components/BlogCard.jsx';

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
    <section className="viewport innerhero cream-color">
      <div className="page-container">
        <h1>Blog</h1>
        {posts.map((item) => (
          <Link key={item.id} to={`/about/blog/${item.slug}`}>
            <BlogCard
              post={item}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}