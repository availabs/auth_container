'use strict';

var d3 = require('d3'),
    LoadingStore = require("../utils/LoadingStore"),
    soCRUD = SailsCRUD(),
    zeroPadding = d3.format("02d");

var LOADING = 0;

var AUTH_HOST = require('../../../DEV_CONFIG.json').host

var API_HOST = 'http://localhost:12222/';
// var API_HOST = 'http://mars.availabs.org:12222/';
// var API_HOST = 'http://mars.availabs.org:12224/';

function checkLoading(bool) {
    if (bool && !LOADING) {
        LoadingStore.loadingStart();
    }
    else if (!bool && LOADING == 1) {
        LoadingStore.loadingStop();
    }
    LOADING += bool ? 1 : -1;
}

module.exports = {
// USER ACTIONS
    getAllUsers: function(cb) {
        checkLoading(true);
        soCRUD('users').read(wrapCB(cb));
    },
    createUser: function(user, cb) {
        checkLoading(true);
        soCRUD('users').create(user, wrapCB(cb));
    },
    updateUser: function(user, cb) {
        checkLoading(true);
        soCRUD('users').update(user.id, user, wrapCB(cb));
    },
    deleteUser: function(user, cb) {
        checkLoading(true);
        soCRUD('users').delete(user.id, wrapCB(cb));
    },

// GROUP ACTIONS
    getAllGroups: function(cb) {
        checkLoading(true);
        soCRUD('usergroup').read(wrapCB(cb));
    },
    createGroup: function(group, cb) {
        checkLoading(true);
        soCRUD('usergroup').create(group, wrapCB(cb));
    },
    updateGroup: function(group, cb) {
        checkLoading(true);
        soCRUD('usergroup').update(group.id, group, wrapCB(cb));
    },
    deleteGroup: function(group, cb) {
        checkLoading(true);
        soCRUD('usergroup').delete(group.id, wrapCB(cb));
    },

// COUNTY_ROADS_DATA ACTIONS
    loadRoadData: function(params, cb) {
        checkLoading(true);

        d3.json('/roads/data')
            .post(JSON.stringify({ params: params }), wrapCB(cb));
    },

// ROUTE_CREATION ACTIONS
    createRoute: function(points, cb) {
        checkLoading(true);
        var url = API_HOST + "routes/create?points="+points;
        url += "&key=SubterraneanHomesickAvailian";

console.log("<SailsWebApi.createRoute>", points)
        // d3.json('/route/create/'+JSON.stringify(points), wrapCB(cb));
        d3.json(url, wrapCB(cb));
    },
    saveRoute: function(route, cb) {
        checkLoading(true);

delete route.collection;
delete route.homepageData;
delete route.bottleneckData;
delete route.topology;
delete route.monthlyHours;

        var url = API_HOST + "routes/save?key=SubterraneanHomesickAvailian";

        d3.json(url)
            .header("content-type", "application/json")
            .post(JSON.stringify({ route: route }), wrapCB(cb));

        // d3.json('/route/save')
        //     .post(JSON.stringify({ route: route }), wrapCB(cb));
    },
    updateRoute: function(route, cb) {
        checkLoading(true);

        var request = {
            name: route.name,
            type: route.type,
            owner: route.owner,
            id: route.id
        }

        d3.json('/route/update')
            .post(JSON.stringify({ route: request }), wrapCB(cb));
    },
    loadSavedRoutes: function(userId, userGroup, cb) {

        if (userId && userGroup) {
            var url = API_HOST + "routes/getlist/"+userId+"/"+userGroup;
        }
        else if (userId) {
            var url = API_HOST + "routes/getlist/user/"+userId;
        }
        else {
            var url = API_HOST + "routes/getlist/group/"+userGroup;
        }
        url += "?key=SubterraneanHomesickAvailian";
        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },
    deleteRoute: function(id, cb) {
        checkLoading(true);
        soCRUD('route').delete(id, wrapCB(cb));
    },
    getRoadsByTmc: function(tmcArray, cb) {
        checkLoading(true);

        d3.json("/roads/get")
            .post(JSON.stringify({ tmcArray: tmcArray }), wrapCB(cb));
    },

// ROUTE_VIEW ACTIONS
    // updateGraphData: function(request, cb) {
    //  d3.json("/route/data/brief")
    //      .post(JSON.stringify(request), wrapCB(cb));
    // },
    loadMonthlyHoursData: function(tmcArray, id, cb) {
        checkLoading(true);

        d3.json('/route/data/monthlyhours')
            .post(JSON.stringify({ tmcArray: tmcArray, routeId: id }), wrapCB(cb));
    },
    loadBriefData: function(data, cb) {
        checkLoading(true);
        d3.json("/route/data/brief")
            .post(JSON.stringify(data), wrapCB(cb));
    },
    getTmcData: function(request, cb) {
        checkLoading(true);
        d3.json('/tmc/data/')
            .post(JSON.stringify(request), wrapCB(cb));
    },
    getTmcStats: function(tmcArray, cb) {
        checkLoading(true);
        d3.json('/tmc/stats/')
            .post(JSON.stringify({ tmcArray: tmcArray }), wrapCB(cb));
    },

// ROUTE_DATA ACTIONS
    getHpmsCounts: function(tmcArray, cb) {
        checkLoading(true);

        d3.json('/hpms/getcounts')
            .post(JSON.stringify({ tmcArray: tmcArray }), wrapCB(cb));
    },
    loadRoute: function(routeId, cb) {
console.log("<SailsWebApi.loadRoute>", routeId)
        var url = API_HOST + "routes/get/"+routeId;
        url += "?key=SubterraneanHomesickAvailian";

        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },
    getPeakData: function(month, tmcs, amPeak, pmPeak, cb) {
        if (!month) {
            var url = API_HOST + "routes/peakdata/"+tmcs;
        }
        else {
            var url = API_HOST + "routes/peakdata/"+tmcs+"/"+month;
        }
        url += "?key=SubterraneanHomesickAvailian";
        if (amPeak) {
            url += "&amPeak="+amPeak;
        }
        if (pmPeak) {
            url += "&pmPeak="+pmPeak;
        }
console.log("<SailsWebApi.getPeakData>",url);

        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },
    getMonthlyHours: function(tmcs, cb) {
        var url = API_HOST + "routes/monthlyhours/"+tmcs;
        url += "?key=SubterraneanHomesickAvailian";

        checkLoading(true);
        d3.json(url, wrapCB(cb));
        // d3.json("/route/monthlyhours")
        //     .post(JSON.stringify(request), wrapCB(cb));
    },
    getRouteGeometry: function(request, cb) {
        var url = API_HOST + "routes/geometry/";
        if (request.routeId) {
            url += "route/"+request.routeId;
        }
        else if (request.tmcArray) {
            url += "tmcs/"+request.tmcArray.join("");
        }
        else if (request.userId && request.userGroup) {
            url += userId + "/" +  userGroup;
        }
        else if (request.userId) {
            url += "user/"+request.userId;
        }
        else {
            url += "group/"+request.userGroup;
        }
        url += "?key=SubterraneanHomesickAvailian";
        checkLoading(true);
        d3.json(url, wrapCB(cb));
        // d3.json('/route/geometry')
        //     .post(JSON.stringify(request), wrapCB(cb));
    },
    getShiftedRouteGeometry: function(request, cb) {
        var url = API_HOST + "routes/geometry/shifted/";
        if (request.routeId) {
            url += "route/"+request.routeId;
        }
        else if (request.tmcArray) {
            url += "tmcs/"+request.tmcArray.join("");
        }
        else if (request.userId && request.userGroup) {
            url += userId + "/" +  userGroup;
        }
        else if (request.userId) {
            url += "user/"+request.userId;
        }
        else {
            url += "group/"+request.userGroup;
        }
        url += "?key=SubterraneanHomesickAvailian";
        checkLoading(true);
        d3.json(url, wrapCB(cb));
        // checkLoading(true);
        // d3.json('/route/shiftedgeometry')
        //     .post(JSON.stringify(request), wrapCB(cb));
    },
    getGroupBottlenecks: function(month, request, cb) {
        checkLoading(true);
        d3.json("/route/bottlenecks/"+month)
            .post(JSON.stringify(request), wrapCB(cb));
    },

// OVERVIEW ACTIONS
    loadDailyHoursData: function(tmcArray, date, cb) {
        var request = {
            tmcArray: tmcArray,
            date: date
        };

        checkLoading(true);
        d3.json('/route/data/dailyhours')
            .post(JSON.stringify(request), wrapCB(cb));
    },

// INCIDENTS_VIEW ACTIONS
    loadIncidentsData: function(route, geom, month, cb) {
        var amPeak = [route.amPeakStart, route.amPeakEnd],
            pmPeak = [route.pmPeakStart, route.pmPeakEnd],

            request = {
                collection: geom,
                tmcArray: route.tmcArray,
                month: month,
                amPeak: amPeak,
                pmPeak: pmPeak
            };

        checkLoading(true);
        d3.json("incidents/checkroute")
            .post(JSON.stringify(request), wrapCB(cb));
    },
    loadTranscomData: function(collection, tmcArray, month, cb) {
        checkLoading(true);
        d3.json("/incidents/transcom")
            .post(JSON.stringify({ collection: geom, tmcArray: tmcArray, month:month }), wrapCB(cb));
    },

// STATE VIEW ACTIONS
    getGroupData: function(cb) {
        checkLoading(true);
        d3.json("/state/groupdata", wrapCB(cb));
    },
    getBottlenecks: function(month, cb) {
        checkLoading(true);
        d3.json("/state/bottlenecks/"+month, wrapCB(cb));
    },
    loadMpoGeometries: function(cb) {
        checkLoading(true);

        d3.json("/data/mpo_boundaries.geojson", wrapCB(cb));
    },

// LRS ACTIONS
    loadLrs: function(linkIds, cb) {
        checkLoading(true);

        d3.json("/lrs/fromlinks")
            .post(JSON.stringify({ linkIds: linkIds }), wrapCB(cb));
    },
    loadHpms: function(linkIds, cb) {
        checkLoading(true);

        d3.json("/hpms/fromlinks")
            .post(JSON.stringify({ linkIds: linkIds }), wrapCB(cb));
    },
    getTmcCounts: function(tmcArray, cb) {
        checkLoading(true);

        d3.json('/hpms/getcounts')
            .post(JSON.stringify({ tmcArray: tmcArray }), wrapCB(cb));
    },

// SHARED STATE ACTIONS
    getMonthsWithData: function(cb) {
        checkLoading(true);

        d3.json('/route/months', wrapCB(cb));
    },
    getNprmDataDateExtent: function(cb) {
        var url = "http://mars.availabs.org:12222/metadata/data-date-extent/NY";

        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },

// Nprm Test actions
    getNprmTestData: function(route, year, month, cb) {
        var host = "http://mars.availabs.org:12123/";
        if (route.tmcArray) {
            var tmcString = route.tmcArray.join("");
        }
        else {
            var tmcString = route;
        }

        if (year && month) {
            var url = host + "data/npmr-1/"+tmcString+"/"+year+"/"+zeroPadding(month)+"/mph-fill/55";
        }
        else {
            var url = host + "data/npmr-1/"+tmcString+"/"+year+"/mph-fill/55";
        }
        url += "?includeDistro=true&includeDataIntegrityStats=true";
        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },

// NPRM ACTIONS
    getNprmReliabilityData: function(tmcString, year, month, cb) {

        if (year && month) {
            var url = API_HOST + "measures/nprm-1/NY/tmcs/"+tmcString+"/"+year+"/"+zeroPadding(month)+"/speedlimit-fill";
        }
        else {
            var url = API_HOST + "measures/nprm-1/NY/tmcs/"+tmcString+"/"+year+"/speedlimit-fill";
        }
        // url += "?includeDistro=false&includeDataIntegrityStats=true";
        url += "?key=SubterraneanHomesickAvailian&measureParameters=num_epochs_in_period,num_epochs_in_data,percent_epochs_missing";
        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },
    getNprmExpectationData: function(tmcString, year, month, cb) {

        if (year && month) {
            var url = API_HOST + "measures/nprm-2/NY/tmcs/"+tmcString+"/"+year+"/"+zeroPadding(month)+"/speedlimit-percentage/75";
        }
        else {
            var url = API_HOST + "measures/nprm-2/NY/tmcs/"+tmcString+"/"+year+"/speedlimit-percentage/75";
        }
        // url += "?includeDistro=false&includeDataIntegrityStats=true";
        url += "?key=SubterraneanHomesickAvailian&measureParameters=dpptt,travel_time_avgs,phttr_all_periods";
        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },
    getNprmFreightReliabilityData: function(tmcString, year, month, cb) {
        var host = "http://mars.availabs.org:12222/";

        if (year && month) {
            var url = host + "measures/nprm-3/NY/tmcs/"+tmcString+"/"+year+"/"+zeroPadding(month);
        }
        else {
            var url = host + "measures/nprm-3/NY/tmcs/"+tmcString+"/"+year;
        }
        // url += "?includeDistro=false&includeDataIntegrityStats=true";
        url += "?key=SubterraneanHomesickAvailian&measureParameters=num_epochs_in_time_range,num_epochs_in_data,percent_epochs_missing";
        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },
    getNprmFreightCongestionData: function(tmcString, year, month, cb) {
        var host = "http://mars.availabs.org:12222/";

        if (year && month) {
            var url = host + "measures/nprm-4/NY/tmcs/"+tmcString+"/"+year+"/"+zeroPadding(month);
        }
        else {
            var url = host + "measures/nprm-4/NY/tmcs/"+tmcString+"/"+year;
        }
        // url += "?includeDistro=false&includeDataIntegrityStats=true";
        url += "?key=SubterraneanHomesickAvailian&measureParameters=num_epochs_in_time_range,num_epochs_in_data,percent_epochs_missing";

        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },
    getNprmDelayData: function(tmcString, year, month, cb) {
        var host = "http://mars.availabs.org:12222/";

        if (year && month) {
            var url = host + "measures/nprm-7/NY/tmcs/"+tmcString+"/"+year+"/"+zeroPadding(month);
        }
        else {
            var url = host + "measures/nprm-7/NY/tmcs/"+tmcString+"/"+year;
        }
        // url += "?includeDistro=false&includeDataIntegrityStats=true";
        url += "?key=SubterraneanHomesickAvailian&measureParameters=aadt,hourly_travel_time_distribution,travel_segment_delay_distribution_by_hour,excessive_delay_distribution_by_hour,total_excessive_delay_by_hour,total_excessive_vehicle_hour_delay_by_hour";
        
        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },
    getNprmTmcStats: function(tmcString, cb) {
        var url = "http://mars.availabs.org:12222/data/tmc-attributes/NY/tmcs/"+tmcString;
        url += "?tmcAttributes=length,avg_speedlimit,is_interstate"

        checkLoading(true);

        d3.json(url, wrapCB(cb));
    },

// NPRM STATE ACTIONS
    loadNprmStateData: function(state, year, month, cb) {
        var host = "http://mars.availabs.org:12222/";
        if (year && month) {
            var url = host + "top-level-measures/"+state+"/geography-levels/MPO_STATE/"+year+"/"+zeroPadding(month);
        }
        else {
            var url = host + "top-level-measures/"+state+"/geography-levels/MPO_STATE/"+year;
        }
        url += "?key=SubterraneanHomesickAvailian";
        url += "&measureParameters=interstate_total_miles,noninterstate_total_miles"

        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },

// COMPARISON VIEW ACTIONS
// '/routes/averageday/:state/:tmcs/:year'
    getAverageDay: function(tmcString, year, month, cb) {
        if (year && month) {
            var url = API_HOST + "routes/averageday/"+state+"/"+year+"/"+zeroPadding(month);
        }
        else {
            var url = API_HOST + "routes/averageday/"+state+"/"+year;
        }
        url += "?key=SubterraneanHomesickAvailian";

        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },
    getRouteData: function(request, cb) {
        var url = API_HOST + "routes/getdata/NY?key=SubterraneanHomesickAvailian";

        checkLoading(true);
        d3.json(url)
            .header("content-type", "application/json")
            .post(JSON.stringify(request), wrapCB(cb));
    },
    getTranscomEvents: function(tmcs, start, end, cb) {
        var url = API_HOST + `routes/transcom/${ tmcs }/${ start }/${ end }?key=SubterraneanHomesickAvailian`;

        checkLoading(true);
        d3.json(url, wrapCB(cb));
    },

// SYS_ADMIN ACTIONS
    updateRoutes: function(request, cb) {
        checkLoading(true);

        var xhr = d3.json("/sys/update");
        if (request) {
            xhr.post(JSON.stringify(request), wrapCB(cb));
        }
        else {
            xhr.get(wrapCB(cb));
        }
    },
    patchRoutes: function(request, cb) {
        checkLoading(true);

        var xhr = d3.json("/sys/patch");
        if (request) {
            xhr.post(JSON.stringify(request), wrapCB(cb));
        }
        else {
            xhr.get(wrapCB(cb));
        }
    },
    createAutoRoutes: function(request, cb) {
        checkLoading(true);
        d3.json("/sys/autoroute/")
            .post(JSON.stringify(request), wrapCB(cb));
    }
};

function wrapCB(cb) {
    return function(error, data) {
        //if (error) { error = JSON.parse(error.responseText || error); }
        cb(error, data);
        checkLoading(false);
    }
}

function SailsCRUD() {
    console.log("1st",URL)
    var URL = AUTH_HOST,
        method = "GET",
        response = function(d) { return JSON.parse(d.responseText); };

    function crud(model) {
        URL = AUTH_HOST+model;
        return crud;
    }
    crud.create = function(data, cb) {
        method = "POST";
        send(data, cb);
    }
    crud.read = function(id, cb) {
        if (typeof id === "function") {
            cb = id;
            id = null;
        }
        method = "GET";
        URL += id ? "/"+id : "";
        send(cb);
    }
    crud.update = function(id, data, cb) {
        console.log("2nd",URL)
        method = "PUT";
        URL += "/"+id;
        send(data, cb);
    }
    crud.delete = function(id, cb) {
        method = "DELETE";
        URL += "/"+id;
        send(cb);
    }
    crud.response = function(r) {
        response = r;
    }

    return crud;

    function send(data, cb) {
        console.log("3rd",URL,method)
        var xhr = d3.xhr(URL)
            .response(response);

        if (typeof data === "function") {
            xhr.send(method, data);
        }
        else {
            xhr.send(method, JSON.stringify(data), cb);
        }
    }
}
