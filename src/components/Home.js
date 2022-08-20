import React from 'react';
import Table from './Table';

function Home() {
    return (
        <>
            <div className="row my-3">
                <div className='col-12'>
                    Student Information | <span className='text-info mx-2'>Home</span>/ Student Management
                </div>
            </div>
            <div className="row">
                <Table />
            </div>
        </>
    )
}

export default Home