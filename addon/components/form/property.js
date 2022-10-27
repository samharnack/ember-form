import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormPropertyComponent extends Component {
  @action setEvent(setter, property, { target }) {
    const { value } = target;

    setter(property, value);
  }
}
