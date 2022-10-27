import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormCollectionComponent extends Component {

  @action getItems(getter, property, ...args) {
    if (args.length === 0) {
      const items = getter(property);
      
      if (items instanceof Array) {
        return items;
      }

      return [];
    }

    return getter(property, ...args);
  }

  @action addItem(set, data) {
    if (data instanceof Array) {
      data = [{}, ...data];
      return set(data);
    }

    return set([{}]);
  }

  @action removeItem(set, data, item) {
    set(data.filter(listItem => listItem !== item));
  }  
}
