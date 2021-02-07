
import kebabCase from 'lodash-es/kebabCase';
import isObjLike from 'lodash-es/isObjectLike';
import isNum from 'lodash-es/isNumber';
import isAutoPxProp from '../../../utils/is-auto-px-prop';

export function css(param?: any, value?: any) {
    const element = this;
    if (value !== undefined) {
        if (param[0] === '-') {
            // set with css variable
            element.style.setProperty(param, value);
            return element;
        }
        param = kebabCase(param);
        if (isAutoPxProp(param) && isNum(value)) {
            value = value + 'px';
        }
        element.style[param] = value;
        return element;
    } else if (isObjLike(param)) {
        // tslint:disable-next-line: forin
        for (const key in param) {
            const propValue = param[key];
            if (key[0] === '-') {
                element.style.setProperty(key, propValue);
            } else {
                element.style[key] = propValue +
                    (isAutoPxProp(kebabCase(key)) && isNum(propValue) ?
                        'px' :
                        ''
                    );
            }
        }
        return element;
    } else if (typeof param === 'string') {
        return window.getComputedStyle(element).getPropertyValue(param);
    } else {
        return window.getComputedStyle(element);
    }
};
