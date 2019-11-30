export default class NumberManager {
	constructor(number, exact){
		this.number = number;
		this.exact = exact;
	} 

	//toPhone converts a number or string to a US phone number format.
	static toPhone = (number, style = "(###) ###-####") => {
		if (!['number', 'string'].includes(typeof number)){
			throw "TypeError: number must be a Number or String."
		}
		if (typeof number === 'number'){
			number = String(number)
		}
		number = number.match( /[0-9]/g ).join('')
		style = style.split('');
		number = number.split('');
		index = 0;
		if (style.filter(e => e === '#').length !== number.length){
			throw "SyntaxError: The numbers required by style do not match the digits provided in number."
		}
		for (const i in style){
			if (style[i] === '#'){
				style[i] = number[index]
				index++;
			}
		}
		return style.join('');
	}

	toPhone = style => NumberManager.toPhone(this.number, nationCode)

	//toDollars returns either the NumberMan's number or an inputted number to currency format
	static toDollars = number => {
		if (!['number', 'string'].includes(typeof number)){
			throw "TypeError: number must be a number or string."
		}
		return "$" + Number(typeof number === 'number' ? number : number.match( /[0-9]|\./g ).join('')).toFixed(2);
	}

	static prefixZeroes = (number, length) => {
		if (!['string', 'number'].includes(typeof number)){
			throw "TypeError: number must be a number or string";
		}
		if (typeof number === 'number'){
			number = number.toString();
		}
		for (let i = 0; i < number.length; i++){
			number = '0'+number;
		}
	}

	toDollars = () => NumberManager.toDollars(this.number);

	//addZeroes adds zeroes as a prefix or as decimal places until the test evaluates as false.
	static size = (number, length, maxLen) => {
		length = NumberManager.confine(typeof length === 'string' ? length.length : length, maxLen);
		number = typeof number === 'string' ? number : new Number(number).toString()
		if (number.length > maxLen){
			throw "SyntaxError: number exceeds the maximum length specified."
		}
		return number.length < length ? Array(length - number.length).fill(0).join('') + number : number
	}

	set size (length){ this.number = NumberManager.prefixZeroes(this.number, length, this.maxLength)}

	get size (){ return this.number.length }

	static absRound(number, direction = 'round', places = 0, absolute){
		number = number*Math.pow(10, places);
		if (absolute || ~NumberManager.positive(number)){
			return absolute ? Math.abs(Math[direction](number))/Math.pow(10, places) : Math[direction](number)/Math.pow(10, places)
		}
		else {
			switch (direction){
				case 'ceil':
					return Math.floor(number)/Math.pow(10, places);
				case 'floor':
					return Math.ceil(number)/Math.pow(10, places);
				default:
					return Math.round(number)/Math.pow(10, places);
			}
		}
	}

	static confine = (number, max, min) =>  {
		if (max > min){
			throw "SyntaxError: max must be greater than min."
		}
		if (max){
			number = Math.min(number, max);
		}
		if (min){
			number = Math.max(number, min);
		}
		return number
	}

	static positive = (number, asDirection) => {
		if (typeof number)
		if (number > 0){
			return asDirection ? 1 : true;
		}
		if (number < 0){
			return asDirection ? -1 : false
		}
	}

	positive = asDirection => NumberManager.positive(this.number, asDirection);


	set length (len) {
		this.maxDigits = typeof digits === 'string' ? NumberManager.sizeOf(digits, this.zeroesPrefix) : digits;
		this.number = this.number;
	}

	set digits (dig) {
		this.maxDigits = typeof dig === 'string' ? dig.length : dig;
	}

	static sizeOf = (number, zeroesPrefix) => {
		number = typeof number === 'string' ? number : new Number(number).toString();
		if (zeroesPrefix){
			return number.length;
		}
		else {
			return number.includes('.')
				? number.substring((''+number).indexOf('.')+1).length 
				: 0;
		}
	}
	
	static addZero = (number, zeroesPrefix) => {
		if (zeroesPrefix){
			return '0' + number 
		}
		else{
			number = typeof number === 'string' ? number : new Number(number).toString()
			return number + (number.includes('.') ? '0' : '.0')
		}
	}

	capDigits = (number, digits = this.maxDigits) => Math.round(Number.parseFloat(number)*Math.pow(10,digits))/Math.pow(10,digits);

	set number (numberValue) {
		//ensure that the number's value does not exceed the maximum trailing digits set for this NumberMan.
		if (!['number', 'string'].includes(typeof numberValue)){
			throw "TypeError: NumberManager's number variable must be a Number or String";
		}
		if (this.maxDigits && this.trailingDigits(numberValue) > this.maxDigits) {
			this.numberVal = ''+numberValue;
			this.exactPlaces(this.maxDigits)
		} else {
			this.numberVal = ''+numberValue;
			if (this.exact){
				this.addZeroes(this.maxDigits)
			}
		}
	}

	get number(){
		return this.numberVal
	}

	// toDigits accepts a string to test against, an array of values to test against or a number of digits
	// and either adds zeroes as prefixes or zeroes as decimal places.
	toDigits = (digitsOrNumberArray, trailing = true) => {
		const {addZeroes, trailingDigits} = this;
		const newLength = (current, test) => {
			const digits = trailing ? trailingDigits(test) : test.length;
			return Math.max(digits, current);
		}
		let toLength = trailing ? trailingDigits() : this.number.length;
		if (typeof digitsOrNumberArray === 'object'){
			for (const i in digitsOrNumberArray){
				toLength = newLength(toLength, ''+digitsOrNumberArray[i])
			}
		}
		else if(typeof digitsOrNumberArray === 'string'){
			toLength =  newLength(toLength, digitsOrNumberArray);
		}
		else if(typeof digitsOrNumberArray === 'number'){
			toLength = Math.max(toLength, digitsOrNumberArray);
		}
		addZeroes(toLength, trailing);
		return this.number;
	}

	static calcAdditive = (number, maxVal) => {
		let i = 0;
		let calcTotal = 0;
		while (Math.abs(calcTotal) < Math.abs(number)) {
			i++;
			const addTo = maxVal && i > maxVal ? maxVal*Number.positive(number) : Number.positive(number)*i;
			calcTotal += addTo;
		}
		return i;
	}

	calcAdditive = maxVal => {
		NumberManager.calcAdditive(this.number, maxVal);
	}
}
