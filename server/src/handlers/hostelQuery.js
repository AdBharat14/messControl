const HostelSchema = require("../database/schema/schemaHostel")


const getAllHostels = async function(req,res,next){
    const hostels = await HostelSchema.find({},'hostelName');
    res.send({status:200,data:{
        hostels: hostels
    }})
}
 
module.exports = {getAllHostels}

