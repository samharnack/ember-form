import Controller from '@ember/controller';
import { action } from '@ember/object';
import { get, set } from '@ember/object';

export default class ApplicationController extends Controller {

  @action setProperty(...args) {
    const [data, name, value] = args.slice(-3);
    const result = set(data, name, value);

    return result;
  }

  @action getProperty(...args) {
    const [data, name] = args.slice(-2);
    return get(data, name);
  }

  @action async submit(data) {
    console.log(data);
  }

  data = {
    username: null,
    format: 'medium',
    ram: '8',
    parameters: [
      { key: 'Sample 1', value: 'Value 1' },
    ],
  };
}
