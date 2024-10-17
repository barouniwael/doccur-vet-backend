const sequelize = require("../database/sql");
const Appointement = require("../modeles/appointement");
const Schedule = require("../modeles/schedule");
const moment = require("moment");
exports.reqAppointment = (req,res,next)=>{
console.log(req.body);
const dateString = req.body.date;
const parts = dateString.split('/');
// const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
const formattedDate = moment(dateString, 'MM/DD/YYYY').toDate();
// const dateObject = new Date(formattedDate);
console.log("dateObject",formattedDate);
// const timeString = req.body.time;;
// const [hours, minutes] = timeString.split(':');

// // Creating a dummy date with year, month, and day set to 1970-01-01
// const dummyDate = new Date(1970, 0, 1, hours, minutes);

// console.log(dummyDate);


Appointement.create({
    nom: req.body.nom,
    date:formattedDate,
    time:req.body.time,
}).catch(err=> console.log(err));
}

exports.postSchedule = async (req, res,next)=>{
console.log(req.body);
let day = req.body.day;
let time = req.body.time;
const schedule = await Schedule.findOne({
    where: {
        dayOfWeek: day,
     
    }
})

if (schedule) {
    const existingTimeSlots = JSON.parse(schedule.timeSlots || []);

    // Merge the existing and new time slots
    const newTimeSlots = req.body.time; // Assuming the new time slots are coming from the request body
    const updatedTimeSlots = [...new Set([...existingTimeSlots, ...newTimeSlots])];
    Schedule.update({
        dayOfWeek: day,
        timeSlots: updatedTimeSlots
    },
    {
    where : {
        dayOfWeek: day,
    }
})
    .then(
    res.json({msg:"Schedule updated successfully"})
    )
}else{
 await Schedule.create({
    dayOfWeek :day,
    timeSlots:time
    }).then(res.json({msg:"Schedule created successfully"}))

}





}

exports.getSchedule = async (req, res,next)=>{
    let day=  req.params.day
    console.log("params",day);
  const schedule = await  Schedule.findOne(
       { where:{
         dayOfWeek : day
          }
           }
    )
        
  
        if (schedule) {
           let scheduleArray = {
            dayOfWeek : schedule.dayOfWeek,
            timeSlots:  JSON.parse (schedule.timeSlots)
           }
            res.json({timeobj:scheduleArray})
        }else{
            res.json({msg:"Schedule not found"})
        }
     
     } 
exports.deleteSchedule= async (req, res, next)=>{
    let timeSlotToRemove = req.params.timeSlot;
    let day = req.params.day;
    console.log("paramss",timeSlotToRemove,day);
    const schedule = await Schedule.findOne({
        where: { dayOfWeek : day }  // Adjust the condition to your needs
      });
 
      timeSlotsArray = JSON.parse(schedule.timeSlots);
      console.log(typeof timeSlotsArray );
      console.log(timeSlotsArray );
      const updatedTimeSlots = timeSlotsArray.filter(slot => slot !== timeSlotToRemove);
      
    // // Step 3: Update the record
    schedule.timeSlots = updatedTimeSlots;

    // // Save the updated record
     await schedule.save();
     res.json({msg:"timeslot deleted"})
}