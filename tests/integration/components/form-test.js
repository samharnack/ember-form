import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, click } from '@ember/test-helpers';
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
      <Form @set={{fn this.setter this.data}} @get={{fn this.getter this.data}} @submit={{fn this.submit this.data}} as |processing error form|>
        <form.property @name="username" as |property|>
          <property.label>Username</property.label>
          <property.input />
        </form.property>
      </Form>
    `);

    assert.dom(this.element).hasText('Username');
  });

  test('collections', async function (assert) {
    this.setter = (data, property, value) => set(data, property, value);
    this.getter = (data, property) => get(data, property);
    this.data = {};
    this.default = {'item:1': 'works'};

    await render(hbs`
      <Form @set={{fn this.setter this.data}} @get={{fn this.getter this.data}} as |processing error form|>

        <form.collection @name="c" @limit={{ 1 }} as |add collection|>

          {{#if add}}
            <button
              {{on "click" (fn add this.default)}}
              data-test="add"
            >
            </button>
          {{/if}}

          <collection.items as |remove item index|>
            <button
              {{on "click" remove}}
              data-test-remove={{index}}
            >
            </button>

            <item.property @name={{concat "item:" index}} as |property|>
              <property.label>Item {{index}}</property.label>
              <property.input />
            </item.property>
          </collection.items>

        </form.collection>

      </Form>
    `);

    await click('[data-test="add"]');

    assert.dom('[data-test="add"]').doesNotExist();

    await click('[data-test-remove="0"]');

    assert.dom('[data-test="add"]').exists();
  });

  test('it creates unique field ids', async function (assert) {
    await render(hbs`
      <Form as |processing error form|>
        <form.property @name="field1" as |property|>
          <property.label />
          <property.input />
        </form.property>

        <form.property @name="field2" as |property|>
          <property.label />
          <property.input />
        </form.property>
      </Form>

      <Form as |processing error form|>
        <form.property @name="field1" as |property|>
          <property.label />
          <property.input />
        </form.property>

        <form.property @name="field2" as |property|>
          <property.label />
          <property.input />
        </form.property>
      </Form>
    `);

    const elements = [...this.element.querySelectorAll('[id]')];
    const uniqueIds = elements.reduce((acc, element) => {
      const { id } = element;

      return { ...acc, [id]: id };
    }, {});
    
    // await this.pauseTest();

    assert.equal(elements.length, 4);
    assert.equal(Object.entries(uniqueIds).length, elements.length);
  });

});
