import { useState } from 'react';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';
import { useForm } from 'react-hook-form';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin({ userData }));
          navigate('/admin/dashboard');
        }
      }
    } catch (error) {
      setError('Invalid credentials. Please check the email and password.');
      console.error('Failed to login: ', error);
    }
  };

  return (
    <section className="bg-white-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {error == '' ? (
                ''
              ) : (
                <div>
                  <p className="border-2 border-red-600 text-sm text-red-600 text-center p-1 rounded-md">
                    {error}
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register('email', {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || 'Email address must be a valid address',
                    },
                  })}
                />
                {errors.email &&
                  (errors.email.type == 'matchPattern' ? (
                    <p className="text-red-600">
                      Email address must be a valid address
                    </p>
                  ) : (
                    <p className="text-red-600">This field is required</p>
                  ))}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register('password', {
                    required: true,
                    minLength: 8,
                  })}
                />
                {errors.password &&
                  (errors.password.type == 'minLength' ? (
                    <p className="text-red-600">
                      Password must be of 8 characters
                    </p>
                  ) : (
                    <p className="text-red-600">This field is required</p>
                  ))}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
