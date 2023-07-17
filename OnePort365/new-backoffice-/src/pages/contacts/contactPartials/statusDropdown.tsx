import React from 'react';
import { updateStatus } from "store/actions";
import { useForm } from "react-hook-form";

  
const StatusDropdown = (props:any) => {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        // updateStatus(data)
    }

    return (
        <div className='mr-10'>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option selected>Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            {/* <Menu as="div" className="mx-10 relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    Status
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    // // as={Fragment}
                    // enter="transition ease-out duration-100"
                    // enterFrom="transform opacity-0 scale-95"
                    // enterTo="transform opacity-100 scale-100"
                    // leave="transition ease-in duration-75"
                    // leaveFrom="transform opacity-100 scale-100"
                    // leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right relative right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Open
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Closed
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                            Attended
                            </a>
                        )}
                        </Menu.Item>
                        <form method="POST" action="#">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                type="submit"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                                )}
                            >
                                Not Attended
                            </button>
                            )}
                        </Menu.Item>
                        </form>
                    </div>
                    </Menu.Items>
                </Transition>
                </Menu> */}
        </div>
    )
}
export default StatusDropdown;