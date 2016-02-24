define([
        'Backbone',
        'jQuery',
        'Underscore',
        'text!templates/journal/TopBarTemplate.html',
        'custom',
        'constants'
    ],
    function (Backbone, $, _, ContentTopBarTemplate, Custom, CONSTANTS) {
        'use strict';

        var TopBarView = Backbone.View.extend({
            el         : '#top-bar',
            contentType: CONSTANTS.JOURNAL,
            template   : _.template(ContentTopBarTemplate),

            events: {
                "click #top-bar-deleteBtn": "deleteEvent",
                "click #top-bar-editBtn"  : "editEvent",
                "click #top-bar-createBtn": "createEvent"
            },

            initialize: function (options) {
                if (options.collection) {
                    this.collection = options.collection;
                }

                this.render();
            },

            createEvent: function (event) {
                event.preventDefault();
                this.trigger('createEvent');
            },

            editEvent: function (event) {
                event.preventDefault();
                this.trigger('editEvent');
            },

            deleteEvent: function (event) {
                event.preventDefault();
                var answer = confirm("Really DELETE items ?!");
                if (answer === true) {
                    this.trigger('deleteEvent');
                }
            },

            render: function () {
                var viewType = Custom.getCurrentVT();

                $('title').text(this.contentType);

                this.$el.html(this.template({viewType: viewType, contentType: this.contentType}));

                return this;
            }
        });

        return TopBarView;
    });
