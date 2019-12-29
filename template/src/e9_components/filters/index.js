import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', (date, format) => {
    return date ? moment(date).format(format) : '';
});

Vue.filter('limitTo', (arr, val) => val.slice(0, val));

Vue.filter('trucateChars', (val, num) => {
    let result = '';
    if (val) {
        result = val.substring(0, num);
        if (val.length > num) {
            result += '...';
        }
    }
    return result;
});

Vue.filter('currency', (value) => {
    if (typeof value !== 'number') {
        return value;
    }
    let formatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });
    return formatter.format(value);
});

Vue.filter('formatValue', (value, fraction) => {
    if (typeof value !== 'number') {
        return value;
    }
    let formatter = new Intl.NumberFormat('en-UK', {
        minimumFractionDigits: fraction
    });
    return formatter.format(value);
});

Vue.filter('propercase', (value) => {
    if (value.length < 2) {
        return value;
    }
    return value[0].toUpperCase() + value.substring(1).toLowerCase();
});
