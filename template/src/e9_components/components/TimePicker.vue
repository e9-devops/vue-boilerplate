<template>
    <div class="timepicker-wrapper">
        <table>
            <tbody>
            <tr>
                <td>
                    <a class="btn btn-link" @click="incrementHours">
                        <i class="material-icons">
                            keyboard_arrow_up
                        </i>
                    </a>
                </td>
                <td>&nbsp;</td>
                <td>
                    <a class="btn btn-link" @click="incrementMinutes">
                        <i class="material-icons">
                            keyboard_arrow_up
                        </i>
                    </a>
                </td>
                <td v-show="showMeridian"></td>
            </tr>
            <tr class="text-center">
                <td class="form-group" style="width:50px;">
                    <input type="text" @input="handleHours($event.target.value)" :value="strHours" class="form-control text-center" maxlength="2" @keyup.up="incrementHours" @keyup.down="decrementHours">
                </td>
                <td>:</td>
                <td class="form-group" style="width:50px;">
                    <input type="text" @input="handleMinutes($event.target.value)" :value="strMinutes" class="form-control text-center" maxlength="2" min="0" max="59" @keyup.up="incrementMinutes" @keyup.down="decrementMinutes">
                </td>
                <td v-show="showMeridian">
                    <button class="btn btn-primary" @click="toggleMeridian">\{{ meridian }}</button>
                </td>
            </tr>
            <tr>
                <td>
                    <a class="btn btn-link" @click="decrementHours">
                        <i class="material-icons">
                            keyboard_arrow_down
                        </i>
                    </a>
                </td>
                <td>&nbsp;</td>
                <td>
                    <a class="btn btn-link" @click="decrementMinutes">
                        <i class="material-icons">
                            keyboard_arrow_down
                        </i>
                    </a>
                </td>
                <td v-show="showMeridian"></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TimePicker',
        props: {
            value: {
                type: Date,
                default: new Date()
            },
            hourStep: {
                type: Number,
                default: 1
            },
            minuteStep: {
                type: Number,
                default: 1
            },
            showMeridian: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                hours: this.value.getHours(),
                strHours: '',
                minutes: this.value.getMinutes(),
                strMinutes: '',
                meridian: 'AM'
            };
        },
        methods: {
            emitValue(type) {
                if (type === 'hr') {
                    let clonedValue = this.value;
                    clonedValue.setHours(this.hours);
                    this.$emit('update:value', clonedValue);
                } else {
                    let clonedValue = this.value;
                    clonedValue.setMinutes(this.minutes);
                    this.$emit('update:value', clonedValue);
                }
            },
            handleHours(val, type) {
                let min = this.showMeridian ? (this.meridian === 'AM' ? 0 : 1) : 0,
                    max = this.showMeridian ? (this.meridian === 'AM' ? 11 : 12) : 23;
                let h = parseInt(val);
                if (type === 'inc')
                    h = h + this.hourStep;
                else if (type === 'dec')
                    h = h - this.hourStep;
                if (this.showMeridian) {
                    if (this.meridian === 'PM' && h === 0) {
                        h = 1;
                    } else if (this.meridian === 'AM' && h === 12) {
                        h = 11;
                    }
                    else if (h > max || h < min) {
                        return;
                    }
                }
                if (h > max || h < min && type){
                    return;
                } else if (this.hours > max) {
                    this.hours = max;
                    this.strHours = max;
                } else if (this.hours < min) {
                    this.hours = min;
                    this.strHours = '0' + min;
                } else {
                    this.strHours = h > 9 ? h : '0' + h;
                    this.hours = h;
                }
                this.emitValue('hr');
            },
            handleMinutes(val, type) {
                let min = 0, max = 59;
                let m = parseInt(val);
                if (type === 'inc')
                    m = m + this.minuteStep;
                else if (type === 'dec')
                    m = m - this.minuteStep;
                if (m < min|| m > max) {
                    return;
                }
                this.minutes = m;
                this.strMinutes = m > 9 ? m : '0' + m;
                this.emitValue('min');
            },
            incrementHours() {
                this.handleHours(this.hours, 'inc');
            },
            incrementMinutes() {
                this.handleMinutes(this.minutes, 'inc');
            },
            decrementHours() {
                this.handleHours(this.hours, 'dec');
            },
            decrementMinutes() {
                this.handleMinutes(this.minutes, 'dec');
            },
            toggleMeridian() {
                if (this.showMeridian && this.meridian === 'AM') {
                    this.meridian = 'PM';
                    this.handleHours(this.hours);
                } else {
                    this.meridian = 'AM';
                    this.handleHours(this.hours);
                }
            }
        },
        created() {
            if (this.showMeridian) {
                if (this.hours > 11) {
                    this.meridian = 'PM';
                    this.hours-= 12;
                }
            }
            this.handleHours(this.hours);
            this.handleMinutes(this.minutes);
        },
    };
</script>

<style lang="scss" scopped>
    .timepicker-wrapper {
        table {
            margin: 0;
            tr {
                td {
                    input[type='text'] {
                        width: 50px;
                        margin-bottom: 0;
                        padding: 6px 12px !important;
                    }
                    a {
                        &.btn {
                            width: 50px;
                            min-width: 50px;
                            border: none;
                            padding: 0;
                            margin: 0;
                            height: 24px;
                            line-height: 32px;
                        }
                    }
                    button {
                        min-width: 50px;
                        border: none;
                        margin: 0;
                        height: 50px;
                        background-color: #f5f5f5;
                        margin-left: 4px;
                        color: #555;
                    }
                }
            }
        }
    }
</style>
