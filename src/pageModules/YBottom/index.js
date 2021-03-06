/*!
 * vue-burger-button v0.1.2
 * (c) 2018-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const script = {
  name: 'BurgerButton',
  props: {
    active: Boolean,
    barWidth: {
      type: Number,
      default: 80,
    },
    barHeight: {
      type: Number,
      default: 10,
    },
    barColor: {
      type: String,
      default: '#000000',
    },
  },
};

/* script */
const __vue_script__ = script;
/* template */
const __vue_render__ = function (_h, _vm) {
  const { _c } = _vm;
  return _c(
    'button',
    _vm._g(
      _vm._b(
        {
          class: [
            'burguer-button',
            { '-active': _vm.props.active },
            _vm.data.staticClass,
            _vm.data.class,
          ],
          style: {
            width: `${_vm.props.barWidth}px`,
            height: `${_vm.props.barHeight * 6}px`,
          },
          attrs: {
            'aria-expanded': _vm.props.active ? 'true' : 'false',
            'aria-label': 'Menu',
            'aria-controls': 'navigation',
          },
        },
        'button',
        _vm.data.attrs,
        false,
      ),
      _vm.data.on,
    ),
    _vm._l(3, (index) => _c('span', {
      key: index,
      staticClass: 'bar',
      style: {
        width: `${_vm.props.barWidth}px`,
        height: `${_vm.props.barHeight}px`,
        backgroundColor: _vm.props.barColor,
      },
    })),
  );
};
const __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = true;
/* component normalizer */
function __vue_normalize__(
  template,
  style,
  script$$1,
  scope,
  functional,
  moduleIdentifier,
  createInjector,
  createInjectorSSR,
) {
  const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

  // For security concerns, we use only base name in production mode.
  component.__file = '/Users/vitorcavalcanti/Projects/vue-burger-button/src/BurgerButton.vue';

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */

const BurgerButton = __vue_normalize__(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  undefined,
  undefined,
);

module.exports = BurgerButton;
