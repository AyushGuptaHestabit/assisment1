import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditView(props) {
    const [studentId, setStudentId] = useState('');
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
    let params = useParams();

    const getStudentData = () => {
        axios.post('https://mtml-api.hestawork.com/api/user/filter-students', {
            "page": '1',
            "limit": "100"
        }).then(function (response) {
            const data = response.data.data.docs;
            data.map((element) => {
                if (element._id === userId) {
                    // console.log(element)
                    setFname(element.first_name)
                    setLname(element.last_name)
                    setEmail(element.email)
                    setMobile(element.mobile_number)
                    setclasss(element.student.class_name)
                    setSection(element.student.section)
                    setCampus(element.campus)
                    setStudentId(element.student.student_id)
                    setDOB(element.student.dob)
                    setGender(element.student.gender)
                }
            })
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
            .then(function (response) { toast.success(response.data.message) })
            .catch(function (err) { toast.error(err.message) })
    }

    useEffect(() => {
        setUserId(params.id)
    }, [params])

    useEffect(() => {
        if (userId) {
            getStudentData()
            getClasses()
        }
    }, [userId])

    useEffect(() => {
        getSections()
    }, [classs])



    return (
        <>
            <div className="row my-3">
                <div className='col-12'>
                    Student Information | <span className='text-info mx-2'>Home</span>/ Edit Student Data
                </div>
            </div>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="row my-3">
                    <div className='form-group col-6'>
                        <label htmlFor="fname">First Name</label>
                        <input id="fname" className='form-control' type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor="fname">Last Name</label>
                        <input id="fname" className='form-control' type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
                    </div>
                </div>
                <div className="row my-3">
                    <div className='form-group col-6'>
                        <label htmlFor="fname">Email</label>
                        <input id="fname" className='form-control' type="text" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={true} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor="fname">Mobile Number</label>
                        <input id="fname" className='form-control' type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                </div>
                <div className='row my-3'>
                    <div className='form-group col-4'>
                        <label htmlFor="DOB">Date of birth</label>
                        <input type="date" id='DOB' className='form-control' value={DOB} onChange={(e) => setDOB(e.target.value)} />
                    </div>
                    <div className='form-group col-4'>
                        <label htmlFor="fname">Gender</label>
                        <select className='form-control' onChange={(e) => setGender(e.target.value)}>
                            <option>Select</option>
                            <option selected={gender === "Male"}>Male</option>
                            <option selected={gender === "Female"}>Female</option>
                        </select>
                    </div>
                    <div className='form-group col-4'>
                        <label htmlFor="studentId">Student ID</label>
                        <input type="text" id='studentId' className='form-control' value={studentId} readOnly={true} />
                    </div>
                </div>
                <div className="row my-3">
                    <div className='form-group col-4'>
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
                    <div className='form-group col-4'>
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
                    <div className='form-group col-4'>
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
                <Link className='btn mx-3 border border-info text-primary' to={'/'}>Back</Link>
                <Link to={'/'} className='btn border border-danger text-danger'>Cancel</Link>
            </form>
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

export default EditView;