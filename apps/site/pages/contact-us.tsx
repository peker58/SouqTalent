import { FormLoader } from '@/src/components/lib/loader';
import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import Layout from '../src/components/frontend/layout';
import PageTitle from '../src/components/frontend/page-title';
import { Axios } from '../src/components/utils/axiosKits';

export default function ContactUs() {
    const { addToast } = useToasts();
    const [successMessage, setSuccessMessage] = React.useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
    });

    const onSubmitHandler = async (data: any) => {
        try {
            await Axios({
                method: 'POST',
                url: '/admin/contact',
                data,
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setSuccessMessage(res.data.message);
                    reset();
                }
            });
        } catch (error: any) {
            if (error?.response?.data) {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            } else {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    };

    React.useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
        }
    }, [successMessage]);

    return (
        <>
            <Head>
                <meta name="description" content="Contact us for any query." />
            </Head>

            <Layout>
                <main>
                    <PageTitle title="Contact Us" />
                    <section>
                        <div className="container mx-auto px-3 sm:px-0 py-10 md:py-20">
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="w-full">
                                        <h1 className="text-4xl font-semibold text-[#373737]">
                                            Contact with Our team!
                                        </h1>
                                        <p className="text-base text-grayLight !pt-5">
"Have inquiries or suggestions? Feel free to drop us a line at info@souqtalent.com.
 We look forward to hearing from you!"
                                        </p>
                                        <form
                                            onSubmit={handleSubmit(
                                                onSubmitHandler,
                                            )}
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 !pt-5">
                                                <div>
                                                    <input
                                                        className={`!p-3 bg-white rounded border ${
                                                            errors?.name
                                                                ? '!border-red-400'
                                                                : 'border-themeLighterAlt'
                                                        } focus:outline-none !shadow-md w-full transition duration-500 ease-in-out`}
                                                        type="text"
                                                        {...register('name', {
                                                            required:
                                                                'Name is required',
                                                            minLength: {
                                                                value: 3,
                                                                message:
                                                                    'Name must be at least 3 characters',
                                                            },
                                                        })}
                                                        placeholder="Name"
                                                    />
                                                    {errors?.name && (
                                                        <p className="text-red-400 text-sm italic py-2">
                                                            {
                                                                errors.name
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        className={`!p-3 bg-white rounded border ${
                                                            errors?.email
                                                                ? '!border-red-400'
                                                                : 'border-themeLighterAlt'
                                                        } focus:outline-none !shadow-md w-full transition duration-500 ease-in-out`}
                                                        type="email"
                                                        {...register('email', {
                                                            required:
                                                                'Email is required',
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                message:
                                                                    'Invalid email address',
                                                            },
                                                        })}
                                                        placeholder="Email"
                                                    />
                                                    {errors?.email && (
                                                        <p className="text-red-400 text-sm italic py-2">
                                                            {
                                                                errors.email
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                                                <div>
                                                    <input
                                                        className={`!p-3 bg-white rounded border ${
                                                            errors?.mobile
                                                                ? '!border-red-400'
                                                                : 'border-themeLighterAlt'
                                                        } focus:outline-none !shadow-md w-full transition duration-500 ease-in-out`}
                                                        type="text"
                                                        {...register('mobile', {
                                                            required:
                                                                'Mobile is required',
                                                            pattern: {
                                                                value: /^[0-9]+$/,
                                                                message:
                                                                    'Mobile must be numeric',
                                                            },
                                                        })}
                                                        placeholder="Mobile No"
                                                    />
                                                    {errors?.mobile && (
                                                        <p className="text-red-400 text-sm italic py-2">
                                                            {
                                                                errors.mobile
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        className={`!p-3 bg-white rounded border ${
                                                            errors?.subject
                                                                ? '!border-red-400'
                                                                : 'border-themeLighterAlt'
                                                        } focus:outline-none !shadow-md w-full transition duration-500 ease-in-out`}
                                                        type="text"
                                                        {...register(
                                                            'subject',
                                                            {
                                                                required:
                                                                    'This field is required',
                                                            },
                                                        )}
                                                        placeholder="Subject"
                                                    />
                                                    {errors?.subject && (
                                                        <p className="text-red-400 text-sm italic py-2">
                                                            {
                                                                errors.subject
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <textarea
                                                className={`border ${
                                                    errors?.message
                                                        ? '!border-red-400'
                                                        : 'border-themeLighterAlt'
                                                } focus:outline-none !shadow-md !p-3 h-40 w-full transition duration-500 ease-in-out rounded`}
                                                {...register('message', {
                                                    required:
                                                        'This field is required',
                                                })}
                                                placeholder="Type your message"
                                            />
                                            {errors?.message && (
                                                <p className="text-red-400 text-sm italic py-2">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                            <button
                                                className={`${
                                                    isSubmitting
                                                        ? 'bg-themeDarkerAlt hover:!bg-themeDarkerAlt hover:!text-white'
                                                        : 'bg-themePrimary hover:bg-white'
                                                } flex gap-2 items-center !py-3 px-8 rounded-lg mt-4  border hover:!border-themePrimary hover:!text-themePrimary text-white text-base  ease-in-out duration-500`}
                                            >
                                                {isSubmitting
                                                    ? 'Please wait...'
                                                    : 'Send Message'}
                                                {isSubmitting && <FormLoader />}
                                            </button>
                                        </form>
                                        {successMessage && (
                                            <div className="bg-themePrimary/10 border-l-4 border-green-500 text-green-700 py-3 px-4 mt-4">
                                                <p className="font-bold">
                                                    Success!
                                                </p>
                                                <p>{successMessage}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full mt-16">
                                        <div className="border-l-4 border-rose-400 px-5">
                                            <p className="text-lg font-medium text-[#373737]">
                                                Address
                                            </p>
                                            <p className="text-grayLight text-base font-normal pt-2">
                                                Dubai Marina, <br />{' '}
                                                United Arab Emirates
                                            </p>
                                        </div>

                                        <hr className="my-7" />
                                        <div className="border-l-4 border-blue-400 px-5">
                                            <p className="text-lg font-medium text-[#373737]">
                                                Phones
                                            </p>
                                            <p className="text-grayLight text-base font-normal pt-2">
                                                (+971) 56-5403760{' '}
                                                <span className="text-themePrimary">
                                                    (Toll Free)
                                                </span>
                                            </p>
                                            <p className="text-grayLight text-base font-normal pt-2">
                                                (056) 540-3760
                                            </p>
                                        </div>
                                        <hr className="my-7" />
                                        <div className="border-l-4 border-orange-400 px-5">
                                            <p className="text-lg font-medium text-[#373737]">
                                                E-Mail
                                            </p>
                                            <p className="text-grayLight text-base font-normal pt-2">
                                               Info@souqtalent.com
                                            </p>
                                            <p className="text-grayLight text-base font-normal pt-2">
                                            sales@souqtalent.com
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10 w-full block">
                                    <iframe
                                        className="h-96"
                                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d28913.07299609233!2d55.12257541957119!3d25.0634427864818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20iframe%20dubai%20marina!5e0!3m2!1sen!2sae!4v1703842247896!5m2!1sen!2sae"
                                        width="100%"
                                        height="100%"
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </>
    );
}
