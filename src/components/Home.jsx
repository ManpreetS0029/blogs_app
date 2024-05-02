import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlogs() {
      const getBlogs = await service.getPosts([]);

      console.log(getBlogs);

      setBlogs(getBlogs.documents);
    }

    getBlogs();
  }, []);

  function getFilePreview(fileID) {
    const getPreview = service.getFilePreview(fileID);
    const createFileName = getPreview.href;

    return createFileName;
  }

  function readBlog(slug) {
    navigate('/blog/' + slug);
  }

  return (
    <>
      <div className="w-full bg-white mt-24">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              Stay updated about the latest tech
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Subscribe to our newsletter to get updates of latest blogs.
            </p>
            <form action="" className="mt-8 flex items-start space-x-2">
              <div>
                <input
                  className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                />
                <p className="mt-2 text-sm text-gray-500">
                  We care about your privacy
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
              src="https://img.etimg.com/thumb/msid-88634316,width-1200,height-900,imgsize-65126,resizemode-8,quality-100/tech/technology/tracking-the-buzz-in-tech.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-7xl px-2">
            <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
              <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                Blogs
              </p>
            </div>

            <div className="grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs
                .slice(0)
                .reverse()
                .map((blog) => (
                  <div className="border" key={blog.$id}>
                    <img
                      src={getFilePreview(blog.featuredImage)}
                      className="aspect-video w-full rounded-md"
                      alt=""
                    />
                    <div className="min-h-min p-3">
                      <p className="mt-4 flex-1 text-base font-semibold text-gray-900">
                        {blog.title}
                      </p>
                      <p className="mt-4 w-full text-sm leading-normal text-gray-600 ">
                        <button
                          type="button"
                          className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          onClick={() => readBlog(blog.$id)}
                        >
                          Read
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
