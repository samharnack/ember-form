import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class FormComponent extends Component {
  @tracked processing = false;
  @tracked error = null;
  @tracked disabled = false;

  @action setState(state, ...properties) {
    const value = set(this, state, properties.reduce((value, status) => value || status, false));

    console.log('setState', state, { value, properties });
  }

  @action getState(state) {
    return get(this, state);
  }

  @action ref(...paths) {
    const key = paths.join('.');
    const guid = guidFor(key);
    
    // console.log('ref', { paths, key, guid });

    return guid;
  }

  @action set(setter, ...args) {
    if ('function' === typeof setter) {
      return setter(...args);
    }
  }

  @action get(getter, ...args) {
    if ('function' === typeof getter) {
      return getter(...args);
    }
  }

  @action async submit(submit, event) {
    event.preventDefault();

    try {
      this.processing = true;

      if ('function' === typeof submit) {
        await submit();
      }

      this.error = null;
    } catch (error) {
      this.error = error;
    } finally {
      this.processing = false;
    }
  }
}
