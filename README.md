# svz-number-manager

This module provides four management classes for manipulating Numbers for multiple use cases I've employed on a number of occasions, including formatting currencies, phone numbers, manipulating and standardizing number of digits, and determining decimal places as specified or from existing numbers. In the future, this will incorporate currency conversions.

## Installation
To install, in terminal type

```
	npm i --save svz-number-manager
```

then, in your react project,

```
import NumberManager from svz-number-manager;
```  


# NumberManager

**Format:** numMan = new NumberManager(num, {country, currencyStyle, max, min, phoneStyle, size})
Manipulates a supplied <strong>Number</strong> or <strong>String</strong> of numeric characters which may include one . character as needed for a variety of use cases. Using a <strong>Number</strong> variable produces a different set of behaviors from using a <strong>String</strong>, so making sure you're using the right type is important, here.</summary>

##Class Variables
<details><summary><strong>NumberManager</strong> possesses the class variables <strong>countries</strong>, <strong>country</strong>, <strong>currencyStyle</strong>, <strong>max</strong>, <strong>min</strong>, <strong>num</strong>, <strong>phoneStyle</strong> and <strong>size</strong>. The <strong>country</strong> variable is scheduled for use in later releases, but not usable for anything but <strong>US</strong> at this juncture. Note: all of these are optional variables.</summary>
<p>

* **countries**
**READ-ONLY**
This is a list of the styling defaults for each country in a format shown here for the United States.

``
	US: {
		currency: {
			code: 'USD',
			format: "$*.##"
		},
		phone: "(###) ###-####"
	}
``

* **country**  
**Type: String**  
**Default:** US  
**Note:** This is more of a placeholder at the moment, as only US is implemented. Later, more will be added.
This value dictates the defaults for styling based on your country.

* **currencyStyle**  
**Type: String**  
**Default: this.countries[this.country].currency.format** || $\*:##  
This determines the default style for the **toCurrency** function.

* **max**  
**Type: Number**  
This determines the maximum numerical limit of the returned **Number** or **String**

* **min**  
**Type: Number**  
This determines the minimum numerical limit of the returned **Number** or **String**

* **num**  
**Type: Number** || **String**  
The default value used as a number. Automatically restricts by **min** and **max**, and applies **setSize** 

* **phoneStyle**  
**Type: String**  
**Default: this.countries[this.country].phone** || (###) ###-####  
This determines the default style for the **toPhone** function.

* **size**  
**Type: Number** || **String**  
The number of decimal spaces or length of the number (depending on whether **String** or **Number** is used in the function).  
**Note:** when using a **String**, **set** Behavior changes from simply the number itself to using that string to determine it. If a **.** character is found in the string, **size** is the number of decimal places in the **String** number. If no **.** character is found, **size** is the overall length of the **String**. Be conscious of this methodology, because if you want to include a **.** character, but are not attempting to find the decimal places, you will have to set **size** using a **Number**, instead. This functionality is included so that a value can be used as a "template" for determining **size** for NumberManager.

</p>	
</details>

## Methods

<details><summary>absRound, calcAdditive, confine, decimalPlaces, positive, rand, setSize, toCurrency, toPhone</summary>

### absRound(num, direction, size)
<details><summary>a function that rounds a value towards or away from zero.</summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* **direction**  
**Type: String**
**Valid Values:** floor || ceil
**Default:** ceil
If **floor** is used, it rounds towards 0. If **ceil** is used, it rounds away from 0.

* **absolute**  
**Type: Boolean**
If **absolute** is set to true, the value is returned as always positive.


</details>

### calcAdditive (num, increment, max, init)
<details><summary>A function to determine how many times an incrementally increasing value can be within it.</summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* **increment**  
**Type: Number**  
**Default:** 1  
The amount of incremental growth with each iteration.

* **max**  
**Type: Number**  
The maximum size of the incremental growth. If the incremental growth would exceed this value, **max** is used instead.

* **init**  
**Type: Number**  
**Default:** 0   
The initial amount the increment begins at (not including.

</p>
</details>

### confine(num, max, min)
<details><summary>A function that forces a number to remain within an upper and lower limit. </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* **max**  
**Type: Number**  
**Default: this.max**
The maximum limit.


* **min**  
**Type: Number**  
**Default: this.min**
The minimum limit.

</p>
</details>

### decimalPlaces(num)
<details><summary>A function to determine the number of decimal places in a number</summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

</p>
</details>

### positive(num, asDirection)
<details><summary>A function to determine if a number is positive or negative.</summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.

* **asDirection**  
**Type: Boolean**  
If **asDirection** is set to **true**, positive instead returns 1 for a positive number and -1 for a negative number. If it is **false**, it returns **true** for a positive number and **false** for a negative number.

</p>
</details>

### rand(max, min)
<details><summary>A function to create a randomized number in a range.</summary>
<p>

* **max**  
**Type: Number**  
**Default: this.max** || 99  
The maximum value for the returnved value. Inclusive.

* **min**  
**Type: Number**  
**Default: this.min** || 0  
The minimum value for the returned value. Inclusive.

</p>
</details>

### setSize(num, size)
<details><summary>A function that sets the decimal places of a number or the size of a number by adding suffix or prefix 0s.</summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* **size**  
**Type: Number**  
**Default: this.size**  
If **num** is a **String**, this adds prefix zeroes until it is **size** length. If **num** is a **Number**, it fixes the decimal places to **size**.

</p>
</details>

### toCurrency(num, style)
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* **style**  
**Type: String**  
**Default: this.currencyStyle**
This dictates the formatting of the number, using **\*** to mean either all digits before the decimal or all digits following the decimal, and **#** to signify individual numbers.

</p>
</details>

### toPhone(num, style)
<details><summary>Converts <strong>num</strong> to a phone number in a format dictated by <strong>style</strong></summary>
<p>

* **num**
**Type: Number**
**Default: this.num**
The number being used as the target of the function

* **style**
**Type: String**
**Default:** **this.phoneStyle**
This dictates the formatting of the number, using **#** where the digits should be inserted.

</details>

</details>
