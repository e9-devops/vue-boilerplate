<template>
    <div>
        <div class="form-group google-address">
            <label for="">\{{ label || 'Address' }}</label>
            <input type="text" v-debounce="300" v-model.lazy="searchTxt" class="form-control google-address-text" @change="searchChanged" autocomplete="no" placeholder="Start typing to search..." />
            <div ref="mapDiv"></div>
            <ul class="places-result" v-if="!addressSelected && predictions.length > 0">
                <li v-for="(_pred,key) in predictions" :key="key">
                    <a v-text="_pred.description" @click="setAddress(_pred)"></a>
                </li>
            </ul>
        </div>
        <div class="form-group">
            <label class="control-label">Line 1</label>
            <input type="text" v-model="addressObj.Line1" class="form-control" />
        </div>
        <div class="form-group">
            <label class="control-label">Line 2</label>
            <input type="text" v-model="addressObj.Line2" class="form-control" />
        </div>
        <div class="form-group">
            <label class="control-label">Area</label>
            <input type="text" v-model="addressObj.Area" class="form-control" />
        </div>
        <div class="form-group">
            <label class="control-label">County</label>
            <input type="text" v-model="addressObj.County" class="form-control" />
        </div>
        <div class="form-group">
            <label class="control-label">TownCity</label>
            <input type="text" v-model="addressObj.TownCity" class="form-control" />
        </div>
        <div class="form-group">
            <label class="control-label">PostCode</label>
            <input type="text" v-model="addressObj.PostCode" class="form-control" />
        </div>
    </div>

</template>

<script>
export default {
    name: 'AddressFinder',
    props: ['address', 'label'],
    data() {
        return {
            searchTxt: '',
            addressSelected: false,
            addressObj: this.address || {},
            autocomplete: null,
            google: null,
            predictions: []
        };
    },
    methods: {
        setAddress(pred) {
            this.addressObj = {};
            new this.google.maps.places.PlacesService(this.$refs.mapDiv).getDetails({
                placeId: pred.place_id,
                fields: ['address_component','geometry','formatted_address']
            }, (place) => {
                this.addressSelected = true;
                this.searchTxt = place.formatted_address;
                let street_number = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('street_number') !== -1 || ac.types.indexOf('premise') !== -1;
                });
                let street_route = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('route') !== -1;
                });
                this.addressObj.Line1 = ((street_number.length) ? street_number[0].long_name : '') + ' ' + ((street_route.length) ? street_route[0].long_name : '');

                let area = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('locality') !== -1 || ac.types.indexOf('neighborhood') !== -1;
                });
                this.addressObj.Line2 = (area.length) ? area[0].long_name : null;

                let townCity = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('postal_town') !== -1;
                });
                this.addressObj.TownCity = (townCity.length) ? townCity[0].long_name : null;

                let county = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('administrative_area_level_2') !== -1;
                });
                this.addressObj.County = (county.length) ? county[0].long_name : null;

                let postcode = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('postal_code') !== -1;
                });
                this.addressObj.PostCode = (postcode.length) ? postcode[0].long_name : null;

                let country = place.address_components.filter(function (ac) {
                    return ac.types.indexOf('country') !== -1;
                });
                this.addressObj.Country = (country.length) ? country[0].long_name : null;

                this.addressObj.Latitude = place.geometry && place.geometry.location ? place.geometry.location.lat() : null;
                this.addressObj.Longitude = place.geometry && place.geometry.location ? place.geometry.location.lng() : null;
                this.$emit('updated', this.addressObj);
            });
        },
        searchChanged() {
            if (this.searchTxt.length >= 3) {
                new this.google.maps.places.AutocompleteService().getPlacePredictions({
                    input: this.searchTxt
                }, (preds) => {
                    this.predictions = [];
                    if (preds) {
                        this.addressSelected = false;
                        this.predictions = preds;
                    }
                });
            }
        }
    },
    async created() {
        this.google = await this.$gmapApiPromiseLazy(); // Write your own library here to load google maps script asynchronously
    }
};
</script>

<style lang="scss" scoped>
    .form-group {
        &.google-address {
            position: relative;

            .form-control {
                &.google-address-text {
                    background-image: url('../../assets/images/google.png');
                    background-repeat: no-repeat;
                    background-position: center left 4px;
                    background-size: 24px;
                    padding-left: 32px;
                }
            }

            ul.places-result {
                position: absolute;
                top: 80px;
                left: 0;
                right: 0;
                background: #fff;
                z-index: 100;
                border: 1px solid #ddd;
                @include border-radius(6px);
                padding-left: 0;
                list-style: none;
                li {
                    width: 100%;
                    display: block;
                    padding: 8px 16px;
                    border-bottom: 1px solid #ddd;

                    a {
                        width: 100%;
                        display: block;
                        @include text-overflow();
                        font-size: 14px;
                        color: $brand-primary;
                        font-weight: 600;
                    }
                }
            }
        }
    }
</style>
