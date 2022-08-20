import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from "react-router-dom";

const Table = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [students, setStudents] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const getStudents = async () => {
        axios.post('https://mtml-api.hestawork.com/api/user/filter-students', {
            "page": `${page}`,
            "limit": "10"
        }).then(function (response) {
            // console.log(response);
            setStudents(response.data.data)
        }).catch(function (error) {
            console.log(error);
        });
    }

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            name: 'Student ID',
            selector: row => row.studentId,
            sortable: true,
        },
        {
            name: 'First Name',
            selector: row => row.fname,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lname,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.mobile_number,
            sortable: true,
        },
        {
            name: 'Class',
            selector: row => row.className,
            sortable: true,
        },
        {
            name: 'Section',
            selector: row => row.section,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Campus',
            selector: row => row.campus,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row =>
                <>
                    <Link to={'/edit/' + row.id} className="btn btn-sm">
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png" />
                    </Link>
                    <button className="btn btn-sm">
                        <img src="https://img.icons8.com/fluency/30/000000/delete-forever.png" />
                    </button>
                </>
            ,
            sortable: true,
        },
    ];

    useEffect(() => {
        getStudents();
    }, [page])

    useEffect(() => {
        const rows = [];
        if (students) {
            // console.log(students.docs[0])
            students.docs.map((element) => {
                rows.push({
                    id:element._id,
                    studentId: element.student.student_id,
                    fname: element.first_name,
                    lname: element.last_name,
                    email: element.email,
                    mobile_number: element.mobile_number,
                    section: element.student.section,
                    className: element.student.class_name,
                    campus: element.campus,
                })
            })
        }
        setData(rows);
    }, [students])



    return (
        <>
            <div className='row my-2' style={{ minHeight: "60vh" }}>
                {students ?
                    <DataTable
                        columns={columns}
                        data={data}
                        selectableRows
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                    />
                    :
                    <div className='card text-center py-5'>
                        Loading..!
                    </div>
                }
            </div>
            <div className='row my-2'>
                <div className='d-flex justify-content-end'>
                    {students &&
                        <>
                            {[...Array(students.pages)].map((x, i) =>
                                <button key={i} className={`btn bg-white mx-2 ${page === i + 1 && 'disabled'}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Table;