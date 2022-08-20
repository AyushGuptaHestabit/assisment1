import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';

const customStyles = {
    content: {
        top: '50%',
        left: '85%',
        right: 'auto',
        marginRight: '-50%',
        width: '25vw',
        height: '95vh',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('*');

const Table = () => {
    const [studentId, setStudentId] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [students, setStudents] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [userId, setUserId] = useState('');
    const [DOB, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [campusses, setCampusses] = useState([]);
    const [campus, setCampus] = useState('');
    const [classes, setClasses] = useState([]);
    const [classs, setclasss] = useState('');
    const [sections, setSections] = useState([]);
    const [section, setSection] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

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

    const getClasses = () => {
        axios.get('https://mtml-api.hestawork.com/api/userClass/class-details')
            .then(function (response) {
                // console.log(response.data.data)
                setClasses(response.data.data.classes)
                setCampusses(response.data.data.campus)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    const getSections = () => {
        axios.get('https://mtml-api.hestawork.com/api/userClass/class-details')
            .then(function (response) {
                const data = response.data.data.classes;
                data.map((element) => {
                    if (element.class_name === classs) {
                        setSections(element.section)
                    }
                })
            })
    }

    const editStudent = (id) => {
        students.docs.map((element) => {
            if (element._id === id) {
                setFname(element.first_name)
                setLname(element.last_name)
                setEmail(element.email)
                setMobile(element.mobile_number)
                setclasss(element.student.class_name)
                setSection(element.student.section)
                setCampus(element.campus)
                setStudentId(element.student.student_id)
                setUserId(id)
                setDOB(element.student.dob)
                setGender(element.student.gender)
                openModal()
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const header = {
            Authorization: "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjRkYzdlOGJkOTc5MDAxMWMwODg0OSIsInJvbGUiOjIsImlzX3ZlcmlmaWVkIjp0cnVlLCJpc19ibG9ja2VkIjpmYWxzZSwiZW1haWwiOiJlbHRzQGdldG5hZGEuY29tIiwiaWF0IjoxNjIzMTYxMjM1LCJleHAiOjE2MjM0MjA0MzV9.BO6wMcMimCbW8kBKJ0-kUBMXrnOp8HPUyNXx-ui98VM"
        }
        const data = {
            "first_name": fname,
            "last_name": lname,
            "campus": campus,
            "user_id": userId,
            "student_id": studentId,
            "dob": DOB,
            "gender": gender,
            "email": email,
            "mobile_number": mobile,
            "class_name": classs,
            "section": section
        }
        console.log(data)
        axios.put('https://mtml-api.hestawork.com/api/user/update-student', data, header)
            .then(function (response) {
                toast.success(response.data.message)
                getStudents();
            })
            .catch(function (err) { toast.error(err.message) })
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
            name: 'Date of Birth',
            selector: row => row.dob,
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
                    <Link to={'/edit/' + row.id} data-tip="Edit data on the next page" className="btn btn-sm">
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png" />
                    </Link>
                    <button onClick={() => editStudent(row.id)} data-tip="Edit data on the same page" className="btn btn-sm">
                        <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/30/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-1.png" />
                    </button>
                    <button data-tip="hello world" className="btn btn-sm">
                        <img src="https://img.icons8.com/fluency/30/000000/delete-forever.png" />
                    </button>
                </>
            ,
            sortable: true,
        },
    ];

    useEffect(() => {
        getStudents();
        getClasses();
    }, [page])

    useEffect(() => {
        const rows = [];
        if (students) {
            // console.log(students.docs[0])
            students.docs.map((element) => {
                rows.push({
                    id: element._id,
                    studentId: element.student.student_id,
                    fname: element.first_name,
                    lname: element.last_name,
                    email: element.email,
                    mobile_number: element.mobile_number,
                    section: element.student.section,
                    className: element.student.class_name,
                    campus: element.campus,
                    dob: element.student.dob
                })
            })
        }
        setData(rows);
    }, [students])

    useEffect(() => {
        getSections()
    }, [classs])

    return (
        <>
            <div className='row my-2' style={{ minHeight: "60vh" }}>
                <ReactTooltip />
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end h4'>
                        <p className='my-auto mx-5 px-5'>Edit Student</p>
                        <button className='btn border-danger text-danger' onClick={closeModal}>Close</button>
                    </div>
                    <form onSubmit={(e) => submitHandler(e)}>
                        <div className='col-12'>
                            <div className='form-group my-3'>
                                <label htmlFor="fname">First Name</label>
                                <input id="fname" className='form-control' type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor="fname">Last Name</label>
                                <input id="fname" className='form-control' type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
                            </div>

                            <div className='form-group my-3'>
                                <label htmlFor="fname">Email</label>
                                <input id="fname" className='form-control' type="text" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={true} />
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor="fname">Mobile Number</label>
                                <input id="fname" className='form-control' type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>

                            <div className='form-group my-3'>
                                <label htmlFor="DOB">Date of birth</label>
                                <input type="date" id='DOB' className='form-control' value={DOB} onChange={(e) => setDOB(e.target.value)} />
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor="fname">Gender</label>
                                <select className='form-control' onChange={(e) => setGender(e.target.value)}>
                                    <option>Select</option>
                                    <option selected={gender === "Male"}>Male</option>
                                    <option selected={gender === "Female"}>Female</option>
                                </select>
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor="studentId">Student ID</label>
                                <input type="text" id='studentId' className='form-control' value={studentId} readOnly={true} />
                            </div>

                            <div className='form-group my-3'>
                                <label htmlFor="fname">Class</label>
                                <select className='form-control' onChange={(e) => setclasss(e.target.value)}>
                                    <option>Select</option>
                                    {classes.map((elem1, idx) => {
                                        return (
                                            <option key={idx} selected={elem1.class_name === classs}>{elem1.class_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor="fname">Section</label>
                                <select className='form-control' onChange={(e) => setSection(e.target.value)}>
                                    <option>Select</option>
                                    {sections.map((elem2, idx) => {
                                        return (
                                            <option key={idx} selected={elem2.section === section}>{elem2.section}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor="fname">Campus</label>
                                <select className='form-control' onChange={(e) => setCampus(e.target.value)}>
                                    <option>Select</option>
                                    {campusses.map((elem3, idx) => {
                                        return (
                                            <option key={idx} selected={elem3.campus_name === campus}>{elem3.campus_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <input type='submit' className={`btn btn-success ${fname && lname && email && mobile && campus && studentId && classs && section ? '' : 'disabled'}`} />
                        <Link to={'/'} className='btn border border-danger text-danger mx-2'>Cancel</Link>
                    </form>
                </div>
            </Modal >
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

export default Table;