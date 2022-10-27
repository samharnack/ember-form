import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormSelectComponent extends Component {
  @action setEvent(setter, property, value, _event) {
    return setter(property, value);
  }
}
