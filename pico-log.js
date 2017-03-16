const noop = ()=>{};
let cache = {};

let level = 3;

const log = {
	levels : {
		TRACE  : 0,
		DEBUG  : 1,
		INFO   : 2,
		WARN   : 3,
		ERROR  : 4,
		SILENT : 5,
	},
	setLevel : (lvl)=>{
		if(typeof lvl === 'string') level = log.levels[lvl.toUpperCase()];
		if(typeof lvl === 'number') level = lvl;
		Object.keys(log.levels).map((mthd)=>{
			const method = mthd.toLowerCase();
			if(log[method] != noop) cache[method] = log[method];
			log[method] = (log.levels[mthd] >= level) ? cache[method] : noop;
		})
	},
	getLevel : ()=>level
}

Object.keys(log.levels).map((mthd)=>{
	const method = mthd.toLowerCase();
	log[method] = console[method] || console.log;
});

module.exports = log;