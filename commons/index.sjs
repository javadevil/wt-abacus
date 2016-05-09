/**
 * Abacus commons module
 * serve common static files such front,client libs, etc.
 */
module.exports = () => {
	const serveStatic = require('serve-static');
	return serveStatic(__dirname+'/static',{'index':['index.html','index.htm']})
};