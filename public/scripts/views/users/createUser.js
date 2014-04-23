
(function(root) {

	root.user = ko.observable({
		name: ko.observable(""),
		emailAddress: ko.observable("")
	});
	root.loading = ko.observable(false);

	root.create = function () {
		IssueTracker.Dialog.load("create-user-template", root);
	};

	root.save = function () {
		var error = _validate();
		if (error) {
			IssueTracker.Feedback.error(error);
			return;
		}

		root.loading(true);
		$.post(IssueTracker.virtualDirectory() + "Users/Create", root.user()).done(function() {
			IssueTracker.Feedback.success(root.user().name() + " has been created.");
			IssueTracker.Users.users.push(root.user());
			IssueTracker.Dialog.hide();
		}).fail(function () {
			IssueTracker.Feedback.error("An error has occurred while creating the user. Please try again later.");
		}).always(function() {
			root.loading(false);
		});
	};

	root.cancel = function() {
		IssueTracker.Dialog.hide();
	};

	function _validate() {
		var user = root.user();
		if (user.name() == "")
			return "The name is required.";
		if (user.emailAddress() == "")
			return "The email address is required.";
		if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.emailAddress()))
			return "The email address is invalid.";
	}

})(root("IssueTracker.Users.Create"));