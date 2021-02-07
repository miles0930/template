import on from './event-listener/on';
import off from './event-listener/on';
import { attr, toggleAttr } from './manipulations/attr';
import { css } from './manipulations/css';
import { addClass, rmClass, toggleClass } from './manipulations/class';

const METHODS = { $, on, off, attr, toggleAttr, css, addClass, rmClass, toggleClass };

export { METHODS }

const fragment = document.createDocumentFragment();

function $(
    elementOrTagName: Element | Node | Window | string,
    attrOptions?: { [key: string]: any },
    ...children: (Element | string)[]
) {
    let target;

    if (typeof elementOrTagName === 'string') {

        target = document.createElement(elementOrTagName as string, attrOptions && attrOptions.is ? { is: attrOptions.is } : undefined);

        if (attrOptions && Object.keys(attrOptions).length) {
            attr.call(target, attrOptions)
        }

        if (attrOptions?.html) {
            target.innerHTML = attrOptions.html;
        }

        if (children.length) {
            if (children.length > 1) {
                const eachFragment = fragment.cloneNode();
                for (const eachChild of children) {
                    eachFragment.appendChild(
                        typeof eachChild === 'string' ?
                            document.createTextNode(eachChild as any) :
                            eachChild
                    );
                }
                target.appendChild(eachFragment);
            } else {
                target.appendChild(
                    typeof children[0] === 'string' ?
                        document.createTextNode(children[0] as any) :
                        children[0]
                );
            }
        }
    } else {
        target = elementOrTagName;
    }

    Object.assign(target,
        target === window
            ? { on, off }
            : METHODS
    );

    return target;
}
