import React, {useState} from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../partials/actions/Datepicker';
import Banner from '../partials/Banner';
import ClientCard from '../partials/dashboard/ClientCard';
import TaskCard from '../partials/dashboard/TaskCard';

function Tasks() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div></div>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <Datepicker/>
                </div>
            </div>
            <div className="grid">
                <TaskCard/>
            </div>
        </div>
    );
}

export default Tasks;
