import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { v4 as uuidv4 } from 'uuid';
import { BsTrash3 } from "react-icons/bs";
import { DegreesCbb } from "../../utils/data";
import AddEducation from "../../pages/Seeker/Setting/MyResume/AddEducation";
import { useDispatch, useSelector } from "react-redux";
import { updateUserResumeAction } from "../../redux/slices/users/usersSlices";
import AddAward from "../../pages/Seeker/Setting/MyResume/AddAward";
import AddExperience from "../../pages/Seeker/Setting/MyResume/AddExperience";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
const BackgroundItem = ({ title, subtitle, description, textColor, bgColor,
    isLast, detailMajors, isEdit = false, setFunction,
    type = 'default', initList, index, cbbMajorDetail, setCbbMajorDetail }) => {
        
    const [edit, setEdit] = useState('default');
    const dispatch = useDispatch();
    const [OccupationCbb, setOccuaptionCbb] = useState([]);
    const [selectedItem, setSelectedItem] = useState({})

    const users = useSelector(store => store?.users);
    const {userAuth}=users;
    
    const handleEdit = async () => {
        if (type === 'education') {
            const arr = [];
            title.forEach(item => {
                const obj = {};
                const ar1 = item?.titleName.split(' in ');
                obj.degree = ar1[0];
                obj.major = ar1[1];
                const ar2 = item?.dateInfo.split(' - ');
                obj.startYear = ar2[0];
                obj.endYear = ar2[1];
                DegreesCbb.forEach(item => {
                    if (obj.degree === item.name) {
                        obj.degree = { id: item.id, name: item.name }
                    }
                })
                obj.id = uuidv4();
                arr.push(obj)
            })
            const item = {
                universityName: subtitle,
                detailMajorSeekers: [...arr],
                description: description,
                action: 'update'
            }
            setSelectedItem({ ...item })
            console.log(item)
            setEdit('education')
        }
        if (type === 'award') {
            const item = {
                certificationName: title[0].titleName,
                year: title[0].dateInfo,
                description: description,
                certifiedBy: subtitle,
                action: 'update'
            }
            setSelectedItem({ ...item })
            console.log(item)
            setEdit('award')
        }
        if (type === 'experience') {
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            const {data} = await axios.get(`${baseUrl}/api/v1/occupations`, config);
            // console.log(data)
            
            const ar2 = title[0]?.dateInfo.split(' - ');

            const obj = {};
            data.forEach(item => {
                if (item.occupationName === title[0].titleName) {
                    obj.id = item.occupationId;
                    obj.name = item.occupationName;
                    const cc = [...item.listMajor]
                    const l = cc.filter(item => !detailMajors.includes(item))
                    console.log(l)
                    obj.detailMajors = [...l]
                }
            })
            setOccuaptionCbb(prev => {
                var list = [];
                data.forEach(item => {
                    const obj = {};
                    obj.id = item.occupationId;
                    obj.name = item.occupationName;
                    obj.detailMajors = [...item.listMajor]
                    list.push(obj)
                })
                return list;
            })
            const item = {
                occupationName: { ...obj },
                majors: [...detailMajors],
                startYear: ar2[0],
                endYear: ar2[1],
                organizerName: subtitle,
                description: description,
                action: 'update'
            }
            setSelectedItem({ ...item })
            // console.log(item)
            setEdit('experience')
        }
    }

    const handleSelect = (e, name) => {
        setSelectedItem(prev => {
            const obj = { ...prev }
            obj[name] = e.id === -1 ? { id: -1, name: '', detailMajors: [] } : e
            if (name === 'occupationName') {
                const cbb = []
                obj.occupationName.detailMajors?.map((item, index) => {
                    cbb.push({ id: index + 1, name: item })
                })
                setCbbMajorDetail(cbb)
                obj.majors = []
            }
            return obj
        })
    }
    const handleDelete = () => {
        const arr = initList.filter((item, i) => i !== index);
        const reversedArray = [...arr].reverse();
        if (type === 'education') {
            const dt = {
                educationUsers: [...reversedArray],
                actions: 1
            }
            dispatch(updateUserResumeAction(dt));
        } if (type === 'award') {
            const dt = {
                certificationUsers: [...reversedArray],
                actions: 3
            }
            dispatch(updateUserResumeAction(dt));
        } if (type === 'experience') {
            const dt = {
                experienceUsers: [...reversedArray],
                actions: 2
            }
            dispatch(updateUserResumeAction(dt));
        }
    }
    return (
        <>
            {
                edit === 'education' ? <AddEducation educations={selectedItem.detailMajorSeekers} setEducations={setFunction} initList={initList} name={selectedItem.universityName} des={selectedItem.description} action={selectedItem.action} edit={edit} setEdit={setEdit} index={index} setSelectedItem={setSelectedItem} />
                    : edit === 'award' ? <AddAward award={selectedItem} setAward={setFunction} edit={edit} setEdit={setEdit} index={index} setSelectedItem={setSelectedItem} action={selectedItem.action} initList={initList} />
                        : edit === 'experience' ? <AddExperience handleSelect={handleSelect} experience={selectedItem} setExperience={setFunction} edit={edit} setEdit={setEdit} index={index} setSelectedItem={setSelectedItem} action={selectedItem.action} initList={initList} OccupationCbb={OccupationCbb} cbbMajorDetail={cbbMajorDetail} setCbbMajorDetail={setCbbMajorDetail} />
                            :
                            <div className="flex flex-row">
                                <div className="flex flex-col items-center w-[13px]">
                                    {
                                        <div className="w-full h-[15px] flex items-center justify-center rounded-full mt-1 leading-[15px]" style={{ backgroundColor: bgColor }}>
                                            {/* <div className="w-[10px] h-[10px] rounded-full" style={{backgroundColor: textColor}}></div> */}
                                        </div>
                                    }

                                    {
                                        isLast ? (null) : (<div className="h-full w-0 border-dashed border-l-2 my-[2px]" style={{ borderLeftColor: bgColor }}>

                                        </div>)
                                    }

                                </div>
                                <div className="ml-6">
                                    <div className="flex flex-row mb-[30px]">
                                        <div >
                                            <div className="flex">
                                                <div>
                                                    {
                                                        title.map((item, index) => {
                                                            return (
                                                                <div key={index} className="flex flex-row mb-1">
                                                                    <h3 className="text-base leading-[23px] text-[#202124] font-semibold mr-[5px]">{item.titleName}</h3>
                                                                    <div className="py-[5px] px-5 rounded-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
                                                                        <span className="text-xs leading-none font-semibold" style={{ color: textColor }}>{item.dateInfo}</span>
                                                                    </div>

                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                {isEdit ?
                                                    <div className="flex items-start ml-10">
                                                        <BiPencil className="cursor-pointer  mr-4 text-blue-800" fontSize={19} onClick={handleEdit} />
                                                        <BsTrash3 className="cursor-pointer text-red-700" fontSize={16} onClick={handleDelete} />
                                                    </div> : <></>}
                                            </div>
                                            <div className="flex flex-wrap w-3/4 my-3">
                                                {detailMajors && detailMajors.map((item, index) => {
                                                    return (
                                                        <div key={index} className={`mr-3 mb-2 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex`}>
                                                            <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <span className="text-base leading-[22px]" style={{ color: textColor }}>{subtitle}</span>
                                        </div>
                                    </div>
                                    <div className="mb-[60px]">
                                        <p className="text-[15px] text-[#696969]">{description}</p>
                                    </div>
                                </div>
                            </div>
            }

        </>
    );
};
export default BackgroundItem;

