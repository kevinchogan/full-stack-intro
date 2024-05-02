"use client";
import styles from "@/app/page.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setContent("");
  };

  return (
    <main className={styles.main}>
        <Link href="/">View Feed</Link>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
