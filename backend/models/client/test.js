const mongoose = require('mongoose');
const childSchema=new mongoose.Schema({
	index:String,
	value:String
})
const testSchema = new mongoose.Schema({
 	name:String,
 	arr:[{type: mongoose.Schema.Types.ObjectId, ref:'Child'}]
});

mongoose.model('Test', testSchema);
mongoose.model('Child', childSchema);

