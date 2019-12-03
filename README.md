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


# NumberManager({phoneStyle, currencyStyle, size, max, min, country})
Manipulates a supplied <strong>Number</strong> or <strong>String</strong> of numeric characters which may include one . character as needed for a variety of use cases. Using a <strong>Number</strong> variable produces a different set of behaviors from using a <strong>String</strong>, so making sure you're using the right type is important, here.</summary>

##Class Variables
<details><summary><strong>NumberManager</strong> possesses the class variables <strong>phoneStyle</strong>, <strong>currencyStyle</strong>, <strong>size</strong>, <strong>max</strong>, and <strong>min</strong>. The <strong>country</strong> variable is scheduled for use in later releases, but not available for use at this juncture. Note: all of these are optional variables.</summary>
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
**String:**
<details><summary><strong>Number</strong> Behavior</summary>
<p>

**set:** The number of decimal spaces or length of the number (depending on whether **String** or **Number** is used in the function).  
**get:**

</p>
</details>
<details><summary><strong>String</strong> Behavior</summary>
<p>

If a **.** character is found in the string, **size** is the number of decimal places in the **String** number. If no **.** character is found, **size** is the overall length of the **String**.
**Note:** Be conscious of this methodology, if you want to include a **.** character, but are not attempting to find the decimal places, you will have to set **size** using a **Number**, instead.

</p>
</details>

</p>	
</details>

## Methods

<details><summary>absRound, calcAdditive, confine, decimalPlaces, positive, rand, setSize, sizeOf, toCurrency, toPhone</summary>

### absRound(num, direction, size)
<details><summary></summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  


</details>

### calcAdditive
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### confine
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### decimalPlaces
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### positive
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### rand
<details><summary>A function to determine </summary>
<p>

* ** **  
**Type:**  


</p>
</details>

### setSize
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### sizeOf
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### toCurrency
<details><summary>A function to determine </summary>
<p>

* **num**  
**Type: Number** || **String**  
**Default: this.num**  
The target of the function.  

* ** **  
**Type:**  


</p>
</details>

### toPhone(num, style)
<details><summary>Converts <strong>num</strong> to a phone number in a format dictated by <strong>style</strong></summary>
<p>

* **num**
**Type: Number**
The number being used as the target of the function

* **style**
**Type: String**
**Default:** **this.phoneStyle**
This dictates the formatting of the number, using **#** where the digits should be inserted.

</details>

</details>
