const Student = require('../models/student');
const Company = require('../models/company');

// render company page
module.exports.companyPage = async function(request, respond){
    try{
        const students = await Student.find({});
        return respond.render('company-Home', { 
            title: 'Placement Cell | Company Page',
            students 
        });
    }catch(error){
        console.log(`Error in rendering page: ${error}`);
        return respond.redirect('back');
    }
};


// allocate interview
module.exports.allocateInterview = async function(request, respond){
    try{
        const students = await Student.find({});

        return respond.render('allocate_Interview', {
            title: 'Placement Cell | Company Page',
            students,
        });

    }catch(error){
        console.log(`Error in allocating interview: ${error}`);
        return respond.redirect('back');
    }
};

// schedule interview
module.exports.scheduleInterview = async function(request, respond){
    console.log('schedule interview', request.body);
    
    const { id, company, date } =  request.body;
    try{
        const existingCompany  = await Company.findOne({ name: company });

        const obj = {
            student: id,
            date,
            result: 'Pending',
        };

        // if company doesn't exist
        if(!existingCompany){
            const newCompany = await Company.create({
                name: company,
            });
            newCompany.students.push(obj);
            newCompany.save();
        }else{
            for(let student of existingCompany.students){
                // if student id already exists
                if(student.student._id === id){
                    console.log('Interview with this student already scheduled');
                    return respond.redirect('back');
                }
            }

            existingCompany.students.push(obj);
            existingCompany.save();
        }

        const student = await Student.findById(id);

        if(student){
            const interview = {
                company,
                date,
                result: 'Pending'
            };
            student.interviews.push(interview);
            student.save();
        }
        console.log('Interview Scheduled Successfully');
        return respond.redirect('/company/home');
    }catch(error){
        console.log(`Error in scheduling interview: ${error}`);
        return respond.redirect('back');
    }
};

// update status of interview
module.exports.updateStatus = async function(request, respond){
    const { id } = request.params;
    const { companyName, companyResult } = request.body;

    try{
        const student = await Student.findById(id);
        if(student && student.interviews.length > 0){
            for(let company of student.interviews){
                if(company.company === companyName){
                    company.result = companyResult;
                    student.save();
                    break;
                }
            }
        }

        const company = await Company.findOne({ name: companyName });
        if(company){
            for(let std of company.students){
                // compare student id and passes in params
                if(std.student.toString() === id){
                    std.result = companyResult;
                    company.save();
                }
            }
        }

        console.log('Inerview status changed succesfully');
        return respond.redirect('back');
    }catch(error){
        console.log(`Error in updating status: ${error}`);
        return respond.redirect('back');
    }
};