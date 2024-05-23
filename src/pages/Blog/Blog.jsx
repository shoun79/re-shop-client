import { useTitle } from "../../hooks/useTitle";

const Blog = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    useTitle('Blog') //for page title

    return (
        <div className="bg-gray-800 text-gray-50 my-10">
            <div className="container grid grid-cols-12 mx-auto">
                <div className="flex flex-col justify-center col-span-12 align-middle bg-no-repeat bg-cover dark:bg-gray-700 lg:col-span-6 lg:h-auto">
                    <div className="flex flex-col items-center p-8 py-12 text-center">
                        <span>{day}-{month}-{year}</span>
                        <h1 className="py-4 text-5xl font-bold">Lorem, ipsum dolor sit amet consectetur adipisicing.</h1>
                        <p className="pb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>

                    </div>
                </div>
                <div className="flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10 dark:divide-gray-700">
                    <div className="pt-6 pb-4 space-y-2">
                        <span>{day}-{month}-{year}</span>
                        <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>

                    </div>
                    <div className="pt-6 pb-4 space-y-2">
                        <span>{day}-{month}-{year}</span>
                        <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>

                    </div>
                    <div className="pt-6 pb-4 space-y-2">
                        <span>{day}-{month}-{year}</span>
                        <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;