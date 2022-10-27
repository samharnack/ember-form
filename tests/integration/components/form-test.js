import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { set, get } from '@ember/object';

module('Integration | Component | form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setter = (data, property, value) => set(data, property, value);
    this.getter = (data, property) => get(data, property);
    
    this.data = {
      username: null,
    };

    this.submit = (data) => {
      assert.equal(data.username, 'username')
    };

    await render(hbs`
      <Form @set={{fn this.setter this.data}} @get={{fn this.getter this.data}} @submit={{fn this.submit this.data}} as |form|>
        <form.property @name="username" as |property|>
          <property.label>Username</property.label>
          <property.input />
        </form.property>
      </Form>
    `);

    assert.dom(this.element).hasText('Username');
  });
});
