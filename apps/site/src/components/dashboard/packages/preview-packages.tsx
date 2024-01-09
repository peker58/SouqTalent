import _ from 'lodash';
import useSWR from 'swr';
import { authAxios } from '../../utils/axiosKits';
import fallBackData from './fallbackData.json';

const fetcher = (url: string) =>
    authAxios.get(url).then((res: any) => res.data);

const PreviewPackages = () => {
    const { data, error } = useSWR(`/packages/retrives`, fetcher, {
        fallbackData: fallBackData,
    });
    return (
        <div className="mx-auto">
            {/* error box */}
            {error && (
                <div className="w-full lg:w-1/3 mb-8 shadow rounded bg-red-400 mx-auto p-6">
                    <h3 className="text-lg font-bold text-center text-white">
                        Something went wrong. Please try again later. ☹️
                    </h3>
                </div>
            )}
            {data && data?.data?.length > 0 && (
                <>
                    <div className="w-full lg:w-1/2 mb-8">
                        <h3 className="text-xl font-bold text-themeDarkerAlt !mb-3">
                            We Have Exclusive Plan In Our Pricing
                        </h3>
                        <p className="text-xs text-themeLight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Congue feugiat adipiscing urna mauris sit leo
                            consectetur tortor, dui.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 2xl:!gap-14">
                        {_.map(data?.data, (item, index) => (
                            <div
                                className="shadow rounded-lg overflow-auto relative"
                                key={index}
                            >
                                {/* Heading */}
                                {item.subTitleStatus && (
                                    <div className="w-full !py-1.5 text-sm text-center text-white bg-themePrimary">
                                        {item.subtitle}
                                    </div>
                                )}
                                {/* Body */}
                                <div className="!px-6 pt-6 pb-20">
                                    <h1 className="text-xxl2 font-semibold mb-6">
                                        $
                                        {item.pricing === 0
                                            ? '00'
                                            : item.pricing}
                                        <span className="text-xs text-themeLight">
                                            /Monthly
                                        </span>
                                    </h1>
                                    <h3 className="text-lg text-themeDarkerAlt font-semibold !mb-5">
                                        {item.packageName}
                                    </h3>
                                    <p className="text-sm text-themeLight !mb-5">
                                        {item.shortDesc}
                                    </p>
                                    <hr className="!border-gray !mb-8" />
                                    <ul>
                                        <li className="!mb-4 flex justify-between gap-3">
                                            <span className="text-xs text-themeLight">
                                                Job Posting
                                            </span>
                                            <span className="text-xs text-themeLight">
                                                {item.totalJobs}
                                            </span>
                                        </li>
                                        <li className="!mb-4 flex justify-between gap-3">
                                            <span className="text-xs text-themeLight">
                                                Featured Job
                                            </span>
                                            <span className="text-xs text-themeLight">
                                                {item.featuredJobs}
                                            </span>
                                        </li>
                                        <li className="!mb-4 flex justify-between gap-3">
                                            <span className="text-xs text-themeLight">
                                                Job Displayed
                                            </span>
                                            <span className="text-xs text-themeLight">
                                                {item.validity}/days
                                            </span>
                                        </li>
                                        {_.map(
                                            item.services,
                                            (field, index) =>
                                                (field.name ||
                                                    field.details) && (
                                                    <li
                                                        className="!mb-4 flex justify-between gap-3"
                                                        key={field.id}
                                                    >
                                                        <span className="text-xs text-themeLight">
                                                            {field.name}
                                                        </span>
                                                        <span className="text-xs text-themeLight">
                                                            {field.details}
                                                        </span>
                                                    </li>
                                                ),
                                        )}
                                    </ul>
                                </div>
                                {/* button */}
                                <div className="!p-6 absolute bottom-0 left-0 w-full">
                                    <button
                                        type="button"
                                        className="block w-full bg-themePrimary transition-all duration-300 ease-in-out hover:!bg-themeDarkerAlt hover:!border-themeDarkerAlt !border-themePrimary text-white border px-10 !py-3 rounded-lg"
                                    >
                                        {item.buttonText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PreviewPackages;
