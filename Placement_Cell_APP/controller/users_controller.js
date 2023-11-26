const User = require('../models/user');
const Student = require('../models/student');
const fs = require('fs');
const path = require('path');


module.exports.profile = async function(request, respond){
    // return respond.end('<h1>User Profile Placement cell APP</h1>');

    return respond.render('user_profile', {
        title: "user_profile"
    });
}

// render the sign up page
module.exports.signUp = function(request, respond){
    if(request.isAuthenticated()){
        return respond.redirect('/users/profile');
    }
    
    return respond.render('user_sign_up', {
        title: "Placement Cell | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(request, respond){
    if(request.isAuthenticated()){
        return respond.redirect('/users/profile');
    }
    
    return respond.render('user_sign_in',{
        title: "Placement Cell | Sign In"
    })
}

// get the signUp data
module.exports.create = async function(request, respond) {
    try {
        // Check if password and confirm_password match
        if (request.body.password !== request.body.confirm_password) {
            return respond.redirect('back');
        }

        // Check if a user with the given email exists
        const existingUser = await User.findOne({ email: request.body.email });

        if (!existingUser) {
            // Create a new user
            const newUser = await User.create(request.body);
            return respond.redirect('/users/sign-in');
        } else {
            return respond.redirect('back'); // User already exists, redirect back
        }
    } catch (err) {
        console.log('Error:', err);
        return respond.redirect('back'); // Handle errors by redirecting back
    }
};

// get the signIn data
module.exports.createSession = async function (request, respond) {
    return respond.redirect('/');

};

module.exports.destroySession = function(request, respond){
    request.logout(function(err) {
        if (err) {
            console.error('Error destroying session:', err);
        }
        return respond.redirect('/');
    });
};

// download report
module.exports.downloadCsv = async function(request,respond){
    console.log('inside dowload csv');
    try{
        console.log('inside dowload csv---> try');
        const students = await Student.find({});

        let data = 'S.No, Name, Email, College, Placement, Contact Number, Batch, DSA Score, WebDev Score, Interviwe, Date \n';
        let no = 1;

        for(let student of students){
            for(let i of student.interviews){
                data += `${no} , ${student.name} , ${student.email} , ${student.college} , ${student.placement} , ${student.contactNumber} , ${student.batch} , ${student.dsa} , ${student.webd} , ${i.company} , ${i.date}\n` ;
                no++;
            }
        }

        
        console.log('student company home page', students[0].interviews[0]);
        
        const csvFilePath = path.join(__dirname, '..', 'report', 'data.csv');
        fs.writeFileSync(csvFilePath, data, 'utf-8');

        return respond.download(csvFilePath, 'data.csv', (err) => {
            if (err) {
                console.error('Download error:', err);
                return respond.redirect('back');
            }

            // Delete the temporary CSV file after it's downloaded
            fs.unlinkSync(csvFilePath);
        });

    }catch(err){
        console.log('Error:', err);
        return respond.redirect('back'); // Handle errors by redirecting back
    }
}