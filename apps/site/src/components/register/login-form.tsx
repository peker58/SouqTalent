import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { ThemeContext } from '../../context/ThemeContext'
import { Axios } from '../utils/axiosKits'
import { localGet, localRemove, localSave } from '../utils/localStore'
import { FormLoader } from '../lib/loader'

const LoginForm = () => {
	const { lostPasswordHandler } = React.useContext(ThemeContext)
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm()
	const router = useRouter()
	const { addToast } = useToasts()

	React.useEffect(() => {
		const local = localGet('user_login_info')
		if (local) {
			const { email, password } = local
			setValue('email', email)
			setValue('password', password)
			setValue('remember', true)
		}
	}, [setValue])

	const onSubmitHandler = async (data: any) => {
		const local = localGet('user_login_info')

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
					})
					/* -------------------------- user logged in popup ------------------------- */
					addToast(res.data.message, {
						appearance: 'success',
						autoDismiss: true,
					})
					router.replace('/dashboard')
					setTimeout(() => {
						reset()
					}, 600)
				}
			})
			.catch((error) => {
				if (error.response.data) {
					addToast(error.response.data.message, {
						appearance: 'error',
						autoDismiss: true,
					})
				} else {
					addToast(error.message, {
						appearance: 'error',
						autoDismiss: true,
					})
				}
			})

		if (data.remember) {
			localSave('user_login_info', data)
		}
		if (data.remember === false && local) {
			localRemove('user_login_info')
		}
	}

	return (
        <div className="max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white">
            <div className="mb-6 text-center">
                <h3 className="mb-4 text-2xl text-themeDarker">Login</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="mb-6">
                    <label
                        className="block mb-2 text-themeDarker font-normal"
                        htmlFor="Username"
                    >
                        Username
                    </label>
                    <input
                        id="Username"
                        className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                            errors?.email ? '!border-red-500' : 'border-gray'
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
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                            errors?.password ? '!border-red-500' : 'border-gray'
                        } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                        type="password"
                        {...register('password', { required: true })}
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
                                {...register('remember')}
                                type="checkbox"
                            />
                            <span className="ml-3 text-sm text-themeDarker font-normal">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <div className="w-full md:w-auto mt-1">
                        <button
                            className="inline-block text-sm font-normal text-themePrimary hover:text-green-600 hover:underline"
                            type="button"
                            onClick={lostPasswordHandler}
                        >
                            Lost password?
                        </button>
                    </div>
                </div>
                <button
                    className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
                        isSubmitting ? 'bg-themeDarkerAlt' : 'bg-themePrimary'
                    } rounded-md hover:bg-black`}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Please wait...' : 'Login'}
                    {isSubmitting && <FormLoader />}
                </button>
                <p className="text-center flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm text-deep font-normal">
                        Not a Member?
                    </span>
                    <Link href="/sign-up">
                        <a className="inline-block text-sm font-normal text-themePrimary hover:text-green-600 hover:underline">
                            Create Account
                        </a>
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default LoginForm
