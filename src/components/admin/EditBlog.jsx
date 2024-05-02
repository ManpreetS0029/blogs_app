import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import conf from '../../conf/conf';
import service from '../../appwrite/config';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const EditBlog = () => {
  const editorRef = useRef(null);
  const { slug } = useParams();
  const [image, setImage] = useState('');
  const [editorVal, setEditorVal] = useState('');
  const [error, setError] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin');
    }
  });

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((blog) => {
        if (blog) {
          setValue('title', blog.title);
          setValue('image', blog.featuredImage);
          setEditorVal(blog.content);
          setImage(blog.featuredImage);
        }
      });
    }
  }, [slug]);

  const slugTransform = useCallback((value) => {
    if (value && typeof value == 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  function getFilePreview(fileID) {
    const getPreview = service.getFilePreview(fileID);

    const createFileName = getPreview.href;

    return createFileName;
  }

  const onSubmit = async (data) => {
    const uploadImg = await service.uploadFile(data.image[0]);

    if (!editorRef.current || !editorRef.current.getContent()) {
      setError('This field is required');
    } else {
      const editBlogInDB = await service.updatePost(slug, {
        title: data.title,
        content: editorRef.current.getContent(),
        featuredImage: uploadImg.$id,
        status: 'Active',
      });

      if (editBlogInDB) {
        const uploadImg = await service.uploadFile(image);
        if (uploadImg) {
          navigate('/admin/blogs');
        }
      }
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div>
          <h1 className="text-4xl font-bold p-4">Edit Blog</h1>
        </div>
        <div className="p-4">
          <form className="max-w-screen" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="slug"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Slug
              </label>
              <input
                type="text"
                id="slug"
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register('slug', { required: true })}
                onInput={(e) => {
                  setValue('slug', slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.slug && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Featured Image
              </label>

              <input
                type="file"
                id="image"
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register('image', { required: true })}
              />
              {errors.image && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {image && (
              <div className="w-1/3 px-2 mb-4">
                <img src={getFilePreview(image)} className="rounded-lg" />
              </div>
            )}
            <div className="mb-5">
              <Editor
                apiKey={conf.tinymceAPIKey}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={editorVal}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
            {error == '' ? (
              ''
            ) : (
              <div className="mb-4">
                <span className="text-red-500 ">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
