/* eslint-disable */

/**
 * Plugins, Extensions and Utils
 *
 * @author Rodrigo
 */

export default (function () {
  console.info('Applying JS extensions ...');

// --- NUMBER EXTENSIONS

  /**
   * Plugin for formatting numbers
   * Number.prototype.format(n, x, s, c)
   *
   * @param n: Decimal size, eg: 2
   * @param x: Thousands or blocks size, eg: 3
   * @param s: Delimiters of the thousands or blocks, eg: '.'
   * @param c: Decimal delimiter, eg: ','
   *
   * Usage: Ex1: new Number(10000).format(2, 3, '.', ',');
   *        Ex2: parseFloat(10000).format(2, 3, '.', ',');
   *        Ex3: parseInt(10000).format(2, 3, '.', ',');
   *
   * @see Another approach is String.mask
   */
  if (!Number.prototype.format)
    Object.defineProperty(Number.prototype, 'format', {
      value: function (n = 2, x = 3, s = '.', c = ',') {
        let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
        let num = this.toFixed(Math.max(0, ~~n));
        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
      }
    });


  /**
   * Plugin for formatting Brazilian Real numbers
   *
   * @param signed: Boolean true or false. If true or undefined, return que output number with 'R$' sign,
   * if false, returns formatted number only.
   *
   * Usage: Ex1: new Number(10000).formatAsBRL();
   *        Ex2: Number(10000.32).formatAsBRL();
   */
  if (!Number.prototype.formatAsBRL)
    Object.defineProperty(Number.prototype, 'formatAsBRL', {
      value: function (signed = true) {
        return `${signed ? 'R$ ' : ''}${this.format()}`;
      }
    });


// --- STRING EXTENSIONS


  /**
   * {JSDoc}
   *
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   * @return {string} A new string with the spliced substring.
   */
  if (!String.prototype.splice)
    Object.defineProperty(String.prototype, 'splice', {
      value: function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
      }
    });


  /**
   * Plugin that's generate a hashcode of a string
   *
   * Usage: Ex1: "ABC123D-F*G".simpleHashCode(); //output: 685091434
   */
  if (!String.prototype.simpleHashCode)
    Object.defineProperty(String.prototype, 'simpleHashCode', {
      value: function () {
        let hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
          chr = this.charCodeAt(i);
          hash = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      }
    });

  /**
   * Plugin to extract numbers of Strings, returns a String containing only numbers and other escaped characters.
   * @param s: Chars to scape, ex: -.,, _-, , -, _-
   *
   * Usage: Ex1: "ABC123D-F*G".onlyNumbers();
   * Usage: Ex2: "ABC123D-F*G".onlyNumbers("D");
   * Usage: Ex3: "ABC123D-F*G".onlyNumbers("FG");
   * Usage: Ex4: "ABC123D-F*G".onlyNumbers("FG*-");
   * Usage: Ex5: "ABC123D-F*G".onlyNumbers("*-");
   */
  if (!String.prototype.onlyNumbers)
    Object.defineProperty(String.prototype, 'onlyNumbers', {
      value: function (s) {
        let patternBase = '[^0-9{*}]';

        if (s)
          patternBase = patternBase.replace('{*}', s);
        else
          patternBase = patternBase.replace('{*}', '');

        return this.replace(new RegExp(patternBase, 'g'), '');
      }
    });


  /**
   * Plugin to extract Alpha chars of Strings, returns a String containing only Alpha and other escaped characters.
   * @param s: Chars to scape, ex: -.,, _-, , -, _-
   *
   * Usage: Ex1: "ABC123D-F*G".onlyAlpha();
   * Usage: Ex2: "ABC123D-F*G".onlyAlpha("1");
   * Usage: Ex3: "ABC123D-F*G".onlyAlpha("23");
   * Usage: Ex4: "ABC123D-F*G".onlyAlpha("-");
   * Usage: Ex5: "ABC123D-F*G".onlyAlpha("*-");
   */
  if (!String.prototype.onlyAlpha)
    Object.defineProperty(String.prototype, 'onlyAlpha', {
      value: function (s) {
        let patternBase = '[^A-Za-z{*}]';

        if (s)
          patternBase = patternBase.replace('{*}', s);
        else
          patternBase = patternBase.replace('{*}', '');

        return this.replace(new RegExp(patternBase, 'g'), '');
      }
    });


  /**
   * Plugin to extract Alphanumeric chars of Strings, returns a String containing only Alphanumeric and other escaped characters.
   * @param s: Chars to scape, ex: -.,, _-, , -, _-
   *
   * Usage: Ex1: "ABC123D-F*G".onlyAlphanumeric(); //ABC123DFG
   * Usage: Ex2: "ABC123D-F*G".onlyAlphanumeric("*"); //ABC123DF*G
   */
  if (!String.prototype.onlyAlphanumeric)
    Object.defineProperty(String.prototype, 'onlyAlphanumeric', {
      value: function (s = '') {
        return this.replace(new RegExp(`[^A-Za-z0-9${s}]`, 'g'), '');
      }
    });


  /**
   * Same of Alphanumeric, but don't allow number as first char of a String
   * @param s: Chars to scape, ex: -.,, _-, , -, _-
   *
   * Usage: Ex1: "098ABC123D-F*G".onlyAlphanumeric(); //ABC123DFG
   * Usage: Ex2: "7-65ABC123D-F*G".onlyAlphanumeric("*-"); //-ABC123DF*G
   */
  if (!String.prototype.onlyAlphanumericUnderscoreAlphaFirst)
    Object.defineProperty(String.prototype, 'onlyAlphanumericUnderscoreAlphaFirst', {
      value: function () {
        return this.replace(new RegExp(`^[^a-zA-Z_$]*|[^A-Za-z0-9_$]`, 'g'), '');
      }
    });


  /**
   * Cast first char of a String in uppercase
   *
   * Usage: Ex1: "oi mesquitao tao tao".capitalize(); //Oi mesquitao tao tao
   */
  if (!String.prototype.capitalize)
    Object.defineProperty(String.prototype, 'capitalize', {
      value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }
    });


  /**
   * Plugin to convert a formatted Brazilian Real String to float.
   *
   * Usage: Ex1: "R$ 100,10".brazilianRealToFloat();
   */
  if (!String.prototype.brazilianRealToFloat)
    Object.defineProperty(String.prototype, 'brazilianRealToFloat', {
      value: function () {
        let val = parseFloat(this.onlyNumbers(',').replace(',', '.'));
        return isNaN(val) ? 0 : val;
      }
    });


  /**
   * Utility method to check if a String is a valid Personal Full Name.
   *
   * Usage: Ex1: "Rodrigo T".isPersonalFullName(); //true
   * Usage: Ex2: "Rodrigo".isPersonalFullName(); //false
   * Usage: Ex3: "Rodrigo T1".isPersonalFullName(); //false
   * Usage: Ex4: "Rodrigo1".isPersonalFullName(); //false
   */
  if (!String.prototype.isPersonalFullName)
    Object.defineProperty(String.prototype, 'isPersonalFullName', {
      value: function () {
        let pattern = /^\s*([A-Za-z]+([.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
        return pattern.test(this);
      }
    });

  /**
   * Utility method to check if a String is a valid Cellphone.
   *  @param hasAreaCode: Define if the number will be validated using area code
   *
   * Usage: Ex1: "61999711616".isCellphone(); //true
   * Usage: Ex2: "(61)99971-1616".isCellphone(); //true
   *
   * Usage: Ex3: "999711616".isCellphone(false); //true
   * Usage: Ex4: "99971-1616".isCellphone(false); //true
   *
   * Usage: Ex5: "99971-1616".isCellphone(); //false, wrong size. Missing the Area Code 61.
   * Usage: Ex6: "999711616".isCellphone(); //false, wrong size. Missing the Area Code 61.
   */
  if (!String.prototype.isCellphone)
    Object.defineProperty(String.prototype, 'isCellphone', {
      value: function (hasAreaCode = true) {
        let position = hasAreaCode ? 2 : 0;
        let size = hasAreaCode ? 11 : 9;

        return this.onlyNumbers().length === size && parseInt(this.onlyNumbers().charAt(position)) >= 7;
      }
    });

  /**
   * Utility method to check if a String is a valid Phone.
   *  @param hasAreaCode: Define if the number will be validated using area code
   *
   * Usage: Ex1: "6233331886".isPhone(); //true
   * Usage: Ex1: "33331886".isPhone(false); //true
   */
  if (!String.prototype.isPhone)
    Object.defineProperty(String.prototype, 'isPhone', {
      value: function (hasAreaCode = true) {
        let min = hasAreaCode ? 10 : 8;
        let max = hasAreaCode ? 11 : 9;

        return this.onlyNumbers().length >= min && this.onlyNumbers().length <= max;
      }
    });


  /**
   * Utility method to check if a String is a valid String Date
   *
   * Usage: Ex1: "16/04/1957".isStringDate(moment); //true
   * Usage: Ex2: "16041957".isStringDate(moment); //false
   */
  if (!String.prototype.isStringDate)
    Object.defineProperty(String.prototype, 'isStringDate', {
      value: function (moment, format = 'DD/MM/YYYY') {
        if (!moment || !moment.isMoment)
          throw Error('You must inform the moment.js instance as first parameter to do the check.');

        return this.length === 10 && moment(this, format).isValid()
      }
    });

  /**
   * Utility method to check if a String is a valid email.
   *
   * Usage: Ex1: "rodrigo@ae.com".isEmail();
   */
  if (!String.prototype.isEmail)
    Object.defineProperty(String.prototype, 'isEmail', {
      value: function () {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(this);
      }
    });

  /**
   * Utility method to check if a String is a valid URL.
   *
   * Usage: Ex1: "http://test.com.br".isURL();
   */
  if (!String.prototype.isURL)
    Object.defineProperty(String.prototype, 'isURL', {
      value: function () {
        let pattern = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return pattern.test(this);
      }
    });

  /**
   * Utility method to check if a String is a valid CEP.
   *
   * Usage: Ex1: "70.680-600".isCEP();
   */
  if (!String.prototype.isCEP)
    Object.defineProperty(String.prototype, 'isCEP', {
      value: function () {
        return this.onlyNumbers().length === 8;
      }
    });


  /**
   * Utility method to check if a String is a valid CPF.
   *
   * Usage: Ex1: "02687403130".isCPF();
   */
  if (!String.prototype.isCPF)
    Object.defineProperty(String.prototype, 'isCPF', {
      value: function () {
        let numbers, digits, sum, i, result, equalDigits = 1;

        if (this.length < 11) {
          return false;
        }

        for (i = 0; i < this.length - 1; i++) {
          if (this.charAt(i) !== this.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = this.substring(0, 9);
          digits = this.substring(9);
          sum = 0;

          for (i = 10; i > 1; i--)
            sum += numbers.charAt(10 - i) * i;

          result = sum % 11 < 2 ? 0 : 11 - sum % 11;

          if (result !== Number(digits.charAt(0)))
            return false;

          numbers = this.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--)
            sum += numbers.charAt(11 - i) * i;

          result = sum % 11 < 2 ? 0 : 11 - sum % 11;

          return result === Number(digits.charAt(1));
        } else {
          return false;
        }
      }
    });


  /**
   * Utility method to check if a String is a valid CNPJ.
   */
  if (!String.prototype.isCNPJ)
    Object.defineProperty(String.prototype, 'isCNPJ', {
      value: function () {
        let numbers, digits, sum, i, result, position, size, equalDigits = 1;
        if (this.length < 14 && this.length < 15)
          return false;
        for (i = 0; i < this.length - 1; i++)
          if (this.charAt(i) !== this.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        if (!equalDigits) {
          size = this.length - 2;
          numbers = this.substring(0, size);
          digits = this.substring(size);
          sum = 0;
          position = size - 7;
          for (i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * position--;
            if (position < 2)
              position = 9;
          }
          result = sum % 11 < 2 ? 0 : 11 - sum % 11;
          if (result !== Number(digits.charAt(0)))
            return false;
          size += 1;
          numbers = this.substring(0, size);
          sum = 0;
          position = size - 7;
          for (i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * position--;
            if (position < 2)
              position = 9;
          }
          result = sum % 11 < 2 ? 0 : 11 - sum % 11;

          return result === Number(digits.charAt(1));

        } else
          return false;
      }
    });


  /**
   * Plugin to count the number of characters present in a current string
   * @param c: Character to be counted, ex: -.,, _-, , -, _-
   *
   * Usage: Ex1: "ABCCD".count("C"); //2
   */
  if (!String.prototype.count)
    Object.defineProperty(String.prototype, 'count', {
      value: function (c) {
        if (c) {
          let size = this.match(new RegExp(c, 'g'));
          return size && size !== null ? size.length : 0;
        }

        return 0;
      }
    });


  /**
   * Plugin to check if a given String contains given value.
   * @param c: Character to be searched into String, ex: -.,, _-, , -, _-, AA, B, etc.
   *
   * Usage: Ex1: "aew".contains('a'); //true
   */
  if (!String.prototype.safeContains)
    Object.defineProperty(String.prototype, 'safeContains', {
      value: function (c) {
        return (c !== undefined && (c + '').length > 0) ? this.indexOf(c + '') !== -1 : false;
      }
    });


  /**
   * Define a function to replace all chars to an string.
   *
   * @param from: String to be replaced.
   * @param to: String to replace.
   *
   * Usage: Ex1: "RODRIGO".replaceAll('O', 'E'); //REDRIGE
   */
  if (!String.prototype.replaceAll)
    Object.defineProperty(String.prototype, 'replaceAll', {
      value: function (from, to) {
        let escapeRegExp = function escapeRegExp(string) {
          return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        };

        return this.replace(new RegExp(escapeRegExp(from), 'g'), to);
      }
    });


  /**
   * Define a function to replace tokens of a given JSON object.
   * For each JSON key try to find corresponding token on base string and replace with JSON[key] value
   *
   * @param json: JSON tokens to replace base string.
   * @param defaultDelimiterActive: If true, default REACT ROUTER delimiter will be used in conjuction with json key
   *
   * Usage: Ex1: "/path/:idPath".replaceTokens({idPath: "aew"}); ///path/aew
   *        Ex2: "/path/:idPath".replaceTokens({idPath: "aew"}, false); ///path/:aew
   *        Ex3: "aew rodrigo aew".replaceTokens({rodrigo: "aewww"}); ///aew rodrigo aew
   *        Ex4: "aew rodrigo aew".replaceTokens({rodrigo: "aewww"}, false); ///aew aewww aew
   */
  if (!String.prototype.replaceTokens)
    Object.defineProperty(String.prototype, 'replaceTokens', {
      value: function (json, defaultDelimiterActive = true) {
        if (!json || Object.keys(json).length === 0)
          return this;

        let str = this;

        for (let key in json)
          if (json.hasOwnProperty(key))
            str = str.replace((defaultDelimiterActive ? ':' : '') + key, json[key]);

        return str;
      }
    });


  /**
   * Replace a char in specific index
   * @param index
   * @param character
   * @returns {string}
   */
  if (!String.prototype.replaceAt)
    Object.defineProperty(String.prototype, 'replaceAt', {
      value: function (index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
      }
    });

  /**
   * Reverse the String
   *
   * Usage: Ex1: "RODRIGO".reverse();
   */
  if (!String.prototype.reverse)
    Object.defineProperty(String.prototype, 'reverse', {
      value: function () {
        return this.split('').reverse().join('');
      }
    });


  /**
   * Unmask a String value leaving only Alphanumeric chars.
   *
   * Usage: Ex1: '026.874.031-30'.unmask(); //02687403130
   */
  if (!String.prototype.unmask)
    Object.defineProperty(String.prototype, 'unmask', {
      value: function () {
        let exp = /[^A-Za-z0-9]/g;
        return this.replace(exp, '');
      }
    });


  /***
   * Generic fixed size mask formatter.
   *
   * @param mask: The mask to be applied on current value
   * @param fillReverse: Boolean value. If true, applies the mask from right to left, if false or undefined,
   * applies from left to right.
   *
   * Usage: Ex1: '02687403130'.mask('000.000.000-00'); //026.874.031-30
   *        Ex2: '02687403130'.mask('000.000.000-00', true); //026.874.031-30
   *        Ex3: '0268'.mask('000.000.000-00'); //026.8
   *        Ex4: '0268740'.mask('000.000.000-00'); //026.874.0
   *        Ex5: '0268'.mask('000.000.000-00', true); //02-68
   *        Ex6: '026874031'.mask('000.000.000-00', true); //0.268.740-31
   *
   *
   *        Ex7: '2000'.mask('0.000.000.000,00', true); //20,00
   *        Ex8: '20001'.mask('0.000.000.000,00', true); //200,01
   *        Ex9: '200012'.mask('0.000.000.000,00', true); //2.000,12
   *
   * @see Another approach is Number.format for dynamic size numbers, money, etc.
   *
   */
  if (!String.prototype.mask)
    Object.defineProperty(String.prototype, 'mask', {
      value: function (mask, fillReverse = false) {
        if (!mask || typeof mask !== 'string')
          return this;

        let value = (fillReverse === true) ? this.unmask().reverse() : this.unmask();
        let maskArray = (fillReverse === true) ? mask.split('').reverse() : mask.split('');

        let delimiters = ['(', ')', '{', '}', '[', ']', '"', '\'', '<', '>', '/', '*', '\\', '%', '?', ';',
          ':', '&', '$', '#', '@', '!', '-', '_', '+', '=', '~', '`', '^', '.', ','];

        maskArray.forEach(function (e, idx) {
          if (delimiters.safeContains(e) && value.slice(idx) !== '')
            value = [value.slice(0, idx), e, value.slice(idx)].join('');
        });

        return (fillReverse === true) ? value.reverse() : value;
      }
    });


  /***
   * Mask CPF shortcut
   */
  if (!String.prototype.maskCPF)
    Object.defineProperty(String.prototype, 'maskCPF', {
      value: function () {
        return this.unmask().mask('000.000.000-00');
      }
    });


  /***
   * Mask CNPJ shortcut
   */
  if (!String.prototype.maskCNPJ)
    Object.defineProperty(String.prototype, 'maskCNPJ', {
      value: function () {
        return this.unmask().mask('00.000.000/0000-00');
      }
    });


  /***
   * Mask CPF/CNPJ shortcut based on string length
   */
  if (!String.prototype.maskCPForCNPJ)
    Object.defineProperty(String.prototype, 'maskCPForCNPJ', {
      value: function () {
        return this.unmask().length <= 11 ? this.maskCPF() : this.maskCNPJ();
      }
    });


  /***
   * Mask phone shortcut based on string length
   */
  if (!String.prototype.maskPhone)
    Object.defineProperty(String.prototype, 'maskPhone', {
      value: function () {
        return parseInt(this.unmask().length) === 11 ? this.mask('(00)00000-0000') : this.mask('(00)0000-0000');
      }
    });

  /***
   * Mask date datas "10/10/2013"
   */
  if (!String.prototype.maskDate)
    Object.defineProperty(String.prototype, 'maskDate', {
      value: function () {
        return this.mask('00/00/0000');
      }
    });

  /***
   * Mask hour "11:00"
   */
  if (!String.prototype.maskHour) Object.defineProperty(String.prototype, 'maskHour', {
    value: function value() {
      return this.mask('00:00');
    }
  });

  /***
   * Mask CEP Brasil shortcut
   */
  if (!String.prototype.maskZipCode)
    Object.defineProperty(String.prototype, 'maskZipCode', {
      value: function () {
        return this.unmask().mask('00.000-000');
      }
    });


  /***
   * Return the first char from the current string
   *
   * @param uppercase: If true, return char as uppercase, otherwise, returns lowercase
   */
  if (!String.prototype.firstChar)
    Object.defineProperty(String.prototype, 'firstChar', {
      value: function (uppercase = false) {
        let value = this.substring(0, 1);

        return uppercase
          ? value.toUpperCase()
          : value.toLowerCase();
      }
    });

  /***
   * Truncate the string on desired char
   *
   * @param n: Size of returning string
   * @param useReticence: If true, concat ... at end of returning string
   */
  if (!String.prototype.truncate)
    Object.defineProperty(String.prototype, 'truncate', {
      value: function (n, useReticence = true) {
        if (this.length <= n)
          return this.toString();

        let subString = this.substr(0, n - 1);
        subString = subString.substr(0, subString.lastIndexOf(' '));

        return (useReticence ? subString + ' ...' : subString);
      }
    });


// --- ARRAYS EXTENSIONS

  /**
   * Plugin to check if a Arrays contains given value.
   * @param c: Character to be searched into String, ex: -.,, _-, , -, _-, AA, B, etc.
   *
   * Usage: Ex1: "aew".safeContains('a');
   */
  if (!Array.prototype.safeContains)
    Object.defineProperty(Array.prototype, 'safeContains', {
      value: function (c) {
        return (c !== undefined) ? this.indexOf(c) !== -1 : false;
      }
    });


  /**
   * Randomize array data
   *
   * Usage: Ex1: "aew".shuffle();
   */
  if (!Array.prototype.shuffle)
    Array.prototype.shuffle = function () {
      let i = this.length, j, temp;
      if (i === 0) return this;

      while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }

      return this;
    }
});
