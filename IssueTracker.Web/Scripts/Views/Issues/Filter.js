﻿
(function(root) {

	var _container;
	var _flipper;
	var _onFilterSet;
	var _selected;

	root.selectedMilestones = ko.observableArray();
	root.selectedPriorities = ko.observableArray();
	root.selectedStatuses = ko.observableArray();
	root.selectedDevelopers = ko.observableArray();
	root.selectedTesters = ko.observableArray();

	root.init = function (container, onFilterSet) {
		_container = container;
		_onFilterSet = onFilterSet;
		_flipper = new IssueTracker.Controls.Flipper(container.find("div.sidebar .flipper"));
		_selected = {};

		_hookupEvents();

		container.find("#milestone-filter>div").each(function () { _toggleFilterItem($(this), root.selectedMilestones); });
		container.find("#priority-filter>div").each(function () { _toggleFilterItem($(this), root.selectedPriorities); });
		container.find("#status-filter>div").each(function () { _toggleFilterItem($(this), root.selectedStatuses); });
		container.find("#developer-filter>div").each(function () { _toggleFilterItem($(this), root.selectedDevelopers); });
		container.find("#tester-filter>div").each(function () { _toggleFilterItem($(this), root.selectedTesters); });
	};

	root.contains = function(collection, data) {
		for (var i = 0; i < collection().length; i++)
			if (collection()[i].id === data.id)
				return true;
		return false;
	};

	function _hookupEvents() {
		_container.on("click", "#modify-filter", function () { _flipper.toggle(); });
		_container.on("click", "#set-filter", _saveFilter);
		_container.on("click", "#milestone-filter>div", function () { _toggleFilterItem($(this), root.selectedMilestones); });
		_container.on("click", "#priority-filter>div", function () { _toggleFilterItem($(this), root.selectedPriorities); });
		_container.on("click", "#status-filter>div", function () { _toggleFilterItem($(this), root.selectedStatuses); });
		_container.on("click", "#developer-filter>div", function () { _toggleFilterItem($(this), root.selectedDevelopers); });
		_container.on("click", "#tester-filter>div", function () { _toggleFilterItem($(this), root.selectedTesters); });
	}

	function _saveFilter() {
		_flipper.toggle();
		_onFilterSet();
	}

	function _toggleFilterItem(element, collection) {
		if (collection().length == 1 && element.hasClass("selected"))
			return;
		
		var raw = $.parseJSON(element.attr("data-raw"));
		if (!root.contains(collection, raw))
			collection.push(raw);
		else
			collection.remove(function(item) { return item.id === raw.id; });
	}

})(root("IssueTracker.Issues.Filter"));