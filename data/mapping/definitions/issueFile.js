require("../mapper").define("issue-file", "issue-file-view-model", {
	"id": "_id",
	name: "name",
	size: function(x) { return x.size.toSizeString(); }
});