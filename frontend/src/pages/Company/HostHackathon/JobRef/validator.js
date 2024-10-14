var ValidatorRules = {
    requiredText: function(value, messageError) {
        return value ? (value.trim() !== '' ? undefined : messageError) : messageError;
    },
    requiredCbb: function(value, messageError) {
        return value ? (value != -1 ? undefined : messageError) : messageError;
    },
    requiredCb: function(values, messageError){
        return values ? (values.split(',').length != 0 ? undefined : messageError) : messageError
    },
    number: function(value){
        return value ? (isNumeric(value) ? undefined : "Please fill a number.") : "Please fill a number."
    },
    positiveNumber: function(value){
        return value ? (parseFloat(value) > 0 ? undefined : "Please fill a positive number.") : "Please fill a positive number."
    },
    intergerNumber: function(value){
        return value ? (Number.isInteger(Number(value)) ? undefined : "Please fill a interger number.") : "Please fill a interger number."
    },
    maxHourWeek: function(value){
        return value ? (parseFloat(Number(value)) < 168 ? undefined : "Exceeded weekly hours.") : "Exceeded weekly hours."
    },
    max: function(value, number){
        return value ? (parseFloat(value) <= parseFloat(number) ? undefined : "Please do not enter more than the maximum number") : "Please do not enter more than the maximum number"
    },
    min: function(value, number){
        return value ? (parseFloat(value) >= parseFloat(number) ? undefined : "Please do not enter less than the minimum number") : "Please do not enter less than the minimum number"
    },
    email: function(value){
        return value ? (value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? undefined : "Add a valid email address.") : "Add a valid email address."
    },
};
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function Validate(Element, ErrorMessages){
    const validationErrors = {}
    const name = Element.getAttribute('name');
    const rules = Element.getAttribute('rules');
    var {value} = Element
    value = value || value === "" ? value : Element.getAttribute('value')
    var ruleInfos = rules.split('|');
    for(var rule of ruleInfos){
        var ruleFunc;
        if(rule.includes(':')) {
            rule = rule.split(':')
            if(rule[1].trim()) {
                ruleFunc = ValidatorRules[rule[0]] 
                if(ruleFunc){
                    ruleFunc = ruleFunc(value, rule[1])
                    if(ruleFunc) {
                        validationErrors[name] = ruleFunc
                        return validationErrors
                    }
                }
            }
        }
        else {
            ruleFunc = ValidatorRules[rule];
            if(ruleFunc){
                ruleFunc = ruleFunc(value, ErrorMessages[name])
                if(ruleFunc) {
                    validationErrors[name] = ruleFunc
                    return validationErrors
                }
            }
        }
    }
    return validationErrors
}

export function FormErrors(formElement, ErrorMessages){
        var inputs = formElement.querySelectorAll('[name][rules]');
        const validationErrors = {}
        
        for(var input of inputs){
            const name = input.getAttribute('name');
            const rules = input.getAttribute('rules');
            var {value} = input
            value = value || value === "" ? value : input.getAttribute('value')
            var ruleInfos = rules.split('|');

            for(var rule of ruleInfos){
                var ruleFunc;
                if(rule.includes(':')) {
                    rule = rule.split(':')
                    if(rule[1].trim()) {
                        ruleFunc = ValidatorRules[rule[0]] 
                        if(ruleFunc){
                            ruleFunc = ruleFunc(value, rule[1])
                            ruleFunc ? validationErrors[name] = ruleFunc : delete validationErrors[name]
                        }
                    }
                }
                else {
                    ruleFunc = ValidatorRules[rule];
                    if(ruleFunc){
                        ruleFunc = ruleFunc(value, ErrorMessages[name])
                        ruleFunc ? validationErrors[name] = ruleFunc : delete validationErrors[name]
                    }
                }
            }
        }

        return validationErrors
}