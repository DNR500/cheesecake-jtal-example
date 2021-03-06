/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def("sampleapp/appui/components/simple",
    [
        "antie/application",
        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/carousel",
        "antie/datasource",
        "sampleapp/appui/formatters/simpleformatter",
        "sampleapp/appui/datasources/simplefeed"
    ],
    function (Application, Component, Button, Label, VerticalList, Carousel, DataSource, SimpleFormatter, SimpleFeed) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self, helloWorldLabel, welcomeLabel, carouselButtonLabel, verticalListMenu;

                self = this;
                // It is important to call the constructor of the superclass
                this._super("simplecomponent");

                var menuJSON = {
                    cheesecake: {
                        recipeName: "container",
                        children: [
                            {   id: "helloWorldLabel", recipeName: "label", text: "Hello World" },
                            {   id: "welcomeLabel", recipeName: "label", text: "Welcome to your first TAL application!"},
                            {
                                id: "mainMenuList", recipeName: "verticallist",
                                children: [
                                    {
                                        recipeName:"textbutton", text:"Carousel Example",
                                        actions: [ {
                                            "eventType": "select", "command": "pushComponent",
                                            "parameters": {
                                                "id":"maincontainer", "modules":"sampleapp/appui/components/carouselcomponent",
                                                "args": this._getCarouselConfig()
                                            }
                                        }]
                                    },
                                    {
                                        recipeName:"textbutton", text:"Simple Video Player Example",
                                        actions: [ {
                                            "eventType": "select", "command": "pushComponent",
                                            "parameters": {
                                                "id":"maincontainer", "modules":"sampleapp/appui/components/simplevideocomponent"
                                            }
                                        }]
                                    },
                                    {
                                        recipeName:"textbutton", text:"Horizontal Progress Bar Example",
                                        actions: [ {
                                            "eventType": "select", "command": "pushComponent",
                                            "parameters": {
                                                "id":"maincontainer", "modules":"sampleapp/appui/components/horizontalprogresscomponent"
                                            }
                                        }]
                                    }
                                ]
                            }
                        ]
                    }
                };

                var cheesecake = Application.getCurrentApplication().cheesecake;
                var menu = cheesecake.createCheeseCake(menuJSON);
                this.appendChildWidget(menu);

                // Add a 'beforerender' event listener to the component to do anything specific that might need to be done
                // before rendering the component
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
            },

            _getCarouselConfig: function () {
                return {
                    description: "Carousel example, LEFT and RIGHT to navigate, SELECT to go back",
                    dataSource: new DataSource(null, new SimpleFeed(), 'loadData'),
                    formatter: new SimpleFormatter(),
                    orientation: Carousel.orientations.HORIZONTAL,
                    carouselId: 'verticalCullingCarousel',
                    animOptions: {
                        skipAnim: false
                    },
                    alignment: {
                        normalisedAlignPoint: 0.5,
                        normalisedWidgetAlignPoint: 0.5
                    },
                    initialItem: 4,
                    type: "CULLING",
                    lengths: 264
                };
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {

            }
        });
    }
);
