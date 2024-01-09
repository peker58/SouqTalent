import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useSWRConfig } from 'swr';
import { ThemeContext } from '../../context/ThemeContext';
import { FormLoader } from '../lib/loader';
import { Axios } from '../utils/axiosKits';
import { localGet, localRemove, localSave } from '../utils/localStore';

const PopupLogin = () => {
    const { mutate } = useSWRConfig();
    const [loading, setLoading] = React.useState(false);
    const {
        LoginPopup,
        LoginPopupHandler,
        RegisterPopupHandler,
        lostPasswordHandler,
    } = React.useContext(ThemeContext) as any;
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();
    const router = useRouter();
    const { addToast } = useToasts();

    React.useEffect(() => {
        const local = localGet('user_login_info');
        if (local) {
            const { email, password } = local;
            setValue('email', email);
            setValue('password', password);
            setValue('remember', true);
        }
    }, [setValue, LoginPopup]);

    const onSubmitHandler = async (data: any) => {
        const local = localGet('user_login_info');
        setLoading(true);
        await Axios({
            method: 'post',
            url: `/users/login`,
            data: {
                email: data.email,
                password: data.password,
            },
        })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    /* ------------------------- localStorage data save ------------------------- */
                    localSave('UserData', {
                        ...res.data,
                        login_at: new Date(),
                        // expires one day after login
                        expires_in: new Date(new Date().getTime() + 86400000),
                    });
                    /* -------------------------- user logged in popup ------------------------- */
                    mutate('/users/retrives').then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        LoginPopupHandler();
                        reset();
                    });
                }
            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
                setLoading(false);
            });
        if (data.remember) {
            localSave('user_login_info', data);
        }
        if (data.remember === false && local) {
            localRemove('user_login_info');
        }
    };

    const RegisterHandler = async () => {
        await LoginPopupHandler();
        await setTimeout(() => {
            RegisterPopupHandler();
        }, 300);
    };

    return (
        <div
            className={`fixed w-full h-full z-[98] top-0 left-0 bg-[#000000b3] text-[#fff] transition-all ease-in-out duration-300 ${
                LoginPopup ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
            <div className="flex justify-center items-center w-full h-screen">
                <div
                    className={`max-w-[550px] w-full z-[99] h-fit overflow-auto bg-[#fff] rounded-[5px] shadow-[0_0px_10px_rgba(0,0,0,0.2)] transition-all ease-in-out duration-300 ${
                        LoginPopup
                            ? 'transform scale-100 opacity-100 visible'
                            : 'opacity-0 invisible transform scale-[0.7]'
                    }`}
                >
                    <div className="flex justify-between items-center px-10 py-4 border-b border-[#ebebeb]">
                        <h4 className="text-3xl font-medium text-[#000]">
                            Login
                        </h4>
                        <div
                            onClick={LoginPopupHandler}
                            className="p-[15px] bg-[#000] rounded-[5px] cursor-pointer hover:bg-themePrimary duration-300 ease-in-out"
                        >
                            <LoginFormTitleCloseIcon className="text-[#fff] w-4 h-4" />
                        </div>
                    </div>
                    <div className="px-10 pt-10 pb-6">
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="mb-6">
                                <label
                                    className="block mb-2 text-themeDarker font-normal"
                                    htmlFor=""
                                >
                                    Username
                                </label>
                                <input
                                    className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                                        errors?.email
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                                    type="email"
                                    {...register('email', { required: true })}
                                    placeholder="Enter Your Username"
                                />
                                {errors?.email && (
                                    <span className="text-red-500 text-xss italic">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-themeDarker font-normal"
                                    htmlFor=""
                                >
                                    Password
                                </label>
                                <input
                                    className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                                        errors?.password
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                                    type="password"
                                    {...register('password', {
                                        required: true,
                                    })}
                                    placeholder="Enter Your Password"
                                />
                                {errors?.password && (
                                    <span className="text-red-500 text-xss italic">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center justify-between mb-6">
                                <div className="w-full md:w-1/2">
                                    <label className="relative inline-flex items-center">
                                        <input
                                            className="checked:bg-red-500 w-4 h-4"
                                            type="checkbox"
                                            {...register('remember')}
                                        />
                                        <span className="ml-3 text-sm text-themeDarker font-normal">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className="w-full md:w-auto mt-1">
                                    <button
                                        type="button"
                                        className="inline-block text-sm font-normal text-themePrimary hover:underline"
                                        onClick={lostPasswordHandler}
                                    >
                                        Lost password?
                                    </button>
                                </div>
                            </div>
                            <button
                                className={`flex gap-2 items-center justify-center !py-3 px-7 duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
                                    isSubmitting || loading
                                        ? 'bg-themeDarkerAlt'
                                        : 'bg-themePrimary'
                                } rounded-md hover:bg-black`}
                                type="submit"
                                disabled={isSubmitting || loading}
                            >
                                {isSubmitting || loading
                                    ? 'Please wait...'
                                    : 'Login'}
                                {(isSubmitting || loading) && <FormLoader />}
                            </button>
                        </form>

                        <p className="text-center flex flex-wrap items-center justify-center gap-3">
                            <span className="text-sm text-deep font-normal">
                                Not a Member?
                            </span>
                            <button
                                onClick={RegisterHandler}
                                className="inline-block text-sm font-normal text-themePrimary hover:underline"
                            >
                                Create Account
                            </button>
                        </p>
                    </div>
                </div>
                <div
                    className="fixed top-0 left-0 w-full h-full z-[95]"
                    onClick={LoginPopupHandler}
                />
            </div>
        </div>
    );
};

const LoginFormTitleCloseIcon = ({ ...props }) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                fill="currentColor"
            />
        </svg>
    );
};

export default PopupLogin;
