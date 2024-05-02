import React, { useState, useEffect } from 'react';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin');
    }
  });

  useEffect(() => {
    async function getAllBlogs() {
      const getBlogs = await service.getPosts([]);

      setBlogs(getBlogs.documents);
      setTotalBlogs(getBlogs.documents.length);
    }
    getAllBlogs();
  }, []);

  function getFilePreview(fileID) {
    const getPreview = service.getFilePreview(fileID);

    const createFileName = getPreview.href;

    return createFileName;
  }

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div>
          <h1 className="text-4xl font-bold p-4">Dashboard</h1>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex items-center justify-center h-48 border shadow">
              <div>
                <p className="text-3xl font-bold">
                  We have currently {totalBlogs} blogs added in our system
                </p>
                <p className="flex items-center justify-center mt-5">
                  <button className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                    Add More
                  </button>
                </p>
              </div>
            </div>
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
                </tr>
              </thead>
              <tbody>
                {blogs
                  .slice(-5)
                  .reverse()
                  .map((blog) => (
                    <tr className="bg-white border-b" key={blog.$id}>
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

export default Dashboard;
