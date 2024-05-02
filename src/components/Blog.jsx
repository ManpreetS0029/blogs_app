import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((blog) => {
        if (blog) {
          setBlog(blog);
        }
      });
    }
  }, [slug]);

  function getFilePreview(fileID) {
    if (fileID) {
      const getPreview = service.getFilePreview(fileID);

      const createFileName = getPreview.href;

      return createFileName;
    } else {
      return;
    }
  }

  return (
    <>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <figure>
                <img src={getFilePreview(blog.featuredImage)} alt="" />
              </figure>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl mt-4">
                {blog.title}
              </h1>
            </header>
            <p class="lead">{parse(String(blog.content))}</p>
          </article>
        </div>
      </main>
    </>
  );
};

export default Blog;
