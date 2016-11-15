var User = require("./models/user");

if(User.find({email: email}) != null){
	JSON.parse("{userExists: true}");
}

JSON.parse("{userExists: false}");

