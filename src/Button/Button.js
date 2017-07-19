/**
 * @file san-mui/Button
 * @author leon <ludafa@outlook.com>
 */

import {create} from '../common/util/cx';
import {TouchRipple} from '../Ripple';
import BaseButton from './Base';

const cx = create('button');

export default class Button extends BaseButton {

    static components = {
        'san-touch-ripple': TouchRipple
    };

    static template = `
        <button
            on-click="click($event)"
            type="{{type}}"
            class="{{computedClassName}}"
            disabled="{{disabled}}">
            <slot />
            <san-touch-ripple san-if="!disabled" />
        </button>
    `;

    static computed = {
        computedClassName() {
            return cx(this).build();
        }
    };

    click(e) {
        if (!this.data.get('disabled')) {
            this.fire('click', e);
        }
    }

}
