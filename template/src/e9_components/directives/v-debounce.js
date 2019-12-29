import Vue from 'vue';

Vue.directive('debounce', {
    bind: (el, bind) => {
        if (bind.value !== bind.oldValue) { // change debounce only if interval has changed
            el.oninput = debounce(function () {
                el.dispatchEvent(createNewEvent('change'));
            }, parseInt(bind.value) || 300);
        }
    },
    unbind: (el) => {
        document.body.removeEventListener('Event', el.oninput);
    }
});
const debounce = (fn, delay) => {
    let timeoutID = null;
    return () => {
        clearTimeout(timeoutID);
        // eslint-disable-next-line
        let args = arguments;
        let that = this;
        timeoutID = setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    };
};

const createNewEvent = (eventName) => {
    let e;
    if (typeof(Event) === 'function') {
        e = new Event(eventName);
    } else {
        e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
    }
    return e;
};
