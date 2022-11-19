import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormCollectionComponent extends Component {

  @action get(getter, property, ...args) {
    if (args.length === 0) {
      const items = getter(property);
      
      if (items instanceof Array) {
        return items;
      }

      return [];
    }

    return getter(property, ...args);
  }

  @action add(set, items, data = {}) {
    if (items instanceof Array) {
      items = [data, ...items];
      return set(items);
    }

    return set([data]);
  }

  @action remove(set, data, item) {
    set(data.filter(listItem => listItem !== item));
  }
}
