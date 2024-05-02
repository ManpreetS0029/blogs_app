import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const addBlog = () => {
    navigate('/admin/add-blog');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin');
    }
  });

  useEffect(() => {
    async function getAllBlogs() {
      const getBlogs = await service.getPosts([]);
      setBlogs(getBlogs.documents);
    }
    getAllBlogs();
  }, []);

  function getFilePreview(fileID) {
    const getPreview = service.getFilePreview(fileID);

    const createFileName = getPreview.href;

    return createFileName;
  }

  async function editBlog(id) {
    navigate('/admin/edit-blog/' + id);
  }

  async function deleteBlog(id) {
    const text = 'Are you sure to remove this blog?';

    if (confirm(text) == true) {
      const deleteBlogByID = await service.deletePost(id);
      if (deleteBlogByID) {
        const getBlogs = await service.getPosts([]);
        setBlogs(getBlogs.documents);
      }
    }
  }

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-4xl font-bold p-4">
            <h1>Blogs</h1>
          </div>
          <div className="flex flex-row-reverse p-4">
            <button
              type="button"
              className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-3"
              onClick={addBlog}
            >
              + Create Blog
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative overflow-x-auto border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs
                  .slice(0)
                  .reverse()
                  .map((blog) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-50"
                      key={blog.$id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {blog.title}
                      </th>
                      <td className="px-6 py-4 truncate">{blog.content}</td>
                      <td className="px-6 py-4">
                        <img
                          src={getFilePreview(blog.featuredImage)}
                          className="h-20 w-20 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">{blog.status}</td>
                      <td className="px-1 py-4">
                        <button
                          type="button"
                          className="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 mr-3"
                          onClick={() => editBlog(blog.$id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          onClick={() => deleteBlog(blog.$id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
