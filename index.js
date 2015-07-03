/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	if(!this.emitFile && query.emitFile !== false) throw new Error("emitFile is required from module system");
	var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});
	if (query.emitFile !== false) {
		this.emitFile(url, content);
	}
	return "module.exports = __webpack_public_path__ + " + JSON.stringify(url) + ";";
}
module.exports.raw = true;
