var Sandbox = {
  create: function (core, module_selector) {}
    var CONTAINER = CORE.dom.query('.' + module_selector);
    return {
      find : function (selector) {
        return CONTAINER.query(selector);
      },
      addEvent : function (element, type, fn) {
        CORE.dom.bind(element, type, fn);
      },
      removeEvent : function (element, type, fn) {
        CORE.dom.unbind(element, type, fn);
      },
      notify : function (evt) {
        if (core.is_obj(evt) && evt.type) {
          CORE.triggerEvent(evt);
        }
      },
      listen : function (evts) {
        if (CORE.is_obj(evts)) {
          CORE.registerEvents(evts, module_selector);
        }
      },
      ignore : function (evts) {
        if (CORE.is_arr) {
          CORE.removeEvents(evts, module_selector);
        }
      }
    }
}
