var Promise = require("bluebird");

var directory = "./caches/";
module.exports = {
	init: function() {
		var inits = [];
		for (var name in module.exports)
			if (name != "init")
				inits.push(module.exports[name].init());
		return Promise.all(inits);
	},

	Priority: require(directory + "priorityCache"),
	Status: require(directory + "statusCache"),
	Transition: require(directory + "transitionCache"),
	IssueType: require(directory + "issueTypeCache"),
	Milestone: require(directory + "milestoneCache"),
	User: require(directory + "userCache")
};