"use client";

import EditTodoForm from "@/components/forms/todo/Edit.todo.form";


const EditTodoPage = () => {

    return (
        <div className='flex items-center flex-col '>
            <h1 className='text-center text-3xl font-bold py-20'>Edit Todo</h1>
            <EditTodoForm/>
        </div>
    );
};

export default EditTodoPage;
