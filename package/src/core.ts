import * as MANIPULATION_FN from './manipulations';
import * as EVENT_FN from './event-listener';

const fragment = document.createDocumentFragment();

export function $(
    elementOrTagName: Element | Node | Window | string,
    attrOptions?: { [key: string]: any },
    ...children: (Element | string)[]
) {
    let target;

    if (typeof elementOrTagName === 'string') {

        target = document.createElement(elementOrTagName as string, attrOptions && attrOptions.is ? { is: attrOptions.is } : undefined);

        if (attrOptions && Object.keys(attrOptions).length) {
            MANIPULATION_FN.attr.call(target, attrOptions)
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
            ? { ...EVENT_FN }
            : { ...MANIPULATION_FN, ...EVENT_FN }
    );

    return target;
}