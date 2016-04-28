import {Component, View} from 'angular2/angular2';
import { Inject} from 'angular2/di';
import * as _ from 'underscore/underscore';

export class ObjectPreprocessor {

    constructor() {
    }

    getObjectPreprocessor (){
            function ObjectPreprocessor(preprocessors) {
                this.preprocessors = preprocessors;
            }

            ObjectPreprocessor.prototype = {
                constructor: ObjectPreprocessor,
                resolve: function (object) {

                    if (!object) {
                        return;
                    }

                    _.forEach(this.preprocessors, function (fn, propertyName) {
                        if (_.isArray(object)) {
                            _.forEach(object, function (element, index, array) {
                                array[index][propertyName] = fn(element[propertyName]);
                            });
                        } else {
                            object[propertyName] = fn(object[propertyName]);
                        }
                    });

                    return object;
                }
            };

            return ObjectPreprocessor;
    }

    parseRId(rid) {
    return rid.replace(/^\#(\-?\d+)\:(\d+)$/, function (s, cluster, position) {
        return cluster + ':' + position;
    });
}
}