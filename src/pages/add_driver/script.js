import firebase from 'firebase'
import func from '../../../custom_libs/func'
import moment from 'moment'

import addGeneralInfo from "../../partials/components/forms/add_driver/add_general_info.vue"
import addVehicleInfo from "../../partials/components/forms/add_driver/add_vehicle_info.vue"
import addDocs from "../../partials/components/forms/add_driver/add_docs.vue"
import tableComp from '../../partials/components/html_utils/tabel_comp.vue'

export default {
    components: {
        add_general_info: addGeneralInfo,
        add_vehicle_info: addVehicleInfo,
        add_docs: addDocs,
        'table_comp': tableComp,

    },
    created: function () {
        let self = this;

        const db = firebase.database();
        self.userRef = db.ref('/users');
        self.userRef.orderByChild('type').equalTo('driver').on('value', function(snap){
            let renderData = snap.val();
            self.data1 = [];
            if(renderData !== null) {
                let renderDataKeys = Object.keys(renderData);
                let process_item = 0;
                let grabData = [];
                renderDataKeys.forEach(function (val) {
                    let item = renderData[val];
                    item['key'] = val;
                    item['time'] = "";
                    var bar = Object.keys(item).length;
                    var percent = (bar * 100) / 20;
                    self.progressValue[process_item] = percent;
                    if (val.length === 20) {
                        item['time'] = func.set_date_ser(new Date(func.decode_key(val)));
                    } else if (item.hasOwnProperty("createdAt")) {
                        item['time'] = moment(item.createdAt).format("hh:mm A DD/MM/YYYY");
                    }
                    grabData.push(item);
                    process_item++;
                    if (process_item === renderDataKeys.length) {
                        self.data1 = grabData;
                        self.dataLoad = false;
                    }
                });
            }
        });
    },
    data() {
        const db = firebase.database();
        return {
            userPushRefKey: db.ref("users").push().key,
            dataLoad: true,
            data1: [],
            userRef: null,
            profile: [],
            counter: 45,
            max: 100,
            progressValue: [],
            removeID: "",
        }
    }
}