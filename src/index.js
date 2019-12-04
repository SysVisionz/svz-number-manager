numType = num => {
	if (typeof num === 'number'){
		return 'number';
	}
	if (typeof num === 'string' && String(num).match(RegExp('\.', 'g')).length > 1){
		return 'string'
	}
	throw "TypeError: num must be a Number or String including a maximum of 1 . character"
}

charMap = (string, callback) => string.split('').map(callback);

export default class NumberManager {
	constructor(num, vals){
		for (const i in vals){
			if (['phoneStyle', 'size', 'max', 'min', 'country'].includes(i)) {
				this[i] = vals[i]
			}
		}
		this.num = num;
		this.countriesVal = {
			US: {
				currency: {
					code:'USD',
					format: "$*.##"
				},
				phone: "(###) ###-####"
			}
		}
	}

//class variable setters and getters

	set countries(){ throw "Exception: countries is a read-only variable."}

	get countries(){ return this.countriesVal }

	set country(val){ 
		if (Object.keys(this.countries).includes(val){
			this.countryVal = val;
		}
		else {
			throw `Exception: ${val} is not a currently implemented country code.`
		}
	}

	get country(){ return this.countryVal || 'US'}

	set currencyStyle(val){ this.currencyStyleVal = val}

	get currencyStyle(){return this.currencyStyleVal || this.countries[this.country].currency.format }

	set max(val){
		if (this.min && maxVal < this.min){
			throw `Exception: ${max} is lower than ${this.min}. NumberManager cannot have a lower max than min.`;
		}
		this.maxVal = maxVal;
	}

	get max(){ return this.maxVal}

	set min(val){
		if (this.max && minVal > this.max){
			throw `Exception: ${min} is larger than ${this.max}. NumberManager cannot have a larger min than max.`;
		}
		this.minVal = minVal;
	}

	get min(){ return this.minVal }

	set num(val) { this.numVal = this.setSize(this.confine(val))}

	get num() { return this.numVal }

	set phoneStyle(val){ this.phoneStyleVal = val }

	get phoneStyle(){return this.phoneStyleVal || this.countries[this.country].phone}

	set size (size) { this.sizeVal = this.sizeOf(size) }

	get size(){ return this.sizeVal}

//methods

	absRound = (num = this.num, direction = 'ceil', places = 0, absolute) => {
		num = num*Math.pow(10, places);
		if (!['ceil', 'floor'].includes(direction)){
			throw `Exception: ${direction} is not valid for absRound. Use ceil or floor.`
		}
		neg = direction === 'ceil' ? 'floor' : 'ceil';
		return Math[absolute || this.positive(num) ? direction : neg](num)/Math.pow(10, places)
	}

	calcAdditive = (num = this.num, increment = 1, max, init = 0) => {
		let i = init ? -1 : 0;
		num = Math.abs(num)
		while (num > 0) {
			i++;
			num -= max && i*increment+init > max ? max : i*increment+init;
		}
		return i;
	}

	confine = (num = this.num, max = this.max, min = this.min) => Math.min(max, Math.max(min, num))

	decimalPlaces = (num = this.num) => String(num).split('.')[1].length;

	positive =  (num = this.num, asDirection) => {
		if (num > 0){
			return asDirection ? 1 : true;
		}
		if (num < 0){
			return asDirection ? -1 : false
		}
	}

	rand = (max = this.max || 99, min = this.min || 0) => Math.floor(min+Math.random()*(max - min + 1))

	setSize = (num = this.num, size = this.size) => {
		if (typeof num === 'string'){
			return num.length < size ? Array(size - num.length).fill(0).join('') + num : num
		}
		else {
			return Number(num).toFixed(length);
		}
	}

	sizeOf = (num = this.num) => {
		if ( typeof num === 'string'){
			if (num.includes('.')){
				return this.decimalPlaces(num);
			}
			return num.length;
		}
		else if (typeof num === 'number') {
			return num
		}
	}

	toCurrency = (num = this.num, style = this.currencyStyle) => {
		if (numType(num) === 'string'){
			num = num.match( /[0-9]|\./g ).join('')
		}
		const digits = this.decimalPlaces(style)
		num = Number(num).toFixed(digits)
		let splitNum = String(num).split('.');
		splitNum = [splitNum[0].split(''), splitNum[1] ? splitNum[1].split('') : []]
		return charMap(style, chara => {
			switch(chara){
				case '#':
					return splitNum[0].length > 0 ? splitNum[0].splice('') : splitNum[1] && splitNum[1].length > 0 ? splitNum[1].splice(0,1) : 0;
				case '*':
					if (splitNum[0].length > 0){
						const ret = splitNum[0].join('')
						splitNum[0] = [];
						return ret;
					}
					splitNum[1] = [];
					return splitNum[1].join('');
				default:
					return chara;
			}
		}).join('');
	}

	toPhone = (num = this.num, style = this.phoneStyle ) => {
		num = String(num)
		num = num.toUpperCase().match( /[A-Z0-9]/g ).join('')
		style = style.split('');
		num= num.split('');
		index = 0;
		if (style.filter(e => e === '#').length !== num.length){
			throw "SyntaxError: The nums required by style do not match the digits provided in num."
		}
		for (const i in style){
			if (style[i] === '#'){
				style[i] = num[index]
				index++;
			}
		}
		return style.join('');
	}
}
