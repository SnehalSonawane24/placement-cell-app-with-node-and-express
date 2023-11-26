const Student = require('../models/student');

module.exports.createStudentPage = function(request, respond){
    return respond.render('add_student',{
        title: "Placement Cell | Add Student"
    });
};

module.exports.createStudent = async function(request, respond){
    try{
        const { name, email, college, placement, contactNumber, batch, dsa, webd, react } = request.body;

        const student = await Student.findOne({ email });

        if(student){
            console.log('Email already exists');
            return respond.redirect('back');
        }

        // Create a new student record
        const newStudent = await Student.create({
            name,
            email,
            college,
            placement,
            contactNumber,
            batch,
            dsa,
            webd,
            react
        });
        await newStudent.save();

        console.log('Student created successfully');
    
        return respond.redirect('/');     
    }catch (error) {
        console.error('Error creating student:', error);
        return respond.redirect('back');   
    }
};

module.exports.deleteStudent = async function(request, respond){
    try {
        const studentId = request.params.id; 
        
        // Find the student by ID and delete
        const deletedStudent = await Student.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            console.log('Student not found');
            return respond.redirect('back');
        }

        console.log('Student deleted successfully');
    
        return respond.redirect('/');     
    } catch (error) {
        console.error('Error deleting student:', error);
        return respond.redirect('back');   
    }
};


