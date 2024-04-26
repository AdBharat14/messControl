const StudentSchema = require('../schema/schemaStudent')

const isValidStudentEmail = async function(email){
    const existingStudent = await StudentSchema.findOne({email: email});
    if(existingStudent)
        return true
    else
        return false
}

const isValidStudentId = async function(_id){
    const existingStudent = await StudentSchema.findById(_id);
    if(existingStudent)
        return true
    else
        return false
}

const isValidStudentRecoveryEmail = async function(recoveryEmail){
    const existingUser = await StudentSchema.findOne({recoveryEmail: recoveryEmail});
    if(existingUser)
        return true
    else
        return false
}

const isValidStudentRegNo = async function(regNo){
    const existingUser = await StudentSchema.findOne({regNo: regNo});
    if(existingUser)
        return true
    else
        return false
}

const createStudent = async function(data){
    const student = new StudentSchema({
        name: data.name,
        regNo: data.regNo,
        email: data.email,
        password: data.password,
        recoveryEmail: data.recoveryEmail,
        hostelName: data.hostelName,
        roomNo: data.roomNo,
        verified: false
    })
    let response;
    await student.save().then(()=>{
        response = {status: 200, data: {message: "Successfully registered the Student"}};
    }).catch((err)=>{
        response =  {status: 400, message:"some kind of error"+err};
    })
    return response;
}

const isValidStudent = async function(data){
    let existingStudent = await StudentSchema.findOne({email: data.email})
    if(existingStudent){
        if(existingStudent.password === data.password){
            return {_id: existingStudent._id};
        }
    }
    else{
        return null;
    }
}

const verifyStudent = async function(id){
    let existingStudent = await StudentSchema.findById(id);
    if(existingStudent){
        existingStudent.verified=true;
        await existingStudent.save();
    }
}

const isVerifiedStudentId = async function(id){
    let existingStudent = await StudentSchema.findOne({_id: id})
    if(existingStudent&&existingStudent.verified==true){
        return true;
    }
    else{
        return false;
    }
}

const getStudentbyId = async function(_id){
    let student = await StudentSchema.findOne({_id: _id});
    if(student){
        return {
            name: student.name,
            email: student.email,
            regNo: student.regNo,
            hostelName: student.hostelName,
            profileImg: student.profileImg,
            roomNo: student.roomNo
        };
    }
    else{
        return null;
    }
}

// const getStudentbyEmail

// const getStudentbyRecoveryEmail

// const getStudentby

module.exports = {verifyStudent, isVerifiedStudentId, isValidStudentEmail, isValidStudentRegNo, createStudent, isValidStudentRecoveryEmail, isValidStudent, getStudentbyId, isValidStudentId}